import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      return toast.error('Please enter a 6-digit code');
    }

    setIsLoading(true);
    // Mock API Call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Verification successful!');
      navigate('/reset-password');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        <Link to="/forgot-password" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Verify your email</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
            We sent a 6-digit verification code to your email. Enter it below to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-black rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:border-emerald-500 outline-none transition-all shadow-sm"
              />
            ))}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || otp.join('').length !== 6}
            className="w-full group relative flex items-center justify-center py-4 px-4 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 font-bold text-sm overflow-hidden transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className={`transition-all duration-300 ${isLoading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} flex items-center gap-2`}>
              Verify Code
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs font-semibold text-slate-500">
          Didn't receive the code? <button className="text-emerald-600 hover:text-emerald-700">Resend (00:59)</button>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
