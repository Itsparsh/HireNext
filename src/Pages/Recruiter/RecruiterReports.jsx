import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock, Calendar, Download, ChevronDown, CheckCircle, Target, ArrowUpRight, ArrowDownRight, Briefcase, MoreVertical, X, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PerformancePDF from '../../components/PerformancePDF';

const KPICard = ({ title, value, trend, isPositive, icon: Icon, color, onClick }) => (
  <motion.div 
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl bg-${color}-50 dark:bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 flex items-center justify-center shadow-sm`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {trend}
      </div>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{title}</h3>
    <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
  </motion.div>
);

const initialFunnelData = [
  { stage: 'Total Applicants', count: 1240, percentage: 100, color: 'bg-blue-500' },
  { stage: 'Screened', count: 856, percentage: 69, color: 'bg-indigo-500' },
  { stage: 'Interviewed', count: 342, percentage: 27, color: 'bg-purple-500' },
  { stage: 'Offered', count: 45, percentage: 3.6, color: 'bg-emerald-500' },
  { stage: 'Hired', count: 38, percentage: 3, color: 'bg-teal-500' },
];

const initialSourceData = [
  { name: 'LinkedIn', value: 45, color: 'bg-blue-500' },
  { name: 'Direct Traffic', value: 25, color: 'bg-indigo-500' },
  { name: 'Referrals', value: 20, color: 'bg-emerald-500' },
  { name: 'Indeed', value: 10, color: 'bg-amber-500' },
];

const initialKpis = {
  applicants: '1,240', timeToHire: '18 Days', activeJobs: '24', offerAcceptance: '84%',
  appTrend: '+12.5%', timeTrend: '-2 Days', jobsTrend: '+3', offerTrend: '-2.1%',
  appPos: true, timePos: true, jobsPos: true, offerPos: false
};

const mockChartData = [
  { name: 'Week 1', value: 45 },
  { name: 'Week 2', value: 52 },
  { name: 'Week 3', value: 38 },
  { name: 'Week 4', value: 65 },
  { name: 'Week 5', value: 82 },
  { name: 'Week 6', value: 74 }
];

const RecruiterReports = () => {
  const [timeRange, setTimeRange] = useState('This Month');
  const [toastMessage, setToastMessage] = useState(null);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isFunnelDropdownOpen, setIsFunnelDropdownOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const [funnelData, setFunnelData] = useState(initialFunnelData);
  const [sourceData, setSourceData] = useState(initialSourceData);
  const [kpiData, setKpiData] = useState(initialKpis);
  const [isRecommendationApplied, setIsRecommendationApplied] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setIsTimeDropdownOpen(false);
    showToast(`Date range updated to ${range}. Data refreshed.`);
    setIsRecommendationApplied(false);

    if (range === 'This Year') {
      setFunnelData([
        { stage: 'Total Applicants', count: 14500, percentage: 100, color: 'bg-blue-500' },
        { stage: 'Screened', count: 9800, percentage: 67, color: 'bg-indigo-500' },
        { stage: 'Interviewed', count: 4100, percentage: 28, color: 'bg-purple-500' },
        { stage: 'Offered', count: 680, percentage: 4.6, color: 'bg-emerald-500' },
        { stage: 'Hired', count: 590, percentage: 4, color: 'bg-teal-500' },
      ]);
      setSourceData([
        { name: 'LinkedIn', value: 50, color: 'bg-blue-500' },
        { name: 'Direct Traffic', value: 20, color: 'bg-indigo-500' },
        { name: 'Referrals', value: 15, color: 'bg-emerald-500' },
        { name: 'Indeed', value: 15, color: 'bg-amber-500' },
      ]);
      setKpiData({
        applicants: '14,500', timeToHire: '15 Days', activeJobs: '45', offerAcceptance: '86%',
        appTrend: '+22.5%', timeTrend: '-4 Days', jobsTrend: '+12', offerTrend: '+1.5%',
        appPos: true, timePos: true, jobsPos: true, offerPos: true
      });
    } else if (range === 'This Week') {
      setFunnelData(initialFunnelData.map(item => ({...item, count: Math.floor(item.count * 0.25)})));
      setSourceData([
        { name: 'LinkedIn', value: 40, color: 'bg-blue-500' },
        { name: 'Direct Traffic', value: 30, color: 'bg-indigo-500' },
        { name: 'Referrals', value: 25, color: 'bg-emerald-500' },
        { name: 'Indeed', value: 5, color: 'bg-amber-500' },
      ]);
      setKpiData({
        applicants: '310', timeToHire: '19 Days', activeJobs: '25', offerAcceptance: '82%',
        appTrend: '-5.0%', timeTrend: '+1 Day', jobsTrend: '+1', offerTrend: '-1.0%',
        appPos: false, timePos: false, jobsPos: true, offerPos: false
      });
    } else {
      setFunnelData(initialFunnelData);
      setSourceData(initialSourceData);
      setKpiData(initialKpis);
    }
  };

  const handleApplyRecommendation = () => {
    if (isRecommendationApplied) return;
    setSourceData(prev => prev.map(source => {
      if (source.name === 'LinkedIn') return { ...source, value: 60 };
      if (source.name === 'Direct Traffic') return { ...source, value: 20 };
      if (source.name === 'Referrals') return { ...source, value: 10 };
      if (source.name === 'Indeed') return { ...source, value: 10 };
      return source;
    }));
    setIsRecommendationApplied(true);
    showToast("AI Recommendation Applied! Ads budget updated.");
  };

  const handleRefreshFunnel = () => {
    setIsFunnelDropdownOpen(false);
    showToast("Refreshing Funnel Data...");
    setTimeout(() => {
      setFunnelData(prev => prev.map(item => ({
        ...item, 
        count: Math.floor(item.count * (Math.random() * 0.2 + 0.9)) // ±10% variation
      })));
      showToast("Funnel Data Refreshed Successfully!");
    }, 800);
  };

  const handleDownloadCSV = () => {
    setIsFunnelDropdownOpen(false);
    showToast("Generating CSV Data...");
    setTimeout(() => {
      const headers = "Stage,Count,Percentage\n";
      const rows = funnelData.map(item => `${item.stage},${item.count},${item.percentage}%`).join("\n");
      const csvContent = headers + rows;
      
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Pipeline-Funnel-${timeRange.replace(' ', '-')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("CSV Download Complete!");
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3"
          >
            <Check size={18} className="text-emerald-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Immersive Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-400/30 dark:bg-emerald-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-[700px] h-[700px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-[800px] h-[800px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-teal-400/30 dark:bg-teal-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>

        {/* Gradient Overlay for smooth readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 dark:via-slate-950/80 dark:to-slate-950 z-10"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <BarChart3 size={14} className="text-emerald-500" /> Hiring Analytics
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Reports</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Track your recruiting pipeline, efficiency, and ROI.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full md:w-auto items-center gap-4">
            <div className="relative z-50">
              <button 
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                className="flex items-center gap-3 px-6 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-200 font-bold hover:border-emerald-500 transition-colors shadow-sm"
              >
                <Calendar size={18} className="text-emerald-500" />
                {timeRange}
                <ChevronDown size={16} className="text-slate-400" />
              </button>
              {isTimeDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2">
                  {['This Week', 'This Month', 'This Quarter', 'This Year'].map(range => (
                    <button 
                      key={range}
                      onClick={() => handleTimeRangeChange(range)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={async () => {
                if (isDownloadingPDF) return;
                setIsDownloadingPDF(true);
                showToast("Generating Executive PDF report...");
                try {
                  const { pdf } = await import('@react-pdf/renderer');
                  const blob = await pdf(<PerformancePDF timeRange={timeRange} kpiData={kpiData} funnelData={funnelData} />).toBlob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `HireNext-Performance-${timeRange.replace(' ', '-')}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  showToast("PDF Export Complete!");
                } catch (error) {
                  console.error("PDF generation failed", error);
                  showToast("Error generating PDF.");
                } finally {
                  setIsDownloadingPDF(false);
                }
              }}
              className={`shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black transition-all shadow-lg z-40 ${isDownloadingPDF ? 'opacity-75 cursor-wait' : 'hover:scale-105 active:scale-95 group'}`}
            >
              {isDownloadingPDF ? (
                <>Generating...</>
              ) : (
                <><Download size={18} className="group-hover:-translate-y-1 transition-transform" /> Export Report</>
              )}
            </button>
          </motion.div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard onClick={() => setSelectedKPI({ title: 'Total Applicants', value: kpiData.applicants, trend: kpiData.appTrend, isPositive: kpiData.appPos, color: 'blue' })} title="Total Applicants" value={kpiData.applicants} trend={kpiData.appTrend} isPositive={kpiData.appPos} icon={Users} color="blue" />
          <KPICard onClick={() => setSelectedKPI({ title: 'Time to Hire', value: kpiData.timeToHire, trend: kpiData.timeTrend, isPositive: kpiData.timePos, color: 'indigo' })} title="Time to Hire" value={kpiData.timeToHire} trend={kpiData.timeTrend} isPositive={kpiData.timePos} icon={Clock} color="indigo" />
          <KPICard onClick={() => setSelectedKPI({ title: 'Active Jobs', value: kpiData.activeJobs, trend: kpiData.jobsTrend, isPositive: kpiData.jobsPos, color: 'purple' })} title="Active Jobs" value={kpiData.activeJobs} trend={kpiData.jobsTrend} isPositive={kpiData.jobsPos} icon={Briefcase} color="purple" />
          <KPICard onClick={() => setSelectedKPI({ title: 'Offer Acceptance', value: kpiData.offerAcceptance, trend: kpiData.offerTrend, isPositive: kpiData.offerPos, color: 'emerald' })} title="Offer Acceptance" value={kpiData.offerAcceptance} trend={kpiData.offerTrend} isPositive={kpiData.offerPos} icon={Target} color="emerald" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Chart (Pipeline Conversion Funnel) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8 relative">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Pipeline Conversion Funnel</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Applicant drop-off rates across hiring stages</p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setIsFunnelDropdownOpen(!isFunnelDropdownOpen)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 rounded-xl transition-colors"
                >
                  <MoreVertical size={20} />
                </button>
                {isFunnelDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <button onClick={handleDownloadCSV} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors">Download CSV</button>
                    <button onClick={handleRefreshFunnel} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors">Refresh Data</button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {funnelData.map((item, index) => (
                <div key={item.stage} className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{item.stage}</span>
                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900 dark:text-white">{item.count}</span>
                      <span className="text-xs font-bold text-slate-400 ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full ${item.color} relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20" style={{ transform: 'skewX(-45deg) translateX(-100%)', animation: 'shimmer 2s infinite' }}></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sourcing Analytics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col"
          >
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Top Sources</h3>
            <p className="text-sm font-medium text-slate-500 mb-8">Where your best candidates are coming from.</p>
            
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {sourceData.map((item, index) => (
                <div 
                  key={item.name} 
                  onClick={() => showToast(`Opening detailed analytics for ${item.name}...`)}
                  className="flex items-center gap-4 p-2 -mx-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.name}</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} transition={{ duration: 1, delay: index * 0.1 }} viewport={{ once: true }}
                        className={`h-full rounded-full ${item.color}`}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 group hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-400 mb-1">AI Recommendation</h4>
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-500/80 mb-3">Increase spending on LinkedIn Ads by 15%. It currently brings in 45% of your highest-quality leads.</p>
                  <button 
                    onClick={handleApplyRecommendation}
                    disabled={isRecommendationApplied}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm ${isRecommendationApplied ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
                  >
                    {isRecommendationApplied ? 'Recommendation Applied' : 'Apply Recommendation'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: skewX(-45deg) translateX(200%); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />

      {/* KPI Details Modal */}
      <AnimatePresence>
        {selectedKPI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setSelectedKPI(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
            >
              <button 
                onClick={() => setSelectedKPI(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{selectedKPI.title} Report</h2>
              <p className="text-slate-500 font-medium mb-6">In-depth analysis for {timeRange}.</p>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                <div className={`text-6xl font-black text-slate-900 dark:text-white mb-4`}>{selectedKPI.value}</div>
                <div className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl ${selectedKPI.isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                  {selectedKPI.isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />} 
                  {selectedKPI.trend} vs last period
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-500 mb-4 text-center">Historical Trend</h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={selectedKPI.isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={selectedKPI.isPositive ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={selectedKPI.isPositive ? "#10b981" : "#ef4444"} 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecruiterReports;
