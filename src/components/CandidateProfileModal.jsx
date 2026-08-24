import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Mail, Phone, Briefcase, GraduationCap, Award, ExternalLink, Download, MessageSquare, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CandidateResumePDF from './CandidateResumePDF';

const CandidateProfileModal = ({ isOpen, onClose, candidate }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadResume = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    toast.success(`Preparing ${candidate.name}'s Resume...`);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const blob = await pdf(<CandidateResumePDF candidate={candidate} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${candidate.name.replace(' ', '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate resume PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen || !candidate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        ></motion.div>
        
        {/* Slide-over Panel */}
        <motion.div 
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200 dark:border-slate-800"
        >
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-cyan-500 relative shrink-0">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pb-24">
            <div className="px-8 relative">
              {/* Profile Header */}
              <div className="flex items-end justify-between -mt-16 mb-8">
                <div className="flex items-end gap-6">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 shadow-xl overflow-hidden shrink-0">
                    <img src={candidate.avatar || `https://ui-avatars.com/api/?name=${candidate.name}&background=random`} alt={candidate.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="pb-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      {candidate.name} 
                      {candidate.matchScore > 90 && <Zap size={20} className="text-amber-500 fill-current" title="Top Match" />}
                    </h2>
                    <p className="text-lg font-bold text-slate-500 dark:text-slate-400">{candidate.role}</p>
                  </div>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="flex flex-wrap items-center gap-4 py-4 border-y border-slate-100 dark:border-slate-800/60 mb-8">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                  <MapPin size={16} className="text-indigo-500" /> {candidate.location || 'Remote'}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                  <Briefcase size={16} className="text-indigo-500" /> {candidate.experience || '4 Years'} Exp
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                  <Mail size={16} className="text-indigo-500" /> {candidate.name.split(' ')[0].toLowerCase()}@example.com
                </div>
              </div>

              {/* Content Grid */}
              <div className="space-y-10">
                {/* About */}
                <section>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Star size={18} className="text-blue-500" /> Executive Summary
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Passionate and highly driven {candidate.role} with a proven track record of delivering scalable solutions. 
                    Strongly focused on modern web architectures, user-centric design, and collaborating with cross-functional teams to exceed expectations.
                  </p>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award size={18} className="text-emerald-500" /> Top Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(candidate.skills || ['React', 'JavaScript', 'Node.js', 'UI/UX']).map(skill => (
                      <span key={skill} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Experience Timeline */}
                <section>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Briefcase size={18} className="text-purple-500" /> Experience
                  </h3>
                  <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1.5 w-6 h-6 bg-white dark:bg-slate-900 border-4 border-indigo-500 rounded-full"></div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{candidate.role}</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">{candidate.currentCompany || 'Tech Corp'} • 2022 - Present</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Led the migration of the legacy monolith to a microservices architecture, improving system scalability by 40%. Mentored junior developers and instituted strict code review policies.</p>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1.5 w-6 h-6 bg-white dark:bg-slate-900 border-4 border-slate-300 dark:border-slate-600 rounded-full"></div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">Software Engineer</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-bold mb-2">Previous Company Inc • 2019 - 2022</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Developed dynamic UIs using React.js and Redux. Reduced page load times by 2s by implementing code splitting and lazy loading.</p>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <GraduationCap size={18} className="text-amber-500" /> Education
                  </h3>
                  <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <GraduationCap size={24} className="text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">B.S. in Computer Science</h4>
                      <p className="text-slate-500 text-sm font-medium">University of Technology • Class of 2019</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="absolute bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 p-6 flex gap-4">
            <button 
              onClick={handleDownloadResume}
              className={`flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black rounded-xl transition-colors flex items-center justify-center gap-2 ${isDownloading ? 'opacity-75 cursor-wait' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              {isDownloading ? 'Generating...' : <><Download size={18} /> Download Resume</>}
            </button>
            <button 
              onClick={() => {
                onClose();
                navigate('/recruiter/messages', { state: { candidate } });
              }}
              className="flex-1 py-3.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} /> Message Candidate
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CandidateProfileModal;
