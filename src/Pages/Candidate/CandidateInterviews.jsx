import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, User, CheckCircle, ExternalLink, Filter } from 'lucide-react';

const mockInterviews = [
  {
    id: 1,
    company: 'Stripe',
    logo: 'https://logo.clearbit.com/stripe.com',
    role: 'Senior Frontend Engineer',
    type: 'Technical Interview',
    interviewer: 'Alex M.',
    date: '2023-11-15T14:00:00Z',
    duration: '60 min',
    status: 'upcoming',
    link: 'https://zoom.us/j/123456789'
  },
  {
    id: 2,
    company: 'Notion',
    logo: 'https://logo.clearbit.com/notion.so',
    role: 'Product Marketing Manager',
    type: 'Culture Fit',
    interviewer: 'Sarah K.',
    date: '2023-11-16T10:30:00Z',
    duration: '45 min',
    status: 'upcoming',
    link: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 3,
    company: 'OpenAI',
    logo: 'https://logo.clearbit.com/openai.com',
    role: 'Machine Learning Engineer',
    type: 'Initial Screening',
    interviewer: 'David L.',
    date: '2023-11-10T11:00:00Z',
    duration: '30 min',
    status: 'completed',
    link: null
  }
];

const CandidateInterviews = () => {
  const [filter, setFilter] = useState('upcoming');

  const filteredInterviews = mockInterviews.filter(inv => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Your Interviews</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and prepare for your upcoming scheduled interviews.</p>
        </div>
        
        <div className="flex gap-2">
          {['all', 'upcoming', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                filter === f 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
            <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Upcoming</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockInterviews.filter(i => i.status === 'upcoming').length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={24} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockInterviews.filter(i => i.status === 'completed').length}
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredInterviews.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Calendar size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No interviews found</h3>
            <p className="text-slate-500 dark:text-slate-400">You don't have any {filter !== 'all' ? filter : ''} interviews right now.</p>
          </div>
        ) : (
          filteredInterviews.map((interview, i) => (
            <motion.div 
              key={interview.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 transition-all flex flex-col md:flex-row gap-6 md:items-center"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shrink-0">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{new Date(interview.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{new Date(interview.date).getDate()}</span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${interview.status === 'upcoming' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'}`}>
                    {interview.status}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Video size={14} /> {interview.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{interview.role} at {interview.company}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({interview.duration})</span>
                  <span className="flex items-center gap-1.5"><User size={16} /> with {interview.interviewer}</span>
                </div>
              </div>

              {/* Action */}
              {interview.status === 'upcoming' && (
                <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 text-center">
                  <button 
                    onClick={() => {
                      if (interview.link) {
                        window.open(interview.link, '_blank');
                      } else {
                        import('react-hot-toast').then((toast) => {
                          toast.default.error('Interview link not available yet.');
                        });
                      }
                    }}
                    className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Join Call <ExternalLink size={16} />
                  </button>
                  <p className="text-xs text-slate-400 mt-2">Link opens 5 min before</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidateInterviews;
