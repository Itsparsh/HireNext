import { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, FileText, Image as ImageIcon, Trash2, Download, 
  MoreVertical, ShieldCheck, FileCheck, CheckCircle, Eye, AlertCircle, X, Search
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { pdf } from '@react-pdf/renderer';
import CandidateResumePDF from '../../components/CandidateResumePDF';
import MockDocumentPDF from '../../components/MockDocumentPDF';

// Mock Document Database
const INITIAL_DOCS = [
  { id: 1, name: 'Alex_Johnson_Resume_2024.pdf', type: 'Resume', size: '2.4 MB', date: 'Oct 24, 2023', status: 'Verified' },
  { id: 2, name: 'Cover_Letter_Stripe.pdf', type: 'Cover Letter', size: '1.1 MB', date: 'Nov 02, 2023', status: 'Verified' },
  { id: 3, name: 'Design_Portfolio_Final.pdf', type: 'Portfolio', size: '15.8 MB', date: 'Oct 15, 2023', status: 'Pending' },
  { id: 4, name: 'Aadhaar_Card_Front_Back.pdf', type: 'ID Proof', size: '4.2 MB', date: 'Sep 10, 2023', status: 'Verified' },
  { id: 5, name: 'BTech_Degree_Certificate.pdf', type: 'Education', size: '3.1 MB', date: 'Aug 22, 2023', status: 'Verified' },
  { id: 6, name: 'Relieving_Letter_InnovateTech.pdf', type: 'Experience', size: '1.5 MB', date: 'Dec 12, 2022', status: 'Verified' }
];

const CATEGORIES = [
  'Resume', 'Cover Letter', 'Portfolio', 'ID Proof', 'Address Proof', 
  'Education', 'Experience', 'Salary Slips', 'Medical', 'Other'
];

const CandidateDocuments = () => {
  const [documents, setDocuments] = useState(INITIAL_DOCS);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [previewBlobUrl, setPreviewBlobUrl] = useState(null);
  const [docToDelete, setDocToDelete] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (previewDoc) {
      setPreviewBlobUrl(null);
      const PdfComponent = previewDoc.type === 'Resume' || previewDoc.type === 'Cover Letter' 
        ? <CandidateResumePDF candidate={{ name: "Alex Johnson", role: "Software Engineer", skills: ["React", "Node.js", "TypeScript"], currentCompany: "HireNext Demo" }} /> 
        : <MockDocumentPDF file={{ ...previewDoc, author: 'Alex Johnson' }} />;
        
      pdf(PdfComponent).toBlob().then(blob => {
        setPreviewBlobUrl(URL.createObjectURL(blob));
      });
    } else {
      setPreviewBlobUrl(null);
    }
  }, [previewDoc]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateUpload = (file) => {
    setUploading(true);
    setUploadProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 15;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        
        setTimeout(() => {
          setUploading(false);
          const newDoc = {
            id: Date.now(),
            name: file.name,
            type: 'Other',
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            status: 'Pending'
          };
          setDocuments(curr => [newDoc, ...curr]);
          toast.success(`${file.name} uploaded successfully!`);
        }, 400);
      } else {
        setUploadProgress(currentProgress);
      }
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const executeDelete = () => {
    if (docToDelete) {
      setDocuments(prev => prev.filter(d => d.id !== docToDelete.id));
      toast.success('Document deleted successfully');
      setDocToDelete(null);
    }
  };

  const handleDownload = (fileName) => {
    const content = `This is a mock document for ${fileName}. In a production app, this would download the actual file from secure storage.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`${fileName} downloaded successfully.`);
  };

  const getIcon = (type) => {
    switch(type) {
      case 'Resume': case 'Cover Letter': return <FileText size={24} className="text-blue-500" />;
      case 'ID Proof': return <ShieldCheck size={24} className="text-emerald-500" />;
      case 'Education': return <FileCheck size={24} className="text-amber-500" />;
      case 'Portfolio': return <ImageIcon size={24} className="text-purple-500" />;
      default: return <FileText size={24} className="text-slate-500" />;
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesCat = selectedCategory === 'All' || doc.type === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Document Vault</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Securely store and manage your professional identity, background checks, and career documents.</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="relative">
        <input 
          ref={fileInputRef} type="file" className="hidden" 
          onChange={handleFileChange} 
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />
        <div 
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all bg-white dark:bg-slate-900 shadow-sm
            ${dragActive ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 scale-[1.01]' : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
          `}
        >
          {uploading ? (
            <div className="w-full max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto animate-pulse">
                <UploadCloud size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Encrypting & Uploading Document...</h3>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="bg-blue-600 h-full transition-all duration-300 ease-out relative" style={{ width: `${uploadProgress}%` }}>
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_1s_infinite]"></div>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-500">{uploadProgress}% Complete</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-900 shadow-sm">
                <UploadCloud size={36} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Drag & Drop files here</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium max-w-sm mx-auto">Upload PDF, DOCX, JPG, or PNG formats up to 25MB. All files are encrypted at rest with AES-256.</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-8 py-3.5 rounded-xl font-bold transition-transform hover:-translate-y-0.5 shadow-lg"
              >
                Browse Files
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 transition-colors w-full sm:w-80">
          <Search className="text-slate-400 mr-2 shrink-0" size={18} />
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent w-full focus:outline-none text-sm text-slate-800 dark:text-slate-200 font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          {['All', 'Resume', 'ID Proof', 'Education'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Alert */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">Enterprise-Grade Security Active</h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-500/80 mt-0.5 font-medium">Your documents are protected with end-to-end encryption and strict access controls.</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDocs.map((doc) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={doc.id}
              className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 dark:hover:border-blue-800 transition-all flex flex-col relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm">
                    {getIcon(doc.type)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{doc.type}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-[15px] leading-tight truncate w-32 md:w-40" title={doc.name}>
                      {doc.name}
                    </h4>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setMenuOpenId(menuOpenId === doc.id ? null : doc.id)}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1"
                  >
                    <MoreVertical size={20} />
                  </button>
                  
                  {menuOpenId === doc.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-50">
                      <button onClick={() => { setMenuOpenId(null); setPreviewDoc(doc); }} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"><Eye size={16}/> Preview</button>
                      <button onClick={(e) => { e.stopPropagation(); setMenuOpenId(null); handleDownload(doc.name); }} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"><Download size={16}/> Save</button>
                      <div className="h-px bg-slate-200 dark:bg-slate-700 my-1 w-full"></div>
                      <button onClick={() => { setMenuOpenId(null); setDocToDelete(doc); }} className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"><Trash2 size={16}/> Delete</button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 relative z-10">
                <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                  {doc.size}
                </span>
                <span className="flex items-center gap-1.5">
                  {doc.status === 'Verified' 
                    ? <><CheckCircle size={14} className="text-emerald-500"/> Verified</> 
                    : <><AlertCircle size={14} className="text-amber-500"/> Pending Scan</>
                  }
                </span>
              </div>

              {/* Hover Overlay Actions */}
              <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="flex gap-3">
                  <button onClick={() => setPreviewDoc(doc)} className="flex flex-col items-center justify-center w-14 h-14 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 rounded-2xl transition-all shadow-sm">
                    <Eye size={20} className="mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Preview</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDownload(doc.name); }} className="flex flex-col items-center justify-center w-14 h-14 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 rounded-2xl transition-all shadow-sm">
                    <Download size={20} className="mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Save</span>
                  </button>
                  <button onClick={() => setDocToDelete(doc)} className="flex flex-col items-center justify-center w-14 h-14 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 rounded-2xl transition-all shadow-sm">
                    <Trash2 size={20} className="mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredDocs.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No documents found</h3>
            <p className="text-sm font-medium text-slate-500">Try adjusting your category filter or search query.</p>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-start pt-16 pb-16 px-4 bg-slate-900/90 backdrop-blur-sm overflow-y-auto"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                    {getIcon(previewDoc.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate max-w-sm md:max-w-xl">{previewDoc.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{previewDoc.type} • {previewDoc.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewDoc(null)}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-6 md:p-8 overflow-y-auto">
                {previewBlobUrl ? (
                  <iframe 
                    src={previewBlobUrl} 
                    className="w-full max-w-4xl mx-auto h-[65vh] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white" 
                    title="Document Preview"
                  />
                ) : (
                  <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 aspect-[1/1.4] shadow-xl border border-slate-200 dark:border-slate-800 p-12 relative flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {docToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setDocToDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 p-8 text-center"
            >
              <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} className="text-rose-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Delete Document?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Are you sure you want to permanently delete <strong className="text-slate-700 dark:text-slate-300">"{docToDelete.name}"</strong>? This action cannot be undone.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setDocToDelete(null)}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-2xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete}
                  className="flex-1 py-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold transition-colors shadow-lg shadow-rose-500/30"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CandidateDocuments;
