import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, ArrowRight, User, Building, Briefcase, Users, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StepCard = ({ stepNumber, title, description, icon: Icon, isCompleted, isActive, onClick, onAction, actionText }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative p-6 rounded-3xl border transition-all cursor-pointer overflow-hidden ${
        isActive 
          ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 scale-[1.02] z-10' 
          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
      }`}
    >
      {/* Background Decor */}
      {isActive && <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>}
      
      <div className="flex items-start gap-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg transition-colors ${
          isCompleted 
            ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
            : isActive 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
        }`}>
          {isCompleted ? <CheckCircle size={24} /> : stepNumber}
        </div>
        
        <div className="flex-1">
          <h3 className={`text-xl font-black mb-2 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
            {title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
            {description}
          </p>
          
          {isActive && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <button 
                onClick={(e) => { e.stopPropagation(); onAction(); }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {actionText} <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
        
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 opacity-20 ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
          <Icon size={48} />
        </div>
      </div>
    </div>
  );
};

const GettingStarted = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]); // Assuming step 1 is done for demo
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();

  const handleStepComplete = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    if (activeStep < 4) setActiveStep(activeStep + 1);
  };

  const steps = [
    {
      id: 1,
      title: "Set up your Recruiter Profile",
      description: "Upload a professional headshot, add your contact details, and write a compelling bio so candidates know who they're talking to.",
      icon: User,
      actionText: "Edit Profile",
      actionRoute: "/recruiter/settings"
    },
    {
      id: 2,
      title: "Complete Company Details",
      description: "Tell candidates about your company culture, mission, and benefits. A strong employer brand increases application rates by up to 50%.",
      icon: Building,
      actionText: "Update Company",
      actionRoute: "/recruiter/settings" // Assuming company tab is in settings
    },
    {
      id: 3,
      title: "Post your first Job Opening",
      description: "Use our AI-powered job description generator to quickly draft an engaging listing and start attracting top talent immediately.",
      icon: Briefcase,
      actionText: "Create Job Post",
      actionRoute: "/recruiter/post-job"
    },
    {
      id: 4,
      title: "Invite your Hiring Team",
      description: "Recruitment is a team sport! Invite hiring managers and interviewers to collaborate on candidate pipelines and share feedback.",
      icon: Users,
      actionText: "Manage Team",
      actionRoute: "/recruiter/team"
    }
  ];

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 px-6 lg:px-10 max-w-[1400px] mx-auto pt-10">
        
        {/* Header Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">HireNext</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
              Let's get your workspace set up so you can start hiring the world's best talent. Complete these quick steps to unlock the full potential of our platform.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6 shrink-0">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Your Progress</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{completedSteps.length}</span>
                <span className="text-slate-500 font-bold">/ {steps.length}</span>
              </div>
            </div>
            
            <div className="w-24 h-24 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * progressPercentage) / 100}
                  className="text-blue-600 dark:text-blue-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                {progressPercentage === 100 ? <Star size={24} className="fill-amber-400 text-amber-400" /> : <Play size={24} className="ml-1" />}
              </div>
            </div>
          </div>
        </div>

        {/* Video Tutorial Section */}
        <div 
          onClick={() => setIsVideoOpen(true)}
          className="relative rounded-[2rem] overflow-hidden bg-slate-900 mb-16 shadow-2xl border-4 border-slate-800 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" 
            alt="Tutorial" 
            className="w-full h-[400px] object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <Play size={32} className="ml-2 fill-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Watch the 2-minute overview</h2>
            <p className="text-slate-300 max-w-xl text-lg">Learn how to navigate the dashboard, review AI match scores, and move candidates through the Kanban pipeline.</p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {steps.slice(0, 2).map((step) => (
              <StepCard 
                key={step.id}
                stepNumber={step.id}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isCompleted={completedSteps.includes(step.id)}
                isActive={activeStep === step.id}
                actionText={step.actionText}
                onClick={() => setActiveStep(step.id)}
                onAction={() => {
                  handleStepComplete(step.id);
                  navigate(step.actionRoute);
                }}
              />
            ))}
          </div>
          <div className="space-y-4">
            {steps.slice(2, 4).map((step) => (
              <StepCard 
                key={step.id}
                stepNumber={step.id}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isCompleted={completedSteps.includes(step.id)}
                isActive={activeStep === step.id}
                actionText={step.actionText}
                onClick={() => setActiveStep(step.id)}
                onAction={() => {
                  handleStepComplete(step.id);
                  navigate(step.actionRoute);
                }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-700 aspect-video"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X size={24} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Product Overview" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GettingStarted;
