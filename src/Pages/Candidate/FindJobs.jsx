import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api';
import { 
  Search, Filter, MapPin, Briefcase, DollarSign, Star, 
  CheckCircle, Clock, ChevronLeft, ChevronRight, Zap, Bookmark, Sparkles, X, Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Debounce Hook for optimal searching
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const JobCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 animate-pulse w-full">
    <div className="flex gap-4 items-start">
      <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

const FilterPill = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap ${
      active 
        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' 
        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
    }`}
  >
    {label}
  </button>
);

const JobDetailsPane = ({ job, isApplied, isSaved, onApply, onSave, isMobile, onClose }) => {
  if (!job) return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-8 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 m-4">
      <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-6">
        <Briefcase size={32} className="text-slate-300 dark:text-slate-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Select a job to see details</h3>
      <p className="text-slate-500 dark:text-slate-500 max-w-sm">Click on any job card from the list on the left to view the full description and apply.</p>
    </div>
  );

  const content = (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 shadow-xl overflow-hidden relative">
      {isMobile && (
        <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center z-20">
          <h2 className="font-bold text-slate-900 dark:text-white">Job Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 lg:p-10 no-scrollbar relative">
        {/* Dynamic header background */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-50 pointer-events-none -z-10"></div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
          <div className="w-24 h-24 bg-white border border-slate-200 dark:border-slate-700 rounded-3xl p-4 shadow-sm flex items-center justify-center shrink-0">
            <img src={job.company.logo} alt={job.company.name} className="max-w-full max-h-full object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-3">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><Building size={16}/> {job.company.name}</span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
              <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md"><Star size={14} className="fill-amber-500" /> {job.company.rating}</span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
              <span className="flex items-center gap-1.5"><MapPin size={16}/> {job.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-slate-500 mb-1.5">
              <DollarSign size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Salary</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">${(job.salary.min / 1000).toFixed(0)}k - ${(job.salary.max / 1000).toFixed(0)}k</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-slate-500 mb-1.5">
              <Briefcase size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Job Type</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">{job.jobType}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-slate-500 mb-1.5">
              <Clock size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Work Mode</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">{job.workMode}</p>
          </div>
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-indigo-500 mb-1.5">
              <Sparkles size={16} /> <span className="text-xs font-bold uppercase tracking-wider">AI Match</span>
            </div>
            <p className="font-bold text-indigo-700 dark:text-indigo-400">{job.aiMatchScore}% Match</p>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Role</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] whitespace-pre-wrap">
              {job.description}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2.5">
              {job.skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Benefits & Perks</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {job.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="h-10"></div> {/* Bottom padding for scroll */}
      </div>
      
      {/* Action Footer */}
      <div className="shrink-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-5 lg:p-6 flex gap-4 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onApply(job._id)}
          disabled={isApplied}
          className={`flex-1 py-3.5 rounded-2xl font-bold text-[15px] transition-all text-center shadow-lg flex items-center justify-center gap-2 ${
            isApplied 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-none pointer-events-none'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:scale-[1.02]'
          }`}
        >
          {isApplied ? <><CheckCircle size={18}/> Application Submitted</> : (job.isEasyApply ? <><Zap size={18}/> Easy Apply Now</> : 'Apply on Company Site')}
        </button>
        <button 
          onClick={() => onSave(job._id)}
          className={`w-14 shrink-0 rounded-2xl transition-all border flex items-center justify-center hover:scale-105 ${
            isSaved 
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
              : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Bookmark size={22} className={isSaved ? "fill-blue-600 dark:fill-blue-400" : ""} />
        </button>
      </div>
    </div>
  );

  // If mobile, render as fixed modal, else render as embedded pane
  if (isMobile) {
    return (
      <motion.div 
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-white dark:bg-slate-900"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="h-full w-full bg-white dark:bg-slate-900 lg:rounded-3xl border-l lg:border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden m-0 lg:m-4 lg:ml-0">
      {content}
    </div>
  );
};


const FindJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    workMode: '',
    page: 1,
  });

  const [appliedJobs, setAppliedJobs] = useState(() => JSON.parse(localStorage.getItem('appliedJobs')) || []);
  const [savedJobs, setSavedJobs] = useState(() => JSON.parse(localStorage.getItem('savedJobs')) || []);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const searchInputRef = useRef(null);

  // Hardcoded mock suggestions for predictive search
  const popularSearches = ["Software Engineer", "Frontend Developer", "Backend Developer", "Product Manager", "UX Designer", "Data Scientist", "React", "Node.js", "Python"];
  const suggestions = searchTerm 
    ? popularSearches.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : popularSearches.slice(0, 5);

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = (jobId) => {
    setTimeout(() => {
      setAppliedJobs(prev => [...prev, jobId]);
      toast.success('Successfully applied for this position!');
    }, 800);
  };

  const toggleSave = (jobId) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        toast.success('Job removed from saved list');
        return prev.filter(id => id !== jobId);
      } else {
        toast.success('Job saved successfully!');
        return [...prev, jobId];
      }
    });
  };

  // Fetch Jobs via React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', debouncedSearch, locationInput, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: filters.page,
        limit: 15,
        sortBy: 'recent'
      });
      
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (locationInput) params.append('search', locationInput); // Backend handles general search
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
      if (filters.workMode) params.append('workMode', filters.workMode);

      const response = await api.get(`/jobs?${params.toString()}`);
      
      // Auto-select first job if none selected and jobs exist
      if (response.data?.data?.length > 0 && !selectedJob && window.innerWidth >= 1024) {
        setSelectedJob(response.data.data[0]);
      }
      
      return response.data;
    }
  });

  const getTimeAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? '' : value,
      page: 1
    }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Top Search Bar & Filters */}
      <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-20 shadow-sm relative">
        <div className="max-w-[1600px] mx-auto px-4 py-4 lg:py-5">
          
          {/* Real-time Google-Style Search */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative" ref={searchInputRef}>
              <div className="flex items-center bg-slate-100/70 dark:bg-slate-800/50 rounded-2xl px-4 py-3.5 border border-slate-200/50 dark:border-slate-700/50 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:shadow-md transition-all shadow-sm">
                <Search className="text-blue-600 dark:text-blue-400 mr-3 shrink-0" size={22} />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="bg-transparent w-full focus:outline-none text-slate-800 dark:text-slate-200 font-medium text-[15px]"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                )}
              </div>
              
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden py-2"
                  >
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Searches</div>
                    {suggestions.map(s => (
                      <div 
                        key={s} 
                        onClick={() => { setSearchTerm(s); setShowSuggestions(false); }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <Search size={16} className="text-slate-400" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{s}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="md:w-72 flex items-center bg-slate-100/70 dark:bg-slate-800/50 rounded-2xl px-4 py-3.5 border border-slate-200/50 dark:border-slate-700/50 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:shadow-md transition-all shadow-sm">
              <MapPin className="text-slate-400 mr-3 shrink-0" size={22} />
              <input 
                type="text" 
                placeholder="City, state, or Remote" 
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="bg-transparent w-full focus:outline-none text-slate-800 dark:text-slate-200 font-medium text-[15px]"
              />
            </div>
          </div>

          {/* Quick Filters Pill Strip */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2 mr-2 shrink-0 border-r border-slate-200 dark:border-slate-700 pr-4">
              <Filter size={16} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Quick Filters</span>
            </div>
            
            <FilterPill label="Remote" active={filters.workMode === 'Remote'} onClick={() => toggleFilter('workMode', 'Remote')} />
            <FilterPill label="Full-time" active={filters.jobType === 'Full-time'} onClick={() => toggleFilter('jobType', 'Full-time')} />
            <FilterPill label="Entry Level" active={filters.experienceLevel === 'Entry Level'} onClick={() => toggleFilter('experienceLevel', 'Entry Level')} />
            <FilterPill label="Senior Level" active={filters.experienceLevel === 'Senior Level'} onClick={() => toggleFilter('experienceLevel', 'Senior Level')} />
            
            {(filters.workMode || filters.jobType || filters.experienceLevel) && (
              <button 
                onClick={() => setFilters({ jobType: '', experienceLevel: '', workMode: '', page: 1 })}
                className="shrink-0 text-sm font-bold text-rose-500 hover:text-rose-600 px-2"
              >
                Clear Filters
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Split Content Area */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex overflow-hidden relative">
        
        {/* Left List Pane */}
        <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto no-scrollbar p-4 lg:p-4 bg-slate-50 dark:bg-slate-950 flex flex-col gap-4 relative">
          
          <div className="flex justify-between items-center px-1 mb-2">
            <p className="text-sm font-semibold text-slate-500">
              {isLoading ? 'Searching jobs...' : `Showing ${data?.total || 0} real-time results`}
            </p>
          </div>

          {isLoading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <JobCardSkeleton key={i} />)}
            </div>
          )}

          {!isLoading && !isError && data?.data?.length === 0 && (
            <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mt-4">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={32} />
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">No jobs found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your search terms or clearing filters.</p>
            </div>
          )}

          {isError && (
            <div className="text-center p-12 bg-rose-50 dark:bg-rose-900/20 rounded-3xl border border-rose-200 dark:border-rose-800/30 shadow-sm mt-4">
              <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
                <X size={32} />
              </div>
              <h3 className="font-bold text-xl text-rose-800 dark:text-rose-200 mb-2">Failed to load jobs</h3>
              <p className="text-rose-600 dark:text-rose-400 text-sm">There was a network error communicating with the backend API.</p>
            </div>
          )}

          {!isLoading && !isError && data?.data?.length > 0 && (
            <div className="space-y-3 pb-20 lg:pb-10">
              {data.data.map(job => {
                const isSelected = selectedJob?._id === job._id;
                const isSaved = savedJobs.includes(job._id);

                return (
                  <div 
                    key={job._id} 
                    onClick={() => setSelectedJob(job)}
                    className={`bg-white dark:bg-slate-900 rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer relative shadow-sm group ${
                      isSelected 
                        ? 'border-blue-500 ring-1 ring-blue-500/50 shadow-md scale-[1.01]' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-600 hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 p-2 shrink-0 flex items-center justify-center shadow-sm">
                        <img src={job.company.logo} alt={job.company.name} className="max-w-full max-h-full object-contain" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-base leading-tight truncate mb-1 transition-colors ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white group-hover:text-blue-600'}`}>
                          {job.title}
                        </h3>
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 truncate">
                          {job.company.name} <span className="text-slate-300 font-normal mx-1">•</span> {job.location}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                            {job.workMode}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                            ${(job.salary.min/1000).toFixed(0)}k+
                          </span>
                          {job.hiringUrgency === 'Urgent' && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-rose-50 text-rose-600 text-[11px] font-bold border border-rose-100">
                              <Zap size={10} /> Urgent
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                          <span className="text-xs font-semibold text-slate-400">{getTimeAgo(job.postedAt)}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Sparkles size={10}/> {job.aiMatchScore}% Match
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleSave(job._id); }}
                              className="text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              <Bookmark size={16} className={isSaved ? "fill-blue-600 text-blue-600" : ""} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Detail Pane (Hidden on mobile, slides up as modal if selected on mobile) */}
        <div className="hidden lg:block lg:w-[55%] xl:w-[60%] h-full relative z-10 bg-slate-50 dark:bg-slate-950">
          <JobDetailsPane 
            job={selectedJob} 
            isApplied={selectedJob ? appliedJobs.includes(selectedJob._id) : false}
            isSaved={selectedJob ? savedJobs.includes(selectedJob._id) : false}
            onApply={handleApply}
            onSave={toggleSave}
            isMobile={false}
          />
        </div>

        {/* Mobile Modal Pane */}
        <div className="lg:hidden">
          <AnimatePresence>
            {selectedJob && (
              <JobDetailsPane 
                job={selectedJob} 
                isApplied={appliedJobs.includes(selectedJob._id)}
                isSaved={savedJobs.includes(selectedJob._id)}
                onApply={handleApply}
                onSave={toggleSave}
                isMobile={true}
                onClose={() => setSelectedJob(null)}
              />
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default FindJobs;
