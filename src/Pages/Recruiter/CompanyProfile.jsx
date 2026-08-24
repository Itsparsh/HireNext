import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Globe, Users, Briefcase, Camera, Image as ImageIcon, Save, CheckCircle, Sparkles, Upload, FileText, ChevronRight } from 'lucide-react';
import { useTheme } from '../../Context/ThemeContext';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import api from '../../api';

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="relative group">
    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <Icon size={18} />
      </div>
      <input 
        id={props.name}
        className="w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm"
        {...props}
      />
    </div>
  </div>
);

const CompanyProfile = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [company, setCompany] = useState({
    name: '', industry: '', headquarters: '', employeeCount: '', website: '', description: '', logo: '', coverBanner: ''
  });
  
  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany(prev => ({ ...prev, [field]: reader.result }));
        toast.success(`${field === 'logo' ? 'Company Logo' : 'Cover Banner'} updated!`);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/company');
      if (res.data.success && res.data.data) setCompany(res.data.data);
    } catch (err) {
      if (err.response?.status !== 404) toast.error('Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const endpoint = company._id ? api.put : api.post;
      const res = await endpoint('/company', company);
      setCompany(res.data.data);
      toast.success(company._id ? 'Profile updated beautifully!' : 'Profile created magically!');
    } catch (err) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate completion percentage
  const fields = ['name', 'industry', 'headquarters', 'employeeCount', 'website', 'description', 'logo', 'coverBanner'];
  const completedFields = fields.filter(f => company[f] && String(company[f]).trim().length > 0);
  const completionPercentage = Math.round((completedFields.length / fields.length) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      
      {/* Immersive Header Banner */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
        {company.coverBanner ? (
          <img src={company.coverBanner} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            {/* Animated glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 dark:via-slate-950/50 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1400px] mx-auto pt-32">
        
        {/* Profile Card Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-10 border border-white/20 dark:border-slate-700/30 shadow-2xl shadow-blue-900/10 mb-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 relative z-10 w-full md:w-auto text-center md:text-left">
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-40 h-40 bg-white dark:bg-slate-950 rounded-[2rem] border-4 border-white dark:border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden rotate-[-2deg] group-hover:rotate-0 transition-all duration-300">
                {company.logo ? (
                  <img src={company.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                ) : (
                  <Building2 size={60} className="text-slate-300 dark:text-slate-700" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
                  <Upload size={24} className="mb-2" />
                  <span className="text-xs font-bold">Update Logo</span>
                </div>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-black rounded-lg uppercase tracking-wider">
                  Employer Profile
                </span>
                {completionPercentage === 100 && (
                  <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-lg">
                    <Sparkles size={12} /> Verified
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                {company.name || 'Setup Your Brand'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-xl">
                {company.industry ? `${company.industry} • ` : ''} 
                {company.headquarters ? `${company.headquarters}` : 'Provide details to attract top talent'}
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto flex flex-col items-center md:items-end">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95"
            >
              {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Save size={20} />}
              {saving ? 'Synchronizing...' : 'Save & Publish Profile'}
            </button>
            <p className="text-xs text-slate-400 font-medium mt-4 text-center md:text-right">
              Changes reflect immediately on job postings.
            </p>
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          {/* Main Form */}
          <div className="xl:col-span-2 space-y-10">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            >
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600">
                  <Building2 size={24} strokeWidth={2.5} />
                </div>
                Core Details
              </h3>
              
              <div className="space-y-6">
                <InputField label="Company Name" icon={Building2} name="name" value={company.name} onChange={handleChange} placeholder="e.g. HireNext Corp" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Industry" icon={Briefcase} name="industry" value={company.industry} onChange={handleChange} placeholder="e.g. Artificial Intelligence" />
                  
                  <div className="relative group">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Company Size</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                        <Users size={18} />
                      </div>
                      <select 
                        id="employeeCount"
                        name="employeeCount" value={company.employeeCount} onChange={handleChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm appearance-none"
                      >
                        <option value="">Select workforce size...</option>
                        <option value="1-10">1-10 Employees (Startup)</option>
                        <option value="11-50">11-50 Employees</option>
                        <option value="51-200">51-200 Employees</option>
                        <option value="201-500">201-500 Employees</option>
                        <option value="500+">500+ Employees (Enterprise)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Headquarters" icon={MapPin} name="headquarters" value={company.headquarters} onChange={handleChange} placeholder="e.g. San Francisco, CA" />
                  <InputField label="Website URL" icon={Globe} name="website" value={company.website} onChange={handleChange} placeholder="https://example.com" type="url" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            >
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl text-purple-600">
                  <FileText size={24} strokeWidth={2.5} />
                </div>
                Company Culture & Mission
              </h3>
              
              <div className="relative group">
                <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-purple-500 transition-colors pointer-events-none">
                  <Sparkles size={18} />
                </div>
                <textarea 
                  id="description"
                  name="description" value={company.description} onChange={handleChange} rows={8}
                  className="w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm resize-none leading-relaxed"
                  placeholder="Tell your story. What drives your team? What is it like to work here? Top candidates look for mission-driven companies..."
                />
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar Modules */}
          <div className="space-y-8">
            
            {/* Completion Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] p-8 border border-slate-700 shadow-xl overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-xl font-black text-white mb-2">Profile Strength</h3>
              <p className="text-slate-400 text-sm font-medium mb-6">Complete profiles receive 4.5x more applications from top-tier talent.</p>
              
              <div className="flex items-end justify-between mb-2">
                <span className="text-4xl font-black text-white">{completionPercentage}%</span>
                <span className="text-sm font-bold text-blue-400">{completionPercentage === 100 ? 'All Set!' : 'Keep going'}</span>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3 mb-8 overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                {fields.map((field, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className={`text-sm font-bold flex items-center gap-3 ${company[field] && String(company[field]).trim().length > 0 ? 'text-white' : 'text-slate-500'}`}>
                      {company[field] && String(company[field]).trim().length > 0 ? <CheckCircle size={18} className="text-emerald-400" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-600 ml-0.5"></div>}
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    {(!company[field] || String(company[field]).trim().length === 0) && (
                      <button 
                        onClick={() => {
                          const el = document.getElementById(field) || (field === 'logo' ? logoInputRef.current : coverInputRef.current);
                          el?.focus();
                          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Add
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Media Uploads Module */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            >
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Brand Media</h3>
              
              <div className="space-y-4">
                <div onClick={() => coverInputRef.current?.click()} className="group cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors bg-slate-50/50 dark:bg-slate-800/20">
                  <input type="file" accept="image/*" className="hidden" ref={coverInputRef} onChange={(e) => handleFileUpload(e, 'coverBanner')} />
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden shadow-sm">
                    {company.coverBanner ? <img src={company.coverBanner} className="w-full h-full object-cover" alt="Cover preview" /> : <ImageIcon size={28} />}
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Update Cover Banner</p>
                  <p className="text-xs font-medium text-slate-500">1920x400px recommended</p>
                </div>
                
                <div onClick={() => logoInputRef.current?.click()} className="group cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors bg-slate-50/50 dark:bg-slate-800/20">
                  <input type="file" accept="image/*" className="hidden" ref={logoInputRef} onChange={(e) => handleFileUpload(e, 'logo')} />
                  <div className="w-16 h-16 bg-purple-50 dark:bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden shadow-sm">
                    {company.logo ? <img src={company.logo} className="w-full h-full object-cover" alt="Logo preview" /> : <Camera size={28} />}
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Update Company Logo</p>
                  <p className="text-xs font-medium text-slate-500">Square PNG or SVG</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
