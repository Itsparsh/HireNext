import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Hero from '../Component/Hero';
import KPICards from '../Component/KPICards';
import Categories from '../Component/Categories';
import JobListings from '../Component/JobListings';
import WhyChooseUs from '../Component/WhyChooseUs';
import HowItWorks from '../Component/HowItWorks';
import TopCompanies from '../Component/TopCompanies';
import CareerResources from '../Component/CareerResources';
import FAQ from '../Component/FAQ';
import CTABanner from '../Component/CTABanner';
import Footer from '../Component/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleOpenAuth = (mode = 'login') => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white selection:bg-blue-600/30 selection:text-blue-900 dark:selection:bg-blue-500/30 dark:selection:text-blue-200 relative overflow-x-hidden transition-colors duration-300">
      <Navbar onOpenAuth={handleOpenAuth} />
      
      <main className="relative z-10 flex flex-col gap-16 lg:gap-24 pt-20">
        <Hero />
        <KPICards />
        <WhyChooseUs />
        <JobListings />
        <Categories />
        <TopCompanies />
        <HowItWorks />
        <CareerResources />
        <FAQ />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
