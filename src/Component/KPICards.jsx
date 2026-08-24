import { motion } from 'framer-motion';
import { Briefcase, Building2, Users, Target } from 'lucide-react';

const stats = [
  { label: 'Active Jobs', value: '50k+', icon: <Briefcase size={24} />, color: 'bg-blue-100 text-blue-600' },
  { label: 'Companies', value: '10k+', icon: <Building2 size={24} />, color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Candidates', value: '500k+', icon: <Users size={24} />, color: 'bg-violet-100 text-violet-600' },
  { label: 'Success Rate', value: '95%', icon: <Target size={24} />, color: 'bg-amber-100 text-amber-600' }
];

const KPICards = () => {
  return (
    <section className="px-6 max-w-7xl mx-auto -mt-10 lg:-mt-16 relative z-20 mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KPICards;
