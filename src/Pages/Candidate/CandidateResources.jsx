import { useState, useEffect, useRef } from 'react';
import { BookOpen, Video, FileText, ChevronRight, PlayCircle, X, Search, Filter, Clock, TrendingUp, ChevronDown, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const allResources = [
  { id: 1, title: 'The Ultimate Guide to System Design Interviews', type: 'Article', readTime: '15 min', category: 'Interview Preparation', icon: FileText, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800', progress: 45, trending: true, difficulty: 'Advanced', skills: ['System Design', 'Architecture'], date: '2024-01-15' },
  { id: 2, title: 'Top 50 React Interview Questions 2024', type: 'Video', readTime: '45 min', category: 'Interview Preparation', icon: Video, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800', progress: 0, trending: true, difficulty: 'Intermediate', skills: ['React', 'JavaScript'], date: '2024-02-01' },
  { id: 3, title: 'Behavioral Interviews: The STAR Method', type: 'Course', readTime: '90 min', category: 'Interview Preparation', icon: BookOpen, image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800', progress: 100, trending: false, difficulty: 'Beginner', skills: ['Soft Skills', 'Communication'], date: '2023-11-20' },
  { id: 4, title: 'How to write an ATS-friendly resume', type: 'Article', readTime: '8 min', category: 'Resume & Profile', icon: FileText, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800', progress: 20, trending: false, difficulty: 'Beginner', skills: ['Resume', 'ATS'], date: '2024-01-10' },
  { id: 5, title: 'Optimizing your LinkedIn for Recruiters', type: 'Video', readTime: '20 min', category: 'Resume & Profile', icon: Video, image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800', progress: 0, trending: true, difficulty: 'Intermediate', skills: ['LinkedIn', 'Networking'], date: '2024-02-15' },
  { id: 6, title: 'Knowing your worth in 2024', type: 'Article', readTime: '10 min', category: 'Salary Negotiation', icon: FileText, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', progress: 0, trending: false, difficulty: 'Advanced', skills: ['Negotiation', 'Career'], date: '2023-12-05' },
  { id: 7, title: 'Negotiation Scripts that actually work', type: 'Guide', readTime: '12 min', category: 'Salary Negotiation', icon: BookOpen, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', progress: 0, trending: false, difficulty: 'Intermediate', skills: ['Negotiation', 'Communication'], date: '2024-01-22' },
];

const FILTER_OPTIONS = {
  categories: ['All Categories', 'Interview Preparation', 'Resume & Profile', 'Salary Negotiation'],
  types: ['All Types', 'Article', 'Video', 'Course', 'Guide'],
  skills: ['All Skills', 'React', 'JavaScript', 'System Design', 'Architecture', 'Soft Skills', 'Communication', 'Resume', 'ATS', 'LinkedIn', 'Networking', 'Negotiation', 'Career'],
  difficulties: ['All Levels', 'Beginner', 'Intermediate', 'Advanced'],
  sorts: ['Latest', 'Most Popular', 'Shortest First', 'Longest First']
};

// Custom hook for click outside
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Custom Dropdown Component to avoid clipping
const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative inline-block text-left w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 dark:border-slate-800'} hover:border-blue-400 dark:hover:border-blue-600 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all shadow-sm`}
      >
        <span className="truncate max-w-[120px]">{value.startsWith('All') ? label : value}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-56 max-h-64 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100]"
          >
            <div className="p-1.5">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                    value === option 
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {value === option && <Check size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CandidateResources = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [category, setCategory] = useState('All Categories');
  const [type, setType] = useState('All Types');
  const [skill, setSkill] = useState('All Skills');
  const [difficulty, setDifficulty] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Latest');
  
  // Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleResourceClick = (item) => {
    toast.success(`Opening resource: ${item.title || item}`, { icon: '📚' });
    if (typeof item === 'string') {
      setSelectedResource({ title: item, type: 'Course', readTime: '2.5 hrs', icon: PlayCircle });
    } else {
      setSelectedResource(item);
    }
  };

  const clearFilters = () => {
    setCategory('All Categories');
    setType('All Types');
    setSkill('All Skills');
    setDifficulty('All Levels');
    setSearchQuery('');
  };

  const activeFiltersCount = [
    category !== 'All Categories',
    type !== 'All Types',
    skill !== 'All Skills',
    difficulty !== 'All Levels',
    searchQuery !== ''
  ].filter(Boolean).length;

  // Filter and Sort Logic
  const filteredResources = allResources.filter(res => {
    const matchesCategory = category === 'All Categories' || res.category === category;
    const matchesType = type === 'All Types' || res.type === type;
    const matchesSkill = skill === 'All Skills' || res.skills.includes(skill);
    const matchesDifficulty = difficulty === 'All Levels' || res.difficulty === difficulty;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesType && matchesSkill && matchesDifficulty && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Latest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'Most Popular') return b.progress - a.progress; // Mock logic
    if (sortBy === 'Shortest First') return parseInt(a.readTime) - parseInt(b.readTime);
    if (sortBy === 'Longest First') return parseInt(b.readTime) - parseInt(a.readTime);
    return 0;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative max-w-7xl mx-auto pb-20">
      
      {/* Header Section without overflow-hidden so dropdowns can escape! */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 relative shadow-sm">
        {/* Background decorations - keep absolute but ensure they don't break z-index */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Accelerate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Career Growth</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
            Access our premium library of expert-led courses, interview guides, and salary negotiation tactics.
          </p>
          
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10" size={22} />
            <input 
              type="text" 
              placeholder="Search resources, topics, or skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-14 pr-6 py-4.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm font-medium text-lg"
            />
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Desktop) */}
      <div className="hidden lg:flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative z-40">
        <div className="flex items-center gap-2 mr-2 text-slate-500 font-bold text-sm">
          <Filter size={16} /> Filters
        </div>
        
        <FilterDropdown label="Category" options={FILTER_OPTIONS.categories} value={category} onChange={setCategory} />
        <FilterDropdown label="Type" options={FILTER_OPTIONS.types} value={type} onChange={setType} />
        <FilterDropdown label="Skill" options={FILTER_OPTIONS.skills} value={skill} onChange={setSkill} />
        <FilterDropdown label="Difficulty" options={FILTER_OPTIONS.difficulties} value={difficulty} onChange={setDifficulty} />
        
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2"></div>
        
        <FilterDropdown label="Sort By" options={FILTER_OPTIONS.sorts} value={sortBy} onChange={setSortBy} />
        
        {activeFiltersCount > 0 && (
          <button 
            onClick={clearFilters}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            <RotateCcw size={14} /> Clear
          </button>
        )}
      </div>

      {/* Filter Toolbar (Mobile/Tablet) */}
      <div className="lg:hidden flex items-center gap-3 relative z-40">
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-white font-bold shadow-sm"
        >
          <SlidersHorizontal size={18} /> Filters {activeFiltersCount > 0 && <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{activeFiltersCount}</span>}
        </button>
        <div className="w-1/2">
          <FilterDropdown label="Sort By" options={FILTER_OPTIONS.sorts} value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Active Filters:</span>
          
          {category !== 'All Categories' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
              Category: {category} <button onClick={() => setCategory('All Categories')} className="hover:text-blue-900 dark:hover:text-white p-0.5 bg-white/50 dark:bg-slate-900/50 rounded-md"><X size={12} /></button>
            </span>
          )}
          {type !== 'All Types' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors">
              Type: {type} <button onClick={() => setType('All Types')} className="hover:text-purple-900 dark:hover:text-white p-0.5 bg-white/50 dark:bg-slate-900/50 rounded-md"><X size={12} /></button>
            </span>
          )}
          {skill !== 'All Skills' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-colors">
              Skill: {skill} <button onClick={() => setSkill('All Skills')} className="hover:text-emerald-900 dark:hover:text-white p-0.5 bg-white/50 dark:bg-slate-900/50 rounded-md"><X size={12} /></button>
            </span>
          )}
          {difficulty !== 'All Levels' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-semibold hover:bg-amber-100 transition-colors">
              Level: {difficulty} <button onClick={() => setDifficulty('All Levels')} className="hover:text-amber-900 dark:hover:text-white p-0.5 bg-white/50 dark:bg-slate-900/50 rounded-md"><X size={12} /></button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
              Search: "{searchQuery}" <button onClick={() => setSearchQuery('')} className="hover:text-slate-900 dark:hover:text-white p-0.5 bg-white/50 dark:bg-slate-900/50 rounded-md"><X size={12} /></button>
            </span>
          )}
        </div>
      )}

      {/* Resources Grid (z-index lower than toolbar) */}
      <div className="relative z-0">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={item.id}
                onClick={() => handleResourceClick(item)}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
              >
                {/* Image Cover */}
                <div className="h-48 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <item.icon size={14} className="text-blue-600" /> {item.type}
                    </span>
                    {item.trending && (
                      <span className="bg-rose-500/95 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                        <TrendingUp size={14} /> Trending
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                      item.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                      item.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' :
                      'bg-rose-50 text-rose-600 dark:bg-rose-500/10'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.skills.map(s => (
                      <span key={s} className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold rounded-md border border-slate-100 dark:border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto space-y-4">
                    {/* Progress Bar */}
                    <div className={`space-y-1.5 ${item.progress === 0 ? 'opacity-40' : ''}`}>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-slate-500">Progress</span>
                        <span className={item.progress === 100 ? "text-emerald-500" : "text-blue-600"}>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${item.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1.5"><Clock size={16} /> {item.readTime}</span>
                      <span className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors">
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center shadow-sm max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">No resources found</h3>
            <p className="text-slate-500 mb-8">We couldn't find anything matching your current filters. Try adjusting your search criteria or clearing all filters.</p>
            <button 
              onClick={clearFilters}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Resource Modal */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-950 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                    {selectedResource.icon ? <selectedResource.icon size={24} /> : <BookOpen size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white leading-tight">{selectedResource.title}</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-1">{selectedResource.type} • {selectedResource.readTime}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedResource(null)} 
                  className="p-2.5 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-white rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
                <div className="w-full aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden group shadow-xl">
                  {selectedResource.image ? (
                    <>
                      <img src={selectedResource.image} alt={selectedResource.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 bg-slate-900/40"></div>
                    </>
                  ) : null}
                  <PlayCircle size={64} className="mb-4 text-white relative z-10 group-hover:scale-110 transition-transform cursor-pointer" />
                  <p className="font-bold text-lg relative z-10">Start Learning</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-[120] lg:hidden flex flex-col border-l border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter size={20} className="text-blue-600" /> Filters
                </h2>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Category Drawer Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Category</h3>
                  <div className="flex flex-col gap-2">
                    {FILTER_OPTIONS.categories.map(c => (
                      <button 
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`text-left px-4 py-3 rounded-xl font-semibold transition-colors flex justify-between items-center ${category === c ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        {c} {category === c && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Drawer Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {FILTER_OPTIONS.types.map(t => (
                      <button 
                        key={t}
                        onClick={() => setType(t)}
                        className={`text-center px-4 py-3 rounded-xl font-semibold transition-colors ${type === t ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 border border-purple-200 dark:border-purple-500/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Drawer Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Difficulty</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {FILTER_OPTIONS.difficulties.map(d => (
                      <button 
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`text-center px-4 py-3 rounded-xl font-semibold transition-colors ${difficulty === d ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border border-amber-200 dark:border-amber-500/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Skill Drawer Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.skills.map(s => (
                      <button 
                        key={s}
                        onClick={() => setSkill(s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${skill === s ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-500/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex gap-4 bg-white dark:bg-slate-900">
                <button 
                  onClick={clearFilters}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold transition-colors"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CandidateResources;
