import { motion } from 'framer-motion';
import { UserPlus, FileEdit, Search, MousePointerClick, Video, Award } from 'lucide-react';

const steps = [
  { id: 1, title: 'Create Account', desc: 'Sign up in seconds', icon: <UserPlus size={24} /> },
  { id: 2, title: 'Build Profile', desc: 'Upload your resume', icon: <FileEdit size={24} /> },
  { id: 3, title: 'Find Matches', desc: 'Discover perfect roles', icon: <Search size={24} /> },
  { id: 4, title: 'Apply', desc: '1-click application', icon: <MousePointerClick size={24} /> },
  { id: 5, title: 'Interview', desc: 'Meet the team', icon: <Video size={24} /> },
  { id: 6, title: 'Get Hired', desc: 'Accept the offer', icon: <Award size={24} /> }
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          How It Works
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          A seamless, transparent process from your first click to your first day.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 hidden lg:block z-0"></div>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 hidden lg:block z-0"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex justify-between items-start gap-y-12 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group w-full lg:w-32"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-blue-600 dark:group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 shadow-sm mb-4 bg-clip-padding">
                {step.icon}
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
