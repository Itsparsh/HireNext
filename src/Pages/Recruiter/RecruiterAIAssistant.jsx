import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles, Zap, FileText, MessageSquare, Copy, CheckCircle, RefreshCcw, ThumbsUp, ThumbsDown, StopCircle } from 'lucide-react';

const presetPrompts = [
  { id: 1, title: 'Draft Job Description', icon: FileText, prompt: 'Write a compelling job description for a Senior Frontend Developer specializing in React and Framer Motion.' },
  { id: 2, title: 'Interview Questions', icon: MessageSquare, prompt: 'Generate 5 advanced technical interview questions for a Node.js backend architect.' },
  { id: 3, title: 'Rejection Email', icon: Zap, prompt: 'Draft a polite and constructive rejection email for a candidate who reached the final interview stage.' },
  { id: 4, title: 'Screening Script', icon: Sparkles, prompt: 'Create a 15-minute phone screening script for evaluating a UI/UX designer.' },
];

const mockChatHistory = [
  { id: 1, role: 'assistant', content: 'Hello! I am your HireNext AI Recruitment Assistant. I can help you draft job descriptions, generate interview questions, screen resumes, and write emails. How can I assist you today?', timestamp: '10:00 AM' }
];

const RecruiterAIAssistant = () => {
  const [messages, setMessages] = useState(mockChatHistory);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    const newUserMsg = { id: Date.now(), role: 'user', content: text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Here is a draft based on your request:\n\n**Position:** Senior Frontend Developer\n\n**Overview:**\nWe are looking for an exceptional Senior Frontend Developer to join our core product team. You will be responsible for building highly interactive, performant, and beautiful user interfaces using React and modern animation libraries like Framer Motion.\n\n**Key Requirements:**\n- 5+ years of React experience\n- Deep understanding of CSS and modern styling (Tailwind)\n- Experience with state management (Redux, Zustand)\n\nWould you like me to refine this or add a section about company benefits?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-64px)] relative flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-[1200px] mx-auto w-full p-4 lg:p-8 min-h-0">
        
        {/* Chat Area */}
        <div className="flex-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden flex flex-col min-h-0">
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide min-h-0">
            {messages.length === 1 && (
              <div className="mb-12 mt-8">
                <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Suggested Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {presetPrompts.map(preset => (
                    <button 
                      key={preset.id}
                      onClick={() => handleSend(preset.prompt)}
                      className="text-left p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
                    >
                      <preset.icon size={20} className="text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{preset.title}</h4>
                      <p className="text-xs font-medium text-slate-500 line-clamp-2">{preset.prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-900 dark:bg-white' : 'bg-gradient-to-br from-purple-500 to-blue-500'}`}>
                    {msg.role === 'user' ? <User size={20} className="text-white dark:text-slate-900" /> : <Bot size={20} className="text-white" />}
                  </div>
                  
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{msg.role === 'user' ? 'You' : 'HireNext AI'}</span>
                      <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{msg.timestamp}</span>
                    </div>
                    
                    <div className={`p-5 rounded-3xl text-sm font-medium leading-relaxed whitespace-pre-wrap shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-tr-sm' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>

                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2 px-2">
                        <button onClick={() => handleCopy(msg.id, msg.content)} className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors" title="Copy text">
                          {copiedId === msg.id ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"><ThumbsUp size={14} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><ThumbsDown size={14} /></button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl rounded-tl-sm p-5 flex items-center gap-1.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AI to draft a job description, email, or interview questions..."
                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-6 pr-32 py-4 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-inner"
              />
              <div className="absolute right-2 flex items-center gap-2">
                {isTyping ? (
                  <button type="button" onClick={() => setIsTyping(false)} className="w-10 h-10 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 hover:text-red-500 rounded-xl transition-colors">
                    <StopCircle size={20} />
                  </button>
                ) : (
                  <button type="submit" disabled={!inputValue.trim()} className="w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors shadow-md shadow-purple-500/20">
                    <Send size={18} className={inputValue.trim() ? "ml-0.5" : ""} />
                  </button>
                )}
              </div>
            </form>
            <p className="text-center text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">
              AI can make mistakes. Review generated content before sending to candidates.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecruiterAIAssistant;
