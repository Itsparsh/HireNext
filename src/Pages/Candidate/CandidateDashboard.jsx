import { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  Briefcase, Eye, Users, Bookmark, 
  MapPin, Clock, Star, Download, ArrowRight,
  CheckCircle, FileText, Target, Award, BrainCircuit, Calendar, TrendingUp, Sparkles, ChevronRight, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import api from '../../api';

const KPICard = ({ title, value, icon: Icon, trend, trendUp, colorClass, gradient, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
    className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 group hover:border-blue-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-xl"
  >
    <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-[0.07] blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-20 ${colorClass}`} />
    
    <div className="flex justify-between items-start relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-md`}>
        <Icon size={26} className="text-white" />
      </div>
      {trend && (
        <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 ${trendUp ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20'}`}>
          {trendUp ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
          {trend}
        </div>
      )}
    </div>
    
    <div className="mt-6 relative z-10">
      <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">{value}</h3>
      <p className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
    </div>
  </motion.div>
);

const JobCard = ({ id, role, company, match, salary, type, location, logo, urgent }) => {
  const [applied, setApplied] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    return saved.includes(id);
  });

  const handleApply = () => {
    if (applied) return;
    
    // Save to global appliedJobs state
    const saved = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    if (!saved.includes(id)) {
      localStorage.setItem('appliedJobs', JSON.stringify([...saved, id]));
    }
    
    setApplied(true);
    import('react-hot-toast').then(module => {
      module.default.success(`Successfully applied to ${company}!`);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden">
      {urgent && <div className="absolute top-0 right-0 px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl z-10">Urgent</div>}
      
      <div className="flex items-start gap-4 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-sm border border-slate-100 flex-shrink-0 relative z-10">
          <img src={logo} alt={company} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="truncate pr-4">
              <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{role}</h4>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">{company}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs font-bold px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
          <MapPin size={14} className="text-slate-400" /> {location}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
          <Clock size={14} className="text-slate-400" /> {type}
        </span>
        <span className="text-xs font-black px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1.5 ml-auto">
          {salary}
        </span>
      </div>

      <div className="flex gap-3 items-center">
        <button 
          onClick={handleApply}
          disabled={applied}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all shadow-md ${
            applied 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 cursor-default' 
              : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white cursor-pointer'
          }`}
        >
          {applied ? <><CheckCircle size={16} /> Applied</> : 'Apply Now'}
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 text-xs font-black shrink-0">
          <Sparkles size={14} />
          {match}%
        </div>
      </div>
    </div>
  );
};

const CandidateDashboard = () => {
  const { user } = useAuth();
  
  const [smartMatches, setSmartMatches] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs?limit=3');
        setSmartMatches(res.data.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load smart matches", err);
      } finally {
        setIsLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);
  
  const activityData = [
    { name: 'Mon', applications: 2, views: 15 },
    { name: 'Tue', applications: 3, views: 28 },
    { name: 'Wed', applications: 1, views: 12 },
    { name: 'Thu', applications: 4, views: 35 },
    { name: 'Fri', applications: 5, views: 45 },
    { name: 'Sat', applications: 1, views: 20 },
    { name: 'Sun', applications: 0, views: 10 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12 max-w-[1400px] mx-auto">
      
      {/* Premium Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        <div className="absolute -right-20 -top-40 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 md:p-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse"></span>
              Profile Active & Visible
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Welcome back, {user?.name ? user.name.split(' ')[0] : 'Guest'}. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Your career is accelerating.</span>
            </h1>
            <p className="text-slate-300 text-lg font-medium max-w-xl">
              You've appeared in 45 recruiter searches this week. Your AI Match Score has unlocked 12 new premium opportunities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link to="/candidate/jobs" className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-black transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2">
              <Search size={20} /> Discover Jobs
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Applied" value="34" icon={Briefcase} trend="+12%" trendUp={true} colorClass="bg-blue-600" gradient="from-blue-600 to-indigo-600" delay={0.1} />
        <KPICard title="Profile Views" value="892" icon={Eye} trend="+43%" trendUp={true} colorClass="bg-rose-500" gradient="from-rose-500 to-pink-600" delay={0.2} />
        <KPICard title="Interviews" value="7" icon={Users} trend="Static" trendUp={true} colorClass="bg-violet-600" gradient="from-violet-600 to-purple-700" delay={0.3} />
        <KPICard title="Offers" value="2" icon={Award} trend="New" trendUp={true} colorClass="bg-amber-500" gradient="from-amber-500 to-orange-600" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Analytics Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Profile Performance</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">Recruiter views vs Applications submitted</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 shadow-sm cursor-pointer">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} className="dark:stroke-slate-800" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}
                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold', marginBottom: '8px' }}
                />
                <Area type="monotone" dataKey="views" name="Profile Views" stroke="#ec4899" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-8">
          
          {/* Upcoming Interview */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-100 uppercase tracking-widest text-[11px]">Upcoming Interview</h3>
                <p className="font-black text-white text-lg">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-5 relative z-10">
              <h4 className="font-black text-xl mb-1">Senior React Developer</h4>
              <p className="text-indigo-200 font-bold text-sm mb-4">Stripe</p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=11" className="w-8 h-8 rounded-full border-2 border-indigo-700" alt="Interviewer 1" />
                  <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full border-2 border-indigo-700" alt="Interviewer 2" />
                </div>
                <span className="text-xs font-bold text-indigo-100">Technical Round</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl font-black transition-all shadow-lg flex justify-center items-center gap-2">
              Join Meet <ArrowRight size={18} />
            </button>
          </div>

          {/* AI Profile Strength */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-sm flex flex-col justify-between h-auto">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Profile Strength</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Complete your profile to rank higher.</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                  <BrainCircuit size={24} />
                </div>
              </div>
              
              <div className="flex items-end gap-3 mb-4">
                <span className="text-6xl font-black text-slate-900 dark:text-white leading-none">85<span className="text-4xl text-slate-400">%</span></span>
              </div>
              
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 w-[85%]"></div>
              </div>
            </div>
            
            <Link to="/candidate/profile" className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-black transition-colors flex justify-center items-center text-sm">
              Complete Profile
            </Link>
          </div>
          
        </div>

      </div>

      {/* AI Smart Matches */}
      <div className="pt-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-black uppercase tracking-widest mb-3">
              <Sparkles size={14} /> AI Powered
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Smart Matches</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Highly curated opportunities based on your skills and preferences</p>
          </div>
          <Link to="/candidate/jobs" className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-500 font-black hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
            View All Matches <ChevronRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingJobs ? (
            <div className="col-span-full py-10 flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : smartMatches.length > 0 ? (
            smartMatches.map(job => (
              <JobCard 
                key={job._id}
                id={job._id}
                role={job.title}
                company={job.company.name}
                match={job.aiMatchScore || Math.floor(Math.random() * 20 + 80)}
                salary={`$${Math.floor(job.salary.min/1000)}k - $${Math.floor(job.salary.max/1000)}k`}
                type={job.workMode || job.jobType}
                location={job.location}
                logo={job.company.logo}
                urgent={job.hiringUrgency === 'High'}
              />
            ))
          ) : (
            <p className="col-span-full text-slate-500 text-center py-8">No smart matches found at the moment.</p>
          )}
        </div>
        
        <div className="mt-8 sm:hidden">
          <Link to="/candidate/jobs" className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-300 font-black">
            View All Matches <ChevronRight size={18} />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default CandidateDashboard;
