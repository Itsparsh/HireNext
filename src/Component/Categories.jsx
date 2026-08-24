import { motion } from 'framer-motion';
import { Code2, Database, Shield, Cloud, Stethoscope, LineChart, Cpu, Paintbrush, MonitorSmartphone, Bitcoin, Headphones, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'AI & Machine Learning', count: '4,520 Jobs', icon: <Cpu size={28} />, color: 'text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white' },
  { id: 2, name: 'Software Development', count: '12,300 Jobs', icon: <Code2 size={28} />, color: 'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white' },
  { id: 3, name: 'Data Science', count: '3,850 Jobs', icon: <Database size={28} />, color: 'text-violet-600 bg-violet-50 group-hover:bg-violet-600 group-hover:text-white' },
  { id: 4, name: 'Cybersecurity', count: '2,900 Jobs', icon: <Shield size={28} />, color: 'text-rose-600 bg-rose-50 group-hover:bg-rose-600 group-hover:text-white' },
  { id: 5, name: 'Cloud Computing', count: '5,100 Jobs', icon: <Cloud size={28} />, color: 'text-cyan-600 bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white' },
  { id: 6, name: 'UI/UX Design', count: '2,400 Jobs', icon: <Paintbrush size={28} />, color: 'text-fuchsia-600 bg-fuchsia-50 group-hover:bg-fuchsia-600 group-hover:text-white' },
  { id: 7, name: 'Healthcare Tech', count: '1,800 Jobs', icon: <Stethoscope size={28} />, color: 'text-teal-600 bg-teal-50 group-hover:bg-teal-600 group-hover:text-white' },
  { id: 8, name: 'Fintech', count: '2,100 Jobs', icon: <Bitcoin size={28} />, color: 'text-amber-600 bg-amber-50 group-hover:bg-amber-600 group-hover:text-white' },
];

const Categories = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800" id="categories">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Popular Categories
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Explore thousands of job opportunities across top industries.
          </p>
        </div>
        <Link to="/categories" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors hidden md:block">
          View All Categories &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link 
              to={`/jobs?category=${cat.name}`}
              className="group flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-blue-200 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 shrink-0 ${cat.color}`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">{cat.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{cat.count}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link to="/categories" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-2">
          View All Categories &rarr;
        </Link>
      </div>
    </section>
  );
};

export default Categories;
