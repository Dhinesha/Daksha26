import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  History, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Wallet
} from 'lucide-react';

const Payments = () => {
  const paymentHistory = [
    {
      id: 'TXN-98421',
      item: 'Platinum Combo Pack',
      amount: '₹1500',
      date: 'Feb 12, 2025',
      mode: 'Razorpay',
      status: 'Success'
    },
    {
      id: 'TXN-98455',
      item: 'On-Spot: Photography Contest',
      amount: '₹200',
      date: 'Feb 15, 2025',
      mode: 'Cash (On-Spot)',
      status: 'Awaiting Approval'
    },
    {
      id: 'TXN-98310',
      item: 'Workshop: AI & ML',
      amount: '₹300',
      date: 'Feb 10, 2025',
      mode: 'Razorpay',
      status: 'Success'
    }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Success': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Awaiting Approval': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Failed': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-secondary/20 to-primary/20 border border-white/10 p-6 rounded-3xl"
        >
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
            <Wallet className="text-secondary" size={24} />
          </div>
          <p className="text-gray-400 text-sm font-medium">Total Spent</p>
          <h3 className="text-3xl font-bold mt-1">₹2000</h3>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/5 border border-white/10 p-6 rounded-3xl"
        >
          <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4">
            <CheckCircle2 className="text-green-500" size={24} />
          </div>
          <p className="text-gray-400 text-sm font-medium">Successful Payments</p>
          <h3 className="text-3xl font-bold mt-1">2</h3>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/5 border border-white/10 p-6 rounded-3xl"
        >
          <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-4">
            <Clock className="text-yellow-500" size={24} />
          </div>
          <p className="text-gray-400 text-sm font-medium">Pending Approvals</p>
          <h3 className="text-3xl font-bold mt-1">1</h3>
        </motion.div>
      </div>

      {/* Cash Approval Info */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0">
          <AlertCircle className="text-yellow-500" size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-bold text-yellow-500">Cash Payment Information</h4>
          <p className="text-sm text-gray-400 mt-1">
            If you've paid via cash at the registration desk, please wait for the admin to approve your transaction. 
            Your Attendance QR will be unlocked automatically once approved.
          </p>
        </div>
        <button className="px-6 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-xl font-bold transition-all whitespace-nowrap">
          Contact Support
        </button>
      </div>

      {/* Payment History Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History className="text-secondary" size={20} />
            Transaction History
          </h2>
          <button className="text-sm text-secondary hover:underline flex items-center gap-1">
            <Download size={14} /> Download All Receipts
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Transaction ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Item / Event</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Mode</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-gray-400">{payment.id}</td>
                    <td className="px-6 py-4 font-bold">{payment.item}</td>
                    <td className="px-6 py-4 font-bold text-secondary">{payment.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{payment.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{payment.mode}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyles(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
