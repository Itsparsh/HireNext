import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Search, Briefcase, Bookmark, 
  Settings, FileText, BrainCircuit, User, Users,
  Bell, MessageSquare, LogOut, ChevronDown, BookOpen,
  Calendar, File, HelpCircle, Menu, Moon, Sun, X
} from 'lucide-react';
import { useTheme } from '../../Context/ThemeContext';
import { useAuth } from '../../Context/AuthContext';

const NavLink = ({ to, icon: Icon, label, active, badge }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap group ${
      active 
        ? 'text-white bg-blue-600 shadow-md shadow-blue-500/20' 
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
    }`}
  >
    <Icon size={16} className={active ? 'text-white' : 'text-slate-400 group-hover:text-blue-400 transition-colors'} />
    <span className="font-semibold text-sm">{label}</span>
    {badge && (
      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
        {badge}
      </span>
    )}
  </Link>
);

const CandidateLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { to: "/candidate", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/candidate/jobs", icon: Search, label: "Find Jobs", badge: "New" },
    { to: "/candidate/applications", icon: Briefcase, label: "Applications", badge: "3" },
    { to: "/candidate/saved", icon: Bookmark, label: "Saved Jobs" },
    { to: "/candidate/resume", icon: FileText, label: "Resume" },
    { to: "/candidate/profile", icon: User, label: "Profile" },
    { to: "/candidate/interviews", icon: Calendar, label: "Interviews" },
    { to: "/candidate/resources", icon: BookOpen, label: "Resources" },
    { to: "/candidate/documents", icon: File, label: "Documents" },
    { to: "/candidate/messages", icon: MessageSquare, label: "Messages", badge: "2" },
  ];

  const profileLinks = [
    { to: "/candidate/community", icon: Users, label: "Community" },
    { to: "/candidate/help", icon: HelpCircle, label: "Help & Support" },
    { to: "/candidate/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans flex flex-col transition-colors duration-300">
      
      {/* Top Navbar */}
      <header className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 lg:px-8 h-20">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="HireNext" className="w-10 h-10 shrink-0 shadow-lg shadow-blue-500/20 rounded-xl" />
              <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight hidden sm:block">HireNext</span>
            </Link>
          </div>
          
          {/* Global Search - Centered */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 items-center relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" 
              placeholder="Search jobs, companies, skills..." 
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => navigate('/candidate/ai-assistant')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-violet-600/10 border border-blue-500/20 hover:border-blue-500/40 rounded-full text-blue-400 text-sm font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:scale-105 active:scale-95"
            >
              <BrainCircuit size={16} /> <span>Ask AI</span>
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all relative group"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full group-hover:animate-ping"></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                    <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar pt-2">
                    {/* Mock Notification Items */}
                    <div 
                      onClick={() => { navigate('/candidate/applications'); setNotificationsOpen(false); }}
                      className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer flex gap-3 transition-colors border-l-4 border-blue-500"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Briefcase size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Application Viewed</p>
                        <p className="text-xs text-slate-500 mt-1">Google has viewed your application for Senior Developer.</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">2 hours ago</p>
                      </div>
                    </div>
                    <div 
                      onClick={() => { navigate('/candidate/interviews'); setNotificationsOpen(false); }}
                      className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer flex gap-3 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Interview Scheduled</p>
                        <p className="text-xs text-slate-500 mt-1">Your interview with Stripe is confirmed for tomorrow at 2 PM.</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">Yesterday</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                    <button className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors">View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 pr-2 sm:pr-4 py-1 sm:py-1.5 cursor-pointer bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-full transition-all group"
              >
                <img src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=2563EB&color=fff"} alt="Profile" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-slate-200 dark:border-slate-800 group-hover:border-blue-500 transition-colors" />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">{user?.name || "Guest"}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">{user?.role || "Candidate"}</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white hidden sm:block transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/50 mb-1 lg:hidden">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name || "Guest"}</p>
                    <p className="text-[11px] text-slate-500 capitalize">{user?.role || "Candidate"}</p>
                  </div>
                  
                  {profileLinks.map((link) => (
                    <Link 
                      key={link.to} 
                      to={link.to} 
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      <link.icon size={16} /> {link.label}
                    </Link>
                  ))}
                  
                  <div className="h-px bg-slate-100 dark:bg-slate-800/50 my-1"></div>
                  
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 px-4 lg:px-8 py-2 overflow-x-auto custom-scrollbar border-t border-slate-100 dark:border-slate-800/50">
          {links.map((link) => (
            <NavLink key={link.to} {...link} active={location.pathname === link.to} />
          ))}
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 absolute top-20 left-0 right-0 z-40 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
               <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === link.to 
                    ? 'text-white bg-blue-600' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <link.icon size={20} className={location.pathname === link.to ? 'text-white' : 'text-slate-400'} />
                <span className="font-semibold text-sm flex-1">{link.label}</span>
                {link.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${location.pathname === link.to ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
            
            {profileLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <link.icon size={20} />
                <span className="font-semibold text-sm flex-1">{link.label}</span>
              </Link>
            ))}

            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
            
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
                navigate('/');
              }} 
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-semibold text-sm"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Layout Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 relative z-10">
        <Outlet />
      </main>
      
    </div>
  );
};

export default CandidateLayout;
