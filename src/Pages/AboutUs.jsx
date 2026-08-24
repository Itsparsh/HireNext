import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">About <span className="text-blue-600 dark:text-blue-400">HireNext</span></h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We are on a mission to bridge the gap between exceptional talent and the world's most innovative companies.
            </p>
          </motion.div>

          <div className="space-y-12">
            <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                At HireNext, we envision a world where hiring is transparent, efficient, and equitable. We believe that every individual deserves an opportunity to showcase their true potential, and every company deserves access to the best talent, regardless of geographical boundaries.
              </p>
            </section>
            
            <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-4">What We Do</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                HireNext is a modern Recruitment Management System and Job Board that simplifies the entire hiring lifecycle. From intelligent job matching and streamlined application processes to AI-powered resume building, we provide the tools needed to succeed in today's competitive job market.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Connect candidates with top-tier global employers.</li>
                <li>Provide recruiters with powerful ATS and applicant tracking features.</li>
                <li>Leverage AI to help candidates prepare for interviews and craft perfect resumes.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
