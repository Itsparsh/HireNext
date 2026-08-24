import React from 'react';

const SocialButton = ({ icon, label, onClick, isLoading, provider, disabled }) => {
  const isGoogle = provider === 'google';
  
  return (
    <button 
      onClick={onClick}
      type="button" 
      disabled={isLoading || disabled}
      className={`w-full relative flex justify-center items-center py-3.5 px-4 border-2 rounded-xl shadow-sm text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden
        ${isGoogle 
          ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300' 
          : 'border-[#0A66C2] bg-[#0A66C2] text-white hover:bg-[#004182] hover:border-[#004182]'
        }
      `}
    >
      {/* Ripple Effect Background (Subtle) */}
      <div className={`absolute inset-0 opacity-0 group-active:opacity-10 transition-opacity duration-300 ${isGoogle ? 'bg-black dark:bg-white' : 'bg-white'}`} />
      
      {isLoading ? (
        <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${isGoogle ? 'border-slate-400 border-t-slate-700 dark:border-slate-600 dark:border-t-white' : 'border-white/40 border-t-white'}`}></div>
      ) : (
        <>
          <span className="mr-2.5 z-10">{icon}</span>
          <span className="z-10">{label}</span>
        </>
      )}
    </button>
  );
};

export default SocialButton;
