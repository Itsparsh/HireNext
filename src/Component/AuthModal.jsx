import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Google login success', codeResponse);
      setIsLoading(true);
      // Simulate backend verification
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        navigate('/candidate');
      }, 1000);
    },
    onError: (error) => {
      console.log('Google login error', error);
      alert('Google login failed or was cancelled');
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      navigate('/candidate');
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>{mode === 'login' ? 'Sign in to your HireNext account' : 'Join HireNext to find your next opportunity'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input type="text" placeholder="John Doe" required />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input type="email" placeholder="you@example.com" required />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input type="password" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary full-width modal-submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
          
          <div style={{ textAlign: 'center', margin: '16px 0', color: '#64748b' }}>or</div>
          
          <button 
            type="button"
            className="btn btn-secondary full-width" 
            onClick={() => handleGoogleLogin()}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            disabled={isLoading}
          >
            <img src="https://www.google.com/s2/favicons?domain=google.com&sz=128" alt="Google" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
            {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="text-btn" 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
