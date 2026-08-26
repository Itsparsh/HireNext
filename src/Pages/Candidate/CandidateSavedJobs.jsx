import { useState, useEffect } from 'react';
import { Bookmark, MapPin, Clock, DollarSign, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

const CandidateSavedJobs = () => {
  const [savedJobsIds, setSavedJobsIds] = useState(() => JSON.parse(localStorage.getItem('savedJobs')) || []);
  const [appliedJobsIds, setAppliedJobsIds] = useState(() => JSON.parse(localStorage.getItem('appliedJobs')) || []);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const fetches = savedJobsIds.map(id => api.get(`/jobs/${id}`));
        const responses = await Promise.all(fetches);
        
        const jobsData = responses.map(res => res.data.data);
        setSavedJobs(jobsData);
      } catch (err) {
        console.error('Error fetching saved jobs', err);
      } finally {
        setLoading(false);
      }
    };

    if (savedJobsIds.length > 0) {
      fetchSavedJobs();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedJobs([]);
      setLoading(false);
    }
  }, [savedJobsIds]);

  const handleUnsave = (id) => {
    const newSaved = savedJobsIds.filter(savedId => savedId !== id);
    setSavedJobsIds(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    toast.success('Job removed from saved');
  };

  const handleApply = (id) => {
    const newApplied = [...appliedJobsIds, id];
    setAppliedJobsIds(newApplied);
    localStorage.setItem('appliedJobs', JSON.stringify(newApplied));
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Saved Jobs</h1>
        <p className="text-slate-500 dark:text-slate-400">Jobs you've bookmarked to apply for later.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold animate-pulse bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            Loading your saved jobs...
          </div>
        ) : savedJobs.length > 0 ? (
          savedJobs.map((job) => {
            const isApplied = appliedJobsIds.includes(job._id);
            
            return (
              <div key={job._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-blue-300 dark:hover:border-blue-900/50 transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 shrink-0 bg-slate-50 dark:bg-slate-800 shadow-sm">
                  <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{job.title}</h3>
                    {job.aiMatchScore && (
                      <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star size={12} className="fill-blue-600 dark:fill-blue-400" /> {job.aiMatchScore}% Match
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{job.company.name}</span>
                    <span className="flex items-center text-amber-500 dark:text-amber-400 text-xs"><Star size={14} className="fill-current mr-0.5" /> {job.company.rating}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg"><MapPin size={14} className="text-slate-400" /> {job.location}</span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg"><Briefcase size={14} className="text-slate-400" /> {job.workMode}</span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold"><DollarSign size={14} className="text-emerald-500" /> ${(job.salary.min / 1000).toFixed(0)}k - ${(job.salary.max / 1000).toFixed(0)}k</span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg"><Clock size={14} className="text-slate-400" /> Today</span>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <button 
                    onClick={() => handleApply(job._id)}
                    disabled={isApplied}
                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${isApplied ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'}`}
                  >
                    {isApplied ? 'Applied' : 'Apply Now'}
                  </button>
                  <button 
                    onClick={() => handleUnsave(job._id)}
                    className="px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-bold transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700">
              <Bookmark size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No saved jobs</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">You haven't saved any jobs yet. Keep browsing to find your perfect match and save them for later!</p>
            <Link to="/candidate/jobs" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md inline-block">
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSavedJobs;
