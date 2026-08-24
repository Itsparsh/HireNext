import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 dark:text-slate-400">Last Updated: October 2023</p>
          </motion.div>

          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold mb-4">1. Information We Collect</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              When you use HireNext, we collect information you provide directly to us. This includes your name, email address, resume details, employment history, and other professional information when you create a candidate profile or an employer account.
            </p>

            <h3 className="text-2xl font-bold mb-4">2. How We Use Your Information</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              We use the information we collect to provide, maintain, and improve our services, such as:
            </p>
            <ul className="list-disc pl-5 mb-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Matching candidates with job opportunities.</li>
              <li>Allowing employers to contact potential candidates.</li>
              <li>Improving our AI algorithms for better job recommendations.</li>
              <li>Sending administrative notifications and updates.</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">3. Information Sharing</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              If you are a candidate, your profile information and resume may be shared with employers when you apply for a job or if you make your profile public. We do not sell your personal data to third parties.
            </p>

            <h3 className="text-2xl font-bold mb-4">4. Data Security</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 className="text-2xl font-bold mb-4">5. Contact Us</h3>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions about this Privacy Policy, please contact us at privacy@hirenext.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
