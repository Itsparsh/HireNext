import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Shield, User, Bell, Building, Key, Smartphone, Laptop, LogOut, Check, AlertTriangle, Eye, EyeOff, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const RecruiterSettings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'security');
  const [toastMessage, setToastMessage] = useState(null);
  
  // States to make inputs interactive
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [applicantAlerts, setApplicantAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Settings securely saved & encrypted.");
  };

  const renderSecurityTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* 2FA Section */}
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10"></div>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Shield className="text-emerald-500" size={24} /> Advanced Security
            </h3>
            <p className="text-sm font-medium text-slate-500 max-w-lg">Protect your account with high-grade security measures. We use AES-256 encryption for all sensitive data.</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1.5">
            <Check size={14} /> Secured
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <Smartphone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
              <p className="text-xs text-slate-500 mt-1">Require a secure code from your mobile authenticator app.</p>
            </div>
          </div>
          <button 
            onClick={() => setTwoFactorAuth(!twoFactorAuth)}
            className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${twoFactorAuth ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
          >
            <motion.div 
              layout 
              initial={false}
              animate={{ x: twoFactorAuth ? 24 : 0 }}
              className="w-6 h-6 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <Bell size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Unrecognized Login Alerts</h4>
              <p className="text-xs text-slate-500 mt-1">Get notified immediately if a login occurs from a new IP address.</p>
            </div>
          </div>
          <button 
            onClick={() => setLoginAlerts(!loginAlerts)}
            className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${loginAlerts ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
          >
            <motion.div 
              layout 
              initial={false}
              animate={{ x: loginAlerts ? 24 : 0 }}
              className="w-6 h-6 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
          <Key className="text-blue-500" size={24} /> Change Password
        </h3>
        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Password</label>
            <div className="relative">
              <input 
                type={showCurrentPassword ? "text" : "password"} 
                defaultValue="password123"
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
              <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Secure Password</label>
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"} 
                placeholder="Enter new password"
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2">Must be at least 12 characters, include numbers, symbols, and uppercase letters.</p>
          </div>
          <button type="submit" className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2">
            <Save size={18} /> Update Password
          </button>
        </form>
      </div>

      {/* Active Sessions */}
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Laptop className="text-purple-500" size={24} /> Active Sessions
          </h3>
          <button onClick={() => showToast("All other sessions securely terminated.")} className="text-sm font-bold text-red-500 hover:text-red-600">Revoke All</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 ring-1 ring-emerald-500/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Laptop size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Windows 11 • Chrome Browser</h4>
                <p className="text-xs text-slate-500 mt-0.5">Current Session • IP: 192.168.1.45</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Active Now</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-500 flex items-center justify-center">
                <Smartphone size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">iPhone 14 Pro • Safari</h4>
                <p className="text-xs text-slate-500 mt-0.5">Last active: 2 hours ago • IP: 104.28.23.11</p>
              </div>
            </div>
            <button onClick={() => showToast("Device session revoked successfully.")} className="text-slate-400 hover:text-red-500 transition-colors p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProfileTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10"></div>
        
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-8">
          <User className="text-blue-500" size={24} /> Personal Information
        </h3>

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl group-hover:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <span className="text-xs font-bold text-white tracking-widest uppercase">Change</span>
              </div>
            </div>
            <div>
              <div className="flex gap-3 mb-2">
                <button type="button" className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-transform">Upload New</button>
                <button type="button" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 rounded-xl font-bold text-sm transition-colors">Remove</button>
              </div>
              <p className="text-xs font-medium text-slate-500">Recommended size: 500x500px (JPG, PNG)</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
              <input type="text" defaultValue="Sarah" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
              <input type="text" defaultValue="Jenkins" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" defaultValue="sarah.jenkins@techflow.com" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed font-medium" disabled />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input type="tel" defaultValue="+1 (555) 019-2834" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Professional Bio</label>
            <textarea 
              rows="4" 
              defaultValue="Lead Technical Recruiter at TechFlow Inc. Passionate about building world-class engineering teams and fostering inclusive workplace cultures."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium resize-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-end">
            <button type="submit" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-105 active:scale-95">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );

  const renderCompanyTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -z-10"></div>
        
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-8">
          <Building className="text-indigo-500" size={24} /> Company Information
        </h3>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
              <input type="text" defaultValue="TechFlow Inc." className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Website URL</label>
              <input type="text" defaultValue="https://techflow.example.com" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Industry</label>
              <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium">
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Size</label>
              <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" defaultValue="51-200 employees">
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option>201-500 employees</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Description</label>
            <textarea 
              rows="4" 
              defaultValue="TechFlow Inc. is a leading provider of innovative software solutions, empowering businesses to streamline their workflows and accelerate digital transformation."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium resize-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-end">
            <button type="submit" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-105 active:scale-95">
              <Save size={18} /> Save Company Info
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );

  const renderNotificationsTab = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10"></div>
        
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-8">
          <Bell className="text-amber-500" size={24} /> Notification Preferences
        </h3>

        <div className="space-y-4">
          
          <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">New Applicant Alerts</h4>
              <p className="text-xs text-slate-500 mt-1">Get an email instantly when a candidate applies to your jobs.</p>
            </div>
            <button 
              onClick={() => setApplicantAlerts(!applicantAlerts)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${applicantAlerts ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <motion.div layout initial={false} animate={{ x: applicantAlerts ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
            </button>
          </div>

          <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Interview Reminders</h4>
              <p className="text-xs text-slate-500 mt-1">Receive alerts 1 hour before scheduled interviews.</p>
            </div>
            <button 
              onClick={() => setInterviewReminders(!interviewReminders)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${interviewReminders ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <motion.div layout initial={false} animate={{ x: interviewReminders ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
            </button>
          </div>

          <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Weekly Summary Report</h4>
              <p className="text-xs text-slate-500 mt-1">A weekly email summarizing applicant volume and pipeline metrics.</p>
            </div>
            <button 
              onClick={() => setWeeklyReport(!weeklyReport)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${weeklyReport ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <motion.div layout initial={false} animate={{ x: weeklyReport ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
            </button>
          </div>

          <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Product Updates</h4>
              <p className="text-xs text-slate-500 mt-1">News about new features and platform improvements.</p>
            </div>
            <button 
              onClick={() => setProductUpdates(!productUpdates)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${productUpdates ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <motion.div layout initial={false} animate={{ x: productUpdates ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
            </button>
          </div>
          
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'security': return renderSecurityTab();
      case 'profile': return renderProfileTab();
      case 'company': return renderCompanyTab();
      case 'notifications': return renderNotificationsTab();
      default: return null;
    }
  };

  const tabs = [
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

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

      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-40 right-0 w-[800px] h-[800px] bg-slate-600/5 dark:bg-slate-500/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto pt-16 md:pt-24 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Settings Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <Settings size={14} className="text-slate-500" /> Preferences
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Settings</h1>
          </motion.div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-3 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if(tab.id !== 'security') showToast(`${tab.label} module loaded securely.`);
                  }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all relative overflow-hidden ${
                    isActive ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-500 relative z-10' : 'relative z-10'} />
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div layoutId="activeTabIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full min-w-0">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default RecruiterSettings;
