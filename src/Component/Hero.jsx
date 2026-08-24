import { Search, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = ({ onOpenAuth }) => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Soft geometric background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 -z-10"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-slate-100 dark:bg-slate-900 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-6 font-semibold text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
            Over 10,000+ companies hiring now
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6"
          >
            Find the right job.<br />
            Hire the <span className="text-blue-600 dark:text-blue-400">best talent.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Connect with top employers and exceptional candidates on the most trusted professional recruitment platform.
          </motion.p>

          {/* Search Form */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto lg:mx-0 mb-8"
          >
            <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 transition-all">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input type="text" placeholder="Job title, skills, or company" className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white ml-3 placeholder:text-slate-500 text-sm" />
            </div>
            
            <div className="hidden md:flex w-[1px] bg-slate-200 dark:bg-slate-700 my-2"></div>
            
            <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 transition-all">
              <MapPin size={18} className="text-slate-400 shrink-0" />
              <input type="text" placeholder="City, state, or Remote" className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white ml-3 placeholder:text-slate-500 text-sm" />
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-sm transition-colors md:w-auto w-full flex justify-center items-center gap-2">
              Search
            </button>
          </motion.div>

          {/* Trending & Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Trending:</span>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Frontend</a>,
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Product Manager</a>,
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Remote</a>
            </div>
            
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            
            <Link to="/login?role=recruiter" className="text-slate-700 dark:text-slate-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 text-sm">
              <Briefcase size={16} /> Post a Job Instead
            </Link>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative z-10 hidden md:block"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
              alt="Professionals in office" 
              className="w-full h-auto object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold">1M+ Hires</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Successfully placed</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
