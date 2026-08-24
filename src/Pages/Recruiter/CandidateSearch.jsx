import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Briefcase, Star, Sparkles, ChevronDown, Check, X, Shield, Lock, MessageSquare, ExternalLink, Zap, BrainCircuit, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CandidateProfileModal from '../../components/CandidateProfileModal';

const mockCandidates = [
  { id: 1, name: 'Alex Thompson', role: 'Senior React Developer', location: 'San Francisco, CA', experience: '6 Years', experienceLevel: 'Senior (5-8 Yrs)', workModel: 'Hybrid', status: 'Actively Looking', matchScore: 98, skills: ['React', 'Node.js', 'TypeScript', 'AWS'], currentCompany: 'TechVision Inc', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sarah Chen', role: 'Full Stack Engineer', location: 'Remote (New York)', experience: '4 Years', experienceLevel: 'Mid Level (3-5 Yrs)', workModel: 'Remote', status: 'Open to Offers', matchScore: 92, skills: ['Vue.js', 'Python', 'Django', 'Docker'], currentCompany: 'StartupHub', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Michael Rodriguez', role: 'Frontend Architect', location: 'Austin, TX', experience: '8 Years', experienceLevel: 'Director (8+ Yrs)', workModel: 'On-Site', status: 'Not Looking', matchScore: 89, skills: ['React', 'Next.js', 'GraphQL', 'Tailwind'], currentCompany: 'Enterprise Web', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Emily Taylor', role: 'UI/UX Developer', location: 'London, UK', experience: '5 Years', experienceLevel: 'Senior (5-8 Yrs)', workModel: 'Remote', status: 'Actively Looking', matchScore: 85, skills: ['React', 'Figma', 'CSS', 'Framer Motion'], currentCompany: 'Design Co', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'David Kim', role: 'Backend Developer', location: 'Seattle, WA', experience: '3 Years', experienceLevel: 'Mid Level (3-5 Yrs)', workModel: 'Hybrid', status: 'Open to Offers', matchScore: 78, skills: ['Node.js', 'Express', 'MongoDB', 'Redis'], currentCompany: 'DataFlow', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Jessica Patel', role: 'Software Engineer II', location: 'Chicago, IL', experience: '2 Years', experienceLevel: 'Entry Level (0-2 Yrs)', workModel: 'On-Site', status: 'Actively Looking', matchScore: 72, skills: ['React', 'JavaScript', 'HTML/CSS', 'Git'], currentCompany: 'WebSolutions', avatar: 'https://i.pravatar.cc/150?u=6' },
];

const CandidateSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [candidatesList, setCandidatesList] = useState(mockCandidates);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [sortBy, setSortBy] = useState('Best Match');
  const [savedCandidates, setSavedCandidates] = useState([]);

  const toggleFilter = (filter) => {
    setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  const filteredCandidates = useMemo(() => {
    return candidatesList.filter(c => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        c.name.toLowerCase().includes(searchLower) || 
        c.role.toLowerCase().includes(searchLower) || 
        c.skills.some(s => s.toLowerCase().includes(searchLower)) ||
        c.workModel.toLowerCase().includes(searchLower) ||
        c.status.toLowerCase().includes(searchLower) ||
        c.experienceLevel.toLowerCase().includes(searchLower);
        
      const matchesFilters = activeFilters.length === 0 || activeFilters.some(filter => 
        c.experienceLevel === filter || c.workModel === filter || c.status === filter
      );

      return matchesSearch && matchesFilters;
    });

    if (sortBy === 'Best Match') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'Most Recent') {
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'Experience') {
      result.sort((a, b) => parseInt(b.experience || '0') - parseInt(a.experience || '0'));
    }

    return result;
  }, [searchTerm, activeFilters, candidatesList, sortBy]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const more = [
        { id: Date.now(), name: 'James Wilson', role: 'Full Stack Engineer', location: 'Remote', experience: '5 Years', experienceLevel: 'Mid Level (3-5 Yrs)', workModel: 'Remote', status: 'Actively Looking', matchScore: 88, skills: ['React', 'Node.js', 'PostgreSQL'], currentCompany: 'FinTech Corp', avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: Date.now()+1, name: 'Anna Lee', role: 'UX Designer', location: 'San Francisco, CA', experience: '7 Years', experienceLevel: 'Senior (5-8 Yrs)', workModel: 'Hybrid', status: 'Open to Offers', matchScore: 82, skills: ['Figma', 'UI/UX', 'Wireframing'], currentCompany: 'Creative Agency', avatar: 'https://i.pravatar.cc/150?u=8' },
        { id: Date.now()+2, name: 'Robert Fox', role: 'DevOps Engineer', location: 'Austin, TX', experience: '4 Years', experienceLevel: 'Mid Level (3-5 Yrs)', workModel: 'On-Site', status: 'Actively Looking', matchScore: 75, skills: ['AWS', 'Docker', 'Kubernetes'], currentCompany: 'Cloud Systems', avatar: 'https://i.pravatar.cc/150?u=9' }
      ];
      setCandidatesList(prev => [...prev, ...more]);
      setIsLoadingMore(false);
      toast.success('Successfully loaded more candidates!');
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">

      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">

        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl mb-6">
            <BrainCircuit size={28} className="text-blue-500" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4 drop-shadow-md">
            AI Talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Discovery</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Search our global network of millions of candidates. Our AI instantly surfaces the perfect match for your open roles.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto mb-16 relative z-30">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-full p-2.5 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-blue-900/10 flex flex-col md:flex-row items-center gap-2">

            <div className="flex-1 flex items-center gap-3 px-4 w-full border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-2 md:pb-0">
              <Search className="text-blue-500 shrink-0" size={24} />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white font-medium placeholder-slate-400 py-3"
              />
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 w-full">
              <MapPin className="text-slate-400 shrink-0" size={24} />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white font-medium placeholder-slate-400 py-3"
              />
            </div>

            <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-black shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-2">
              <Sparkles size={18} /> Find Talent
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="text-sm font-bold text-slate-500 mr-2">Suggested:</span>
            {['React Developer', 'Remote', 'Frontend', 'Not Looking', 'Available'].map(tag => (
              <button 
                key={tag} 
                onClick={() => setSearchTerm(tag)}
                className="px-4 py-1.5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex flex-col xl:flex-row gap-8">

          {/* Advanced Filters Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="w-full xl:w-80 shrink-0">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter size={20} className="text-blue-500" /> Filters
                </h3>
                <button onClick={() => setActiveFilters([])} className="text-xs font-bold text-blue-500 hover:text-blue-600">Clear All</button>
              </div>

              <div className="space-y-8">
                {/* AI Match Score Slider */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={14} className="text-purple-500" /> AI Match Score
                  </h4>
                  <div className="px-2">
                    <input type="range" min="50" max="100" defaultValue="80" className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer" />
                    <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                      <span>50%</span>
                      <span className="text-purple-500">80%+ Match</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Checkbox Filters */}
                {Object.entries({
                  'Experience Level': ['Entry Level (0-2 Yrs)', 'Mid Level (3-5 Yrs)', 'Senior (5-8 Yrs)', 'Director (8+ Yrs)'],
                  'Work Model': ['Remote', 'Hybrid', 'On-Site'],
                  'Status': ['Actively Looking', 'Open to Offers', 'Not Looking']
                }).map(([category, options]) => (
                  <div key={category}>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">{category}</h4>
                    <div className="space-y-3">
                      {options.map(option => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${activeFilters.includes(option) ? 'bg-blue-600 border-blue-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-blue-400'}`}>
                            {activeFilters.includes(option) && <Check size={12} className="text-white" />}
                          </div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{option}</span>
                          <input type="checkbox" className="hidden" checked={activeFilters.includes(option)} onChange={() => toggleFilter(option)} />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Grid */}
          <div className="flex-1 space-y-6">

            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                <span className="text-blue-600 dark:text-blue-400">{filteredCandidates.length}</span> candidates found
              </h2>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-sm font-bold text-slate-500 border-none outline-none cursor-pointer">
                <option value="Best Match">Sort by: Best Match</option>
                <option value="Most Recent">Sort by: Most Recent</option>
                <option value="Experience">Sort by: Experience</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredCandidates.map((candidate, idx) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-xl hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={candidate.avatar} alt={candidate.name} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                        <div className="absolute -bottom-2 -right-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-1 rounded-lg border border-emerald-200 dark:border-emerald-500/30 backdrop-blur-md" title="Verified Profile">
                          <Shield size={12} className="fill-current" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {candidate.name}
                        </h3>
                        <p className="text-sm font-bold text-slate-500">{candidate.role}</p>
                      </div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50">
                      <span className="text-xs font-black text-purple-600 dark:text-purple-400">{candidate.matchScore}</span>
                      <span className="text-[8px] font-bold text-purple-400 uppercase">Match</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-bold flex items-center gap-1.5"><MapPin size={12} /> {candidate.location}</span>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-bold flex items-center gap-1.5"><Briefcase size={12} /> {candidate.experience}</span>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Top Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 rounded-full text-xs font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedCandidate(candidate); }}
                      className="flex-1 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Lock size={16} /> View Profile
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate('/recruiter/messages', { state: { candidate } }); }}
                      className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl font-bold transition-all active:scale-95"
                      title="Message Candidate"
                    >
                      <MessageSquare size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (savedCandidates.includes(candidate.id)) {
                          setSavedCandidates(prev => prev.filter(id => id !== candidate.id));
                          toast('Removed from Shortlist', { icon: '🗑️' });
                        } else {
                          setSavedCandidates(prev => [...prev, candidate.id]);
                          toast.success('Saved to Shortlist!');
                        }
                      }}
                      className={`px-3 py-2.5 rounded-xl font-bold transition-all active:scale-95 ${savedCandidates.includes(candidate.id) ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:bg-amber-50 dark:hover:bg-amber-900/20'}`}
                      title={savedCandidates.includes(candidate.id) ? "Remove from saved" : "Save Profile"}
                    >
                      <Bookmark size={18} className={savedCandidates.includes(candidate.id) ? 'fill-current' : ''} />
                    </button>
                  </div>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoadingMore && <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>}
                {isLoadingMore ? 'Loading Candidates...' : 'Load More Candidates'}
              </button>
            </div>

          </div>
        </div>
      </div>

      <CandidateProfileModal 
        isOpen={!!selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
        candidate={selectedCandidate} 
      />
    </div>
  );
};

export default CandidateSearch;
