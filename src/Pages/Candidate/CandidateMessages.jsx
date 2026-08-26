import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Send, Paperclip, CheckCircle, Clock,
  MoreVertical, Phone, Video, Info, FileText, CheckCircle2, Circle,
  Briefcase, MapPin, ChevronRight, Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    recruiter: 'Sarah Jenkins',
    company: 'Stripe',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'Senior React Developer',
    lastMessage: 'Great, I will send over the technical assessment shortly.',
    time: '10:42 AM',
    unread: 2,
    online: true,
    tasks: [
      { id: 't1', title: 'Complete Coding Assessment', dueDate: 'Tomorrow', status: 'pending' },
      { id: 't2', title: 'Schedule Technical Interview', dueDate: 'Friday', status: 'pending' }
    ]
  },
  {
    id: 2,
    recruiter: 'Michael Chen',
    company: 'Vercel',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Frontend Engineer',
    lastMessage: 'When are you available for a quick chat?',
    time: 'Yesterday',
    unread: 0,
    online: false,
    tasks: [
      { id: 't3', title: 'Initial Phone Screen', dueDate: 'Completed', status: 'completed' },
      { id: 't4', title: 'Provide Available Times', dueDate: 'Today', status: 'pending' }
    ]
  },
  {
    id: 3,
    recruiter: 'Emily Rodriguez',
    company: 'Notion',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Full Stack Architect',
    lastMessage: 'Thanks for your time today!',
    time: 'Tuesday',
    unread: 0,
    online: true,
    tasks: [
      { id: 't5', title: 'Final System Design Round', dueDate: 'Next Monday', status: 'pending' },
      { id: 't6', title: 'Reference Check', dueDate: 'Pending', status: 'pending' }
    ]
  }
];

const MOCK_MESSAGES = [
  { id: 1, sender: 'recruiter', text: 'Hi there! We reviewed your application for the Senior React Developer position and were very impressed.', time: '10:30 AM' },
  { id: 2, sender: 'candidate', text: 'Hi Sarah, thank you! I am very excited about the opportunity to join Stripe.', time: '10:35 AM' },
  { id: 3, sender: 'recruiter', text: 'We would love to move forward with a technical assessment. It takes about 60 minutes.', time: '10:40 AM' },
  { id: 4, sender: 'candidate', text: 'That sounds great. I am ready whenever you want to send it over.', time: '10:41 AM' },
  { id: 5, sender: 'recruiter', text: 'Great, I will send over the technical assessment shortly.', time: '10:42 AM' }
];

