import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingInput from '../../Component/Auth/FloatingInput';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Mock API call for OTP/Email Sent
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center p-4">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        
        <Link to="/login" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to login
        </Link>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="mb-8">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                  <Mail size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Forgot Password?</h1>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  No worries, we'll send you reset instructions. Please enter the email associated with your account.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <FloatingInput
                  id="reset_email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required={true}
                  className="mb-8"
                />

                <button 
                  type="submit" 
                  disabled={isLoading || !email}
                  className="w-full group relative flex items-center justify-center py-4 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold text-sm overflow-hidden transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className={`transition-all duration-300 ${isLoading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} flex items-center gap-2`}>
                    Reset Password
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </motion.div>
                <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping"></div>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Check your email</h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-[280px] mx-auto">
                We've sent a 6-digit OTP code to <br/>
                <span className="text-slate-900 dark:text-white font-bold">{email}</span>
              </p>
              
              <Link to="/verify-otp" className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                Enter OTP Code
              </Link>
              
              <div className="mt-8">
                <p className="text-xs font-semibold text-slate-500">
                  Didn't receive the email?{" "}
                  <button onClick={() => setIsSent(false)} className="text-blue-600 hover:text-blue-700">Click to resend</button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default ForgotPassword;
