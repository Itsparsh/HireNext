import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, User, CheckCircle, XCircle, MoreVertical, Search, Filter, ChevronLeft, ChevronRight, Play, Link as LinkIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import ScheduleModal from '../../components/ScheduleModal';

const mockInterviews = [
  { id: 1, candidate: 'Alex Thompson', role: 'Senior React Developer', date: '2026-10-28', time: '10:00 AM - 11:00 AM', type: 'Technical Interview', status: 'Upcoming', platform: 'HireNext Meet' },
  { id: 2, candidate: 'Sarah Chen', role: 'Full Stack Engineer', date: '2026-10-28', time: '02:00 PM - 02:45 PM', type: 'HR Screening', status: 'Upcoming', platform: 'Zoom' },
  { id: 3, candidate: 'Michael Rodriguez', role: 'Frontend Architect', date: '2026-10-29', time: '11:30 AM - 12:30 PM', type: 'Final System Design', status: 'Scheduled', platform: 'HireNext Meet' },
  { id: 4, candidate: 'Emily Taylor', role: 'UI/UX Developer', date: '2026-10-27', time: '09:00 AM - 09:30 AM', type: 'Portfolio Review', status: 'Completed', platform: 'Google Meet' },
];

const RecruiterInterviews = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [interviewsList, setInterviewsList] = useState(mockInterviews);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedCandidateForSchedule, setSelectedCandidateForSchedule] = useState(null);
  
  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date('2026-10-01T00:00:00'));
  const [selectedDate, setSelectedDate] = useState(28);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const formatSelectedDateString = () => {
    if (!selectedDate) return null;
    const yyyy = currentMonth.getFullYear();
    const mm = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const filteredInterviews = interviewsList.filter(i => {
    const matchesSearch = i.candidate.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'upcoming' 
      ? (i.status === 'Upcoming' || i.status === 'Scheduled') 
      : i.status.toLowerCase() === activeTab;
    
    const formattedSelection = formatSelectedDateString();
    const matchesDate = formattedSelection ? i.date === formattedSelection : true;

    return matchesSearch && matchesTab && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
      case 'Scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
      case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Upcoming': return 'bg-amber-500 animate-pulse';
      case 'Scheduled': return 'bg-blue-500';
      case 'Completed': return 'bg-emerald-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute -top-40 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <Video size={14} className="text-blue-500" /> AI-Powered Meetings
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Schedule</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Manage your upcoming interviews and review past recordings.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full md:w-auto flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" placeholder="Search candidates or roles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => { setSelectedCandidateForSchedule({name: 'New Candidate'}); setIsScheduleOpen(true); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black transition-all shadow-lg hover:scale-105 active:scale-95 group shrink-0"
            >
              <CalendarIcon size={18} className="group-hover:-rotate-12 transition-transform" /> Schedule New
            </button>
          </motion.div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Calendar Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="w-full xl:w-96 shrink-0 space-y-6">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm sticky top-24">
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors"><ChevronLeft size={20}/></button>
                  <button onClick={nextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors"><ChevronRight size={20}/></button>
                </div>
              </div>

              {/* Mini Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center mb-6">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-[10px] font-black text-slate-400 uppercase tracking-wider py-2">{day}</div>
                ))}
                
                {/* Empty offset days */}
                {Array.from({length: getFirstDayOfMonth(currentMonth)}).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Actual days */}
                {Array.from({length: getDaysInMonth(currentMonth)}).map((_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDate === day;
                  // Look up if any interview is on this day to put a tiny dot indicator
                  const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const hasInterview = interviewsList.some(inv => inv.date === dateString && inv.status !== 'Cancelled');

                  return (
                    <button 
                      key={day} 
                      onClick={() => setSelectedDate(isSelected ? null : day)}
                      className={`py-2 rounded-xl text-sm font-bold transition-all relative ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {day}
                      {hasInterview && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Today's Overview</h4>
                <div className="flex gap-4">
                  <div className="flex-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl p-4 text-center">
                    <span className="block text-2xl font-black text-amber-600 dark:text-amber-400 mb-1">2</span>
                    <span className="text-[10px] font-bold text-amber-700/60 dark:text-amber-400/60 uppercase tracking-wider">Upcoming</span>
                  </div>
                  <div className="flex-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl p-4 text-center">
                    <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-1">1</span>
                    <span className="text-[10px] font-bold text-emerald-700/60 dark:text-emerald-400/60 uppercase tracking-wider">Completed</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 w-max shadow-sm overflow-x-auto max-w-full">
              {['upcoming', 'completed', 'cancelled'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all capitalize whitespace-nowrap ${activeTab === tab ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Interviews List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredInterviews.map((interview, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={interview.id}
                    className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${interview.status === 'Upcoming' ? 'bg-amber-500' : interview.status === 'Scheduled' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>

                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider leading-none mb-1">Oct</span>
                        <span className="text-xl font-black text-blue-700 dark:text-blue-400 leading-none">{interview.date.split('-')[2]}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {interview.candidate}
                          </h3>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${getStatusColor(interview.status)}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(interview.status)}`}></div>
                            {interview.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-500 mb-2">{interview.type} • {interview.role}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-300 dark:text-slate-600"/> {interview.time}</span>
                          <span className="flex items-center gap-1.5"><Video size={14} className="text-slate-300 dark:text-slate-600"/> {interview.platform}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/50 mt-2 md:mt-0 relative">
                      {interview.status === 'Upcoming' || interview.status === 'Scheduled' ? (
                        <>
                          <button 
                            onClick={() => window.open('https://meet.google.com/new', '_blank')}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                          >
                            <Play size={16} className="fill-current" /> Join
                          </button>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(`https://meet.hirenext.ai/int-${interview.id}`);
                              toast.success('Link Copied! (Try pasting it somewhere)', { icon: '🔗' });
                            }} 
                            className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-bold transition-colors" 
                            title="Copy Link"
                          >
                            <LinkIcon size={18} />
                          </button>
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === interview.id ? null : interview.id)}
                            className="p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                          >
                            <MoreVertical size={20} />
                          </button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {openMenuId === interview.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute top-14 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
                              >
                                <button onClick={() => { setSelectedCandidateForSchedule({name: interview.candidate}); setIsScheduleOpen(true); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                  Reschedule
                                </button>
                                <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>
                                <button onClick={() => { 
                                  setInterviewsList(prev => prev.map(i => i.id === interview.id ? {...i, status: 'Cancelled'} : i));
                                  toast('Interview Cancelled', { icon: '🚫' }); 
                                  setOpenMenuId(null); 
                                }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                  Cancel Interview
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <button className="flex-1 md:flex-none px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl font-bold transition-colors">
                          View Details & AI Summary
                        </button>
                      )}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredInterviews.length === 0 && (
                <div className="py-20 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <CalendarIcon size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No {activeTab} interviews</h3>
                  <p className="text-slate-500 font-medium">You have no {activeTab} interviews scheduled at this time.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      <ScheduleModal 
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        candidate={selectedCandidateForSchedule || {name: 'New Candidate'}}
      />
    </div>
  );
};

export default RecruiterInterviews;
