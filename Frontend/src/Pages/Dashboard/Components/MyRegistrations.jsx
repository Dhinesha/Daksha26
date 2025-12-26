import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  X
} from 'lucide-react';
import { supabaseService } from '../../../services/supabaseService';
import { supabase } from '../../../supabase';
import { QRCodeCanvas } from 'qrcode.react';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const data = await supabaseService.getUserRegistrations(user.id);
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  if (loading) return <div className="text-center p-10">Loading your registrations...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">My Registrations</h2>
      
      {registrations.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-gray-400">You haven't registered for any events yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {registrations.map((reg) => (
            <motion.div 
              key={reg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(reg.payment_status)}`}>
                    {reg.payment_status}
                  </span>
                  <h3 className="text-lg font-bold mt-2">{reg.events?.title || 'Event'}</h3>
                  <p className="text-sm text-gray-400 capitalize">{reg.events?.category}</p>
                </div>
                <button 
                  onClick={() => setSelectedTicket(reg)}
                  className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  <QrCode size={20} />
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>March 15-17, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>09:00 AM onwards</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button 
                  disabled={reg.payment_status !== 'completed'}
                  className="flex-1 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={14} /> Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Ticket Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-black p-8 rounded-3xl max-w-sm w-full text-center relative"
            >
              <button 
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Entry Pass</h2>
                <p className="text-gray-500 text-sm">DaKshaa 2025</p>
              </div>

              <div className="bg-gray-100 p-6 rounded-2xl inline-block mb-6">
                <QRCodeCanvas 
                  value={selectedTicket.qr_code_string} 
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-xl">{selectedTicket.events?.title}</h3>
                <p className="text-gray-500 font-mono text-xs">{selectedTicket.qr_code_string}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-gray-300 flex justify-between text-left">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Category</p>
                  <p className="font-bold capitalize">{selectedTicket.events?.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase">Status</p>
                  <p className="font-bold text-green-600 uppercase">{selectedTicket.payment_status}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyRegistrations;

