import React, { useState, useEffect } from 'react';
import { Mail, User, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from './FloatingInput';
import PasswordInput from './PasswordInput';
import { Link } from 'react-router-dom';

const LoginForm = ({ authMode, name, setName, email, setEmail, password, setPassword, isLoading, onSubmit, activeTab, errors }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Trick to defeat Safari/Chrome aggressive autofill:
  // Render inputs as readOnly on mount for a fraction of a second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-1" autoComplete="off">
      
      {/* 
        Honeypot inputs to trick aggressive browser autofill 
        Browsers often fill the first password/email fields they find.
      */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input type="text" name="prevent_autofill_user" tabIndex="-1" autoComplete="off" />
        <input type="email" name="prevent_autofill_email" tabIndex="-1" autoComplete="off" />
        <input type="password" name="prevent_autofill_password" tabIndex="-1" autoComplete="off" />
      </div>
      
      {/* Full Name Input - Only for Register */}
      <AnimatePresence>
        {authMode === 'register' && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden origin-top"
          >
            <FloatingInput
              id="name_field"
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={User}
              required={true}
              error={errors?.name}
              success={name.length > 2 && !errors?.name}
              autoComplete="off"
              readOnly={!isMounted}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingInput
        id="email_field_auth"
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        required={true}
        error={errors?.email}
        success={email.includes('@') && !errors?.email}
        autoComplete="off"
        readOnly={!isMounted}
      />

      <PasswordInput
        id="pass_field_auth"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors?.password}
        showStrength={authMode === 'register'}
        autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
        readOnly={!isMounted}
      />

      {authMode === 'login' && (
        <div className="flex items-center justify-between pt-2 pb-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setRememberMe(!rememberMe)}>
            <div className="relative flex items-center justify-center w-4 h-4">
              <input 
                id="remember" 
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="peer appearance-none w-4 h-4 border-2 border-slate-300 dark:border-slate-600 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-colors" 
              />
              <CheckCircle2 size={12} className={`absolute text-white pointer-events-none transition-opacity ${rememberMe ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <label htmlFor="remember" className="text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Forgot Password?
          </Link>
        </div>
      )}

      {authMode === 'register' && (
        <p className="text-[11px] text-slate-500 pb-3 pt-1">
          By registering, you agree to our <a href="#" className="text-blue-600 font-medium hover:underline">Terms</a> and <a href="#" className="text-blue-600 font-medium hover:underline">Privacy Policy</a>.
        </p>
      )}

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full group relative flex items-center justify-center py-4 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold text-sm overflow-hidden transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        <span className={`transition-all duration-300 ${isLoading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} flex items-center gap-2`}>
          {authMode === 'login' ? 'Sign In' : 'Create Account'}
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </span>
        
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