const CandidateMessages = () => {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS.map(c => ({ ...c, muted: false })));
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleBlockUser = () => {
    const updated = conversations.filter(c => c.id !== activeChat.id);
    setConversations(updated);
    if (updated.length > 0) setActiveChat(updated[0]);
    setIsMenuOpen(false);
    toast.error('User has been blocked and removed.');
  };

  const handleToggleMute = () => {
    setConversations(prev => prev.map(c => c.id === activeChat.id ? { ...c, muted: !c.muted } : c));
    setActiveChat(prev => ({ ...prev, muted: !prev.muted }));
    setIsMenuOpen(false);
    toast.success(activeChat.muted ? 'Chat unmuted' : 'Chat muted');
  };

  const handleChatClick = (chat) => {
    setActiveChat(chat);
    setConversations(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'candidate',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const toggleTaskStatus = (taskId) => {
    setActiveChat(prev => ({
      ...prev,
      tasks: prev.tasks.map(t =>
        t.id === taskId
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    }));
  };

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-500">

      {/* Left Panel: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Messages</h2>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {conversations.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 flex items-start gap-4 group ${activeChat.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50' : 'hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}
            >
              <div className="relative flex-shrink-0">
                <img src={chat.avatar} alt={chat.recruiter} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm font-bold truncate ${activeChat.id === chat.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                    {chat.recruiter} {chat.muted && '🔕'}
                  </h3>
                  <span className={`text-xs font-semibold whitespace-nowrap ml-2 ${chat.unread > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {chat.time}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate mb-1">
                  {chat.company} • {chat.role}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className={`text-sm truncate pr-2 ${chat.unread > 0 ? 'font-bold text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel: Chat Window */}
      <div className="flex-1 flex flex-col hidden md:flex bg-white dark:bg-slate-900 relative">
        {/* Chat Header */}
        <div className="h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={activeChat.avatar} alt={activeChat.recruiter} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
              {activeChat.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">{activeChat.recruiter}</h2>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{activeChat.company} • {activeChat.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toast('Starting audio call...', { icon: '📞' })} className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
              <Phone size={20} />
            </button>
            <button onClick={() => toast('Starting video call...', { icon: '📹' })} className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
              <Video size={20} />
            </button>
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
                <MoreVertical size={20} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <button onClick={() => { setIsMenuOpen(false); setShowProfileModal(true); }} className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-2">
                    <Info size={16} /> View Profile
                  </button>
                  <button onClick={handleToggleMute} className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-2">
                    <CheckCircle2 size={16} /> {activeChat.muted ? 'Unmute Chat' : 'Mute Chat'}
                  </button>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button onClick={handleBlockUser} className="w-full px-4 py-2 text-left text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors flex items-center gap-2">
                    Block User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30">
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex ${msg.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${msg.sender === 'candidate' ? 'order-1' : 'order-2'}`}>
                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.sender === 'candidate'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-sm'
                  }`}>
                  {msg.text}
                </div>
                <div className={`text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1 ${msg.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}>
                  {msg.time}
                  {msg.sender === 'candidate' && <Check size={14} className="text-blue-500" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <button type="button" className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors shrink-0">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-5 py-3.5 text-[15px] font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-colors shrink-0 shadow-md shadow-blue-500/20"
            >
              <Send size={20} className="ml-1" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Taskboard Context */}
      <div className="w-80 lg:w-96 flex-shrink-0 border-l border-slate-200 dark:border-slate-800 hidden xl:flex flex-col bg-slate-50/50 dark:bg-slate-900/50">

        {/* Job Context Header */}
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 text-center">
          <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 mb-4 flex items-center justify-center">
            <Briefcase size={36} className="text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{activeChat.role}</h3>
          <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4">{activeChat.company}</p>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <MapPin size={12} /> Remote
            </span>
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              $180k - $220k
            </span>
          </div>
        </div>

        {/* Taskboard */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500" /> Taskboard
            </h3>
            <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-md">
              {activeChat.tasks.filter(t => t.status === 'completed').length} / {activeChat.tasks.length} Done
            </span>
          </div>

          <div className="space-y-3">
            {activeChat.tasks.map(task => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={task.id}
                onClick={() => toggleTaskStatus(task.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 group shadow-sm ${task.status === 'completed'
                    ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 shrink-0 transition-colors ${task.status === 'completed' ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600 group-hover:text-blue-400'}`}>
                    {task.status === 'completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold transition-all ${task.status === 'completed' ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-70' : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                      {task.title}
                    </h4>
                    <p className={`text-[11px] font-bold mt-1.5 flex items-center gap-1 uppercase tracking-wider ${task.status === 'completed' ? 'text-emerald-600/70 dark:text-emerald-500/50' : 'text-slate-500 dark:text-slate-400'}`}>
                      <Clock size={12} /> {task.dueDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contextual Documents */}
          <div className="mt-10">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <FileText size={16} className="text-slate-400" /> Shared Files
            </h3>
            <div className="space-y-2">
              <div onClick={() => {
                toast.success('Downloading Resume_Final.pdf...');
                const a = document.createElement('a');
                a.href = 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO9CjEgMCBvYmogPDwvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmogPDwvVHlwZSAvUGFnZXMgL0tpZHMgWzMgMCBSXSAvQ291bnQgMSA+PgplbmRvYmoKMyAwIG9iaiA8PC9UeXBlIC9QYWdlIC9QYXJlbnQgMiAwIFIgL01lZGlhQm94IFswIDAgNjEyIDc5Ml0gL1Jlc291cmNlcyA8PC9Gb250IDw8L0YxIDQgMCBSPj4+PiAvQ29udGVudHMgNSAwIFIgPj4KZW5kb2JqCjQgMCBvYmogPDwvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2EgfT4KZW5kb2JqCjUgMCBvYmogPDwvTGVuZ3RoIDQ0Pj4Kc3RyZWFtCkJUCi9GMSAyNCBUZgoxMDAgNzAwIFRkCihEdW1teSBSZXN1bWUpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjggMDAwMDAgbiAKMDAwMDAwMDEyNyAwMDAwMCBuIAowMDAwMDAwMjQ5IDAwMDAwIG4gCjAwMDAwMDAzMzkgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDYgL1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKNDM0CiUlRU9GCg==';
                a.download = 'Resume_Final.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center font-black text-[10px]">PDF</div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Resume_Final.pdf</p>
                    <p className="text-[10px] font-bold text-slate-400">Sent yesterday</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* View Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 text-center">
              <img src={activeChat.avatar} alt={activeChat.recruiter} className="w-24 h-24 mx-auto rounded-full object-cover shadow-md mb-4 border-4 border-white dark:border-slate-800" />
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">{activeChat.recruiter}</h2>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-6">{activeChat.company}</p>

              <div className="flex flex-col gap-3">
                <button onClick={() => { setShowProfileModal(false); toast.success(`Redirecting to ${activeChat.company}'s full profile...`); }} className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 font-bold rounded-xl transition-colors">
                  View Full Profile
                </button>
                <button onClick={() => setShowProfileModal(false)} className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateMessages;
