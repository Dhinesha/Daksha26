import React from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Info, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';

const AttendanceQR = () => {
  const userData = {
    name: 'Alex Johnson',
    regId: 'DAK25-0842',
    college: 'K.S.Rangasamy College of Technology',
    activeEvent: 'Cyber Hackathon 2025',
    venue: 'Main Auditorium',
    timeWindow: '09:00 AM - 10:30 AM',
    status: 'Active' // Active, Marked, Pending
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Attendance QR</h2>
        <p className="text-gray-400">Show this QR code at the event venue for attendance</p>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden"
      >
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/10 to-primary/10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* QR Code Container */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
              {/* Placeholder for QR Code */}
              <div className="w-48 h-48 md:w-64 md:h-64 bg-white flex items-center justify-center">
                <QrCode size={200} className="text-black" strokeWidth={1.5} />
              </div>
              
              {/* Scanning Animation Line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-secondary/50 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-20"
                style={{ top: 0 }}
              />
            </div>
          </div>

          {/* User Info */}
          <div className="mt-10 text-center space-y-2">
            <h3 className="text-2xl font-bold">{userData.name}</h3>
            <p className="text-secondary font-mono tracking-widest font-bold">{userData.regId}</p>
            <p className="text-sm text-gray-500">{userData.college}</p>
          </div>

          {/* Status Badge */}
          <div className="mt-8 flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 font-bold uppercase tracking-widest text-sm">QR Active</span>
          </div>
        </div>
      </motion.div>

      {/* Event Details Card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Info className="text-secondary" size={24} />
          </div>
          <div>
            <h4 className="font-bold">Current Event Session</h4>
            <p className="text-sm text-gray-400">Details for the ongoing/upcoming session</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Event Name</p>
            <p className="font-bold text-white">{userData.activeEvent}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Venue</p>
            <p className="font-bold text-white">{userData.venue}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Time Window</p>
            <div className="flex items-center gap-2 text-secondary">
              <Clock size={14} />
              <p className="font-bold">{userData.timeWindow}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Attendance Status</p>
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertTriangle size={14} />
              <p className="font-bold">Pending Scan</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all">
            <Download size={18} />
            Save QR
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* Important Notes */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex gap-4">
        <Info className="text-primary shrink-0" size={20} />
        <p className="text-xs text-gray-400 leading-relaxed">
          Your QR code is unique to your registration. Do not share it with others. 
          Attendance will only be marked if your payment is confirmed and you are within the valid time window for the event.
        </p>
      </div>
    </div>
  );
};

export default AttendanceQR;
