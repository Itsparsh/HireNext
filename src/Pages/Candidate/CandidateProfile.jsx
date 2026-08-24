import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '../../api';
import { useAuth } from '../../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Mail, Phone, ExternalLink, Download, 
  Briefcase, GraduationCap, BrainCircuit,
  CheckCircle, Code, Globe, Edit2, X, ChevronRight, ChevronLeft,
  UploadCloud, FileText, LayoutTemplate, Link as LinkIcon
} from 'lucide-react';

const SkillBadge = ({ name, level }) => {
  const getLevelColor = () => {
    switch(level) {
      case 'Expert': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Advanced': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getLevelColor()} flex items-center gap-1.5`}>
      {name}
      <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
      <span className="opacity-70 font-medium">{level}</span>
    </span>
  );
};

// Multi-step Profile Editor Modal
const ProfileEditorModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    title: initialData.title || '',
    location: initialData.location || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    about: initialData.about || '',
    resume: initialData.resume || '',
    photo: initialData.photo || '',
    experience: initialData.experience || [],
    education: initialData.education || [],
    skills: initialData.skills || [],
    projects: initialData.projects || []
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name || '',
        title: initialData.title || '',
        location: initialData.location || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        about: initialData.about || '',
        resume: initialData.resume || '',
        photo: initialData.photo || '',
        github: initialData.github || '',
        linkedin: initialData.linkedin || '',
        portfolio: initialData.portfolio || '',
        experience: initialData.experience || [],
        education: initialData.education || [],
        skills: initialData.skills || [],
        projects: initialData.projects || []
      });
      setStep(1);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await api.put('/profile', formData);
      onSave(formData);
      onClose();
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 sm:p-6"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Edit Profile</h2>
              <div className="flex items-center gap-2 mt-2 text-sm font-medium text-slate-500">
                <span className={step >= 1 ? "text-blue-600" : ""}>Basic Info</span>
                <ChevronRight size={14} className="text-slate-300" />
                <span className={step >= 2 ? "text-blue-600" : ""}>Experience</span>
                <ChevronRight size={14} className="text-slate-300" />
                <span className={step >= 3 ? "text-blue-600" : ""}>Education & Skills</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Form Content Scrollable */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2 flex gap-6 items-center">
                    <div>
                      <img src={formData.photo || "https://via.placeholder.com/150"} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Profile Photo (Max 5MB)</label>
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">About Me (Bio)</label>
                    <textarea name="about" value={formData.about} onChange={handleChange} rows="4" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none" placeholder="Write a short professional summary..."></textarea>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">GitHub URL</label>
                    <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-slate-100 placeholder-slate-400" placeholder="https://github.com/username" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn URL</label>
                    <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-slate-100 placeholder-slate-400" placeholder="https://linkedin.com/in/username" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Portfolio / Personal Website</label>
                    <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-slate-100 placeholder-slate-400" placeholder="https://yourwebsite.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Resume / CV (PDF Only, Max 5MB)</label>
                    <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'resume')} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {formData.resume && <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><CheckCircle size={12}/> Resume attached</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Professional Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">About Me Summary</label>
                  <textarea name="about" value={formData.about} onChange={handleChange} rows={5} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Work Experience</h3>
                {formData.experience.map((exp, i) => (
                  <div key={exp.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-4 relative group">
                    <button className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"><X size={16}/></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Job Title</label>
                        <input type="text" value={exp.title} onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[i].title = e.target.value;
                          setFormData({...formData, experience: newExp});
                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Company</label>
                        <input type="text" value={exp.company} onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[i].company = e.target.value;
                          setFormData({...formData, experience: newExp});
                        }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                        <textarea value={exp.description} onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[i].description = e.target.value;
                          setFormData({...formData, experience: newExp});
                        }} rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-slate-500 font-bold hover:border-blue-500 hover:text-blue-500 transition-colors">
                  + Add New Experience
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Education</h3>
                  {formData.education.map((edu, i) => (
                    <div key={edu.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-4 relative group mb-4">
                      <button className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"><X size={16}/></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Degree</label>
                          <input type="text" value={edu.degree} onChange={(e) => {
                            const newEdu = [...formData.education];
                            newEdu[i].degree = e.target.value;
                            setFormData({...formData, education: newEdu});
                          }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Institution</label>
                          <input type="text" value={edu.school} onChange={(e) => {
                            const newEdu = [...formData.education];
                            newEdu[i].school = e.target.value;
                            setFormData({...formData, education: newEdu});
                          }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-slate-500 font-bold hover:border-blue-500 hover:text-blue-500 transition-colors">
                    + Add New Education
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Projects</h3>
                  {(formData.projects || []).map((proj, i) => (
                    <div key={proj._id || i} className="p-5 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-4 relative group mb-4">
                      <button onClick={() => {
                        const newProj = formData.projects.filter((_, idx) => idx !== i);
                        setFormData({...formData, projects: newProj});
                      }} className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"><X size={16}/></button>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Project Title</label>
                          <input type="text" value={proj.title || ''} onChange={(e) => {
                            const newProj = [...formData.projects];
                            newProj[i].title = e.target.value;
                            setFormData({...formData, projects: newProj});
                          }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                          <textarea rows={2} value={proj.description || ''} onChange={(e) => {
                            const newProj = [...formData.projects];
                            newProj[i].description = e.target.value;
                            setFormData({...formData, projects: newProj});
                          }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Link URL</label>
                            <input type="text" value={proj.link || ''} onChange={(e) => {
                              const newProj = [...formData.projects];
                              newProj[i].link = e.target.value;
                              setFormData({...formData, projects: newProj});
                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Tech Stack (comma separated)</label>
                            <input type="text" value={proj.tech || ''} onChange={(e) => {
                              const newProj = [...formData.projects];
                              newProj[i].tech = e.target.value;
                              setFormData({...formData, projects: newProj});
                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => {
                    const newProj = [...(formData.projects || []), { title: '', description: '', link: '', tech: '' }];
                    setFormData({...formData, projects: newProj});
                  }} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-slate-500 font-bold hover:border-blue-500 hover:text-blue-500 transition-colors">
                    + Add New Project
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center rounded-b-3xl">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
                <ChevronLeft size={18} /> Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
                <CheckCircle size={18} /> Save & Publish
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const initialProfileData = {
  name: 'Alex Johnson',
  title: 'Senior Full Stack Developer',
  location: 'San Francisco, CA',
  email: 'alex.j@example.com',
  phone: '+1 (555) 123-4567',
  about: "I'm a passionate Full Stack Developer with over 6 years of experience building scalable web applications. I specialize in the MERN stack and have a strong focus on user experience and performance optimization. When I'm not coding, you can find me writing technical blog posts or contributing to open-source projects.",
  aiScore: { total: 94 },
  profileCompletion: 85,
  skills: [
    { id: 1, name: 'React', level: 'Expert' },
    { id: 2, name: 'Node.js', level: 'Expert' },
    { id: 3, name: 'TypeScript', level: 'Advanced' },
    { id: 4, name: 'MongoDB', level: 'Advanced' },
    { id: 5, name: 'Tailwind CSS', level: 'Expert' },
    { id: 6, name: 'GraphQL', level: 'Intermediate' }
  ],
  experience: [
    {
      id: 1,
      title: 'Senior Frontend Engineer',
      company: 'TechFlow Solutions',
      period: '2021 - Present',
      description: 'Led the frontend team of 5 developers in rebuilding the core SaaS product using React and Redux. Improved application performance by 40% and reduced bundle size by 25%.'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      period: '2018 - 2021',
      description: 'Developed and maintained multiple client projects using the MERN stack. Implemented real-time features using Socket.io and integrated various payment gateways.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'M.S. Computer Science',
      school: 'Stanford University',
      period: '2016 - 2018'
    },
    {
      id: 2,
      degree: 'B.S. Software Engineering',
      school: 'UC Berkeley',
      period: '2012 - 2016'
    }
  ]
};


const CandidateProfile = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { logout } = useAuth();
  
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/profile');
      setProfileData(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load profile data. Using mock data instead.');
      setProfileData(MOCK_PROFILE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDownloadCV = () => {
    if (profileData?.resume) {
      // Assuming resume is stored as a base64 Data URL (e.g., data:application/pdf;base64,...)
      try {
        const a = document.createElement('a');
        a.href = profileData.resume;
        a.download = `${profileData.name.replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success('Resume downloaded successfully!');
      } catch (err) {
        toast.error('Failed to download resume file.');
      }
    } else {
      toast.error('No resume uploaded yet. Please add one in Edit Profile.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
        <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl"></div>
        <div className="h-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl mt-8"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl mt-8"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">Could not load profile.</p>
        <button onClick={fetchProfile} className="px-6 py-2 bg-blue-600 text-white rounded-xl">Retry</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header Profile Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative group">
        <div className="h-48 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute top-6 right-6 z-10">
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg border border-white/20 hover:scale-105"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>
        </div>
        
        <div className="px-8 pb-10 relative">
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div className="flex items-end gap-6 -mt-16">
              <div className="relative">
                <img 
                  src={profileData.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=0D8ABC&color=fff&size=200`}
                  alt="Profile" 
                  className="w-32 h-32 rounded-2xl ring-4 ring-white dark:ring-slate-900 shadow-xl object-cover bg-white dark:bg-slate-900"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center" title="Verified Professional">
                  <CheckCircle size={14} />
                </div>
              </div>
              <div className="mb-2 flex-1 pt-16 sm:pt-0">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  {profileData.name}
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full flex items-center gap-1 border border-blue-200 dark:border-blue-800">
                    <CheckCircle size={12}/> Verified
                  </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mt-1">{profileData.title}</p>
              </div>
            </div>
            
            <div className="mb-2 flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button onClick={handleDownloadCV} className="flex-1 sm:flex-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors text-slate-700 dark:text-slate-300 shadow-sm flex items-center justify-center gap-2">
                <Download size={18} /> Download CV
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800"><MapPin size={18} className="text-blue-500" /> {profileData.location}</span>
            <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800"><Mail size={18} className="text-blue-500" /> {profileData.email}</span>
            <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800"><Phone size={18} className="text-blue-500" /> {profileData.phone}</span>
          </div>
          
          <div className="mt-6 flex gap-3">
            {profileData.github ? (
              <a href={profileData.github.startsWith('http') ? profileData.github : `https://${profileData.github}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors"><Code size={20} /></a>
            ) : (
              <button onClick={() => toast.error('Please add your GitHub link in Edit Profile')} className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 transition-colors"><Code size={20} /></button>
            )}
            
            {profileData.portfolio ? (
              <a href={profileData.portfolio.startsWith('http') ? profileData.portfolio : `https://${profileData.portfolio}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors"><ExternalLink size={20} /></a>
            ) : (
              <button onClick={() => toast.error('Please add your Portfolio link in Edit Profile')} className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 transition-colors"><ExternalLink size={20} /></button>
            )}
            
            {profileData.linkedin ? (
              <a href={profileData.linkedin.startsWith('http') ? profileData.linkedin : `https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors"><Globe size={20} /></a>
            ) : (
              <button onClick={() => toast.error('Please add your LinkedIn link in Edit Profile')} className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 transition-colors"><Globe size={20} /></button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">About</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line text-[15px]">
              {profileData.about}
            </p>
          </div>

          {/* Experience */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <Briefcase size={22} className="text-blue-600" /> Work Experience
            </h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.15rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
              
              {(profileData.experience || []).map((exp, index) => (
                <div key={exp.id || index} className="relative flex items-start gap-6">
                  <div className="absolute left-0 w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-100 dark:bg-blue-900 flex items-center justify-center shadow-sm z-10">
                    <Briefcase size={14} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="w-full ml-12">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-3 text-blue-700 bg-blue-50 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50 uppercase tracking-widest">{exp.period}</span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{exp.title}</h3>
                    <p className="text-[15px] font-bold text-slate-500 dark:text-slate-400 mb-3">{exp.company}</p>
                    <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{exp.description}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
          
          {/* Projects / Portfolio Snippet */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <LayoutTemplate size={22} className="text-indigo-500" /> Featured Projects
            </h2>
            
            {profileData.projects && profileData.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.projects.map((proj, idx) => (
                  <div key={proj._id || idx} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col h-full">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-indigo-600 dark:text-indigo-400">
                      <Code size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{proj.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-grow">{proj.description}</p>
                    
                    {proj.tech && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tech.split(',').map(tech => (
                          <span key={tech} className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md uppercase tracking-wider">{tech.trim()}</span>
                        ))}
                      </div>
                    )}
                    
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mt-auto">
                        <LinkIcon size={14} /> View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <LayoutTemplate size={40} className="mx-auto text-slate-400 mb-3" />
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">No Projects Added</h3>
                <p className="text-sm text-slate-500 mb-4">Showcase your best work to stand out to recruiters.</p>
                <button onClick={() => setIsEditorOpen(true)} className="px-5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 transition-colors">
                  Add Project
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          
          {/* Profile Completion */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Profile Strength</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Complete your profile to increase your visibility to recruiters by 40%.</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-black text-emerald-600">{profileData.profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-4 overflow-hidden">
              <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${profileData.profileCompletion}%` }}></div>
            </div>
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Complete Profile
            </button>
          </div>

          {/* AI Resume Score */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 opacity-10">
              <BrainCircuit size={160} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-4">AI Insight</div>
              <h2 className="text-2xl font-black mb-1">Resume Score</h2>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-6xl font-black leading-none">{profileData.aiScore?.total || 94}</span>
                <span className="text-blue-200 font-bold mb-1">/ 100</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2 mb-6">
                <div className="bg-white h-2 rounded-full transition-all duration-1000" style={{ width: `${profileData.aiScore?.total || 94}%` }}></div>
              </div>
              <ul className="space-y-3 text-sm font-medium text-blue-100">
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" /> 
                  Highly ATS Compatible format detected.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" /> 
                  Strong Keyword Density for "Full Stack Developer".
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-300 flex items-center justify-center text-[10px] font-black text-amber-300 shrink-0 mt-0.5">!</div> 
                  Consider adding metrics to experience bullet points.
                </li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6">Top Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {(profileData.skills || []).map((skill, index) => (
                <SkillBadge 
                  key={skill.id || index} 
                  name={skill.name} 
                  level={skill.level} 
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-500" /> Education
            </h2>
            <div className="space-y-6">
              {(profileData.education || []).map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                  <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{edu.degree}</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{edu.school}</p>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wide">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProfileEditorModal 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        initialData={profileData}
        onSave={(data) => {
          setProfileData(data);
          fetchProfile(); 
        }} 
      />

    </div>
  );
};

export default CandidateProfile;
