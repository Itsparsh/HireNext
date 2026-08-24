import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-slate-500 dark:text-slate-400">Effective Date: October 2023</p>
          </motion.div>

          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              By accessing or using the HireNext platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h3 className="text-2xl font-bold mb-4">2. User Accounts</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h3 className="text-2xl font-bold mb-4">3. Acceptable Use</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              You agree not to use HireNext for any unlawful purpose or in any way that interrupts, damages, or impairs the service. Employers agree to post accurate job listings, and candidates agree to provide truthful representations of their skills and experience.
            </p>

            <h3 className="text-2xl font-bold mb-4">4. Intellectual Property</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              All content on the HireNext platform, including logos, designs, text, and graphics, are the property of HireNext or its licensors and are protected by copyright and intellectual property laws.
            </p>

            <h3 className="text-2xl font-bold mb-4">5. Termination</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              We reserve the right to suspend or terminate your account at any time for violations of these Terms of Service without prior notice.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
