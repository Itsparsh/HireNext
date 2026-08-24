import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { question: "How does the AI job matching work?", answer: "Our AI analyzes your skills, experience, and career goals to match you with roles where you have the highest probability of success. It continuously learns from your interactions to improve recommendations." },
  { question: "Is HireNext free for candidates?", answer: "Yes! HireNext is completely free for job seekers. You can create a profile, use the resume builder, and apply to unlimited jobs without any cost." },
  { question: "Are the companies on HireNext verified?", answer: "Absolutely. We have a strict vetting process for all employers. Every company is verified before they can post jobs or contact candidates." },
  { question: "How does the 1-Click Apply feature work?", answer: "Once your profile is 100% complete, you can apply to any job with a single click. Your standardized profile and resume are instantly securely sent to the employer's ATS." },
  { question: "Can I hide my profile from my current employer?", answer: "Yes, you can manage your visibility settings in your dashboard to ensure your current employer cannot see that you are actively looking for new opportunities." }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto border-t border-slate-100 dark:border-slate-800" id="faq">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Everything you need to know about HireNext.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 dark:hover:border-slate-700 transition-colors">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
            >
              <span className="font-bold text-slate-900 dark:text-white">{faq.question}</span>
              <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} size={20} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
