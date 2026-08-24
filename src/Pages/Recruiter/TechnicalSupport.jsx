import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, AlertCircle, Clock, Server, Database, Globe, MessageSquare, Send, Paperclip, Search, Plus, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const StatusBadge = ({ status }) => {
  if (status === 'operational') {
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Operational
      </span>
    );
  }
  if (status === 'degraded') {
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-500/20">
        <AlertTriangle size={12} /> Degraded Performance
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-500/20">
      <AlertCircle size={12} /> Outage
    </span>
  );
};

const SystemComponent = ({ name, icon: Icon, status, uptime }) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        status === 'operational' ? 'bg-emerald-50 text-emerald-500 dark:bg-slate-900' : 
        status === 'degraded' ? 'bg-amber-50 text-amber-500 dark:bg-slate-900' : 'bg-rose-50 text-rose-500 dark:bg-slate-900'
      }`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{uptime}% Uptime (90 Days)</p>
      </div>
    </div>
    <StatusBadge status={status} />
  </div>
);

const TechnicalSupport = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [isRefreshingStatus, setIsRefreshingStatus] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const fileInputRef = useRef(null);

  const [systemStatuses, setSystemStatuses] = useState({
    web: { name: 'Main Web Application', icon: Globe, status: 'operational', uptime: '99.99' },
    ai: { name: 'AI Matching Engine', icon: Server, status: 'operational', uptime: '99.95' },
    db: { name: 'Database Clusters', icon: Database, status: 'operational', uptime: '99.99' }
  });

  const [ticketsList, setTicketsList] = useState([
    { id: 'TKT-8932', subject: 'Candidate export failed to download', status: 'Resolved', date: '2 days ago', urgency: 'low' },
    { id: 'TKT-9104', subject: 'Billing cycle clarification', status: 'In Progress', date: '5 hours ago', urgency: 'medium' },
    { id: 'TKT-9128', subject: 'Login 500 error on mobile safari', status: 'Pending Review', date: 'Just now', urgency: 'high' }
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too large. Max 10MB allowed.");
      } else {
        setAttachedFile(file);
      }
    }
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDescription) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    toast.success("Support ticket submitted successfully! A representative will contact you soon.");
    
    const newTicket = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: ticketSubject,
      status: 'Open',
      date: 'Just now',
      urgency: urgency
    };
    
    setTicketsList([newTicket, ...ticketsList]);
    
    setTicketSubject('');
    setTicketDescription('');
    setUrgency('medium');
    setAttachedFile(null);
  };

  const handleRefreshStatus = () => {
    setIsRefreshingStatus(true);
    setTimeout(() => {
      setIsRefreshingStatus(false);
      
      const rand = Math.random();
      if (rand < 0.3) {
        setSystemStatuses(prev => ({
          ...prev,
          ai: { ...prev.ai, status: 'degraded', uptime: '98.50' }
        }));
        toast.error("System refresh detected a degraded service.");
      } else {
        setSystemStatuses({
          web: { name: 'Main Web Application', icon: Globe, status: 'operational', uptime: '99.99' },
          ai: { name: 'AI Matching Engine', icon: Server, status: 'operational', uptime: '99.95' },
          db: { name: 'Database Clusters', icon: Database, status: 'operational', uptime: '99.99' }
        });
        toast.success("System status is up to date.");
      }
    }, 1500);
  };

  const filteredTickets = ticketsList.filter(t => 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 px-6 lg:px-10 max-w-[1400px] mx-auto pt-10">
        
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">Support Hub</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            Check our system status, submit troubleshooting tickets, and track the progress of your ongoing requests.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          
          {/* Left Column: System Status & Past Tickets */}
          <div className="xl:col-span-1 space-y-8">
            
            {/* System Status */}
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-6 lg:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">System Status</h3>
                <button 
                  onClick={handleRefreshStatus}
                  disabled={isRefreshingStatus}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider disabled:opacity-50"
                >
                  <RefreshCw size={14} className={isRefreshingStatus ? 'animate-spin' : ''} />
                  {isRefreshingStatus ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-4 mb-6 flex items-start gap-4">
                <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">All Systems Operational</h4>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500/80 mt-1">HireNext is running smoothly. No reported outages across any of our global servers.</p>
                </div>
              </div>

              <div className="space-y-3">
                <SystemComponent {...systemStatuses.web} />
                <SystemComponent {...systemStatuses.ai} />
                <SystemComponent {...systemStatuses.db} />
              </div>
            </div>

            {/* My Tickets */}
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-6 lg:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Recent Tickets</h3>
                <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 focus-within:border-blue-400 transition-colors">
                  <Search size={16} className="text-slate-400 ml-1" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white w-20 md:w-24 focus:w-32 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map(ticket => (
                    <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400">{ticket.id}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                          ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' :
                          ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 
                          ticket.status === 'Open' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3 group-hover:text-blue-600 transition-colors">{ticket.subject}</h4>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1"><Clock size={12}/> {ticket.date}</span>
                        <span className="capitalize">{ticket.urgency} Urgency</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                    No tickets found matching your search.
                  </div>
                )}
              </div>
            </div>
            
          </div>

          {/* Right Column: Submit Ticket Form */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 to-orange-500"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Submit a New Ticket</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Please provide as much detail as possible to help us resolve your issue faster.</p>
                </div>
              </div>

              <form onSubmit={handleSubmitTicket} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Issue Subject <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="E.g., Cannot upload PDF resume in talent pool"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium">
                      <option>Bug or Glitch</option>
                      <option>Account Access / Login</option>
                      <option>Billing & Subscriptions</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Urgency Level</label>
                    <select 
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Core feature acting up</option>
                      <option value="high">High - Completely blocked from working</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description <span className="text-rose-500">*</span></label>
                  <textarea 
                    rows="6" 
                    placeholder="Please describe what you were trying to do, what happened, and any error messages you received."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium resize-none"
                  ></textarea>
                </div>

                {/* Attachment Dropzone */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
                    attachedFile 
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' 
                      : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*,video/*,.pdf"
                  />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    attachedFile ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {attachedFile ? <CheckCircle size={20} /> : <Paperclip size={20} />}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    {attachedFile ? 'File Attached Successfully' : 'Attach screenshots or videos'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {attachedFile ? attachedFile.name : 'Drag and drop files here, or click to browse (Max 10MB)'}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button type="submit" className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-rose-500/20 flex items-center gap-3 hover:scale-105 active:scale-95">
                    <Send size={18} /> Submit Ticket
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Ticket Details Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setSelectedTicket(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Ticket Details</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedTicket.subject}</h3>
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg ${
                  selectedTicket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' :
                  selectedTicket.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 
                  selectedTicket.status === 'Open' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {selectedTicket.status}
                </span>
              </div>
              
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 mb-8">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-slate-300">Ticket ID</span>
                  <span>{selectedTicket.id}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-slate-300">Date Submitted</span>
                  <span>{selectedTicket.date}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-slate-300">Urgency</span>
                  <span className="capitalize">{selectedTicket.urgency}</span>
                </div>
                <div className="py-2">
                  <span className="font-bold text-slate-900 dark:text-slate-300 block mb-2">Description</span>
                  <p className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl leading-relaxed">
                    This is a full description for ticket {selectedTicket.id}. In a production environment, this would pull the full ticket description from the database along with any attachments.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedTicket(null)}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-2xl font-bold transition-colors"
              >
                Close Ticket
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TechnicalSupport;
