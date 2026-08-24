import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Video, Users, CheckCircle, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const ScheduleModal = ({ isOpen, onClose, candidate }) => {
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Confirmation
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  if (!isOpen || !candidate) return null;

  const handleSchedule = () => {
    setStep(2);
    setTimeout(() => {
      toast.success(`Interview scheduled with ${candidate.name}!`);
      onClose();
      // Reset state after animation
      setTimeout(() => setStep(1), 500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        ></motion.div>
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center relative z-10">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Schedule Interview</h2>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">with {candidate.name}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full transition-colors shadow-sm"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 relative">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Meeting Type */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Interview Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold transition-all">
                        <Video size={24} /> Technical Screen
                      </button>
                      <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold transition-all">
                        <Users size={24} /> Culture Fit
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Select Date</label>
                      <div className="space-y-2">
                        {['Today', 'Tomorrow', 'Next Monday'].map(date => (
                          <button 
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all border ${
                              selectedDate === date 
                                ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/20' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-500/50'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Calendar size={16} className={selectedDate === date ? "text-indigo-100" : "text-slate-400"} />
                              {date}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Picker */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Select Time</label>
                      <div className="space-y-2">
                        {['10:00 AM', '1:30 PM', '4:00 PM'].map(time => (
                          <button 
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all border ${
                              selectedTime === time 
                                ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/20' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-500/50'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Clock size={16} className={selectedTime === time ? "text-indigo-100" : "text-slate-400"} />
                              {time}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSchedule}
                    className="w-full py-4 mt-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group"
                  >
                    Confirm Interview <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
                    className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle size={48} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Interview Scheduled!</h3>
                  <p className="text-slate-500 font-bold mb-6">
                    A calendar invite has been sent to {candidate.name} for {selectedDate} at {selectedTime}.
                  </p>
                  
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.8 }}
                      className="h-full bg-emerald-500 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScheduleModal;
