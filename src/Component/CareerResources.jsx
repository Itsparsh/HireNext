import { motion } from 'framer-motion';
import { BookOpen, Code, FileText, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const resources = [
  { id: 1, type: 'Blog', title: 'How to Negotiate Your Next Tech Salary', author: 'Career Team', readTime: '5 min read', icon: <BookOpen size={20} />, color: 'bg-blue-50 text-blue-600' },
  { id: 2, type: 'Challenge', title: 'Advanced React Patterns & Optimization', author: 'Engineering', readTime: '30 mins', icon: <Code size={20} />, color: 'bg-emerald-50 text-emerald-600' },
  { id: 3, type: 'Template', title: 'ATS-Optimized Executive Resume', author: 'HR Team', readTime: 'Downloadable', icon: <FileText size={20} />, color: 'bg-violet-50 text-violet-600' },
  { id: 4, type: 'Course', title: 'Mastering System Design Interviews', author: 'Tech Leads', readTime: '2 hours', icon: <GraduationCap size={20} />, color: 'bg-amber-50 text-amber-600' },
];

const CareerResources = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800" id="resources">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Accelerate Your Growth
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Free tools, templates, and courses to help you land your dream job faster.
          </p>
        </div>
        <Link to="/resources" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors hidden md:block">
          View All Resources &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((res, i) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link 
              to={`/resources/${res.id}`}
              className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-200 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${res.color}`}>
                {res.icon}
              </div>
              
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">{res.type}</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{res.title}</h3>
              
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600 dark:text-slate-400">{res.author}</span>
                <span className="font-semibold text-slate-500 dark:text-slate-300">{res.readTime}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link to="/resources" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-2">
          View All Resources &rarr;
        </Link>
      </div>
    </section>
  );
};

export default CareerResources;
