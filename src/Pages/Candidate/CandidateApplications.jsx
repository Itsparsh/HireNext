import { useState, useEffect } from 'react';
import { Briefcase, Building, MapPin, Clock, CheckCircle, Circle, ArrowRight, Download, MessageSquare, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../api';

// Realistic mock statuses for the enterprise showcase
const MOCK_TIMELINES = [
  { currentStage: 3, status: 'Active', stages: ['Applied', 'Under Review', 'Shortlisted', 'Technical Round', 'HR Round', 'Offer Sent'] },
  { currentStage: 1, status: 'Active', stages: ['Applied', 'Under Review', 'Assessment', 'Interview', 'Selected'] },
  { currentStage: 5, status: 'Offer', stages: ['Applied', 'Screening', 'Technical', 'Culture Fit', 'Offer Sent'] },
  { currentStage: 2, status: 'Rejected', stages: ['Applied', 'Under Review', 'Rejected'] }
];

const TimelineVisualizer = ({ currentStage, stages, status }) => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>
        <div 
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full z-0 transition-all duration-1000 ${status === 'Rejected' ? 'bg-rose-500' : 'bg-blue-600'}`}
          style={{ width: `${(Math.min(currentStage, stages.length - 1) / (stages.length - 1)) * 100}%` }}
        ></div>
        
        {stages.map((stage, idx) => {
          const isCompleted = idx <= currentStage;
          const isCurrent = idx === currentStage;
          const isRejected = status === 'Rejected' && isCurrent;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white dark:bg-slate-900 transition-colors ${
                isRejected ? 'border-rose-500 text-rose-500' : 
                isCompleted ? 'border-blue-600 text-blue-600 dark:text-blue-500' : 
                'border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-700'
              }`}>
                {isRejected ? <XCircle size={16} /> : (isCompleted ? <CheckCircle size={16} /> : <Circle size={10} className="fill-current" />)}
              </div>
              <span className={`text-[11px] font-bold absolute top-10 whitespace-nowrap ${isCurrent ? (isRejected ? 'text-rose-600' : 'text-blue-600 dark:text-blue-400') : 'text-slate-500'}`}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ApplicationDetailsModal = ({ app, onClose, onWithdraw }) => {
  if (!app) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 sm:p-6"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex gap-5 items-center">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-2 shadow-sm shrink-0">
                <img src={app.company.logo} alt={app.company.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{app.title}</h2>
                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1 font-medium">
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300"><Building size={14}/> {app.company.name}</span>
                  <span className="flex items-center gap-1"><MapPin size={14}/> {app.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> Applied {app.date}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 transition-colors">
              <XCircle size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
            
            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Hiring Progress</h3>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:px-10 pb-12 shadow-sm">
                <TimelineVisualizer currentStage={app.timeline.currentStage} stages={app.timeline.stages} status={app.timeline.status} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recruiter Feedback</h3>
                {app.timeline.currentStage > 1 && app.timeline.status !== 'Rejected' ? (
                  <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-5 rounded-2xl">
                    <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
                      "Strong performance in the initial screening. The candidate demonstrated excellent domain knowledge and culture fit. Proceeding to the technical assessment phase."
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs font-bold text-blue-600 dark:text-blue-400">
                      <img src="https://i.pravatar.cc/100?img=47" className="w-6 h-6 rounded-full" alt="Recruiter" />
                      Sarah Jenkins, Lead Technical Recruiter
                    </div>
                  </div>
                ) : app.timeline.status === 'Rejected' ? (
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      "While your background is impressive, we have decided to move forward with other candidates whose experience better aligns with our immediate requirements for this specific role."
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl flex items-center gap-3 text-slate-500">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">No feedback available yet. Your application is under review.</span>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Application Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500">Expected Salary</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">${(app.salary.min / 1000).toFixed(0)}k - ${(app.salary.max / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500">Resume Submitted</span>
                    <span className="text-sm font-bold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline"><Download size={14} /> resume_v4.pdf</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500">Application ID</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">#APP-{app._id.substring(0, 6).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center rounded-b-3xl">
            <button 
              onClick={() => onWithdraw(app._id)}
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              Withdraw Application
            </button>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 transition-shadow shadow-sm hover:shadow">
                <MessageSquare size={16} /> Message Recruiter
              </button>
              {app.timeline.status === 'Offer' && (
                <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/30">
                  <Download size={16} /> Download Offer
                </button>
              )}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CandidateApplications = () => {
  const [appliedJobsIds, setAppliedJobsIds] = useState(() => JSON.parse(localStorage.getItem('appliedJobs')) || []);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const fetches = appliedJobsIds.map(id => api.get(`/jobs/${id}`));
        const responses = await Promise.all(fetches);
        
        const jobsData = responses.map((res, index) => {
          const job = res.data.data;
          // Assign realistic timeline mocks for demo purposes
          const timeline = MOCK_TIMELINES[index % MOCK_TIMELINES.length];
          return {
            ...job,
            timeline,
            date: new Date(Date.now() - (index * 86400000 * 3)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };
        });
        
        setApplications(jobsData);
      } catch (err) {
        console.error('Error fetching applied jobs', err);
      } finally {
        setLoading(false);
      }
    };

    if (appliedJobsIds.length > 0) {
      fetchApplications();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, [appliedJobsIds]);

  const handleWithdraw = (id) => {
    if (window.confirm("Are you sure you want to withdraw your application? This action cannot be undone.")) {
      const newIds = appliedJobsIds.filter(appId => appId !== id);
      setAppliedJobsIds(newIds);
      localStorage.setItem('appliedJobs', JSON.stringify(newIds));
      setApplications(prev => prev.filter(app => app._id !== id));
      setSelectedApp(null);
      toast.success("Application successfully withdrawn.");
    }
  };

  return (
    <div className="animate-fade-in-up max-w-6xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">My Applications</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Track and manage your entire hiring pipeline from one place.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm text-center min-w-[100px]">
            <p className="text-2xl font-black text-blue-600">{applications.length}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm text-center min-w-[100px]">
            <p className="text-2xl font-black text-emerald-500">{applications.filter(a => a.timeline.status === 'Offer').length}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Offers</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-500 font-semibold animate-pulse">Syncing pipeline data...</p>
          </div>
        ) : applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Company & Role</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Date Applied</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Hiring Stage</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {applications.map((app) => {
                  const stageName = app.timeline.stages[Math.min(app.timeline.currentStage, app.timeline.stages.length - 1)];
                  
                  return (
                    <tr 
                      key={app._id} 
                      onClick={() => setSelectedApp(app)}
                      className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 shrink-0 shadow-sm flex items-center justify-center">
                            <img src={app.company.logo} alt={app.company.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{app.title}</h4>
                            <div className="flex items-center gap-3 mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1.5"><Building size={14}/> {app.company.name}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                              <span className="flex items-center gap-1.5"><MapPin size={14}/> {app.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
                          <Clock size={16} className="text-slate-400" /> {app.date}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-1.5">
                          <span className={`inline-flex w-max px-3 py-1.5 text-[11px] font-black rounded-full border tracking-wide uppercase ${
                            app.timeline.status === 'Offer' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                            app.timeline.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' :
                            'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                          }`}>
                            {stageName}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400">
                            Step {app.timeline.currentStage + 1} of {app.timeline.stages.length}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700 shadow-sm">
              <Briefcase size={36} className="text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Your Pipeline is Empty</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto font-medium">You haven't applied to any jobs yet. Start exploring and take the next leap in your career!</p>
            <Link to="/candidate/jobs" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 inline-block hover:-translate-y-0.5">
              Discover Premium Jobs
            </Link>
          </div>
        )}
      </div>

      <ApplicationDetailsModal 
        app={selectedApp} 
        onClose={() => setSelectedApp(null)}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
};

export default CandidateApplications;
