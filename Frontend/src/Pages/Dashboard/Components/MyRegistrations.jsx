import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Clock3
} from 'lucide-react';

const MyRegistrations = () => {
  const [expandedCombo, setExpandedCombo] = useState(null);

  const registrations = [
    {
      id: 1,
      name: 'Cyber Hackathon 2025',
      category: 'Hackathon',
      type: 'Team',
      date: 'March 15, 2025',
      time: '09:00 AM',
      venue: 'Main Auditorium',
      status: 'Confirmed',
      price: '₹500'
    },
    {
      id: 2,
      name: 'UI/UX Design Workshop',
      category: 'Workshop',
      type: 'Individual',
      date: 'March 16, 2025',
      time: '10:30 AM',
      venue: 'Design Studio, Block C',
      status: 'Pending Payment',
      price: '₹300'
    },
    {
      id: 3,
      name: 'Robo-Race',
      category: 'Technical',
      type: 'Team',
      date: 'March 17, 2025',
      time: '02:00 PM',
      venue: 'Open Grounds',
      status: 'Awaiting Cash Approval',
      price: '₹400'
    },
    {
      id: 4,
      name: 'Photography Contest',
      category: 'Non-Technical',
      type: 'Individual',
      date: 'March 16, 2025',
      time: '11:00 AM',
      venue: 'Media Room',
      status: 'Confirmed',
      price: '₹200',
      isOnSpot: true
    }
  ];

  const combos = [
    {
      id: 'platinum',
      name: 'Platinum Combo',
      status: 'Active',
      totalSlots: 5,
      usedSlots: 3,
      events: [
        'Cyber Hackathon 2025',
        'UI/UX Design Workshop',
        'Robo-Race'
      ],
      remainingSlots: 2
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'Pending Payment': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Awaiting Cash Approval': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle2 size={14} />;
      case 'Pending Payment': return <AlertCircle size={14} />;
      case 'Awaiting Cash Approval': return <Clock3 size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Combo Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-2 h-8 bg-secondary rounded-full"></div>
          My Combos
        </h2>
        <div className="grid gap-4">
          {combos.map((combo) => (
            <div 
              key={combo.id}
              className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30 rounded-2xl overflow-hidden"
            >
              <div 
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                onClick={() => setExpandedCombo(expandedCombo === combo.id ? null : combo.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <ExternalLink className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{combo.name}</h3>
                    <p className="text-sm text-gray-400">{combo.usedSlots} / {combo.totalSlots} Slots Used</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                    {combo.status}
                  </span>
                  {expandedCombo === combo.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              <AnimatePresence>
                {expandedCombo === combo.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10 bg-black/20"
                  >
                    <div className="p-6 space-y-4">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Included Events</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {combo.events.map((event, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <CheckCircle2 size={16} className="text-secondary" />
                            <span className="text-sm">{event}</span>
                          </div>
                        ))}
                        {[...Array(combo.remainingSlots)].map((_, idx) => (
                          <div key={`empty-${idx}`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-dashed border-white/20 text-gray-500">
                            <div className="w-4 h-4 rounded-full border border-dashed border-gray-600"></div>
                            <span className="text-sm italic">Empty Slot - Register Now</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Individual Events Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-2 h-8 bg-primary rounded-full"></div>
          Registered Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {registrations.map((reg) => (
            <motion.div
              key={reg.id}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                      {reg.category}
                    </span>
                    {reg.isOnSpot && (
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/30">
                        On-Spot
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5 ${getStatusColor(reg.status)}`}>
                    {getStatusIcon(reg.status)}
                    {reg.status}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">{reg.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{reg.type} Registration</p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Calendar size={16} className="text-secondary" />
                    <span>{reg.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Clock size={16} className="text-secondary" />
                    <span>{reg.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <MapPin size={16} className="text-secondary" />
                    <span>{reg.venue}</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <span className="text-lg font-bold">{reg.price}</span>
                  <button className="text-sm font-bold text-secondary hover:text-purple-300 flex items-center gap-1">
                    View Details <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyRegistrations;
