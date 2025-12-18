import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  BookOpen, 
  Calendar, 
  Shield, 
  Save,
  Camera,
  Lock
} from 'lucide-react';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    mobile: '+91 98765 43210',
    college: 'K.S.Rangasamy College of Technology',
    stream: 'Information Technology',
    year: '3rd Year',
    email: 'alex.j@example.com', // Non-editable
    regId: 'DAK25-0842' // Non-editable
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-gray-400 text-sm">Manage your personal information and account details</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & ID */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden group">
            <div className="relative z-10">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary to-primary p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-secondary rounded-full border-4 border-[#0a0a0a] text-white hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              <h3 className="text-xl font-bold">{formData.name}</h3>
              <p className="text-secondary font-mono font-bold mt-1">{formData.regId}</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest">
                  Individual Participant
                </span>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 blur-3xl rounded-full"></div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex gap-4">
            <Shield className="text-primary-light shrink-0" size={20} />
            <p className="text-xs text-gray-400 leading-relaxed">
              Your Registration ID and Email are permanent and cannot be changed. Contact support if you need to update these.
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <Phone size={14} /> Mobile Number
                </label>
                <input 
                  type="text" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              {/* Email (Non-editable) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={formData.email}
                    disabled
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                  />
                  <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
              </div>

              {/* College */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <School size={14} /> College / University
                </label>
                <input 
                  type="text" 
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              {/* Stream */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <BookOpen size={14} /> Stream / Department
                </label>
                <input 
                  type="text" 
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <Calendar size={14} /> Year of Study
                </label>
                <select 
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-colors appearance-none"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all">
              Discard Changes
            </button>
            <button className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-secondary/20">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
