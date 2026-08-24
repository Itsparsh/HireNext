import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingInput = ({
  id,
  type = 'text',
  label,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  required = true,
  autoComplete = 'off',
  disabled = false,
  readOnly = false,
  className = '',
  success = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || (value && value.length > 0);

  return (
    <div className={`relative mb-5 ${className}`}>
      <div className="relative group flex items-center">
        {Icon && (
          <div className={`absolute left-4 z-10 transition-colors duration-300 ${isFocused ? 'text-blue-600 dark:text-blue-400' : error ? 'text-red-500' : 'text-slate-400'}`}>
            <Icon size={18} />
          </div>
        )}
        
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          className={`peer w-full bg-slate-50 dark:bg-slate-900/50 border-2 rounded-xl px-4 py-3.5 transition-all outline-none text-slate-900 dark:text-white font-medium shadow-sm backdrop-blur-sm
            ${Icon ? 'pl-11' : ''} 
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-red-900/50 dark:focus:border-red-500' 
              : success
                ? 'border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-emerald-900/50 dark:focus:border-emerald-500'
                : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-800 dark:focus:border-blue-500'
            }
            ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}
          `}
        />
        
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 font-medium
            ${Icon ? 'ml-7' : ''}
            ${isActive 
              ? '-top-2.5 text-[11px] bg-slate-50 dark:bg-slate-900 px-1.5 rounded-sm' 
              : 'top-3.5 text-sm'
            }
            ${error 
              ? 'text-red-500' 
              : isFocused 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-500'
            }
          `}
        >
          {label} {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {/* Validation Icons */}
        <div className="absolute right-4 flex items-center gap-2">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-red-500"
              >
                <AlertCircle size={18} />
              </motion.div>
            )}
            {!error && success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-emerald-500"
              >
                <CheckCircle2 size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Inline Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="text-red-500 text-xs font-semibold mt-1.5 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingInput;
