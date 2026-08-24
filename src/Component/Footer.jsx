import { Globe, Link as LinkIcon, Mail, MessageCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Newsletter & Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Briefcase size={16} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">HireNext</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed max-w-sm">
              The premier SaaS platform connecting exceptional talent with the world's most innovative companies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><LinkIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Mail size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><MessageCircle size={18} /></a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-8 lg:ml-auto w-full lg:w-auto">
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Subscribe to our newsletter</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Get the latest remote jobs, career advice, and hiring trends.</p>
            <div className="flex gap-2 w-full max-w-md">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-sm">
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Candidates</h4>
            <ul className="space-y-4">
              <li><Link to="/jobs" className="hover:text-blue-600 dark:hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-blue-600 dark:hover:text-white transition-colors">Browse Companies</Link></li>
              <li><Link to="/salaries" className="hover:text-blue-600 dark:hover:text-white transition-colors">Salary Calculator</Link></li>
              <li><Link to="/resume" className="hover:text-blue-600 dark:hover:text-white transition-colors">Resume Builder</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Employers</h4>
            <ul className="space-y-4">
              <li><Link to="/post-job" className="hover:text-blue-600 dark:hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/search" className="hover:text-blue-600 dark:hover:text-white transition-colors">Search Resumes</Link></li>
              <li><Link to="/ats" className="hover:text-blue-600 dark:hover:text-white transition-colors">ATS Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} HireNext Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> All systems operational</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
