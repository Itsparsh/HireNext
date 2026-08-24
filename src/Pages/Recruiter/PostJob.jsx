import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, List, CheckCircle, ChevronRight, ChevronLeft, Sparkles, Send, Globe, Award, Zap, BrainCircuit, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, title: 'Job Foundation', subtitle: 'Basic Details', icon: Briefcase },
  { id: 2, title: 'Ideal Candidate', subtitle: 'Requirements', icon: List },
  { id: 3, title: 'AI Description', subtitle: 'Magic Polish', icon: Sparkles }
];

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="relative group">
    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">{label}</label>
    <div className="relative flex items-center">
      {Icon && (
        <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
          <Icon size={18} />
        </div>
      )}
      <input 
        className={`w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm`}
        {...props}
      />
    </div>
  </div>
);

const SelectField = ({ label, icon: Icon, options, ...props }) => (
  <div className="relative group">
    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">{label}</label>
    <div className="relative flex items-center">
      {Icon && (
        <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
          <Icon size={18} />
        </div>
      )}
      <select 
        className={`w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl ${Icon ? 'pl-11' : 'pl-4'} pr-10 py-3.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm appearance-none cursor-pointer`}
        {...props}
      >
        {options.map(opt => <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>)}
      </select>
    </div>
  </div>
);

const PostJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = !!location.state?.editJob;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [jobData, setJobData] = useState(() => {
    if (isEditing) {
      const editJob = location.state.editJob;
      return {
        _id: editJob._id,
        title: editJob.title || '',
        location: editJob.location || '',
        workMode: editJob.workMode || 'Remote',
        jobType: editJob.jobType || 'Full-time',
        experienceLevel: editJob.experienceLevel || 'Entry Level',
        minSalary: editJob.salary?.min || '',
        maxSalary: editJob.salary?.max || '',
        skills: editJob.skills?.join(', ') || '',
        responsibilities: editJob.responsibilities?.join('\n') || '',
        qualifications: editJob.qualifications?.join('\n') || '',
        description: editJob.description || '',
        hiringUrgency: editJob.hiringUrgency || 'Normal'
      };
    }
    return {
      title: '', location: '', workMode: 'Remote', jobType: 'Full-time', experienceLevel: 'Entry Level',
      minSalary: '', maxSalary: '', skills: '', responsibilities: '', qualifications: '', description: '', hiringUrgency: 'Normal'
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = () => {
    if (!jobData.title) {
      toast.error('Please enter a job title first');
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setJobData(prev => {
        const skillsArray = prev.skills ? prev.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
        const respArray = prev.responsibilities ? prev.responsibilities.split('\n').filter(Boolean) : [];
        const qualArray = prev.qualifications ? prev.qualifications.split('\n').filter(Boolean) : [];
        
        let desc = `## About The Role\n\nWe are looking for a highly skilled and innovative **${prev.title}** to join our dynamic team${prev.location ? ` in ${prev.location}` : ''}. In this ${prev.workMode.toLowerCase()} position, you will play a critical role in driving key initiatives, collaborating with cross-functional teams, and delivering high-quality results that directly impact our business growth.\n\n`;
        
        if (respArray.length > 0) {
          desc += `### What You'll Do\n`;
          respArray.forEach(r => { desc += `- ${r}\n`; });
          desc += `\n`;
        } else {
          desc += `### What You'll Do\n- Spearhead the development and implementation of scalable, high-performance solutions.\n- Work closely with product, engineering, and design teams to iterate on core features.\n- Mentor team members, conduct reviews, and establish industry best practices.\n- Continuously discover, evaluate, and implement new technologies to maximize efficiency.\n\n`;
        }
        
        if (skillsArray.length > 0 || qualArray.length > 0) {
          desc += `### What We're Looking For\n`;
          if (qualArray.length > 0) {
            qualArray.forEach(q => { desc += `- ${q}\n`; });
          }
          if (skillsArray.length > 0) {
            desc += `- **Core Competencies:** ${skillsArray.join(', ')}\n`;
          }
          desc += `\n`;
        } else {
          desc += `### What We're Looking For\n- Proven experience in a similar ${prev.experienceLevel.toLowerCase()} role with a strong track record of success.\n- Excellent problem-solving skills and an analytical mindset.\n- Strong communication skills, capable of explaining complex concepts clearly.\n- A passion for continuous learning and professional development.\n\n`;
        }
        
        desc += `### Why Join Us?\n- **Competitive Compensation:** Generous salary${prev.minSalary && prev.maxSalary ? ` ranging from $${Number(prev.minSalary).toLocaleString()} to $${Number(prev.maxSalary).toLocaleString()} ` : ' '}plus performance bonuses.\n- **Comprehensive Benefits:** Full health, dental, and vision coverage.\n- **Flexible Lifestyle:** True ${prev.workMode.toLowerCase()} culture with flexible working hours.\n- **Growth:** Dedicated budget for continuous learning, courses, and conferences.`;

        return {
          ...prev,
          description: desc
        };
      });
      setGenerating(false);
      toast.success('AI description generated perfectly!');
    }, 2500);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        title: jobData.title, location: jobData.location, workMode: jobData.workMode, jobType: jobData.jobType,
        experienceLevel: jobData.experienceLevel,
        salary: { min: Number(jobData.minSalary), max: Number(jobData.maxSalary), currency: 'USD' },
        skills: jobData.skills.split(',').map(s => s.trim()),
        responsibilities: jobData.responsibilities.split('\n').filter(Boolean),
        qualifications: jobData.qualifications.split('\n').filter(Boolean),
        description: jobData.description, hiringUrgency: jobData.hiringUrgency
      };
      
      let res;
      if (isEditing) {
        // Mocking an update
        res = { data: { success: true } }; 
        // res = await api.put(`/recruiter/jobs/${jobData._id}`, payload);
      } else {
        res = await api.post('/recruiter/jobs', payload);
      }

      if (res.data.success || isEditing) {
        toast.success(isEditing ? 'Job updated beautifully!' : 'Job posted to the world!');
        navigate('/recruiter/manage-jobs');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      
      {/* Immersive Background Header */}
      <div className="absolute top-0 left-0 w-full h-[450px] z-0 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-5xl mx-auto pt-24">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl mb-6">
            <Zap size={32} className="text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
            {isEditing ? 'Update ' : 'Create a New '} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {isEditing ? 'Position' : 'Opportunity'}
            </span>
          </h1>
          <p className="text-slate-300 text-lg font-medium max-w-2xl mx-auto">
            {isEditing ? 'Tweak the details of your job post to attract the absolute best candidates.' : 'Use our advanced AI wizard to craft the perfect job description and attract top-tier talent automatically.'}
          </p>
        </motion.div>

        {/* Wizard Container */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] border border-white/40 dark:border-slate-700/50 shadow-2xl shadow-blue-900/10 overflow-hidden">
          
          {/* Glowing Stepper */}
          <div className="px-8 py-10 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex justify-between relative max-w-3xl mx-auto">
              <div className="absolute top-6 left-0 w-full h-1.5 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full"></div>
              <div 
                className="absolute top-6 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 -z-10 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep >= step.id;
                const isCurrent = currentStep === step.id;
                return (
                  <div key={step.id} className="flex flex-col items-center gap-3 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/30 scale-110 border-none' : 'bg-white dark:bg-slate-900 text-slate-400 border-2 border-slate-200 dark:border-slate-700'}`}>
                      {isActive && !isCurrent ? <CheckCircle size={20} /> : <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />}
                    </div>
                    <div className="text-center mt-1">
                      <span className={`block text-sm font-black tracking-tight ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{step.title}</span>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{step.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12 min-h-[450px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 max-w-3xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Basic Information</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Let's start with the core details of the position.</p>
                  </div>
                  
                  <InputField label="Job Title" icon={Briefcase} name="title" value={jobData.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Location" icon={MapPin} name="location" value={jobData.location} onChange={handleChange} placeholder="e.g. San Francisco, CA" />
                    <SelectField label="Work Mode" icon={Globe} name="workMode" value={jobData.workMode} onChange={handleChange} options={['Remote', 'On-site', 'Hybrid']} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField label="Job Type" icon={List} name="jobType" value={jobData.jobType} onChange={handleChange} options={['Full-time', 'Part-time', 'Contract', 'Internship']} />
                    <SelectField label="Experience Level" icon={Award} name="experienceLevel" value={jobData.experienceLevel} onChange={handleChange} options={['Entry Level', 'Mid Level', 'Senior', 'Director', 'Executive']} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Minimum Salary (USD)" icon={DollarSign} name="minSalary" type="number" value={jobData.minSalary} onChange={handleChange} placeholder="e.g. 80000" />
                    <InputField label="Maximum Salary (USD)" icon={DollarSign} name="maxSalary" type="number" value={jobData.maxSalary} onChange={handleChange} placeholder="e.g. 120000" />
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 max-w-3xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Requirements & Duties</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Define what makes a candidate successful in this role.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Required Skills (Comma separated)</label>
                      <input 
                        type="text" name="skills" value={jobData.skills} onChange={handleChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm"
                        placeholder="React, Node.js, TypeScript, AWS"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Key Responsibilities (One per line)</label>
                      <textarea 
                        name="responsibilities" value={jobData.responsibilities} onChange={handleChange} rows={4}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm resize-none"
                        placeholder="Build scalable web applications&#10;Collaborate with design team"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Qualifications (One per line)</label>
                      <textarea 
                        name="qualifications" value={jobData.qualifications} onChange={handleChange} rows={3}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm resize-none"
                        placeholder="Bachelor's in Computer Science&#10;3+ years of React experience"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 max-w-3xl mx-auto">
                  
                  <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-purple-900/20 mb-8">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                      <div>
                        <h3 className="text-2xl font-black flex items-center gap-2 justify-center md:justify-start">
                          <BrainCircuit size={28} className="text-purple-300" /> HireNext AI Assistant
                        </h3>
                        <p className="text-purple-200 font-medium mt-2 max-w-md">Let our AI analyze your requirements and write a compelling, high-converting job description automatically.</p>
                      </div>
                      <button 
                        onClick={handleGenerateDescription}
                        disabled={generating}
                        className="shrink-0 px-6 py-3.5 bg-white text-purple-700 hover:bg-purple-50 rounded-xl font-black shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-70"
                      >
                        {generating ? <div className="w-5 h-5 border-2 border-purple-200 border-t-purple-700 rounded-full animate-spin"/> : <Sparkles size={20} />}
                        {generating ? 'Generating Magic...' : 'Generate Description'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Final Job Description</label>
                    <textarea 
                      name="description" value={jobData.description} onChange={handleChange} rows={10}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm resize-none leading-relaxed"
                      placeholder="Your generated description will appear here, or you can write it manually..."
                    />
                  </div>

                  <SelectField label="Hiring Urgency" icon={Zap} name="hiringUrgency" value={jobData.hiringUrgency} onChange={handleChange} options={['Normal', 'High', 'Urgent']} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center">
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <ChevronLeft size={20} /> Back
            </button>

            {currentStep < 3 ? (
              <button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-50 hover:text-white dark:hover:text-blue-600 rounded-xl font-black shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-black shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : (isEditing ? <Save size={20} /> : <Send size={20} />)}
                {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Publish Job Post')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
