import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, UploadCloud, Search, MoreVertical, Download, Trash2, FileSignature, FileImage, ShieldCheck, Clock, Plus, Check, X } from 'lucide-react';

const mockFolders = [
  { id: 1, name: 'Offer Letters', count: 45, color: 'blue', icon: FileSignature },
  { id: 2, name: 'Resumes & CVs', count: 1240, color: 'indigo', icon: FileText },
  { id: 3, name: 'Company Policies', count: 12, color: 'emerald', icon: ShieldCheck },
  { id: 4, name: 'Contracts', count: 89, color: 'purple', icon: FileText },
];

const INITIAL_FILES = [
  { id: 1, name: 'Alex_Thompson_Offer.pdf', type: 'pdf', size: '2.4 MB', date: 'Oct 15, 2026', author: 'Sarah J.', folderId: 1 },
  { id: 2, name: 'Q4_Hiring_Plan.docx', type: 'doc', size: '1.1 MB', date: 'Oct 12, 2026', author: 'Marcus W.', folderId: 3 },
  { id: 3, name: 'Frontend_Developer_JD.pdf', type: 'pdf', size: '856 KB', date: 'Oct 10, 2026', author: 'Elena R.', folderId: null },
  { id: 4, name: 'Sarah_Chen_Resume.pdf', type: 'pdf', size: '3.2 MB', date: 'Oct 09, 2026', author: 'Candidate', folderId: 2 },
  { id: 5, name: 'Employee_Handbook_2026.pdf', type: 'pdf', size: '15.4 MB', date: 'Oct 01, 2026', author: 'System', folderId: 3 },
  { id: 6, name: 'Vendor_Agreement_Q3.pdf', type: 'pdf', size: '4.1 MB', date: 'Sep 28, 2026', author: 'Legal Team', folderId: 4 },
  { id: 7, name: 'James_Wilson_Offer.pdf', type: 'pdf', size: '2.1 MB', date: 'Sep 25, 2026', author: 'Sarah J.', folderId: 1 },
  { id: 8, name: 'NDA_Standard_Template.docx', type: 'doc', size: '512 KB', date: 'Sep 20, 2026', author: 'Legal Team', folderId: 4 },
  { id: 9, name: 'Marcus_Wright_Resume.pdf', type: 'pdf', size: '1.8 MB', date: 'Sep 15, 2026', author: 'Candidate', folderId: 2 },
];

const RecruiterDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewBlobUrl, setPreviewBlobUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let url = null;
    if (previewFile) {
      const loadPdf = async () => {
        try {
          const { pdf } = await import('@react-pdf/renderer');
          const MockDocumentPDF = (await import('../../components/MockDocumentPDF')).default;
          const blob = await pdf(<MockDocumentPDF file={previewFile} />).toBlob();
          url = URL.createObjectURL(blob);
          setPreviewBlobUrl(url);
        } catch (e) {
          console.error('Failed to render PDF preview:', e);
        }
      };
      loadPdf();
    } else {
      setPreviewBlobUrl(null);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [previewFile]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: file.name.split('.').pop().toLowerCase() === 'pdf' ? 'pdf' : 'doc',
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        author: 'You',
        folderId: activeFolder ? activeFolder.id : null
      };
      setFiles([newFile, ...files]);
      showToast(`${file.name} uploaded successfully!`);
    }
  };

  const handleDelete = (id, name) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    showToast(`${name} deleted successfully.`);
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
    
    showToast(`${fileName} downloaded successfully.`);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center shrink-0"><FileText size={20} /></div>;
      case 'doc': return <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><FileText size={20} /></div>;
      default: return <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-500/10 text-slate-500 flex items-center justify-center shrink-0"><FileText size={20} /></div>;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3"
          >
            <Check size={18} className="text-blue-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <Folder size={14} className="text-blue-500" /> Resource Center
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Document <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Vault</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Securely manage templates, offer letters, and candidate files.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full md:w-auto items-center gap-4">
            <div className="relative group flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search files..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
              />
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 group"
            >
              <UploadCloud size={18} className="group-hover:-translate-y-1 transition-transform" /> Upload
            </button>
          </motion.div>
        </div>

        {/* Quick Folders */}
        <div className="mb-12">
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Folder size={20} className="text-slate-400" /> Folders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFolders.map((folder, idx) => {
              const Icon = folder.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  key={folder.id}
                  onClick={() => {
                    setActiveFolder(folder);
                    showToast(`Opened ${folder.name}`);
                  }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${folder.color}-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform`}></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-${folder.color}-50 dark:bg-${folder.color}-500/10 text-${folder.color}-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon size={28} />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === folder.id ? null : folder.id); }}
                      className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    <AnimatePresence>
                      {openMenuId === folder.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute top-14 right-6 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button onClick={() => { showToast(`Renaming ${folder.name}...`); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Rename</button>
                          <button onClick={() => { showToast(`Sharing ${folder.name}...`); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Share Settings</button>
                          <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>
                          <button onClick={() => { showToast(`Deleted ${folder.name}`); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Delete Folder</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{folder.name}</h3>
                  <p className="text-sm font-bold text-slate-500">{folder.count} files</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Files Table */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {activeFolder && (
                  <>
                    <button onClick={() => setActiveFolder(null)} className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">
                      Vault
                    </button>
                    <span className="text-slate-400">/</span>
                  </>
                )}
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {activeFolder ? activeFolder.name : 'Recent Files'}
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-500">
                {activeFolder ? `Viewing all documents in ${activeFolder.name}.` : 'Latest documents uploaded or modified.'}
              </p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setOpenMenuId(openMenuId === 'vault' ? null : 'vault')}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <MoreVertical size={20} />
              </button>
              
              <AnimatePresence>
                {openMenuId === 'vault' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-12 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
                  >
                    <button onClick={() => { showToast('Sorting files...'); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Sort By Date</button>
                    <button onClick={() => { showToast('Exporting list...'); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Export File List</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Name</th>
                  <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Size</th>
                  <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date Modified</th>
                  <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Author</th>
                  <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {files
                  .filter(f => activeFolder ? f.folderId === activeFolder.id : true)
                  .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(0, activeFolder ? undefined : 5)
                  .map((file) => (
                  <tr key={file.id} onClick={() => setPreviewFile(file)} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        {getFileIcon(file.type)}
                        <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm font-bold text-slate-500">{file.size}</td>
                    <td className="px-8 py-4 text-sm font-bold text-slate-500 flex items-center gap-2 mt-3">
                      <Clock size={14} className="text-slate-400" /> {file.date}
                    </td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {file.author}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDownload(file.name); }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" 
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(file.id, file.name); }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {files.filter(f => activeFolder ? f.folderId === activeFolder.id : true).filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
              <div className="py-20 text-center">
                <Folder size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Folder is empty</h3>
                <p className="text-slate-500 font-medium">No files found in this location.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* File Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setPreviewFile(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-4">
                  {getFileIcon(previewFile.type)}
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate max-w-sm md:max-w-xl">{previewFile.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{previewFile.type.toUpperCase()} • {previewFile.size} • Uploaded by {previewFile.author}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewFile(null)}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-6 md:p-8 overflow-y-auto min-h-[400px]">
                {previewBlobUrl ? (
                  <iframe 
                    src={previewBlobUrl} 
                    className="w-full max-w-4xl mx-auto h-[65vh] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white" 
                    title="Document Preview"
                  />
                ) : (
                  <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 aspect-[1/1.4] shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 relative flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-slate-500 font-bold animate-pulse">Loading Secure Document...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default RecruiterDocuments;
