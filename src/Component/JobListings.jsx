import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, DollarSign, Clock, Bookmark, Share2, Building, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Stripe',
    logo: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=128',
    recruiter: { name: 'Alex M.', avatar: 'https://ui-avatars.com/api/?name=Alex+M&background=0F172A&color=fff' },
    location: 'San Francisco, CA',
    mode: 'Hybrid',
    experience: '4-6 Years',
    salary: '$180k - $220k',
    posted: '2 hours ago',
    isNew: true,
    skills: ['React', 'TypeScript', 'Next.js']
  },
  {
    id: 2,
    title: 'Product Marketing Manager',
    company: 'Notion',
    logo: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
    recruiter: { name: 'Sarah K.', avatar: 'https://ui-avatars.com/api/?name=Sarah+K&background=2563EB&color=fff' },
    location: 'New York, NY',
    mode: 'On-site',
    experience: '3-5 Years',
    salary: '$130k - $160k',
    posted: '1 day ago',
    isNew: true,
    skills: ['B2B Marketing', 'Growth', 'GTM']
  },
  {
    id: 3,
    title: 'Machine Learning Engineer',
    company: 'OpenAI',
    logo: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
    recruiter: { name: 'David L.', avatar: 'https://ui-avatars.com/api/?name=David+L&background=10B981&color=fff' },
    location: 'Remote',
    mode: 'Remote',
    experience: '5+ Years',
    salary: '$200k - $300k',
    posted: '3 days ago',
    isNew: false,
    skills: ['Python', 'PyTorch', 'LLMs']
  }
];

const filters = ['All Jobs', 'Remote', 'Full-Time', 'Internships', 'Hybrid', 'AI/ML', 'Software', 'Marketing', 'Finance'];

const JobListings = () => {
  const [activeFilter, setActiveFilter] = useState('All Jobs');
  const [bookmarked, setBookmarked] = useState([1]);

  const toggleBookmark = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(jobId => jobId !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("Share functionality triggered!");
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800" id="jobs">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Latest Jobs
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Explore thousands of new opportunities posted today by verified companies.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar w-full md:w-auto">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === filter 
                  ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {mockJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg rounded-2xl transition-all duration-300 relative overflow-hidden block"
            >
              <Link to={`/jobs/${job.id}`} className="absolute inset-0 z-0"></Link>
              
              <div className="p-6 md:p-8 flex flex-col xl:flex-row gap-6 relative z-10">
                
                {/* Logo Section */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <Link to={`/company/${job.company}`} className="w-20 h-20 rounded-xl bg-white dark:bg-slate-800 p-2 border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden shrink-0 flex items-center justify-center hover:shadow-md transition-shadow">
                    <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                  </Link>
                  {job.isNew && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <Link to={`/jobs/${job.id}`} className="inline-block text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {job.title}
                  </Link>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-5 font-medium">
                    <Link to={`/company/${job.company}`} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Building size={16} /> {job.company}
                    </Link>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.experience}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="flex items-center gap-1.5"><Clock size={16} /> {job.posted}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <DollarSign size={16} className="text-emerald-500" /> {job.salary}
                    </span>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Actions & Recruiter */}
                <div className="flex flex-row xl:flex-col justify-between items-center xl:items-end gap-4 border-t xl:border-t-0 xl:border-l border-slate-100 dark:border-slate-800 pt-6 xl:pt-0 xl:pl-8 min-w-[200px]">
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Hiring Manager</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{job.recruiter.name}</p>
                    </div>
                    <img src={job.recruiter.avatar} alt={job.recruiter.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto mt-auto">
                    <button 
                      onClick={handleShare}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative z-20"
                      title="Share Job"
                    >
                      <Share2 size={18} />
                    </button>
                    <button 
                      onClick={(e) => toggleBookmark(e, job.id)}
                      className={`p-3 rounded-xl border transition-all relative z-20 ${bookmarked.includes(job.id) ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      title="Save Job"
                    >
                      <Bookmark size={18} className={bookmarked.includes(job.id) ? 'fill-blue-600' : ''} />
                    </button>
                    <Link 
                      to={`/login?role=candidate`}
                      className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-sm relative z-20"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-12 text-center">
        <button className="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm">
          View All Jobs
        </button>
      </div>
    </section>
  );
};

export default JobListings;
