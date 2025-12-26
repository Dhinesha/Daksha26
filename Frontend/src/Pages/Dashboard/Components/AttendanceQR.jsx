import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  QrCode, 
  Info, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Download,
  Share2,
  Loader2
} from "lucide-react";
import { supabase } from "../../../supabase";
import { QRCodeCanvas } from "qrcode.react";

const AttendanceQR = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (data) {
          setProfile({
            ...data,
            regId: `DAK25-${user.id.substring(0, 8).toUpperCase()}`
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }

  if (!profile) return null;

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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/10 to-primary/10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
              <QRCodeCanvas 
                value={profile.id}
                size={200}
                level="H"
                includeMargin={false}
              />
              
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-secondary/50 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-20"
                style={{ top: 0 }}
              />
            </div>
          </div>

          <div className="mt-10 text-center space-y-2">
            <h3 className="text-2xl font-bold">{profile.full_name}</h3>
            <p className="text-secondary font-mono tracking-widest font-bold">{profile.regId}</p>
            <p className="text-sm text-gray-500">{profile.college_name}</p>
          </div>

          <div className="mt-8 flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 font-bold uppercase tracking-widest text-sm">QR Active</span>
          </div>
        </div>
      </motion.div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Info className="text-secondary" size={24} />
          </div>
          <div>
            <h4 className="font-bold">Attendance Information</h4>
            <p className="text-sm text-gray-400">Use this QR for general entry and event check-ins</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Department</p>
            <p className="font-bold text-white">{profile.department}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Roll Number</p>
            <p className="font-bold text-white">{profile.roll_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceQR;
