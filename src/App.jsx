import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import PublicJobView from './Pages/PublicJobView';
import LoginSelection from './Pages/LoginSelection';
import AboutUs from './Pages/AboutUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Terms from './Pages/Terms';
import Contact from './Pages/Contact';
import CandidateLayout from './Pages/Candidate/CandidateLayout';
import CandidateDashboard from './Pages/Candidate/CandidateDashboard';
import CandidateProfile from './Pages/Candidate/CandidateProfile';
import EditProfile from './Pages/Candidate/EditProfile';
import FindJobs from './Pages/Candidate/FindJobs';
import CandidateApplications from './Pages/Candidate/CandidateApplications';
import CandidateSavedJobs from './Pages/Candidate/CandidateSavedJobs';
import ResumeBuilder from './Pages/Candidate/ResumeBuilder';
import CandidateInterviews from './Pages/Candidate/CandidateInterviews';
import CandidateAIAssistant from './Pages/Candidate/CandidateAIAssistant';
import CandidateMessages from './Pages/Candidate/CandidateMessages';
import CandidateResources from './Pages/Candidate/CandidateResources';
import CandidateDocuments from './Pages/Candidate/CandidateDocuments';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import VerifyOTP from './Pages/Auth/VerifyOTP';
import ProtectedRoute from './Component/ProtectedRoute';
import RecruiterLayout from './Pages/Recruiter/RecruiterLayout';
import RecruiterDashboard from './Pages/Recruiter/RecruiterDashboard';
import CompanyProfile from './Pages/Recruiter/CompanyProfile';
import PostJob from './Pages/Recruiter/PostJob';
import ManageJobs from './Pages/Recruiter/ManageJobs';
import ApplicationsKanban from './Pages/Recruiter/ApplicationsKanban';
import CandidateSearch from './Pages/Recruiter/CandidateSearch';
import TalentPool from './Pages/Recruiter/TalentPool';
import Shortlisted from './Pages/Recruiter/Shortlisted';
import RecruiterInterviews from './Pages/Recruiter/RecruiterInterviews';
import RecruiterAIAssistant from './Pages/Recruiter/RecruiterAIAssistant';
import RecruiterMessages from './Pages/Recruiter/RecruiterMessages';
import RecruiterReports from './Pages/Recruiter/RecruiterReports';
import RecruiterTeam from './Pages/Recruiter/RecruiterTeam';
import RecruiterBilling from './Pages/Recruiter/RecruiterBilling';
import RecruiterDocuments from './Pages/Recruiter/RecruiterDocuments';
import RecruiterSettings from './Pages/Recruiter/RecruiterSettings';
import HelpAndSupport from './Pages/Recruiter/HelpAndSupport';
import GettingStarted from './Pages/Recruiter/GettingStarted';
import TechnicalSupport from './Pages/Recruiter/TechnicalSupport';
import { JobProvider } from './Context/JobContext';
import { ThemeProvider } from './Context/ThemeContext';
import { AuthProvider } from './Context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider>
          <JobProvider>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs/:id" element={<PublicJobView />} />
          <Route path="/login" element={<LoginSelection />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Candidate Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
            <Route path="/candidate" element={<CandidateLayout />}>
              <Route index element={<CandidateDashboard />} />
              <Route path="profile" element={<CandidateProfile />} />
              <Route path="settings" element={<EditProfile />} />
              <Route path="jobs" element={<FindJobs />} />
              <Route path="applications" element={<CandidateApplications />} />
              <Route path="saved" element={<CandidateSavedJobs />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="interviews" element={<CandidateInterviews />} />
              <Route path="ai-assistant" element={<CandidateAIAssistant />} />
              <Route path="messages" element={<CandidateMessages />} />
              <Route path="resources" element={<CandidateResources />} />
              <Route path="documents" element={<CandidateDocuments />} />
            </Route>
          </Route>

          {/* Recruiter Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
            <Route path="/recruiter" element={<RecruiterLayout />}>
              <Route index element={<RecruiterDashboard />} />
              {/* Fallback routes for unbuilt pages */}
              <Route path="company" element={<CompanyProfile />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="applications" element={<ApplicationsKanban />} />
              <Route path="search" element={<CandidateSearch />} />
              <Route path="talent-pool" element={<TalentPool />} />
              <Route path="shortlisted" element={<Shortlisted />} />
              <Route path="interviews" element={<RecruiterInterviews />} />
              <Route path="ai-assistant" element={<RecruiterAIAssistant />} />
              <Route path="messages" element={<RecruiterMessages />} />
              <Route path="reports" element={<RecruiterReports />} />
              <Route path="team" element={<RecruiterTeam />} />
              <Route path="billing" element={<RecruiterBilling />} />
              <Route path="documents" element={<RecruiterDocuments />} />
              <Route path="settings" element={<RecruiterSettings />} />
              <Route path="support" element={<HelpAndSupport />} />
              <Route path="getting-started" element={<GettingStarted />} />
              <Route path="tech-support" element={<TechnicalSupport />} />
            </Route>
          </Route>
          </Routes>
          </JobProvider>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
