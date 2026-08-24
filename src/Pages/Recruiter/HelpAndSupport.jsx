import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Book, CreditCard, User, Wrench, MessageSquare, Phone, Mail, FileText, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-4 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-bold text-slate-900 dark:text-white text-lg">{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-50 text-slate-400 dark:bg-slate-800'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryCard = ({ icon: Icon, title, description, onClick }) => (
  <div onClick={onClick} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer group">
    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
      <Icon className="text-blue-600 dark:text-blue-400" size={28} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const HelpAndSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hi there! I am Sarah from HireNext Support. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userText = chatInput;
    const newMessage = { id: Date.now(), sender: 'user', text: userText };
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    
    // Smart AI Bot Simulation
    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't quite catch that. Could you please clarify? I can help you with billing, AI matching, candidate exports, and team management.";
      
      const lowerInput = userText.toLowerCase();
      
      if (lowerInput.includes('billing') || lowerInput.includes('upgrade') || lowerInput.includes('plan') || lowerInput.includes('pay')) {
        botResponse = "To upgrade your plan or manage billing, head over to the 'Billing & Plans' tab under your settings. You can seamlessly switch plans there!";
      } else if (lowerInput.includes('ai') || lowerInput.includes('match') || lowerInput.includes('score')) {
        botResponse = "Our AI match score analyzes candidate resumes against your job descriptions using advanced NLP to give you a percentage match, saving you hours of manual screening.";
      } else if (lowerInput.includes('export') || lowerInput.includes('download') || lowerInput.includes('csv')) {
        botResponse = "You can export your candidate lists as CSV or PDF files directly from the Talent Pool page by clicking the 'Export' icon in the top right corner.";
      } else if (lowerInput.includes('team') || lowerInput.includes('invite') || lowerInput.includes('member') || lowerInput.includes('user')) {
        botResponse = "To add team members, go to the 'Team' tab in your dashboard. You can invite them via email and assign them specific roles like Admin or Reviewer.";
      } else if (lowerInput.includes('job') || lowerInput.includes('post') || lowerInput.includes('create')) {
        botResponse = "You can create a new job posting by navigating to the 'Post Job' page. Our AI can even help you generate the job description!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        botResponse = "Hello again! How can I assist you with HireNext today?";
      } else if (lowerInput.includes('thanks') || lowerInput.includes('thank you')) {
        botResponse = "You're very welcome! Let me know if you need anything else.";
      }

      setChatMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'agent', 
        text: botResponse 
      }]);
    }, 1000);
  };

  const faqs = [
    {
      question: "How do I upgrade my current plan?",
      answer: "You can upgrade your plan at any time by navigating to the 'Billing' section under 'System' settings. Choose the plan that best fits your needs, and the prorated charge will be applied automatically to your saved payment method."
    },
    {
      question: "How does the AI match score work?",
      answer: "Our proprietary AI analyzes the candidate's resume, skills, and experience, comparing them directly against your job description and required skills. It then generates a percentage score representing how closely the candidate matches your ideal profile."
    },
    {
      question: "Can I export candidate data?",
      answer: "Yes! You can export candidate lists from the Talent Pool or specific job pipelines as CSV or PDF files. Simply click the 'Export' icon in the top right corner of the respective page."
    },
    {
      question: "How do I add team members to my workspace?",
      answer: "Go to System > Team in your recruiter dashboard. Click 'Invite Member', enter their email address, and select their permission role (Admin, Recruiter, or Viewer). They will receive an email invitation to join your workspace."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 px-6 lg:px-10 max-w-[1400px] mx-auto pt-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">help you?</span>
            </h1>
            
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-blue-500 transition-colors">
                <Search className="text-slate-400 ml-4 shrink-0" size={24} />
                <input 
                  type="text" 
                  placeholder="Search for articles, tutorials, or FAQs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none px-4 py-4 text-slate-800 dark:text-slate-200 text-lg placeholder:text-slate-400"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Categories */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              icon={Book} 
              title="Getting Started" 
              description="Learn the basics of HireNext and how to set up your first job posting." 
              onClick={() => navigate('/recruiter/getting-started')}
            />
            <CategoryCard 
              icon={User} 
              title="Account Settings" 
              description="Manage your profile, team members, and security preferences." 
              onClick={() => navigate('/recruiter/settings')}
            />
            <CategoryCard 
              icon={CreditCard} 
              title="Billing & Plans" 
              description="Information on subscriptions, invoices, and payment methods." 
              onClick={() => navigate('/recruiter/billing')}
            />
            <CategoryCard 
              icon={Wrench} 
              title="Technical Support" 
              description="Troubleshooting guides and system status updates." 
              onClick={() => navigate('/recruiter/tech-support')}
            />
          </div>
        </div>

        {/* FAQs and Contact Support Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* FAQs */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="text-blue-500" /> Frequently Asked Questions
            </h2>
            <div>
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-bl-full pointer-events-none"></div>
              
              <h2 className="text-2xl font-black mb-2">Still need help?</h2>
              <p className="text-slate-400 mb-8">Our support team is available 24/7 to assist you with any questions.</p>
              
              <div className="space-y-4 mb-8">
                <button onClick={() => setIsChatOpen(true)} className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl font-bold transition-all border border-white/5">
                  <MessageSquare size={20} /> Live Chat Support
                </button>
                <a href="mailto:support@hirenext.com" className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl font-bold transition-all border border-white/5">
                  <Mail size={20} /> Email Us
                </a>
                <a href="tel:+18005550199" className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl font-bold transition-all border border-white/5">
                  <Phone size={20} /> Request a Call
                </a>
              </div>

              <div className="p-4 bg-black/20 rounded-2xl text-center border border-white/5">
                <p className="text-sm text-slate-300 font-medium">Average response time: <span className="text-emerald-400 font-bold">under 5 mins</span></p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Live Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="Agent" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-blue-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold leading-tight">Sarah Jenkins</h4>
                  <p className="text-xs text-blue-200 font-medium">Customer Success</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <form onSubmit={handleSendChat} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..." 
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                />
                <button type="submit" disabled={!chatInput.trim()} className="w-11 h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shrink-0">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HelpAndSupport;
