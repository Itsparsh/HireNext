import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users2, Search, Plus, Filter, MoreHorizontal, Folder, Mail, Calendar, Shield, ExternalLink, Zap, ChevronRight, Star, Sparkles, FolderOpen, BrainCircuit, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import CandidateProfileModal from '../../components/CandidateProfileModal';

const talentPools = [
  { id: 1, name: 'Frontend Engineers', description: 'Top candidates specialized in React, Next.js, and Vue.', count: 142, lastActive: '2 hours ago', icon: Zap, color: 'blue' },
  { id: 2, name: 'Senior Designers', description: 'UI/UX designers with 5+ years of experience.', count: 45, lastActive: '1 day ago', icon: Sparkles, color: 'purple' },
  { id: 3, name: 'Backend Architects', description: 'System designers and backend engineers (Node, Python).', count: 89, lastActive: '5 hours ago', icon: Shield, color: 'emerald' },
  { id: 4, name: 'Q3 Product Managers', description: 'Shortlisted PMs for the upcoming Q3 hiring sprint.', count: 12, lastActive: 'Just now', icon: Star, color: 'amber' },
  { id: 5, name: 'Data Scientists', description: 'Machine learning and AI specialists.', count: 67, lastActive: '3 days ago', icon: BrainCircuit, color: 'indigo' },
]; 

const mockCandidates = [
  { id: 1, name: 'Alex Thompson', role: 'Senior React Developer', pool: 'Frontend Engineers', dateAdded: 'Oct 12, 2026', avatar: 'https://i.pravatar.cc/150?u=1', status: 'Available' },
  { id: 2, name: 'Sarah Chen', role: 'Full Stack Engineer', pool: 'Frontend Engineers', dateAdded: 'Oct 14, 2026', avatar: 'https://i.pravatar.cc/150?u=2', status: 'Interviewing' },
  { id: 3, name: 'Michael Rodriguez', role: 'Frontend Architect', pool: 'Frontend Engineers', dateAdded: 'Oct 15, 2026', avatar: 'https://i.pravatar.cc/150?u=3', status: 'Offered' },
  { id: 4, name: 'Emily Taylor', role: 'UI/UX Developer', pool: 'Senior Designers', dateAdded: 'Oct 18, 2026', avatar: 'https://i.pravatar.cc/150?u=4', status: 'Available' },
  { id: 5, name: 'David Kim', role: 'Backend Node.js Dev', pool: 'Backend Architects', dateAdded: 'Oct 19, 2026', avatar: 'https://i.pravatar.cc/150?u=5', status: 'Interviewing' },
  { id: 6, name: 'Jessica Patel', role: 'Python Systems Architect', pool: 'Backend Architects', dateAdded: 'Oct 20, 2026', avatar: 'https://i.pravatar.cc/150?u=6', status: 'Available' },
  { id: 7, name: 'Robert Fox', role: 'Product Manager', pool: 'Q3 Product Managers', dateAdded: 'Oct 21, 2026', avatar: 'https://i.pravatar.cc/150?u=7', status: 'Available' },
  { id: 8, name: 'Anna Lee', role: 'Senior Data Scientist', pool: 'Data Scientists', dateAdded: 'Oct 22, 2026', avatar: 'https://i.pravatar.cc/150?u=8', status: 'Offered' },
];

