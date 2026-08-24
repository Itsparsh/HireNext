import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info, Check, CheckCheck, Smile, Image as ImageIcon, Palette, X } from 'lucide-react';

const mockConversations = [
  { id: 1, name: 'Alex Thompson', role: 'Senior React Developer', avatar: 'https://i.pravatar.cc/150?u=1', lastMessage: 'That sounds great! I am available on Thursday.', time: '10:45 AM', unread: 2, online: true },
  { id: 2, name: 'Sarah Chen', role: 'Full Stack Engineer', avatar: 'https://i.pravatar.cc/150?u=2', lastMessage: 'Here is my updated portfolio link as requested.', time: 'Yesterday', unread: 0, online: false },
  { id: 3, name: 'Michael Rodriguez', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?u=3', lastMessage: 'Thank you for the update on my application.', time: 'Yesterday', unread: 0, online: true },
  { id: 4, name: 'Emily Taylor', role: 'Data Scientist', avatar: 'https://i.pravatar.cc/150?u=4', lastMessage: 'Can we reschedule the technical round?', time: 'Tuesday', unread: 1, online: false },
  { id: 5, name: 'David Kim', role: 'Backend Engineer', avatar: 'https://i.pravatar.cc/150?u=5', lastMessage: 'I have completed the take-home assignment.', time: 'Monday', unread: 0, online: false },
];

const initialChatHistories = {
  1: [
    { id: 1, sender: 'them', text: 'Hi Sarah, thank you for reaching out regarding the Senior React Developer position!', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hi Alex! Thanks for applying. Your background looks fantastic. Are you available for a quick 15-minute introductory call this week?', time: '10:35 AM' },
    { id: 3, sender: 'them', text: 'That sounds great! I am available on Thursday.', time: '10:45 AM' },
  ],
  2: [
    { id: 1, sender: 'me', text: 'Hi Sarah, could you send over your updated portfolio link?', time: 'Yesterday' },
    { id: 2, sender: 'them', text: 'Here is my updated portfolio link as requested.', time: 'Yesterday' },
  ],
  3: [
    { id: 1, sender: 'me', text: 'Hi Michael, we have decided to move forward with your application!', time: 'Yesterday' },
    { id: 2, sender: 'them', text: 'Thank you for the update on my application.', time: 'Yesterday' },
  ],
  4: [
    { id: 1, sender: 'them', text: 'Can we reschedule the technical round?', time: 'Tuesday' },
  ],
  5: [
    { id: 1, sender: 'them', text: 'I have completed the take-home assignment.', time: 'Monday' },
  ]
};

const themes = {
  default: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
  ocean: "bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950/40 dark:via-blue-950/40 dark:to-indigo-950/40 backdrop-blur-xl",
  sunset: "bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 dark:from-orange-950/40 dark:via-rose-950/40 dark:to-purple-950/40 backdrop-blur-xl",
  midnight: "bg-slate-900 dark:bg-black bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-95",
};

const RecruiterMessages = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [chatHistories, setChatHistories] = useState(initialChatHistories);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
  };

  useEffect(() => {
    setConversations(prev => {
      const chat = prev.find(c => c.id === activeChat.id);
      if (chat && chat.unread > 0) {
        return prev.map(c => c.id === activeChat.id ? { ...c, unread: 0 } : c);
      }
      return prev;
    });
  }, [activeChat.id]);
  const [toastMessage, setToastMessage] = useState(null);
  const [chatTheme, setChatTheme] = useState('default');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  
  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState('voice');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState({});
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const commonEmojis = ['😊', '😂', '👍', '❤️', '🔥', '🎉', '🙌', '✨', '💡', '🤔', '😎', '👏'];
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const newMyMsg = {
      id: Date.now(),
      sender: 'me',
      text: `📎 Attached file: ${file.name}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMyMsg]
    }));
    setConversations(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMessage: `📎 Attached file: ${file.name}`, time: 'Just now' } : c));
    showToast(`File ${file.name} attached successfully!`);
    
    // reset input
    e.target.value = '';
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const newMyMsg = {
      id: Date.now(),
      sender: 'me',
      text: `🖼️ Attached image: ${file.name}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMyMsg]
    }));
    setConversations(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMessage: `🖼️ Attached image: ${file.name}`, time: 'Just now' } : c));
    showToast(`Image ${file.name} attached successfully!`);
    
    // reset input
    e.target.value = '';
  };

  const handleDownloadResume = () => {
    setIsProfileOpen(false);
    showToast(`Preparing ${activeChat.name}'s Resume...`);
    
    setTimeout(() => {
      const resumeContent = `RESUME\n\nName: ${activeChat.name}\nRole: ${activeChat.role}\n\nEXPERIENCE\n5+ years building scalable web applications. Previously at Google and Meta.\n\nSKILLS\nReact, Node.js, TypeScript, GraphQL\n\nCONTACT\nEmail: ${activeChat.name.toLowerCase().replace(' ', '.')}@example.com\nPhone: (555) 123-4567\n\nThis is a mock resume generated by HireNext.`;
      
      const blob = new Blob([resumeContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeChat.name.replace(' ', '_')}_Resume.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      showToast("Resume downloaded successfully!");
    }, 1200);
  };

  const messages = chatHistories[activeChat.id] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMyMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMyMsg]
    }));
    
    setConversations(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMessage: inputValue, time: 'Just now' } : c));
    
    setInputValue('');

    setTimeout(() => {
      const newThemMsg = {
        id: Date.now() + 1,
        sender: 'them',
        text: "Thanks for the message! I'll review this and get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistories(prev => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), newThemMsg]
      }));
      setConversations(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMessage: newThemMsg.text, time: 'Just now' } : c));
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-64px)] relative flex bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3"
          >
            <Check size={18} className="text-emerald-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-40 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
      </div>

      <div className="relative z-10 flex-1 flex w-full max-w-[1600px] mx-auto min-h-0">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex flex-col min-h-0 z-20">
          
          {/* Sidebar Header */}
          <div className="p-4 md:p-6 border-b border-slate-200/50 dark:border-slate-800/50 shrink-0">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Messages</h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none text-sm text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
            {conversations.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => handleChatSelect(chat)}
                className={`p-4 md:p-5 flex items-start gap-4 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800/50 relative ${activeChat.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
              >
                {activeChat.id === chat.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                )}
                
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white truncate pr-2">{chat.name}</h3>
                    <span className={`text-[10px] font-bold shrink-0 ${chat.unread ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>{chat.time}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 truncate mb-1">{chat.role}</p>
                  <p className={`text-sm truncate ${chat.unread ? 'font-bold text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-6 shadow-md shadow-blue-500/30">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area (Hidden on mobile if not selected, but for simplicity shown here side-by-side on desktop) */}
        <div className={`hidden md:flex flex-1 flex-col min-h-0 relative transition-colors duration-500 ${themes[chatTheme]}`}>
          
          {/* Chat Header */}
          <div className="h-20 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-6 shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">{activeChat.name}</h2>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${activeChat.online ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                  <span className="text-xs font-bold text-slate-500">{activeChat.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => { setCallType('voice'); setIsCalling(true); }} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors shadow-sm">
                <Phone size={18} />
              </button>
              <button onClick={() => { setCallType('video'); setIsCalling(true); }} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors shadow-sm">
                <Video size={18} />
              </button>
              
              <div className="relative z-50">
                <button onClick={() => { setIsThemeMenuOpen(!isThemeMenuOpen); setIsMoreMenuOpen(false); }} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors shadow-sm">
                  <Palette size={18} />
                </button>
                <AnimatePresence>
                  {isThemeMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Chat Theme</div>
                      {Object.keys(themes).map(theme => (
                        <button 
                          key={theme}
                          onClick={() => { setChatTheme(theme); setIsThemeMenuOpen(false); showToast(`Chat theme changed to ${theme}!`); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-bold capitalize transition-colors ${chatTheme === theme ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                        >
                          {theme}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative z-50">
                <button onClick={() => { setIsMoreMenuOpen(!isMoreMenuOpen); setIsThemeMenuOpen(false); }} className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <MoreVertical size={20} />
                </button>
                <AnimatePresence>
                  {isMoreMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 overflow-hidden"
                    >
                      <button onClick={() => { setIsMoreMenuOpen(false); setIsProfileOpen(true); }} className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">View Profile</button>
                      <button 
                        onClick={() => {
                          const isBlocked = blockedUsers[activeChat.id];
                          setBlockedUsers(prev => ({ ...prev, [activeChat.id]: !isBlocked }));
                          setIsMoreMenuOpen(false);
                          showToast(isBlocked ? `${activeChat.name} has been unblocked.` : `${activeChat.name} has been blocked.`);
                        }} 
                        className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${blockedUsers[activeChat.id] ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20' : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                      >
                        {blockedUsers[activeChat.id] ? 'Unblock Candidate' : 'Block Candidate'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0 scrollbar-hide">
            <div className="flex justify-center mb-8">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
            </div>
            
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex gap-3 max-w-[80%] ${msg.sender === 'me' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <img src={msg.sender === 'me' ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop' : activeChat.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0 mt-auto shadow-sm" />
                  
                  <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-3xl text-sm font-medium shadow-sm ${
                      msg.sender === 'me' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-1.5 px-2">
                      <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
                      {msg.sender === 'me' && <CheckCheck size={12} className="text-blue-500" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Chat Input */}
          <div className="p-4 md:p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 shrink-0">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <div className="absolute left-2 flex items-center gap-1">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} className="hidden" />
                
                <button type="button" disabled={!!blockedUsers[activeChat.id]} onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50 disabled:hover:text-slate-400">
                  <Paperclip size={18} />
                </button>
                <button type="button" disabled={!!blockedUsers[activeChat.id]} onClick={() => imageInputRef.current?.click()} className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50 disabled:hover:text-slate-400">
                  <ImageIcon size={18} />
                </button>
              </div>
              
              <input
                type="text"
                value={inputValue}
                disabled={!!blockedUsers[activeChat.id]}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={blockedUsers[activeChat.id] ? "You have blocked this candidate." : "Type your message..."}
                className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl pl-20 pr-24 py-4 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900"
              />
              
              <div className="absolute right-2 flex items-center gap-2">
                <div className="relative z-50 hidden sm:block">
                  <button type="button" disabled={!!blockedUsers[activeChat.id]} onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className="p-2 text-slate-400 hover:text-yellow-500 transition-colors disabled:opacity-50 disabled:hover:text-slate-400">
                    <Smile size={18} />
                  </button>
                  <AnimatePresence>
                    {isEmojiPickerOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 grid grid-cols-4 gap-2 w-48"
                      >
                        {commonEmojis.map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setInputValue(prev => prev + emoji);
                              setIsEmojiPickerOpen(false);
                            }}
                            className="text-xl hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded-lg transition-colors flex items-center justify-center"
                          >
                            {emoji}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button type="submit" disabled={!inputValue.trim() || !!blockedUsers[activeChat.id]} className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors shadow-md shadow-blue-500/20 shrink-0">
                  <Send size={18} className={inputValue.trim() ? "ml-0.5" : ""} />
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-sm flex flex-col items-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-slate-800 shadow-xl" />
                <h2 className="text-2xl font-black text-white mb-1">{activeChat.name}</h2>
                <p className="text-slate-400 font-bold mb-8">
                  {callType === 'video' ? 'Video calling...' : 'Calling...'}
                </p>
                
                <div className="flex items-center gap-6">
                  <button className="w-14 h-14 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center transition-colors">
                    {callType === 'video' ? <Video size={24} /> : <Phone size={24} />}
                  </button>
                  <button onClick={() => setIsCalling(false)} className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg shadow-red-500/30">
                    <Phone size={28} className="rotate-[135deg]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500 to-indigo-600 z-0"></div>
              
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20"
              >
                <X size={20} />
              </button>
              
              <div className="relative z-10 flex flex-col items-center mt-12 mb-6">
                <div className="relative">
                  <img src={activeChat.avatar} alt={activeChat.name} className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-xl" />
                  {activeChat.online && (
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
                  )}
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-4">{activeChat.name}</h2>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-1">{activeChat.role}</p>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
                  <Info size={14} /> Applied via LinkedIn
                </p>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Experience</h4>
                  <p className="text-slate-700 dark:text-slate-300 font-medium text-sm">5+ years building scalable web applications. Previously at Google and Meta.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'TypeScript', 'GraphQL'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3 relative z-10">
                <button onClick={handleDownloadResume} className="flex-1 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold transition-colors hover:opacity-90 shadow-lg">Download Resume</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default RecruiterMessages;
