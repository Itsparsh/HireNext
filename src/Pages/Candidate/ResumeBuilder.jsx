import { useState, useEffect } from 'react';
import { 
  FileText, Download, User, Code, Award, GraduationCap, Layout, Palette, Briefcase
} from 'lucide-react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '../../Component/ResumePDF';

const ResumeBuilder = () => {
  // State for Resume Data
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse resume data from local storage", e);
    }
    return {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      github: 'github.com/alexj',
      linkedin: 'linkedin.com/in/alexj',
      skills: 'React, Node.js, Tailwind CSS, MongoDB, UI/UX Design, TypeScript',
      projects: 'E-commerce Platform: Built a full-stack platform using MERN stack with Stripe integration.\nPortfolio Site: Interactive 3D portfolio using Three.js and React.',
      achievements: 'Winner of Global Hackathon 2023\nTop 1% Contributor on GitHub',
      education: 'B.Tech in Computer Science\nMIT University, Boston\nCGPA: 3.8/4.0 | 2019 - 2023',
    };
  });

  const [accentColor, setAccentColor] = useState('#2563eb');
  const [format, setFormat] = useState('modern');
  const colors = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#0f172a'];

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in-up">
      
      {/* Editor Section */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md dark:shadow-xl print:hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="text-blue-500" /> Resume Builder
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button 
                type="button"
                onClick={() => setFormat('modern')} 
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${format === 'modern' ? 'bg-white dark:bg-slate-950 text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >Modern</button>
              <button 
                type="button"
                onClick={() => setFormat('classic')} 
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${format === 'classic' ? 'bg-white dark:bg-slate-950 text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >Classic</button>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <Palette size={16} className="text-slate-400 ml-1 hidden sm:block" />
              {colors.map(c => (
              <button 
                key={c}
                type="button"
                onClick={() => setAccentColor(c)}
                className={`w-6 h-6 rounded-md transition-all ${accentColor === c ? 'ring-2 ring-offset-1 dark:ring-offset-slate-900 ring-blue-500 scale-110' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            </div>
          </div>
        </div>

        <form className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <User size={16} /> Personal Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                <input type="text" name="name" value={data.name} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Email</label>
                <input type="email" name="email" value={data.email} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">GitHub</label>
                <input type="text" name="github" value={data.github} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">LinkedIn</label>
                <input type="text" name="linkedin" value={data.linkedin} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Code size={16} /> Skills
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Core Skills (comma separated)</label>
              <textarea name="skills" value={data.skills} onChange={handleChange} rows="2" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500 custom-scrollbar"></textarea>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <GraduationCap size={16} /> Education
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Degree, University, City, CGPA, Dates</label>
              <textarea name="education" value={data.education} onChange={handleChange} rows="3" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500 custom-scrollbar"></textarea>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Briefcase size={16} /> Projects
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Project Details (Line separated)</label>
              <textarea name="projects" value={data.projects} onChange={handleChange} rows="4" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500 custom-scrollbar"></textarea>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Award size={16} /> Achievements
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Awards & Certifications</label>
              <textarea name="achievements" value={data.achievements} onChange={handleChange} rows="3" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-blue-500 custom-scrollbar"></textarea>
            </div>
          </div>
        </form>
        
        <PDFDownloadLink 
          document={<ResumePDF data={data} color={accentColor} format={format} />} 
          fileName={`${data.name?.replace(/\s+/g, '_') || 'Resume'}_HireNext.pdf`}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2"
        >
          {({ loading }) => (
            <>
              <Download size={20} /> {loading ? 'Generating PDF...' : 'Download PDF'}
            </>
          )}
        </PDFDownloadLink>
      </div>

      {/* Live Preview Section */}
      <div className="w-full lg:w-1/2 flex bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden relative min-h-[600px]">
        <div className="absolute top-4 left-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 z-10">
          <Layout size={14} /> Live PDF Preview
        </div>
        
        <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }} showToolbar={false}>
          <ResumePDF data={data} color={accentColor} format={format} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ResumeBuilder;
