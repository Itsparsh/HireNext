import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Briefcase, FileText, CheckCircle, Clock, TrendingUp, Calendar, Sparkles, ArrowUpRight, ArrowRight, MoreHorizontal, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import toast from 'react-hot-toast';
import ReportPDF from '../../components/ReportPDF';
import CandidateProfileModal from '../../components/CandidateProfileModal';

const candidatesToReview = [
  { id: 1, name: 'David Chen', role: 'Senior Full Stack Developer', matchScore: 95, avatar: 'https://i.pravatar.cc/150?img=21', location: 'San Francisco, CA', experience: '8 Years', skills: ['React', 'Node.js', 'Python', 'AWS'] },
  { id: 2, name: 'Sarah Jenkins', role: 'Senior Full Stack Developer', matchScore: 92, avatar: 'https://i.pravatar.cc/150?img=22', location: 'New York, NY', experience: '6 Years', skills: ['Vue', 'Ruby', 'PostgreSQL'] },
  { id: 3, name: 'Marcus Rowe', role: 'Senior Full Stack Developer', matchScore: 89, avatar: 'https://i.pravatar.cc/150?img=23', location: 'Remote', experience: '5 Years', skills: ['Angular', 'Java', 'Docker'] },
  { id: 4, name: 'Elena Smith', role: 'Senior Full Stack Developer', matchScore: 86, avatar: 'https://i.pravatar.cc/150?img=24', location: 'Austin, TX', experience: '7 Years', skills: ['React', 'TypeScript', 'GraphQL'] }
];

const mockChartData = [
  { name: 'Mon', applicants: 45, hires: 2 },
  { name: 'Tue', applicants: 52, hires: 3 },
  { name: 'Wed', applicants: 38, hires: 1 },
  { name: 'Thu', applicants: 85, hires: 5 },
  { name: 'Fri', applicants: 65, hires: 2 },
  { name: 'Sat', applicants: 25, hires: 0 },
  { name: 'Sun', applicants: 40, hires: 2 },
];

const mockMonthlyData = [
  { name: 'Jan', applicants: 245, hires: 12 },
  { name: 'Feb', applicants: 312, hires: 18 },
  { name: 'Mar', applicants: 280, hires: 15 },
  { name: 'Apr', applicants: 485, hires: 28 },
  { name: 'May', applicants: 465, hires: 25 },
  { name: 'Jun', applicants: 325, hires: 14 },
  { name: 'Jul', applicants: 410, hires: 22 },
];

const sourceData = [
  { name: 'LinkedIn', value: 75, color: '#0ea5e9' },
  { name: 'Direct', value: 45, color: '#8b5cf6' },
  { name: 'Referrals', value: 85, color: '#f59e0b' },
  { name: 'Indeed', value: 30, color: '#10b981' }
];

const initialActivities = [
  { id: 1, color: 'bg-blue-500', text: <><span className="font-bold">You</span> moved <span className="font-bold text-blue-600">Alex Thompson</span> to Technical Interview</>, time: '10 mins ago', read: false },
  { id: 2, color: 'bg-emerald-500', text: <><span className="font-bold">Jessica Lee</span> hired <span className="font-bold text-emerald-600">Michael Chang</span> for Product Designer</>, time: '2 hours ago', read: false },
  { id: 3, color: 'bg-purple-500', text: <>AI Assistant auto-screened <span className="font-bold text-purple-600">45 new applicants</span></>, time: '5 hours ago', read: false },
  { id: 4, color: 'bg-amber-500', text: <><span className="font-bold">You</span> published a new job: <span className="font-bold">VP of Engineering</span></>, time: '1 day ago', read: false },
];

