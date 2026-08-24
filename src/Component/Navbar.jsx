import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Bell, Moon, Sun, Briefcase } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const Navbar = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Jobs', path: '/#jobs' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm' 
          : 'bg-white dark:bg-slate-900 py-5 border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="HireNext Logo" className="w-9 h-9 group-hover:scale-105 transition-transform shadow-md shadow-blue-600/20 rounded-xl" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HireNext</span>
        </Link>

        {/* Centered Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search jobs, companies, or skills..." 
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-full pl-10 pr-4 py-2 outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isHash = link.path.startsWith('/#');
            const isActive = isHash ? location.hash === link.path.substring(1) : location.pathname === link.path;
            
            return isHash ? (
              <a 
                key={link.name}
                href={link.path} 
                className={`px-4 py-2 rounded-full transition-colors relative font-bold ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name}
                to={link.path} 
                className={`px-4 py-2 rounded-full transition-colors relative font-bold ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell size={18} />
          </button>
          
          <button 
            onClick={toggleTheme}
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-2 overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
          
          <button onClick={() => onOpenAuth?.('login')} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold px-4 py-2 transition-colors">
            Log In
          </button>
          
          <button 
            onClick={() => onOpenAuth?.('register')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:shadow transition-all"
          >
            Register
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 absolute w-full overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-slate-600 dark:text-slate-300 font-medium">
              <div className="relative mb-2">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm outline-none dark:text-white"
                />
              </div>
              
              {navLinks.map((link) => {
                const isHash = link.path.startsWith('/#');
                return isHash ? (
                  <a key={link.name} href={link.path} onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-blue-600 dark:hover:text-blue-400 font-bold">{link.name}</a>
                ) : (
                  <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-blue-600 dark:hover:text-blue-400 font-bold">{link.name}</Link>
                );
              })}
              
              <hr className="border-slate-100 dark:border-slate-800 my-2" />
              <div className="flex gap-4">
                <button onClick={() => onOpenAuth?.('login')} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-lg font-semibold">Log In</button>
                <button onClick={() => onOpenAuth?.('register')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold">Register</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