const TalentPool = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeTab = searchParams.get('tab') || 'pools';
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [poolsList, setPoolsList] = useState(talentPools);
  
  const setActiveTab = (tab) => {
    if (tab === 'pools') {
      setSearchTerm('');
      setSearchParams({ tab });
    } else {
      setSearchParams({ tab });
    }
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPool, setEditingPool] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Sync URL search param with local search term when navigating via back button
  useEffect(() => {
    if (activeTab === 'pools' && searchTerm) {
      setSearchTerm('');
    }
  }, [activeTab]);

  const filteredPools = poolsList.filter(pool => 
    pool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCandidates = mockCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.pool.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
      purple: 'from-purple-500 to-fuchsia-500 bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
      emerald: 'from-emerald-500 to-teal-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
      amber: 'from-amber-500 to-orange-500 bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
      indigo: 'from-indigo-500 to-violet-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20',
    };
    return colors[color] || colors.blue;
  };

  const getGradientText = (color) => {
    const gradients = {
      blue: 'from-blue-600 to-cyan-500',
      purple: 'from-purple-600 to-fuchsia-500',
      emerald: 'from-emerald-600 to-teal-500',
      amber: 'from-amber-600 to-orange-500',
      indigo: 'from-indigo-600 to-violet-500',
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <Users2 size={14} className="text-indigo-500" /> CRM for Recruiters
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Pools</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Organize, track, and nurture your saved candidates.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full md:w-auto items-center gap-4">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" placeholder="Search talent pools..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => { setEditingPool(null); setIsModalOpen(true); }}
              className="shrink-0 flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black transition-all shadow-lg hover:scale-105 active:scale-95 group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> New Pool
            </button>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 w-max shadow-sm">
          {[
            { id: 'pools', label: 'All Pools', icon: FolderOpen },
            { id: 'candidates', label: 'All Saved Candidates', icon: Users2 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          
          {activeTab === 'pools' && (
            <motion.div key="pools" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPools.map((pool, index) => {
                const colors = getColorClasses(pool.color);
                const gradientText = getGradientText(pool.color);
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={pool.id} 
                    onClick={() => {
                      setSearchTerm(pool.name);
                      setSearchParams({ tab: 'candidates' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.split(' ')[0]} ${colors.split(' ')[1]} opacity-5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform`}></div>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm ${colors}`}>
                        <pool.icon size={24} />
                      </div>
                      <div className="relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === pool.id ? null : pool.id); }}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        
                        <AnimatePresence>
                          {openMenuId === pool.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-10 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
                            >
                              <button onClick={() => { setEditingPool(pool); setIsModalOpen(true); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-2">
                                Edit Pool
                              </button>
                              <button onClick={() => { 
                                setPoolsList(prev => [...prev, { ...pool, id: Date.now(), name: `${pool.name} (Copy)` }]);
                                toast.success('Pool duplicated successfully!'); 
                                setOpenMenuId(null); 
                              }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-2">
                                Duplicate Pool
                              </button>
                              <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>
                              <button onClick={() => { 
                                setPoolsList(prev => prev.filter(p => p.id !== pool.id));
                                toast('Pool deleted', { icon: '🗑️' }); 
                                setOpenMenuId(null); 
                              }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2">
                                Delete Pool
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                      {pool.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 line-clamp-2">
                      {pool.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/150?u=${pool.id * 10 + i}`} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                          +{pool.count - 3}
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r ${gradientText} text-transparent bg-clip-text`}>
                        View Pool <ChevronRight size={14} className="text-slate-400" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'candidates' && (
            <motion.div key="candidates" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Candidate</th>
                        <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Assigned Pool</th>
                        <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                        <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date Added</th>
                        <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {filteredCandidates.length > 0 ? (
                        filteredCandidates.map((candidate) => (
                          <tr key={candidate.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                                <div>
                                  <h4 className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{candidate.name}</h4>
                                  <p className="text-xs font-bold text-slate-500">{candidate.role}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                <Folder size={12} /> {candidate.pool}
                              </span>
                            </td>
                            <td className="px-8 py-5">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                candidate.status === 'Available' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' :
                                candidate.status === 'Interviewing' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                                'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  candidate.status === 'Available' ? 'bg-emerald-500' :
                                  candidate.status === 'Interviewing' ? 'bg-blue-500 animate-pulse' :
                                  'bg-purple-500'
                                }`}></div>
                                {candidate.status}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-sm font-bold text-slate-500">
                              {candidate.dateAdded}
                            </td>
                            <td className="px-8 py-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); navigate('/recruiter/messages', { state: { candidate } }); }}
                                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors" 
                                  title="Message"
                                >
                                  <Mail size={16} />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setSelectedCandidate(candidate); }}
                                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" 
                                  title="View Profile"
                                >
                                  <ExternalLink size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <FolderOpen size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
                              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">No candidates found</h3>
                              <p className="text-slate-500 font-medium">There are no candidates matching your current search criteria.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Create/Edit Pool Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">{editingPool ? 'Edit Talent Pool' : 'Create Talent Pool'}</h2>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">{editingPool ? 'Update details for your saved pool.' : 'Create a new bucket to organize your candidates.'}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const name = formData.get('name');
                const description = formData.get('description');
                
                if (editingPool) {
                  setPoolsList(prev => prev.map(p => p.id === editingPool.id ? { ...p, name, description } : p));
                  toast.success('Pool updated successfully!');
                } else {
                  setPoolsList(prev => [{ id: Date.now(), name, description, count: 0, lastActive: 'Just now', icon: FolderOpen, color: 'blue' }, ...prev]);
                  toast.success('New pool created!');
                }
                setIsModalOpen(false);
              }} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pool Name</label>
                  <input 
                    name="name"
                    required
                    type="text" 
                    defaultValue={editingPool ? editingPool.name : ''}
                    placeholder="e.g. Senior Frontend Devs"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                  <textarea 
                    name="description"
                    required
                    defaultValue={editingPool ? editingPool.description : ''}
                    placeholder="What kind of candidates are in this pool?"
                    rows="3"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20"
                >
                  {editingPool ? 'Save Changes' : 'Create Pool'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CandidateProfileModal 
        isOpen={!!selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
        candidate={selectedCandidate} 
      />
    </div>
  );
};

export default TalentPool;
