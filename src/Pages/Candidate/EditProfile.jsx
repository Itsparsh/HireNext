import { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Code, UploadCloud, 
  CheckCircle, ChevronRight, ChevronLeft, Save
} from 'lucide-react';

const EditProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const steps = [
    { id: 1, name: 'Personal Details', icon: User },
    { id: 2, name: 'Experience', icon: Briefcase },
    { id: 3, name: 'Education', icon: GraduationCap },
    { id: 4, name: 'Skills & Portfolio', icon: Code },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (currentStep < 4) setCurrentStep(currentStep + 1);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Edit Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Update your information to get better AI job recommendations.</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900 px-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                  isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle size={20} /> : <step.icon size={20} />}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-8 animate-fade-in-up">
        
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <img 
                  src="https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff&size=128" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm">
                  <UploadCloud size={16} />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">Profile Picture</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">PNG, JPG up to 5MB. Recommended size 256x256px.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input type="text" id="firstName" className="peer w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors text-slate-900 dark:text-white" placeholder=" " defaultValue="Alex" />
                <label htmlFor="firstName" className="absolute left-4 top-3 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white dark:peer-focus:bg-slate-900 peer-focus:px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent bg-white dark:bg-slate-800 px-1 -top-2.5 text-xs">First Name</label>
              </div>
              <div className="relative">
                <input type="text" id="lastName" className="peer w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors text-slate-900 dark:text-white" placeholder=" " defaultValue="Johnson" />
                <label htmlFor="lastName" className="absolute left-4 top-3 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white dark:peer-focus:bg-slate-900 peer-focus:px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent bg-white dark:bg-slate-800 px-1 -top-2.5 text-xs">Last Name</label>
              </div>
              <div className="relative md:col-span-2">
                <input type="text" id="headline" className="peer w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors text-slate-900 dark:text-white" placeholder=" " defaultValue="Senior React Developer | UI/UX Enthusiast" />
                <label htmlFor="headline" className="absolute left-4 top-3 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white dark:peer-focus:bg-slate-900 peer-focus:px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent bg-white dark:bg-slate-800 px-1 -top-2.5 text-xs">Professional Headline</label>
              </div>
              <div className="relative md:col-span-2">
                <textarea id="about" rows="4" className="peer w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors resize-none text-slate-900 dark:text-white" placeholder=" " defaultValue="Passionate Frontend Engineer with 5+ years of experience..."></textarea>
                <label htmlFor="about" className="absolute left-4 top-3 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white dark:peer-focus:bg-slate-900 peer-focus:px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent bg-white dark:bg-slate-800 px-1 -top-2.5 text-xs">About Me Summary</label>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Skills & Portfolio (Mock Example) */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-4">Technical Skills</h3>
            <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium flex items-center gap-2">React.js <button>&times;</button></span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium flex items-center gap-2">Tailwind CSS <button>&times;</button></span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium flex items-center gap-2">TypeScript <button>&times;</button></span>
              </div>
              <input type="text" placeholder="Type a skill and press Enter..." className="w-full bg-transparent outline-none text-slate-600 dark:text-slate-300" />
            </div>

            <h3 className="font-bold text-slate-800 dark:text-white text-lg mt-8 mb-4">Resume Upload</h3>
            <div className="border-2 border-dashed border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-8 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 mx-auto mb-3 shadow-sm">
                <UploadCloud size={24} />
              </div>
              <p className="font-medium text-slate-700 dark:text-slate-300">Drag & drop your ATS-friendly resume here</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
            </div>
          </div>
        )}

        {/* Other steps mocked... */}
        {(currentStep === 2 || currentStep === 3) && (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={32} className="text-slate-400 dark:text-slate-500" />
            </div>
            <p className="font-medium text-slate-700 dark:text-slate-300 text-lg">Dynamic Timeline Editor</p>
            <p>Add and rearrange your work experience / education items here.</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="btn btn-outline border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed px-6"
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary px-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm shadow-blue-500/20"
          >
            {isSaving ? (
              <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</span>
            ) : currentStep === 4 ? (
              <span className="flex items-center gap-2"><Save size={18} /> Complete Profile</span>
            ) : (
              <span className="flex items-center gap-2">Save & Next <ChevronRight size={18} /></span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
