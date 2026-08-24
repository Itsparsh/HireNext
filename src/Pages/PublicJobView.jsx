import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Globe, DollarSign, Clock, Zap, CheckCircle, ArrowLeft, Building2 } from 'lucide-react';
import api from '../api';

const PublicJobView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we would fetch the specific job by ID from a public endpoint
    // For this prototype, we'll try to fetch all jobs and find the one that matches
    const fetchJob = async () => {
      try {
        setLoading(true);
        // Fallback to mock data if API fails or doesn't have it
        const mockJob = {
          _id: id,
          title: 'Software Engineer',
          location: 'San Francisco, CA',
          workMode: 'Hybrid',
          jobType: 'Full-time',
          experienceLevel: 'Mid Level',
          salary: { min: 120000, max: 150000, currency: 'USD' },
          skills: ['React', 'Node.js', 'TypeScript'],
          description: "## About The Role\n\nWe are looking for a highly skilled Software Engineer to join our team...\n\n### What You'll Do\n- Build scalable products\n- Mentor junior engineers",
          postedAt: new Date().toISOString()
        };
        
        try {
          const res = await api.get('/recruiter/jobs');
          if (res.data.success) {
            const foundJob = res.data.data.find(j => j._id === id);
            setJob(foundJob || mockJob);
          } else {
            setJob(mockJob);
          }
        } catch (e) {
          setJob(mockJob);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold tracking-wide">Loading position...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Position Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">This job posting may have expired, been removed, or the link might be incorrect.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-all">View All Jobs</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <button onClick={() => navigate('/')} className="text-white/60 hover:text-white flex items-center gap-2 mb-10 transition-colors font-semibold">
            <ArrowLeft size={18} /> Back to HireNext
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-blue-200 border border-white/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> Actively Hiring
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-md">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-blue-100/80 font-medium">
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><MapPin size={16} /> {job.location || 'Remote'}</span>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><Globe size={16} /> {job.workMode || 'Remote'}</span>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><Clock size={16} /> {job.jobType || 'Full-time'}</span>
                {job.salary?.min && <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"><DollarSign size={16} /> ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Body Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Job Description (Assuming it's markdown-like or plain text) */}
          <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Briefcase size={24} className="text-blue-500"/> Role Overview</h2>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {job.description || "Detailed description not provided."}
            </div>
          </section>

          {/* Skills Section */}
          {job.skills && job.skills.length > 0 && (
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Zap size={24} className="text-yellow-500"/> Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm border border-slate-200 dark:border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none sticky top-8">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-100 dark:border-blue-800">
              <Building2 size={32} />
            </div>
            <h3 className="font-black text-2xl mb-6">Ready to join us?</h3>
            
            <div className="space-y-5 mb-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium">Seniority</span>
                <span className="font-bold">{job.experienceLevel || 'Entry Level'}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium">Department</span>
                <span className="font-bold">Engineering</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium">Posted</span>
                <span className="font-bold">{new Date(job.postedAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
              <CheckCircle size={20} /> Apply for this Job
            </button>
            <p className="text-center text-xs font-semibold text-slate-400 mt-4">Takes 2 minutes to apply</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicJobView;
