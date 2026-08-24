import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, Edit, Copy, Archive, ExternalLink, TrendingUp, Users, Clock, AlertCircle, Plus, MapPin, Briefcase, ChevronRight, Zap, Sparkles, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/recruiter/jobs');
      if (res.data.success) setJobs(res.data.data);
    } catch (err) {
      if (err.response?.status !== 400) toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDuplicate = (e, job) => {
    e.stopPropagation();
    setOpenMenuId(null);
    const duplicatedJob = { ...job, _id: Date.now().toString(), title: `${job.title} (Copy)`, postedAt: new Date().toISOString() };
    setJobs([duplicatedJob, ...jobs]);
    toast.success('Job duplicated successfully');
  };

  const handleArchive = (e, jobId) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setJobs(jobs.filter(j => j._id !== jobId));
    toast.success('Job archived successfully');
  };

  const handleCopyLink = (e, jobId) => {
    e.stopPropagation();
    setOpenMenuId(null);
    navigator.clipboard.writeText(`${window.location.origin}/jobs/${jobId}`);
    toast.success('Public link copied to clipboard!');
  };

  const getStatusBadge = (status) => {
    // For demo purposes, we'll randomize some statuses if missing
    const s = status || 'Active';
    switch(s) {
      case 'Active': return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-sm shadow-emerald-500/10"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Active</span>;
      case 'Draft': return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700"><div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div> Draft</span>;
      default: return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Active</span>;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <Briefcase size={14} className="text-blue-500" /> {jobs.length} Active Positions
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Postings</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Oversee your hiring pipeline and track applicant volume.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full md:w-auto items-center gap-4">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" placeholder="Search roles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
              />
            </div>
            <button onClick={() => navigate('/recruiter/post-job')} className="shrink-0 flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black transition-all shadow-lg hover:scale-105 active:scale-95 group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Post Job
            </button>
          </motion.div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-slate-500">Loading your pipelines...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="col-span-full py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No jobs found</h3>
                <p className="text-slate-500 font-medium mb-6">You haven't posted any jobs that match this search.</p>
                <button onClick={() => navigate('/recruiter/post-job')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform">
                  Create First Job
                </button>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div 
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/recruiter/applications?job=${job._id}`)}
                  className={`group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-xl hover:border-blue-500/30 transition-all cursor-pointer relative flex flex-col ${openMenuId === job._id ? 'z-50' : 'z-10'}`}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                        <Briefcase className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <div>
                        {getStatusBadge('Active')}
                        <div className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-wider flex items-center gap-1"><Clock size={12}/> {new Date(job.postedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 relative" onClick={e => e.stopPropagation()}>
                      <button onClick={(e) => { e.stopPropagation(); navigate('/recruiter/post-job', { state: { editJob: job } }); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors" title="Edit"><Edit size={16} /></button>
                      <button onClick={(e) => toggleMenu(e, job._id)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors" title="More"><MoreVertical size={16} /></button>
                      
                      <AnimatePresence>
                        {openMenuId === job._id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 py-1.5 z-50 overflow-hidden"
                          >
                            <button onClick={(e) => handleDuplicate(e, job)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><Copy size={16}/> Duplicate</button>
                            <button onClick={(e) => handleArchive(e, job._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><Archive size={16}/> Archive Job</button>
                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-1.5 w-full"></div>
                            <button onClick={(e) => handleCopyLink(e, job._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><ExternalLink size={16}/> Copy Public Link</button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5"><MapPin size={12}/> {job.location}</span>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5"><Globe size={12}/> {job.workMode || 'Remote'}</span>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5"><Zap size={12}/> {job.experienceLevel || 'Senior'}</span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex items-center justify-between group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Apps</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{job.applicantCount || Math.floor(Math.random() * 80) + 12}</p>
                      </div>
                      <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                        <Users size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex items-center justify-between group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">AI Matches</p>
                        <p className="text-2xl font-black text-emerald-600">{Math.floor(Math.random() * 15) + 3}</p>
                      </div>
                      <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                        <Sparkles size={18} className="text-emerald-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-slate-900 dark:via-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 pointer-events-none">
                    <div className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-xl flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-all">
                      View Pipeline <ChevronRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
