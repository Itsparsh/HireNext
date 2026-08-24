import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import FloatingInput from './FloatingInput';
import { motion, AnimatePresence } from 'framer-motion';

const PasswordInput = ({ 
  id, 
  label = "Password", 
  value, 
  onChange, 
  error, 
  showStrength = false,
  required = true,
  autoComplete = "new-password",
  readOnly = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [strength, setStrength] = useState(0);

  // Check Caps Lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate Password Strength
  useEffect(() => {
    if (!showStrength) return;
    
    let score = 0;
    if (!value) return setStrength(0);
    if (value.length > 7) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    
    setStrength(score);
  }, [value, showStrength]);

  const strengthColors = ['bg-slate-200 dark:bg-slate-700', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="relative mb-5">
      <div className="relative">
        <FloatingInput
          id={id}
          type={showPassword ? 'text' : 'password'}
          label={label}
          value={value}
          onChange={onChange}
          error={error}
          icon={Lock}
          required={required}
          autoComplete={autoComplete}
          readOnly={readOnly}
          className="mb-0" // override margin
        />
        
        {/* Toggle Visibility */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-20"
          tabIndex="-1"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {capsLockActive && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold mt-2 ml-1"
          >
            <AlertTriangle size={14} />
            <span>Caps Lock is ON</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strength Meter */}
      {showStrength && (
        <div className="mt-2.5 px-1">
          <div className="flex gap-1 mb-1.5 h-1.5">
            {[1, 2, 3, 4].map((level) => (
              <div 
                key={level} 
                className={`flex-1 rounded-full transition-colors duration-500 ${strength >= level ? strengthColors[strength] : strengthColors[0]}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
            <span className={strength > 0 ? strengthColors[strength].replace('bg-', 'text-') : 'text-slate-400'}>
              {value ? strengthLabels[strength] : 'Enter password'}
            </span>
            <span className="text-slate-400">8+ Chars, 1 Upper, 1 Num, 1 Symbol</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
