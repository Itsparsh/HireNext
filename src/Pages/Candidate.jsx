import Navbar from '../Component/Navbar';
import Hero from '../Component/Hero';
import CandidateDashboard from './Candidate/CandidateDashboard';
import Statistics from '../Component/Statistics';
import Categories from '../Component/Categories';
import FeaturedJobs from '../Component/FeaturedJobs';
import TopCompanies from '../Component/TopCompanies';
import Timeline from '../Component/Timeline';
import Footer from '../Component/Footer';
import './Candidate.css';

const Candidate = () => {
  return (
    <div className="candidate-dashboard app-container">
      <Navbar isLoggedIn={true} userName="Candidate" />
      
      <main>
        {/* Pass isCandidate to Hero to hide employer CTAs */}
        <Hero isCandidate={true} />
        
        <div className="container" style={{ padding: '60px 24px' }}>
          <CandidateDashboard />
        </div>
        
        <Statistics />
        
        {/* You could optionally pass props down to customize these sections 
            for logged-in users, e.g., "Recommended for You" instead of "Featured Jobs" */}
        <Categories />
        <FeaturedJobs />
        <TopCompanies />
        <Timeline />
      </main>
      
      <Footer />
    </div>
  );
};

export default Candidate;
