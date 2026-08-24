import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Search, Calendar, MessageSquare, CheckCircle, XCircle, MoreVertical, MapPin, Briefcase, Sparkles, Filter, ChevronDown, Download, Award, Shield, FolderOpen, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { pdf } from '@react-pdf/renderer';
import CandidateProfileModal from '../../components/CandidateProfileModal';
import ScheduleModal from '../../components/ScheduleModal';
import ShortlistedPDF from '../../components/ShortlistedPDF';

const mockShortlisted = [
  { id: 1, name: 'Alex Thompson', role: 'Senior React Developer', job: 'Frontend Architect', applied: '2 days ago', matchScore: 98, status: 'Interviewing', avatar: 'https://i.pravatar.cc/150?u=1', location: 'San Francisco, CA', experience: '6 Years' },
  { id: 2, name: 'Sarah Chen', role: 'Full Stack Engineer', job: 'Lead Engineer', applied: '4 days ago', matchScore: 95, status: 'Offer Pending', avatar: 'https://i.pravatar.cc/150?u=2', location: 'Remote', experience: '8 Years' },
  { id: 3, name: 'Michael Rodriguez', role: 'UI/UX Designer', job: 'Product Designer', applied: '1 week ago', matchScore: 91, status: 'Screening', avatar: 'https://i.pravatar.cc/150?u=3', location: 'Austin, TX', experience: '4 Years' },
  { id: 4, name: 'Emily Taylor', role: 'Data Scientist', job: 'AI Engineer', applied: '2 weeks ago', matchScore: 88, status: 'Interviewing', avatar: 'https://i.pravatar.cc/150?u=4', location: 'New York, NY', experience: '5 Years' },
];

const Shortlisted = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [schedulingCandidate, setSchedulingCandidate] = useState(null);
  const [shortlistedList, setShortlistedList] = useState(mockShortlisted);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filter) => {
    setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  const handleExportPDF = async () => {
    try {
      const loadingToast = toast.loading('Generating executive report...');
      
      const blob = await pdf(<ShortlistedPDF candidates={filteredCandidates} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hirenext-shortlist-report.pdf`;
      link.click();
      
      toast.success('Report downloaded successfully!', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to generate report.');
      console.error(error);
    }
  };

  const filteredCandidates = shortlistedList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.job.toLowerCase().includes(searchTerm.toLowerCase());
                          
    if (!matchesSearch) return false;
    if (activeFilters.length === 0) return true;
    
    return activeFilters.every(filter => {
      switch (filter) {
        case 'Remote Only':
          return c.location.toLowerCase() === 'remote';
        case 'Senior Level':
          return c.role.toLowerCase().includes('senior') || c.role.toLowerCase().includes('lead') || c.role.toLowerCase().includes('architect');
        case 'Interviewing':
          return c.status === 'Interviewing';
        case 'Offer Pending':
          return c.status === 'Offer Pending';
        case 'Top Match (>95%)':
          return c.matchScore > 95;
        default:
          return true;
      }
    });
  });

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute -top-20 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <Star size={14} className="text-amber-500 fill-amber-500" /> Premium Talent
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Shortlisted <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Candidates</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Your top picks for active roles, ready for the next steps.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full md:w-auto flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
              <input 
                type="text" placeholder="Search shortlisted..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 border rounded-2xl font-bold transition-all shadow-sm ${
                  isFilterOpen || activeFilters.length > 0 
                    ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Filter size={18} /> Filter
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center ml-1">{activeFilters.length}</span>
                )}
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-3 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 z-30"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-black text-slate-900 dark:text-white">Quick Filters</h3>
                      <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {['Remote Only', 'Senior Level', 'Interviewing', 'Offer Pending', 'Top Match (>95%)'].map(filter => (
                        <button 
                          key={filter} onClick={() => toggleFilter(filter)}
                          className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            activeFilters.includes(filter) ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 dark:border-slate-600'
                          }`}>
                            {activeFilters.includes(filter) && <Check size={14} />}
                          </div>
                          <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{filter}</span>
                        </button>
                      ))}
                    </div>
                    {activeFilters.length > 0 && (
                      <button 
                        onClick={() => setActiveFilters([])}
                        className="w-full mt-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleExportPDF}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold transition-all shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Download size={18} /> Export
              </button>
            </div>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredCandidates.length > 0 ? filteredCandidates.map((candidate, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={candidate.id}
                className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all flex flex-col xl:flex-row items-center gap-6 xl:gap-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 to-orange-500"></div>

                {/* Candidate Info */}
                <div className="flex items-center gap-5 w-full xl:w-[30%] shrink-0">
                  <div className="relative">
                    <img src={candidate.avatar} alt={candidate.name} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                    <div className="absolute -bottom-2 -right-2 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 p-1.5 rounded-xl border border-amber-200 dark:border-amber-500/30 backdrop-blur-md shadow-sm">
                      <Star size={12} className="fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {candidate.name}
                    </h3>
                    <p className="text-sm font-bold text-slate-500">{candidate.role}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1"><MapPin size={10} /> {candidate.location}</span>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1"><Briefcase size={10} /> {candidate.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Job Info & Match */}
                <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Applying For</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{candidate.job}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Shortlisted On</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1"><Calendar size={14} className="text-slate-400"/> {candidate.applied}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                      {candidate.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">AI Score</p>
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-emerald-500" />
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{candidate.matchScore}%</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full xl:w-auto justify-end shrink-0 mt-4 xl:mt-0 pt-4 xl:pt-0 border-t xl:border-t-0 border-slate-100 dark:border-slate-800/50 relative">
                  <button 
                    onClick={() => navigate('/recruiter/messages', { state: { candidate } })}
                    className="flex-1 xl:flex-none px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl font-bold transition-colors flex items-center justify-center" 
                    title="Message"
                  >
                    <MessageSquare size={18} />
                  </button>
                  <button 
                    onClick={() => setSchedulingCandidate(candidate)}
                    className="flex-1 xl:flex-none px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black shadow-lg shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} /> Schedule
                  </button>
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === candidate.id ? null : candidate.id)}
                    className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <MoreVertical size={20} />
                  </button>
                  
                  <AnimatePresence>
                    {openMenuId === candidate.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute top-14 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
                      >
                        <button onClick={() => { setSelectedCandidate(candidate); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          View Profile
                        </button>
                        <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>
                        <button onClick={() => { 
                          setShortlistedList(prev => prev.filter(c => c.id !== candidate.id));
                          toast('Removed from shortlist', { icon: '🗑️' }); 
                          setOpenMenuId(null); 
                        }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          Remove Candidate
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center justify-center text-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-slate-800"
              >
                <FolderOpen size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No candidates found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your search filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <CandidateProfileModal 
        isOpen={!!selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
        candidate={selectedCandidate} 
      />

      <ScheduleModal 
        isOpen={!!schedulingCandidate}
        onClose={() => setSchedulingCandidate(null)}
        candidate={schedulingCandidate}
      />
    </div>
  );
};

export default Shortlisted;
