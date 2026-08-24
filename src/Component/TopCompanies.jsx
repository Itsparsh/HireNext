import { motion } from 'framer-motion';
import { Star, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockCompanies = [
  { id: 1, name: 'TechVision', logo: 'https://ui-avatars.com/api/?name=TV&background=0F172A&color=fff', rating: 4.8, openRoles: 145 },
  { id: 2, name: 'GlobalFinance', logo: 'https://ui-avatars.com/api/?name=GF&background=2563EB&color=fff', rating: 4.5, openRoles: 82 },
  { id: 3, name: 'InnovateAI', logo: 'https://ui-avatars.com/api/?name=IA&background=10B981&color=fff', rating: 4.9, openRoles: 43 },
  { id: 4, name: 'CloudScale', logo: 'https://ui-avatars.com/api/?name=CS&background=F59E0B&color=fff', rating: 4.7, openRoles: 210 },
  { id: 5, name: 'CyberShield', logo: 'https://ui-avatars.com/api/?name=CS&background=EF4444&color=fff', rating: 4.6, openRoles: 56 },
  { id: 6, name: 'DataMind', logo: 'https://ui-avatars.com/api/?name=DM&background=8B5CF6&color=fff', rating: 4.8, openRoles: 92 },
];

const marqueeCompanies = [...mockCompanies, ...mockCompanies];

const TopCompanies = () => {
  return (
    <section className="py-24 border-t border-slate-100 dark:border-slate-800 overflow-hidden relative bg-white dark:bg-slate-950" id="companies">
      <div className="text-center mb-16 px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Trusted by 10,000+ Companies
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          From explosive startups to Fortune 500 giants, top teams hire on HireNext.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex gap-6 w-max items-center hover:[animation-play-state:paused]"
        >
          {marqueeCompanies.map((company, index) => (
            <Link 
              to={`/company/${company.name}`}
              key={`${company.id}-${index}`} 
              className="w-72 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group/card"
            >
              <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm mb-4" />
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">{company.name}</h3>
              
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
                  <Star size={14} className="fill-amber-400 text-amber-400" /> {company.rating}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {company.openRoles} Jobs
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopCompanies;
