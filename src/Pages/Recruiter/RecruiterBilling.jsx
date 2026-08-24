import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Download, Check, Zap, Shield, Star, Clock, AlertCircle, Plus, MoreVertical, X, Trash2 } from 'lucide-react';
import InvoicePDF from '../../components/InvoicePDF';

const mockInvoices = [
  { id: 'INV-2026-001', date: 'Oct 01, 2026', amount: 2, status: 'Paid', plan: 'HireNext Pro' },
  { id: 'INV-2026-002', date: 'Sep 01, 2026', amount: 2, status: 'Paid', plan: 'HireNext Pro' },
  { id: 'INV-2026-003', date: 'Aug 01, 2026', amount: 2, status: 'Paid', plan: 'HireNext Pro' },
  { id: 'INV-2026-004', date: 'Jul 01, 2026', amount: 2, status: 'Paid', plan: 'HireNext Pro' },
];

const RecruiterBilling = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [managePayment, setManagePayment] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('Basic Free');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isDowngrading, setIsDowngrading] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currency, setCurrency] = useState('USD');

  const getPrice = (usdPrice) => {
    return currency === 'USD' ? usdPrice : usdPrice * 83;
  };

  const formatCurrency = (amount) => {
    return currency === 'USD' ? `$${amount}` : `₹${amount}`;
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const downloadInvoice = async (invoice) => {
    showToast(`Generating PDF invoice ${invoice.id}...`);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const formatted = `${formatCurrency(getPrice(invoice.amount))}.00 ${currency}`;
      const blob = await pdf(<InvoicePDF invoice={invoice} formattedAmount={formatted} isMultiple={false} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HireNext-${invoice.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      showToast("Failed to generate PDF.");
    }
  };

  const downloadAllInvoices = async () => {
    showToast("Generating Billing History PDF...");
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const blob = await pdf(
        <InvoicePDF 
          isMultiple={true} 
          allInvoices={mockInvoices} 
          formatAmount={(amt) => `${formatCurrency(getPrice(amt))}.00 ${currency}`} 
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HireNext_Billing_History.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      showToast("Failed to generate PDF.");
    }
  };

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
        <div className="absolute -top-40 right-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-slate-950/80 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-8 max-w-[1600px] mx-auto pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm mb-4">
              <CreditCard size={14} className="text-emerald-500" /> Account Settings
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Billing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Subscription</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Manage your plan, payment methods, and billing history.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex bg-slate-100 dark:bg-slate-800/80 rounded-xl p-1.5 border border-slate-200 dark:border-slate-700 shadow-sm self-end">
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-5 py-2.5 text-sm font-black rounded-lg transition-all flex items-center gap-2 ${currency === 'USD' ? 'bg-white dark:bg-slate-900 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <span className="text-base">$</span> USD
            </button>
            <button 
              onClick={() => setCurrency('INR')}
              className={`px-5 py-2.5 text-sm font-black rounded-lg transition-all flex items-center gap-2 ${currency === 'INR' ? 'bg-white dark:bg-slate-900 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <span className="text-base">₹</span> INR
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Current Plan & Payment Method */}
          <div className="xl:col-span-1 space-y-8">
            
            {/* Current Plan Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                  <Star size={24} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Active
                </span>
              </div>
              
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Current Plan</h3>
              <p className="text-3xl font-black text-slate-900 dark:text-white mb-2">{currentPlan}</p>
              <p className="text-sm font-bold text-slate-500 mb-6">
                {currentPlan.startsWith('HireNext Pro') 
                  ? (currentPlan.includes('Yearly') 
                      ? `${formatCurrency(getPrice(20))}.00 ${currency} / year` 
                      : currentPlan.includes('6 Months') 
                        ? `${formatCurrency(getPrice(10))}.00 ${currency} / 6 months` 
                        : `${formatCurrency(getPrice(2))}.00 ${currency} / month`)
                  : `${formatCurrency(0)}.00 ${currency} / month`
                }
              </p>

              <div className="space-y-3 mb-8">
                {(currentPlan.startsWith('HireNext Pro') 
                  ? ['Unlimited Job Postings', 'Advanced AI Assistant', 'Team Collaboration (Up to 5)']
                  : ['Up to 3 Job Postings', 'Basic Candidate Filtering', 'Email Support']
                ).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-slate-900 rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  Upgrade Plan
                </button>
                <button 
                  onClick={() => setIsCancelModalOpen(true)}
                  className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-2xl font-bold transition-colors"
                >
                  Cancel Subscription
                </button>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Payment Methods</h3>
                <button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  <Plus size={16} /> Add New
                </button>
              </div>

              <div className="space-y-4">
                {/* Default Card */}
                <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5 relative overflow-hidden group cursor-pointer">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white italic font-black text-sm tracking-wider">
                        VISA
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          •••• 4242 
                          <span className="text-[10px] uppercase bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-black">Default</span>
                        </p>
                        <p className="text-xs font-medium text-slate-500">Expires 12/28</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setManagePayment({ type: 'VISA', last4: '4242', isDefault: true }); }}
                      className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Secondary Card */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-xs">
                        MC
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">•••• 8839</p>
                        <p className="text-xs font-medium text-slate-500">Expires 09/27</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setManagePayment({ type: 'MasterCard', last4: '8839', isDefault: false }); }}
                      className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* PayPal */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-[#003087] rounded-md flex items-center justify-center text-white font-bold text-xs italic">
                        PayPal
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">sarah.j@techflow.com</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setManagePayment({ type: 'PayPal', last4: 'Account', isDefault: false }); }}
                      className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Billing History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Billing History</h3>
                <p className="text-sm font-medium text-slate-500">View and download your previous invoices.</p>
              </div>
              <button 
                onClick={downloadAllInvoices}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl font-bold transition-colors"
              >
                <Download size={16} /> Download All
              </button>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Invoice ID</th>
                    <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                    <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Plan</th>
                    <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Amount</th>
                    <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                    <th className="px-8 py-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{invoice.id}</td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-500 flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" /> {invoice.date}
                      </td>
                      <td className="px-8 py-5 font-bold text-slate-700 dark:text-slate-300">{invoice.plan}</td>
                      <td className="px-8 py-5 font-black text-slate-900 dark:text-white">{formatCurrency(getPrice(invoice.amount))}.00 {currency}</td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                          <Check size={12} /> {invoice.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => downloadInvoice(invoice)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-blue-50 dark:bg-blue-500/10 border-t border-blue-100 dark:border-blue-500/20 flex items-start gap-4">
              <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-400 mb-1">Upcoming Charge</h4>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-500/80">Your next billing date is Nov 01, 2026 for {formatCurrency(getPrice(2))}.00 {currency}.</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {isUpgradeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
            >
              <button 
                onClick={() => setIsUpgradeModalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center mb-12 mt-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                  <Zap size={16} /> Unlock Your Potential
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                  Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Experience</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">
                  Choose the perfect plan to scale your hiring process. 
                  Get access to advanced AI features and seamless team collaboration.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                {/* Basic Plan */}
                <div className="p-8 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Basic</h3>
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">Free</div>
                    <p className="text-sm font-medium text-slate-500">Perfect for getting started.</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Up to 3 Job Postings', 'Basic Candidate Filtering', 'Standard Email Support'].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} className="text-slate-600 dark:text-slate-300" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setIsDowngrading(true);
                      setTimeout(() => {
                        setIsDowngrading(false);
                        setIsUpgradeModalOpen(false);
                        if (currentPlan.startsWith('HireNext Pro')) {
                          setCurrentPlan('Basic Free');
                          showToast("Downgraded to Basic Free plan.");
                        }
                      }, 1500);
                    }}
                    disabled={isDowngrading || currentPlan === 'Basic Free'}
                    className={`w-full py-4 rounded-2xl border-2 font-bold transition-colors flex items-center justify-center gap-2 ${
                      currentPlan === 'Basic Free'
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 cursor-default'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isDowngrading ? (
                      <><div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div> Downgrading...</>
                    ) : currentPlan === 'Basic Free' ? (
                      <><Check size={18} /> Current Plan</>
                    ) : (
                      'Downgrade to Basic'
                    )}
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="p-8 rounded-[2rem] border-2 border-emerald-500 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden flex flex-col group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-blue-500 opacity-5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xs font-black rounded-full shadow-md uppercase tracking-wider">
                    Recommended
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      HireNext Pro <Shield size={18} className="text-emerald-500" />
                    </h3>
                    
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-4 w-full">
                      <button 
                        onClick={() => setBillingCycle('monthly')}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${billingCycle === 'monthly' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        1 Month
                      </button>
                      <button 
                        onClick={() => setBillingCycle('semi-annual')}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${billingCycle === 'semi-annual' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        6 Months
                      </button>
                      <button 
                        onClick={() => setBillingCycle('annual')}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${billingCycle === 'annual' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        1 Year
                      </button>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-black text-slate-900 dark:text-white">
                        {formatCurrency(billingCycle === 'monthly' ? getPrice(2) : billingCycle === 'semi-annual' ? getPrice(10) : getPrice(20))}
                      </span>
                      <span className="text-lg font-bold text-slate-500">
                        {currency} {billingCycle === 'annual' ? '/ yr' : billingCycle === 'semi-annual' ? '/ 6mo' : '/ mo'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 h-[40px]">
                      {billingCycle === 'monthly' 
                        ? 'Billed monthly. Cancel anytime.' 
                        : billingCycle === 'semi-annual' 
                          ? `Billed ${formatCurrency(getPrice(10))} ${currency} every 6 months. Save 16%!` 
                          : `Billed ${formatCurrency(getPrice(20))} ${currency} annually. Best value!`}
                    </p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Unlimited Job Postings', 'Advanced AI Assistant', 'Team Collaboration (Up to 5)', 'Priority 24/7 Support', 'Custom Advanced Reports'].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-slate-800 dark:text-slate-200 font-bold text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                       setIsUpgrading(true);
                       setTimeout(() => {
                         setIsUpgrading(false);
                         setIsUpgradeModalOpen(false);
                         setCurrentPlan(`HireNext Pro (${billingCycle === 'monthly' ? 'Monthly' : billingCycle === 'semi-annual' ? '6 Months' : 'Yearly'})`);
                         showToast("Successfully upgraded to HireNext Pro! 🎉");
                       }, 2000);
                    }}
                    disabled={isUpgrading || currentPlan.startsWith('HireNext Pro')}
                    className={`w-full py-4 rounded-2xl text-white font-black shadow-lg transition-all flex items-center justify-center gap-2 ${
                      currentPlan.startsWith('HireNext Pro') 
                        ? 'bg-emerald-500 cursor-default shadow-emerald-500/25' 
                        : 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {isUpgrading ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Upgrading...</>
                    ) : currentPlan.startsWith('HireNext Pro') ? (
                      <><Check size={18} /> Current Plan</>
                    ) : (
                      'Upgrade Now'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Subscription Modal */}
      <AnimatePresence>
        {isCancelModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50 text-center"
            >
              <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Cancel Subscription?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                Are you sure you want to cancel your HireNext Pro plan? You'll lose access to unlimited job postings and advanced AI features at the end of your current billing cycle.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                     setIsCancelModalOpen(false);
                     showToast("Subscription successfully cancelled.");
                  }}
                  className="w-full py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors shadow-lg shadow-red-500/25"
                >
                  Yes, Cancel Subscription
                </button>
                <button 
                  onClick={() => setIsCancelModalOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors"
                >
                  No, Keep My Plan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
            >
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 mb-4">
                  <CreditCard size={14} /> Secure Payment
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Add Payment Method</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Enter your card details below. Your information is securely encrypted.
                </p>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                setIsPaymentModalOpen(false);
                showToast("Payment method added successfully!");
              }} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cardholder Name</label>
                  <input type="text" required placeholder="e.g. John Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Card Number</label>
                  <div className="relative">
                    <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium tracking-widest" />
                    <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" maxLength="5" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">CVC</label>
                    <input type="password" required placeholder="•••" maxLength="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium tracking-widest" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black shadow-lg shadow-blue-500/25 transition-all"
                  >
                    Save Payment Method
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Payment Method Modal */}
      <AnimatePresence>
        {managePayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setManagePayment(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-sm p-6 relative shadow-2xl border border-slate-200/50 dark:border-slate-800/50"
            >
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Manage Method</h3>
              <p className="text-slate-500 text-sm font-medium mb-6">
                {managePayment.type} {managePayment.type === 'PayPal' ? '' : '•••• '} {managePayment.last4}
              </p>
              
              <div className="space-y-2">
                {!managePayment.isDefault && (
                  <button 
                    onClick={() => { setManagePayment(null); showToast("Set as default payment method."); }}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-between"
                  >
                    Make Default
                    <Star size={18} className="text-slate-400" />
                  </button>
                )}
                <button 
                  onClick={() => { setManagePayment(null); showToast("Editing payment method..."); }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-between"
                >
                  Edit Details
                  <CreditCard size={18} className="text-slate-400" />
                </button>
                <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-2"></div>
                <button 
                  onClick={() => { setManagePayment(null); showToast("Payment method removed."); }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 font-bold text-red-600 dark:text-red-400 transition-colors flex items-center justify-between"
                >
                  Remove Method
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecruiterBilling;
