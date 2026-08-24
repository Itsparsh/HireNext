import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PasswordInput from '../../Component/Auth/PasswordInput';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password reset successfully!");
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="absolute top-[30%] left-[10%] w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        <div className="mb-8">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
            <KeyRound size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Create new password</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
            Your new password must be unique from those previously used.
          </p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          
          <PasswordInput
            id="new_pass_field"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength={true}
          />
          
          <div className="mt-4">
            <PasswordInput
              id="confirm_pass_field"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showStrength={false}
              error={confirmPassword && password !== confirmPassword ? "Passwords do not match" : null}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !password || !confirmPassword}
            className="w-full mt-6 group relative flex items-center justify-center py-4 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold text-sm overflow-hidden transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className={`transition-all duration-300 ${isLoading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} flex items-center gap-2`}>
              Reset Password
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