const StatCard = ({ title, value, trend, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    className="relative overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none group hover:shadow-xl transition-all duration-300"
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-500/10 dark:bg-${color}-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl bg-${color}-50 dark:bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 shadow-inner`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
    </div>
    <div className="relative z-10 mt-6 flex items-center gap-2">
      <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 px-2.5 py-1 rounded-lg">
        <TrendingUp size={14} className="mr-1" />
        {trend}
      </span>
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">vs last week</span>
    </div>
  </motion.div>
);

const kpiMockData = {
  'Last 7 days': { jobs: '12', apps: '1,248', ints: '34', hires: '8', tJobs: '+15%', tApps: '+24%', tInts: '+8%', tHires: '+12%' },
  'Last 30 days': { jobs: '15', apps: '5,294', ints: '142', hires: '28', tJobs: '+8%', tApps: '+32%', tInts: '+14%', tHires: '+18%' },
  'This Quarter': { jobs: '24', apps: '14,800', ints: '415', hires: '86', tJobs: '+22%', tApps: '+45%', tInts: '+25%', tHires: '+30%' },
  'This Year': { jobs: '48', apps: '52,400', ints: '1,450', hires: '312', tJobs: '+45%', tApps: '+85%', tInts: '+40%', tHires: '+55%' }
};

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [pipelineView, setPipelineView] = React.useState('Weekly');
  const [overviewTimeframe, setOverviewTimeframe] = React.useState('Last 7 days');
  const [isSourcesMenuOpen, setIsSourcesMenuOpen] = React.useState(false);
  const [isActivityMenuOpen, setIsActivityMenuOpen] = React.useState(false);
  const [activeCandidate, setActiveCandidate] = React.useState(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [activities, setActivities] = React.useState(initialActivities);
  const chartData = pipelineView === 'Weekly' ? mockChartData : mockMonthlyData;
  const currentKPI = kpiMockData[overviewTimeframe] || kpiMockData['Last 7 days'];

  const handleMarkAllAsRead = () => {
    setIsActivityMenuOpen(false);
    setActivities(prev => prev.map(activity => ({ ...activity, read: true })));
    toast.success('All activities marked as read');
  };

  const handleNotificationSettings = () => {
    setIsActivityMenuOpen(false);
    navigate('/recruiter/settings', { state: { tab: 'notifications' } });
  };

  const handleClearActivity = () => {
    setIsActivityMenuOpen(false);
    setActivities([]);
    toast.success('Activity cleared');
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const origin = window.location.origin;
      const blob = await pdf(<ReportPDF data={chartData} period={pipelineView} origin={origin} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `HireNext_Pipeline_Report_${pipelineView}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 relative">
      
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Overview <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Here is what's happening with your hiring today.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={16} />
            <select 
              value={overviewTimeframe}
              onChange={(e) => {
                setOverviewTimeframe(e.target.value);
                toast.success(`Overview updated to ${e.target.value}`);
              }}
              className="appearance-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
          <button 
            onClick={handleDownloadReport}
            disabled={isDownloading}
            className={`bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 dark:shadow-white/10 transition-all flex items-center gap-2 ${isDownloading ? 'opacity-75 cursor-wait' : 'hover:scale-105 active:scale-95'}`}
          >
            {isDownloading ? 'Generating PDF...' : 'Download Report'} <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* AI Insights Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl shadow-blue-900/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="flex items-center gap-4 relative z-10 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
            <Sparkles size={24} className="text-blue-100" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">HireNext AI Intelligence</h3>
            <p className="text-blue-100 text-sm font-medium opacity-90 mt-0.5">3 top-tier candidates just applied for the Senior Developer role with a 95%+ match score.</p>
          </div>
        </div>
        <Link to="/recruiter/applications" className="relative z-10 shrink-0 bg-white text-blue-700 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap inline-block text-center">
          Review Candidates
        </Link>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Active Jobs" value={currentKPI.jobs} trend={currentKPI.tJobs} icon={Briefcase} color="blue" delay={0.1} />
        <StatCard title="Total Applicants" value={currentKPI.apps} trend={currentKPI.tApps} icon={Users} color="indigo" delay={0.2} />
        <StatCard title="Interviews Scheduled" value={currentKPI.ints} trend={currentKPI.tInts} icon={Clock} color="orange" delay={0.3} />
        <StatCard title="Successful Hires" value={currentKPI.hires} trend={currentKPI.tHires} icon={CheckCircle} color="emerald" delay={0.4} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Applicant Pipeline</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total volume across all active jobs</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => setPipelineView('Weekly')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${pipelineView === 'Weekly' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >Weekly</button>
              <button 
                onClick={() => setPipelineView('Monthly')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${pipelineView === 'Monthly' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >Monthly</button>
            </div>
          </div>
          <div className="h-[240px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.15} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.5)', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(10px)', fontSize: '12px', fontWeight: '600' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Area type="monotone" dataKey="applicants" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorApplicants)" activeDot={{ r: 6, strokeWidth: 2, stroke: '#ffffff', fill: '#4f46e5' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sources Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Top Sources</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Where talent comes from</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsSourcesMenuOpen(!isSourcesMenuOpen)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <MoreHorizontal size={20} className="text-slate-400" />
              </button>
              {isSourcesMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 py-1.5 z-50 overflow-hidden"
                >
                  <button onClick={() => { setIsSourcesMenuOpen(false); navigate('/recruiter/reports'); }} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">View Details</button>
                  <button onClick={() => { setIsSourcesMenuOpen(false); handleDownloadReport(); }} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Export Data</button>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 my-1.5 w-full"></div>
                  <button onClick={() => { setIsSourcesMenuOpen(false); toast('Widget hidden from view', { icon: '👁️‍🗨️' }); }} className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">Hide Widget</button>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }} width={75} />
                <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} contentStyle={{ borderRadius: '12px', border: 'none', fontWeight: 'bold' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Activity Feed and Recent Applicants */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
        
        {/* Candidates Ready for Review */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Candidates to Review</h3>
              <p className="text-xs font-medium text-slate-500">Sorted by AI Match Score</p>
            </div>
            <Link to="/recruiter/applications" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold flex items-center gap-1 group">
              View All Pipeline <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50 flex-1">
            {candidatesToReview.map((candidate, i) => (
              <div key={candidate.id} onClick={() => setActiveCandidate(candidate)} className="p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                  <img src={candidate.avatar} alt="Applicant" className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm border-2 border-white dark:border-slate-900">
                    {candidate.matchScore}%
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {candidate.name}
                  </p>
                  <p className="text-xs font-medium text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                    <Briefcase size={12} /> {candidate.role}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{(i + 1) * 2} hrs ago</span>
                  <button onClick={(e) => { e.stopPropagation(); setActiveCandidate(candidate); }} className="px-4 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live Team Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity size={18} className="text-purple-500" /> Live Activity Feed
              </h3>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsActivityMenuOpen(!isActivityMenuOpen)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <MoreHorizontal size={18} className="text-slate-500" />
              </button>
              {isActivityMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 py-1.5 z-50 overflow-hidden"
                >
                  <button onClick={handleMarkAllAsRead} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Mark all as read</button>
                  <button onClick={handleNotificationSettings} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Notification Settings</button>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 my-1.5 w-full"></div>
                  <button onClick={handleClearActivity} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Clear Activity</button>
                </motion.div>
              )}
            </div>
          </div>
          <div className="p-6 space-y-6 flex-1 relative">
            {activities.length > 0 && <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-100 dark:bg-slate-800"></div>}
            
            {activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                <Activity size={32} className="mb-2 opacity-50" />
                <p>No recent activity</p>
              </div>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className={`flex gap-4 relative items-start transition-opacity ${activity.read ? 'opacity-60' : 'opacity-100'}`}>
                  <div className={`w-4 h-4 rounded-full ${activity.color} ring-4 ring-white dark:ring-slate-900 mt-1 shrink-0 z-10`}></div>
                  <div className="flex-1">
                    <p className={`text-sm ${activity.read ? 'font-medium' : 'font-bold'} text-slate-900 dark:text-white`}>{activity.text}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">{activity.time}</p>
                  </div>
                  {!activity.read && <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2"></div>}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
      {/* Render Candidate Profile Modal */}
      {activeCandidate && (
        <CandidateProfileModal 
          isOpen={!!activeCandidate} 
          onClose={() => setActiveCandidate(null)} 
          candidate={activeCandidate} 
        />
      )}
    </div>
  );
};

export default RecruiterDashboard;
