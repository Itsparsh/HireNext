import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTABanner = ({ onOpenAuth }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden bg-blue-600 shadow-xl shadow-blue-600/20"
      >
        {/* Soft decorative background elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 px-8 py-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/50 backdrop-blur-sm border border-blue-400/50 text-white mb-8">
            <Sparkles size={16} />
            <span className="text-sm font-bold uppercase tracking-widest">Start For Free</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-2xl leading-tight">
            Ready to Build Your Future?
          </h2>
          
          <p className="text-lg text-blue-100 max-w-xl mb-10 font-medium leading-relaxed">
            Join the smartest recruitment platform. Whether you're looking for your next big role or hiring world-class talent, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onOpenAuth} className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2 hover:shadow-md">
              Join HireNext Now <ArrowRight size={20} />
            </button>
            <button className="bg-blue-700/50 hover:bg-blue-700 backdrop-blur-sm text-white border border-blue-400/30 hover:border-blue-300 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center">
              Request Enterprise Demo
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
