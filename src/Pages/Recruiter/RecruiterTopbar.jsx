import React, { useState } from 'react';
import { Menu, Search, Bell, Moon, Sun, Bot, Plus, ChevronDown, X, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RecruiterTopbar = ({ setIsMobileOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  const ALL_NOTIFICATIONS = [
    { id: 1, type: 'application', title: 'New Application', text: 'Alex Thompson applied for Senior React Developer.', time: '10 min ago', unread: true },
    { id: 2, type: 'interview', title: 'Interview Accepted', text: 'Sarah Chen accepted the technical interview invite.', time: '1 hour ago', unread: true },
    { id: 3, type: 'system', title: 'Job Post Expiring', text: 'Your post for "UI/UX Designer" expires in 2 days.', time: 'Yesterday', unread: false },
    { id: 4, type: 'billing', title: 'Invoice Generated', text: 'Your monthly statement for October is ready.', time: '2 days ago', unread: false },
    { id: 5, type: 'application', title: 'Application Withdrawn', text: 'Michael Scott withdrew his application.', time: '3 days ago', unread: false },
    { id: 6, type: 'interview', title: 'Feedback Submitted', text: 'David Kim submitted interview feedback.', time: 'Last week', unread: false },
  ];

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-2 md:gap-4">

        {/* Mobile Menu Toggle (Kept for small screens if needed later, but standard logo for desktop) */}
        <div className="flex items-center gap-3 mr-4 cursor-pointer" onClick={() => navigate('/recruiter')}>
          <img src="/logo.png" alt="HireNext" className="w-8 h-8 shrink-0 rounded-lg shadow-sm" />
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white truncate hidden sm:block">
            HireNext
          </span>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex relative group max-w-md w-96">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search candidates, jobs, or interviews..." 
            className="w-full bg-slate-100 dark:bg-slate-800 border-none text-sm text-slate-900 dark:text-white rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-[10px] font-medium text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded shadow-sm border border-slate-200 dark:border-slate-600">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-none overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md">2 New</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div 
                    onClick={() => { setShowNotifications(false); navigate('/recruiter/applications'); }}
                    className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors relative"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">New Application</p>
                    <p className="text-xs text-slate-500 line-clamp-2">Alex Thompson applied for Senior React Developer.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">10 min ago</p>
                  </div>
                  <div 
                    onClick={() => { setShowNotifications(false); navigate('/recruiter/interviews'); }}
                    className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors relative"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Interview Accepted</p>
                    <p className="text-xs text-slate-500 line-clamp-2">Sarah Chen accepted the technical interview invite.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">1 hour ago</p>
                  </div>
                  <div 
                    onClick={() => { setShowNotifications(false); navigate('/recruiter/manage-jobs'); }}
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Job Post Expiring</p>
                    <p className="text-xs text-slate-500 line-clamp-2">Your post for 'UI/UX Designer' expires in 2 days.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Yesterday</p>
                  </div>
                </div>
                <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button 
                    onClick={() => { setShowNotifications(false); setShowNotificationCenter(true); }}
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    View All Notifications
                  </button>
                </div>
              </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 pr-2 rounded-full transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
              alt="Recruiter" 
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Sarah Jenkins</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">TechFlow Inc.</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block ml-1" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">Sarah Jenkins</p>
                    <p className="text-sm text-slate-500 truncate">sarah.j@techflow.com</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => {navigate('/recruiter/company'); setShowProfileMenu(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">Company Profile</button>
                    <button onClick={() => {navigate('/recruiter/settings'); setShowProfileMenu(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">Settings</button>
                    <button onClick={() => {navigate('/recruiter/billing'); setShowProfileMenu(false);}} className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">Billing & Plan</button>
                  </div>
                  <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={() => { setShowProfileMenu(false); navigate('/'); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium">Log out</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notification Center Slide-over Modal */}
      <AnimatePresence>
        {showNotificationCenter && (
          <>
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50" onClick={() => setShowNotificationCenter(false)}></div>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="text-blue-600" size={24} /> Notification Center
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">Stay updated with your recruiting pipeline</p>
                </div>
                <button onClick={() => setShowNotificationCenter(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
                {ALL_NOTIFICATIONS.map((notif) => (
                  <div key={notif.id} className={`p-4 rounded-xl border bg-white dark:bg-slate-900 transition-colors relative overflow-hidden ${notif.unread ? 'border-blue-200 dark:border-blue-800 shadow-sm' : 'border-slate-200 dark:border-slate-800'}`}>
                    {notif.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className={`text-sm font-bold ${notif.unread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'} mb-1`}>{notif.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-2">{notif.text}</p>
                      </div>
                      {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <Calendar size={12} /> {notif.time}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} /> Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default RecruiterTopbar;
