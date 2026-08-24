import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, Briefcase, FileText, 
  Users, Search, Users2, Star, Calendar, Bot, 
  MessageSquare, BarChart3, UsersRound, 
  CreditCard, FolderOpen, Settings, HelpCircle,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { group: 'Overview', items: [
    { name: 'Dashboard', path: '/recruiter', icon: LayoutDashboard },
    { name: 'Company', path: '/recruiter/company', icon: Building2 },
  ]},
  { group: 'Jobs', items: [
    { name: 'Post Job', path: '/recruiter/post-job', icon: Briefcase },
    { name: 'Manage', path: '/recruiter/manage-jobs', icon: FileText },
    { name: 'Applications', path: '/recruiter/applications', icon: Users },
  ]},
  { group: 'Talent', items: [
    { name: 'Search', path: '/recruiter/search', icon: Search },
    { name: 'Pool', path: '/recruiter/talent-pool', icon: Users2 },
    { name: 'Shortlisted', path: '/recruiter/shortlisted', icon: Star },
  ]},
  { group: 'Interviews', items: [
    { name: 'Interviews', path: '/recruiter/interviews', icon: Calendar },
    { name: 'AI Assistant', path: '/recruiter/ai-assistant', icon: Bot },
    { name: 'Messages', path: '/recruiter/messages', icon: MessageSquare },
  ]},
  { group: 'Admin', items: [
    { name: 'Reports', path: '/recruiter/reports', icon: BarChart3 },
    { name: 'Team', path: '/recruiter/team', icon: UsersRound },
    { name: 'Billing', path: '/recruiter/billing', icon: CreditCard },
    { name: 'Docs', path: '/recruiter/documents', icon: FolderOpen },
  ]},
  { group: 'System', items: [
    { name: 'Settings', path: '/recruiter/settings', icon: Settings },
    { name: 'Help', path: '/recruiter/support', icon: HelpCircle },
  ]}
];

const RecruiterNavbar = () => {
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState('Overview');
  const [hoveredGroup, setHoveredGroup] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const foundGroup = navItems.find(group => 
      group.items.some(item => 
        (item.path === '/recruiter' && currentPath === '/recruiter') || 
        (item.path !== '/recruiter' && currentPath.startsWith(item.path))
      )
    );
    if (foundGroup) {
      setActiveGroup(foundGroup.group);
    }
  }, [location.pathname]);

  const activeGroupData = navItems.find(g => g.group === activeGroup);

  return (
    <div className="sticky top-6 z-40 w-full pt-2 pb-2 px-4 pointer-events-none">
      <nav className="max-w-3xl mx-auto bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg rounded-full relative pointer-events-auto flex items-center justify-center p-1.5 gap-1">
        {navItems.map((navGroup) => {
          const isHovered = hoveredGroup === navGroup.group;
          const isActive = activeGroup === navGroup.group;
          
          return (
            <div 
              key={navGroup.group}
              className="relative"
              onMouseEnter={() => setHoveredGroup(navGroup.group)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <button 
                onClick={() => setActiveGroup(navGroup.group)}
                className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-full transition-all duration-300
                  ${isActive || isHovered 
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/20 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {navGroup.group}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isHovered ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-2 overflow-hidden"
                  >
                    <div className="flex flex-col gap-0.5">
                      {navGroup.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.path === '/recruiter'}
                          onClick={() => setHoveredGroup(null)}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200
                            ${isActive 
                              ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'}
                          `}
                        >
                          <div className={`p-1.5 rounded-lg transition-colors ${window.location.pathname === item.path ? 'bg-blue-100 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                            <item.icon size={14} />
                          </div>
                          <span>{item.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default RecruiterNavbar;
