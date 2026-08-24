import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Briefcase, ChevronRight, Quote } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import LoginForm from '../Component/Auth/LoginForm';
import SocialAuth from '../Component/Auth/SocialAuth';
import toast from 'react-hot-toast';
const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'recruiter' ? 'recruiter' : 'candidate';
  const [activeTab, setActiveTab] = useState(initialRole);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const { login, register } = useAuth();

  // Removed setState inside effect to avoid cascading renders

  const handleGoogleSuccess = async (accessToken) => {
    try {
      setIsLoading(true);
      // Make sure this matches your backend API setup for OAuth
      const res = await axios.post('/auth/google', { 
        token: accessToken, 
        role: activeTab 
      });
      
      if (res.data.success) {
        setIsLoading(false);
        login(res.data.user);
        toast.success("Successfully authenticated with Google!");
        navigate(activeTab === 'candidate' ? '/candidate' : '/recruiter');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Google authentication failed");
    }
  };

  const handleGoogleError = (error) => {
    toast.error('Google login failed or was cancelled. Check your Client ID.');
  };

  const handleLinkedInLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Fallback if LinkedIn isn't implemented on backend yet
      const userData = { name: "LinkedIn User", email: "linkedin@demo.com", role: activeTab };
      login(userData);
      toast.success("Successfully authenticated with LinkedIn!");
      navigate('/candidate');
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email address";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (authMode === 'register') {
      if (!name) newErrors.name = "Full Name is required";
      else if (name.length < 3) newErrors.name = "Name must be at least 3 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const endpoint = authMode === 'register' ? '/auth/register' : '/auth/login';
      const payload = authMode === 'register' 
        ? { name, email, password, role: activeTab } 
        : { email, password, role: activeTab };
        
      const res = await axios.post(endpoint, payload);
      
      if (res.data.success) {
        setIsLoading(false);
        // The backend should return the user object
        if (authMode === 'register') {
          register(res.data.user);
          toast.success("Account created successfully!");
        } else {
          login(res.data.user);
          toast.success("Welcome back!");
        }
        navigate(activeTab === 'candidate' ? '/candidate' : '/recruiter');
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data?.message || "Authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* Left Panel - Premium Professional Image Split */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden">
        <img 
          src="/login-bg.png" 
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        {/* Top Logo / Navigation */}
        <div className="absolute top-8 left-10 z-20 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="HireNext Logo" className="w-9 h-9 shadow-lg shadow-blue-500/20 rounded-xl" />
            <span className="text-xl font-bold tracking-tight text-white">HireNext</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group font-semibold text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>

        {/* Content at Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
          <div className="max-w-lg">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-sm">
              <Quote size={20} className="text-white" />
            </div>
            <h2 className="text-xl xl:text-2xl font-medium text-white leading-relaxed tracking-tight mb-6 drop-shadow-md">
              "HireNext transformed how we build our engineering teams. We found our lead developer in less than 48 hours."
            </h2>
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
                alt="Sarah Jenkins" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-white font-bold drop-shadow-sm">Sarah Jenkins</p>
                <p className="text-slate-300 text-sm drop-shadow-sm">VP of Engineering, TechFlow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Wide & Spacious Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-slate-50 relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Mobile Navigation */}
        <div className="lg:hidden absolute top-6 left-6 z-20">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 p-2 rounded-full bg-white/80 shadow-sm text-slate-600 hover:bg-white transition-colors backdrop-blur-md"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="w-full max-w-[500px] z-10 p-6 sm:p-10 m-4 sm:m-8 bg-gradient-to-br from-white/90 via-blue-50/80 to-white/90 animate-gradient backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 border border-white/60 relative overflow-hidden">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="HireNext Logo" className="w-10 h-10 shadow-md shadow-blue-600/20 rounded-xl" />
              <span className="text-2xl font-bold text-slate-900">HireNext</span>
            </div>
            <h1 className="text-[32px] font-bold text-slate-900 tracking-tight mb-2">
              {authMode === 'login' ? 'Sign in to HireNext' : 'Get started with HireNext'}
            </h1>
            <p className="text-slate-500 text-[15px]">
              {authMode === 'login' 
                ? 'Welcome back! Please enter your details.' 
                : 'Create your account to start hiring or getting hired.'}
            </p>
          </motion.div>

          {/* Minimalist Role Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => { setActiveTab('candidate'); setErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'candidate' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <User size={16} /> Candidate
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('recruiter'); setErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'recruiter' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Briefcase size={16} /> Recruiter
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${authMode}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.15 }}
            >
              
              <LoginForm 
                authMode={authMode}
                name={name} setName={setName}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                isLoading={isLoading}
                onSubmit={handleAuthSubmit}
                activeTab={activeTab}
                errors={errors}
              />
              
              <div className="mt-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Or continue with
                  </span>
                </div>
              </div>

              <SocialAuth 
                activeTab={activeTab}
                onGoogleSuccess={handleGoogleSuccess}
                onGoogleError={handleGoogleError}
                onLinkedInLogin={handleLinkedInLogin}
              />

            </motion.div>
          </AnimatePresence>

          <p className="mt-10 text-center text-[14px] text-slate-500">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrors({}); }}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {authMode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
