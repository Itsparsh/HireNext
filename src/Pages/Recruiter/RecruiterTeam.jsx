import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Shield, ShieldAlert, ShieldCheck, Mail, Phone, MoreVertical, Edit2, Trash2, X, Check } from 'lucide-react';

const initialTeam = [
  { id: 1, name: 'Sarah Jenkins', role: 'Lead Recruiter', email: 'sarah.j@techflow.com', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop', status: 'Online', access: 'Admin' },
  { id: 2, name: 'Marcus Wright', role: 'Technical Sourcer', email: 'marcus.w@techflow.com', avatar: 'https://i.pravatar.cc/150?u=2', status: 'In a Meeting', access: 'Editor' },
  { id: 3, name: 'Elena Rodriguez', role: 'HR Manager', email: 'elena.r@techflow.com', avatar: 'https://i.pravatar.cc/150?u=3', status: 'Offline', access: 'Viewer' },
  { id: 4, name: 'David Chen', role: 'Engineering Manager', email: 'david.c@techflow.com', avatar: 'https://i.pravatar.cc/150?u=4', status: 'Online', access: 'Editor' },
  { id: 5, name: 'Anita Patel', role: 'Campus Recruiter', email: 'anita.p@techflow.com', avatar: 'https://i.pravatar.cc/150?u=5', status: 'Away', access: 'Viewer' },
];

const RecruiterTeam = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editRoleMember, setEditRoleMember] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteMember, setDeleteMember] = useState(null);
  const [viewProfileMember, setViewProfileMember] = useState(null);
  const [messageMember, setMessageMember] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getAccessBadge = (access) => {
    switch (access) {
      case 'Admin': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30"><ShieldAlert size={14} /> Admin</span>;
      case 'Editor': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30"><ShieldCheck size={14} /> Editor</span>;
      default: return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700"><Shield size={14} /> Viewer</span>;
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Online': return 'bg-emerald-500';
      case 'Away': return 'bg-amber-500';
      case 'In a Meeting': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  const filteredTeam = teamMembers.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.role.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
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
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <Users size={14} className="text-purple-500" /> Collaboration
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Directory</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Manage recruiters, hiring managers, and role permissions.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full md:w-auto items-center gap-4">
            <div className="relative group flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search team members..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => setIsInviteModalOpen(true)}
              className="shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black transition-all shadow-lg hover:scale-105 active:scale-95 group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Invite Member
            </button>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTeam.map((member, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={member.id}
                className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>

                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-3xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className={`w-3 h-3 rounded-full ${getStatusDot(member.status)} ring-2 ring-white dark:ring-slate-900`}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {getAccessBadge(member.access)}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === member.id ? null : member.id)}
                        className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                      {activeDropdown === member.id && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 overflow-hidden">
                          <button onClick={() => { setActiveDropdown(null); setViewProfileMember(member); }} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors">View Profile</button>
                          <button onClick={() => { setActiveDropdown(null); setMessageMember(member); }} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors">Send Message</button>
                          <div className="h-px w-full bg-slate-100 dark:bg-slate-700 my-1"></div>
                          <button onClick={() => { setActiveDropdown(null); setDeleteMember(member); }} className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 font-bold transition-colors">Remove Member</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{member.role}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors"><Mail size={14} /> {member.email}</span>
                  <span className="flex items-center gap-1.5"><Phone size={14} /> Internal</span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setEditRoleMember(member)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl font-bold transition-colors"
                  >
                    <Edit2 size={16} /> Edit Role
                  </button>
                  <button 
                    onClick={() => setDeleteMember(member)}
                    className="p-2.5 text-slate-400 hover:text-red-600 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTeam.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Users size={24} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No team members found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your search terms.</p>
          </div>
        )}

      </div>

      {/* Invite Member Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setIsInviteModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
            >
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 mb-6">
                <Mail size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Invite New Member</h2>
              <p className="text-slate-500 font-medium mb-8">Send an email invitation to join your team workspace.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const role = e.target.role.value;
                const newMember = {
                  id: Date.now(),
                  name: email.split('@')[0],
                  role: 'New Member',
                  email: email,
                  avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
                  status: 'Offline',
                  access: role
                };
                setTeamMembers([...teamMembers, newMember]);
                setIsInviteModalOpen(false);
                showToast(`Invitation sent to ${email} successfully!`);
              }}>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input name="email" type="email" required placeholder="colleague@company.com" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Access Role</label>
                    <select name="role" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium appearance-none">
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>
                </div>
                
                <button type="submit" className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98]">
                  Send Invitation
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Role Modal */}
      <AnimatePresence>
        {editRoleMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setEditRoleMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-sm p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
            >
              <button 
                onClick={() => setEditRoleMember(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Edit Role</h2>
              <p className="text-slate-500 font-medium mb-6">Update access permissions for {editRoleMember.name}.</p>
              
              <div className="space-y-2 mb-8">
                {['Admin', 'Editor', 'Viewer'].map(role => (
                  <button 
                    key={role}
                    onClick={() => {
                      setTeamMembers(teamMembers.map(m => m.id === editRoleMember.id ? { ...m, access: role } : m));
                      setEditRoleMember(null);
                      showToast(`${editRoleMember.name} is now a(n) ${role}.`);
                    }}
                    className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${
                      editRoleMember.access === role 
                        ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-1 ring-purple-200 dark:ring-purple-500/30' 
                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {role}
                    {editRoleMember.access === role && <Check size={18} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Member Modal */}
      <AnimatePresence>
        {deleteMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setDeleteMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-sm p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 mb-6">
                <Trash2 size={28} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Remove Member?</h2>
              <p className="text-slate-500 font-medium mb-8">Are you sure you want to remove <strong>{deleteMember.name}</strong> from the team? This action cannot be undone.</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteMember(null)}
                  className="flex-1 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setTeamMembers(teamMembers.filter(m => m.id !== deleteMember.id));
                    setDeleteMember(null);
                    showToast(`Successfully removed ${deleteMember.name} from the team.`);
                  }}
                  className="flex-1 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black shadow-lg shadow-red-500/25 transition-all active:scale-[0.98]"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Profile Modal */}
      <AnimatePresence>
        {viewProfileMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setViewProfileMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-500 relative">
                <button 
                  onClick={() => setViewProfileMember(null)}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/10 hover:bg-black/20 rounded-full transition-colors backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="px-8 pb-8">
                <div className="relative -mt-16 mb-4 flex justify-between items-end">
                  <div className="relative">
                    <img src={viewProfileMember.avatar} alt={viewProfileMember.name} className="w-28 h-28 rounded-3xl object-cover shadow-xl border-4 border-white dark:border-slate-900" />
                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className={`w-4 h-4 rounded-full ${getStatusDot(viewProfileMember.status)} ring-2 ring-white dark:ring-slate-900`}></div>
                    </div>
                  </div>
                  <div className="mb-2">
                    {getAccessBadge(viewProfileMember.access)}
                  </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{viewProfileMember.name}</h2>
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-6">{viewProfileMember.role}</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <Mail size={18} className="text-slate-400" />
                    {viewProfileMember.email}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <Phone size={18} className="text-slate-400" />
                    +1 (555) 123-4567 (Internal)
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button onClick={() => { setViewProfileMember(null); setMessageMember(viewProfileMember); }} className="flex-1 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <Mail size={18} /> Send Message
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Send Message Modal */}
      <AnimatePresence>
        {messageMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setMessageMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
            >
              <button 
                onClick={() => setMessageMember(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <img src={messageMember.avatar} alt={messageMember.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">New Message</h2>
                  <p className="text-slate-500 font-medium text-sm">To: {messageMember.name}</p>
                </div>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                setMessageMember(null);
                showToast(`Message sent to ${messageMember.name}!`);
              }}>
                <div className="mb-6">
                  <textarea 
                    required 
                    placeholder="Type your message here..." 
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium resize-none" 
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setMessageMember(null)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] flex items-center gap-2"
                  >
                    Send <Mail size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecruiterTeam;
