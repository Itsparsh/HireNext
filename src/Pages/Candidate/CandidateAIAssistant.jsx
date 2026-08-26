import { useState, useRef, useEffect } from 'react';
import { BrainCircuit, Send, User, Sparkles, RefreshCw, FileText, Zap, Bot, LineChart, FileSearch, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const CandidateAIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your HireNext AI Career Strategist. I can analyze your resume, conduct a mock interview, or help you negotiate your next offer. What would you like to work on today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateMockResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    // Greetings
    if (lowerText.match(/\b(hi|hello|hey|greetings)\b/)) {
      return (
        <div className="space-y-2">
          <p>Hello there! 👋 I'm ready to help you accelerate your career. We can start by reviewing your resume, or if you have a specific role in mind, we can do a mock interview!</p>
        </div>
      );
    }
    
    // Gratitude
    if (lowerText.match(/\b(thanks|thank you|awesome|great)\b/)) {
      return (
        <div className="space-y-2">
          <p>You're very welcome! Let me know if there's anything else you need help with.</p>
        </div>
      );
    }

    if (lowerText.includes('resume')) {
      return (
        <div className="space-y-3">
          <p>I've analyzed your current resume profile. Here are a few actionable insights to improve your ATS score:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Action Verbs:</strong> Try replacing passive words with stronger verbs like <span className="text-blue-600 dark:text-blue-400">"Orchestrated"</span> or <span className="text-blue-600 dark:text-blue-400">"Spearheaded"</span>.</li>
            <li><strong>Quantify Results:</strong> You mentioned building a React app. Try adding metrics, e.g., <em>"Improved load time by 30% resulting in higher retention."</em></li>
            <li><strong>Skill Keywords:</strong> Add "TypeScript" and "GraphQL" if you have experience with them, as they are highly requested in your target roles.</li>
          </ul>
          <p className="font-semibold text-blue-600 dark:text-blue-400 mt-2 cursor-pointer hover:underline">Would you like me to rewrite your professional summary?</p>
        </div>
      );
    }
    if (lowerText.includes('interview')) {
      return (
        <div className="space-y-3">
          <p>Mock Interview Mode activated! Let's practice a common behavioral question using the STAR method.</p>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl shadow-sm">
            <p className="font-semibold italic text-slate-800 dark:text-slate-200">"Tell me about a time you had to overcome a significant technical challenge under a tight deadline."</p>
          </div>
          <p>How would you approach this? (Remember to structure your answer with: <strong>S</strong>ituation, <strong>T</strong>ask, <strong>A</strong>ction, <strong>R</strong>esult).</p>
        </div>
      );
    }
    if (lowerText.includes('salary')) {
      return (
        <div className="space-y-3">
          <p>Based on our market data for <strong>2024</strong>, here are the salary insights for a mid-level Software Engineer in major tech hubs:</p>
          <ul className="space-y-2">
            <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1"><span>San Francisco, CA</span> <strong className="text-emerald-600 dark:text-emerald-400">$150k - $185k</strong></li>
            <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1"><span>New York, NY</span> <strong className="text-emerald-600 dark:text-emerald-400">$140k - $175k</strong></li>
            <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1"><span>Remote (US)</span> <strong className="text-emerald-600 dark:text-emerald-400">$130k - $160k</strong></li>
          </ul>
          <p className="text-sm mt-2">To negotiate effectively, I recommend focusing on your recent cloud migration project. <span className="font-semibold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Should I draft a negotiation script for you?</span></p>
        </div>
      );
    }
    if (lowerText.includes('cover letter')) {
      return (
        <div className="space-y-3">
          <p>Here is a draft of a highly tailored cover letter based on your profile:</p>
          <div className="p-5 bg-slate-100 dark:bg-slate-800/50 rounded-xl text-sm font-mono leading-relaxed border border-slate-200 dark:border-slate-700">
            Dear Hiring Manager,<br/><br/>
            I am writing to express my strong interest in the Senior Developer role. With over 4 years of experience specializing in modern web ecosystems, I have a proven track record of scaling consumer-facing applications...<br/><br/>
            In my previous role, I spearheaded a frontend architecture redesign that improved performance by 40%...
          </div>
          <p className="font-semibold text-blue-600 dark:text-blue-400 mt-2 cursor-pointer hover:underline">Copy this draft to clipboard</p>
        </div>
      );
    }
    
    if (lowerText.match(/\b(job|find|search|apply)\b/)) {
      return (
        <div className="space-y-3">
          <p>I can certainly help you find the perfect role! Based on your background, I recommend targeting <strong>Frontend Developer</strong> or <strong>Full Stack Engineer</strong> positions.</p>
          <p>I have found <strong>14 new matches</strong> in your area today. Head over to the <span className="font-semibold text-blue-600 dark:text-blue-400">Find Jobs</span> tab to see the curated list!</p>
        </div>
      );
    }
    
    if (lowerText.match(/\b(skill|learn|course|cert|certification)\b/)) {
      return (
        <div className="space-y-3">
          <p>Upskilling is a great idea! Looking at current industry trends for your target roles, here are the top 3 skills employers are looking for right now:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Next.js & Server Components</strong> (Very High Demand)</li>
            <li><strong>GraphQL API Design</strong> (High Demand)</li>
            <li><strong>AWS Cloud Practitioner</strong> (Bonus)</li>
          </ul>
          <p className="text-sm mt-2">Check out the <span className="font-semibold text-blue-600 dark:text-blue-400">Resources</span> tab for free courses on these topics!</p>
        </div>
      );
    }

    if (lowerText.match(/\b(network|connection|linkedin)\b/)) {
      return (
        <div className="space-y-3">
          <p>Networking is crucial! To optimize your LinkedIn profile, ensure your headline is more than just your job title. Try a formula like: <em>[Role] | [Specialty] | [Value Proposition]</em>.</p>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl shadow-sm">
            <p className="font-mono text-xs text-slate-800 dark:text-slate-200">Example: Senior React Developer | Building high-performance accessible UIs | Ex-Startup</p>
          </div>
        </div>
      );
    }

    // Default response echoing the user's input to sound specific
    const shortInput = text.length > 40 ? text.substring(0, 40) + '...' : text;
    return (
      <div className="space-y-3">
        <p>You asked about: <strong>"{shortInput}"</strong></p>
        <p>In the fully integrated version of HireNext AI, I will connect directly to our proprietary career database to generate a highly specialized, step-by-step action plan for this exact scenario!</p>
        <div className="flex gap-2 flex-wrap mt-2">
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-semibold text-slate-500">For now, try asking about:</span>
          <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs font-semibold cursor-pointer border border-blue-100 dark:border-blue-800">Mock Interview</span>
          <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded text-xs font-semibold cursor-pointer border border-emerald-100 dark:border-emerald-800">Job Search</span>
          <span className="px-2 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded text-xs font-semibold cursor-pointer border border-violet-100 dark:border-violet-800">Skill Gap</span>
        </div>
      </div>
    );
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: generateMockResponse(userMessage.content)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (text) => {
    setInput(text);
  };

  const quickActions = [
    { icon: FileSearch, label: 'Resume Review', color: 'from-blue-500 to-cyan-500', prompt: 'Can you review my resume and suggest improvements for ATS optimization?' },
    { icon: Mic, label: 'Mock Interview', color: 'from-violet-500 to-purple-500', prompt: 'I have an interview for a Senior React Developer role tomorrow. Can we do a mock interview?' },
    { icon: LineChart, label: 'Salary Insights', color: 'from-emerald-500 to-teal-500', prompt: 'What is the current market rate for a Product Manager in New York?' },
    { icon: Zap, label: 'Cover Letter', color: 'from-orange-500 to-rose-500', prompt: 'Help me write a compelling cover letter for a startup role.' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* Left Sidebar: Quick Actions (Hidden on mobile, visible on lg) */}
      <div className="hidden lg:flex flex-col w-80 shrink-0 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 mb-6 shadow-lg">
              <Bot size={28} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-black mb-2">HireNext AI</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">Your personal career strategist. Powered by advanced language models to accelerate your job search.</p>
            
            <div className="space-y-3">
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  onClick={() => handlePromptClick(action.prompt)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors text-left">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Capabilities card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
           <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /> Capabilities</h3>
           <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
             <li className="flex items-start gap-3"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Analyzes JDs to find skill gaps</li>
             <li className="flex items-start gap-3"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Generates personalized STAR answers</li>
             <li className="flex items-start gap-3"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Real-time technical interview simulation</li>
           </ul>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10 absolute top-0 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white leading-tight">AI Assistant</h2>
              <p className="text-xs text-slate-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span> Intelligent Mode Active</p>
            </div>
          </div>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg"
          >
            <RefreshCw size={14} /> Clear
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-24 space-y-6 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 sm:gap-4 max-w-[90%] sm:max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900' : 'bg-gradient-to-br from-blue-600 to-violet-600 text-white'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
              </div>
              
              <div className={`p-4 md:p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-tr-sm' 
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles size={14} />
              </div>
              <div className="p-4 md:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm flex gap-1.5 items-center h-[52px] shadow-sm">
                <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-10 relative">
          
          {/* Mobile quick suggestions */}
          {messages.length === 1 && (
            <div className="lg:hidden pb-4 flex gap-2 overflow-x-auto custom-scrollbar">
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  onClick={() => handlePromptClick(action.prompt)}
                  className="whitespace-nowrap px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <action.icon size={12} className={action.color.includes('blue') ? 'text-blue-500' : action.color.includes('violet') ? 'text-violet-500' : action.color.includes('emerald') ? 'text-emerald-500' : 'text-orange-500'} />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto">
            <button type="button" className="absolute left-4 text-slate-400 hover:text-blue-500 transition-colors p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <FileText size={18} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI Assistant to review your resume, run a mock interview, etc..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl pl-14 pr-16 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium shadow-inner"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-3 p-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100 hover:scale-105 transition-all"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">HireNext AI can make mistakes. Consider verifying important information.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateAIAssistant;
