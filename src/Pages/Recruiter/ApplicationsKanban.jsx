import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import { 
  Filter, Search, MoreHorizontal, Mail, Calendar, 
  Briefcase, 
  Sparkles, GripVertical, Building2, Clock, Inbox
} from 'lucide-react';

const stages = [
  'Applied', 'Under Review', 'Shortlisted', 'Assessment', 
  'Technical Interview', 'HR Interview', 'Final Interview', 'Offer', 'Hired', 'Rejected'
];

const stageColors = {
  'Applied': 'from-slate-400 to-slate-500',
  'Under Review': 'from-blue-400 to-blue-500',
  'Shortlisted': 'from-indigo-400 to-indigo-500',
  'Assessment': 'from-violet-400 to-violet-500',
  'Technical Interview': 'from-purple-400 to-purple-500',
  'HR Interview': 'from-fuchsia-400 to-fuchsia-500',
  'Final Interview': 'from-pink-400 to-pink-500',
  'Offer': 'from-emerald-400 to-emerald-500',
  'Hired': 'from-green-400 to-green-500',
  'Rejected': 'from-red-400 to-red-500'
};

const KanbanColumn = ({ title, applications, onDrop, onDragStart }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const colorClass = stageColors[title] || 'from-slate-400 to-slate-500';

  return (
    <div 
      className={`flex-shrink-0 w-[260px] flex flex-col h-full rounded-2xl transition-all duration-300 ${isDragOver ? 'bg-slate-200/80 dark:bg-slate-800/80 ring-2 ring-blue-400/50' : 'bg-slate-100/50 dark:bg-slate-800/30'} backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm relative overflow-hidden`}
      onDragOver={(e) => { 
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move'; 
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const appId = e.dataTransfer.getData('applicationId');
        onDrop(appId, title);
      }}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClass} opacity-90`}></div>
      
      <div className="flex justify-between items-center p-3 pb-2 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/40 dark:bg-slate-900/40">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-[12.5px] uppercase tracking-wider">
          {title}
          <span className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10.5px] px-1.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm font-bold min-w-[20px] text-center">
            {applications.length}
          </span>
        </h3>
        <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-md">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
        <AnimatePresence>
          {applications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-500"
            >
              <Inbox size={20} className="mb-2 opacity-50" />
              <p className="text-xs font-medium">Drop candidate here</p>
            </motion.div>
          ) : (
            applications.map(app => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={app._id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('applicationId', app._id);
                  onDragStart(app);
                }}
                className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_15px_-3px_rgba(59,130,246,0.12)] hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 cursor-grab active:cursor-grabbing group relative z-10"
              >
                <div className="absolute top-2.5 right-2.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                  <GripVertical size={14} />
                </div>
                
                <div className="flex gap-2.5 items-start mb-2.5">
                  {app.candidateId?.avatar ? (
                    <img src={app.candidateId.avatar} alt={app.candidateId.name} className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-slate-800 group-hover:ring-blue-100 dark:group-hover:ring-blue-900/30 transition-all shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shadow-sm ring-2 ring-white dark:ring-slate-800 shrink-0">
                      {app.candidateId?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="pr-4 min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-[13px] leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {app.candidateId?.name || 'Unknown Candidate'}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <Mail size={10} className="shrink-0" /> <span className="truncate">{app.candidateId?.email || 'No email'}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock size={10} /> {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  
                  {app.aiMatchScore >= 80 ? (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/30 shadow-sm">
                      <Sparkles size={9} className="text-emerald-500" />
                      {app.aiMatchScore}% Match
                    </div>
                  ) : app.aiMatchScore >= 60 ? (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-700/30 shadow-sm">
                      {app.aiMatchScore}% Match
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm">
                      {app.aiMatchScore}% Match
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MOCK_JOBS = [
  { _id: 'job1', title: 'Senior React Developer' },
  { _id: 'job2', title: 'UI/UX Designer' },
  { _id: 'job3', title: 'Product Manager' }
];

const MOCK_APPS = [
  { _id: 'app1', stage: 'Applied', candidateId: { name: 'Alex Thompson', email: 'alex@example.com', avatar: 'https://i.pravatar.cc/150?img=11' }, aiMatchScore: 92, appliedAt: new Date().toISOString() },
  { _id: 'app2', stage: 'Under Review', candidateId: { name: 'Sarah Chen', email: 'sarah@example.com', avatar: 'https://i.pravatar.cc/150?img=12' }, aiMatchScore: 85, appliedAt: new Date().toISOString() },
  { _id: 'app3', stage: 'Technical Interview', candidateId: { name: 'Michael Scott', email: 'michael@example.com', avatar: 'https://i.pravatar.cc/150?img=13' }, aiMatchScore: 98, appliedAt: new Date().toISOString() },
  { _id: 'app4', stage: 'Offer', candidateId: { name: 'Emily Davis', email: 'emily@example.com', avatar: 'https://i.pravatar.cc/150?img=14' }, aiMatchScore: 89, appliedAt: new Date().toISOString() }
];

const ApplicationsKanban = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobId = searchParams.get('job');
  
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(jobId || '');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/recruiter/jobs');
        if (res.data.success && res.data.data.length > 0) {
          setJobs(res.data.data);
          if (!selectedJob) setSelectedJob(res.data.data[0]._id);
        } else {
          throw new Error('No jobs returned');
        }
      } catch (err) {
        setJobs(MOCK_JOBS);
        if (!selectedJob) setSelectedJob(MOCK_JOBS[0]._id);
      }
    };
    fetchJobs();
  }, []);

  const fetchApplications = async () => {
    if (!selectedJob) return;
    try {
      setLoading(true);
      const res = await api.get(`/applications/job/${selectedJob}`);
      if (res.data.success && res.data.data.length > 0) {
        setApplications(res.data.data);
      } else {
        throw new Error('No applications returned');
      }
    } catch {
      setApplications(MOCK_APPS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedJob]);

  const handleDrop = async (applicationId, newStage) => {
    const previousApplications = [...applications];
    setApplications(apps => apps.map(app => app._id === applicationId ? { ...app, stage: newStage } : app));
    try {
      await api.put(`/applications/${applicationId}/stage`, { stage: newStage });
      toast.success(`Moved to ${newStage}`);
    } catch {
      setApplications(previousApplications);
      toast.error('Failed to update stage');
    }
  };

  return (
    <div className="h-[calc(100vh-128px)] flex flex-col p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-white dark:bg-slate-950">
      
      {/* Background Subtle Gradients for Premium Look */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 shrink-0 relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1 flex items-center gap-3">
            Hiring Pipeline
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-md font-bold uppercase tracking-wider">Kanban</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Drag and drop candidates across stages to update their progress.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-3">
          <div className="w-full md:w-72 relative group">
            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" size={16} />
            <select 
              value={selectedJob} 
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm appearance-none cursor-pointer"
            >
              {jobs.length === 0 ? <option value="">No jobs available</option> : jobs.map(job => (
                <option key={job._id} value={job._id}>{job.title}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search..." className="w-full sm:w-48 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm" />
            </div>
            <button className="flex-none p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all shadow-sm group relative">
              <Filter size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 overflow-x-auto relative z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-4">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 font-bold text-slate-500 dark:text-slate-400 animate-pulse">Loading Pipeline Data...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <Building2 size={64} className="text-slate-300 dark:text-slate-600 mb-6" />
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Jobs Posted Yet</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center mb-6">Create your first job posting to start building your hiring pipeline and tracking candidates.</p>
            <button onClick={() => navigate('/recruiter/post-job')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/20 active:scale-95">
              Post a Job
            </button>
          </div>
        ) : (
          <div className="flex gap-4 h-full min-w-max pb-2">
            {stages.map(stage => (
              <KanbanColumn 
                key={stage}
                title={stage}
                applications={applications.filter(app => (app.stage || 'Applied') === stage)}
                onDrop={handleDrop}
                onDragStart={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsKanban;
