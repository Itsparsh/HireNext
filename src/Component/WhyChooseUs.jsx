import { motion } from 'framer-motion';
import { Brain, ShieldCheck, FileEdit, Zap, Calendar, TrendingUp } from 'lucide-react';

const features = [
  { id: 1, title: 'AI Job Matching', desc: 'Our smart algorithm connects you with roles that perfectly align with your skills and goals.', icon: <Brain size={24} />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Verified Companies', desc: 'Every employer on our platform is strictly vetted to ensure a safe and reliable job search.', icon: <ShieldCheck size={24} />, color: 'bg-emerald-100 text-emerald-600' },
  { id: 3, title: 'Resume Builder', desc: 'Create professional, ATS-friendly resumes in minutes using our intuitive drag-and-drop tool.', icon: <FileEdit size={24} />, color: 'bg-violet-100 text-violet-600' },
  { id: 4, title: 'One-Click Apply', desc: 'Skip the repetitive forms. Apply to hundreds of verified jobs with a single click.', icon: <Zap size={24} />, color: 'bg-amber-100 text-amber-600' },
  { id: 5, title: 'Interview Scheduling', desc: 'Seamlessly coordinate interview timings directly within our integrated calendar system.', icon: <Calendar size={24} />, color: 'bg-rose-100 text-rose-600' },
  { id: 6, title: 'Career Growth', desc: 'Access exclusive salary insights, market trends, and personalized career path recommendations.', icon: <TrendingUp size={24} />, color: 'bg-cyan-100 text-cyan-600' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800" id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Why Choose HireNext
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          We provide everything you need to accelerate your career or build your dream team, all in one platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-100 dark:hover:border-slate-700 transition-all duration-300 relative overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
