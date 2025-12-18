import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  CheckCircle2, 
  XCircle, 
  Crown,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react';

const MyTeams = () => {
  const teams = [
    {
      id: 1,
      teamName: 'Web Wizards',
      eventName: 'Cyber Hackathon 2025',
      role: 'Team Lead',
      size: { joined: 3, allowed: 4 },
      paymentStatus: 'Confirmed',
      members: [
        { name: 'Alex Johnson', role: 'Lead', status: 'Joined', email: 'alex.j@example.com' },
        { name: 'Rahul S', role: 'Member', status: 'Joined', email: 'rahul@example.com' },
        { name: 'Sneha P', role: 'Member', status: 'Joined', email: 'sneha@example.com' },
        { name: 'Pending', role: 'Member', status: 'Invited', email: 'amit@example.com' },
      ]
    },
    {
      id: 2,
      teamName: 'Robo-Riders',
      eventName: 'Robo-Race',
      role: 'Member',
      size: { joined: 2, allowed: 2 },
      paymentStatus: 'Pending',
      members: [
        { name: 'Arjun V', role: 'Lead', status: 'Joined', email: 'arjun@example.com' },
        { name: 'Alex Johnson', role: 'Member', status: 'Joined', email: 'alex.j@example.com' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Teams</h2>
          <p className="text-gray-400 text-sm">Manage your event teams and invitations</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
          <UserPlus size={20} />
          Create New Team
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {teams.map((team) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
          >
            <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center border border-white/10">
                    <Users className="text-secondary" size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{team.teamName}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        team.role === 'Team Lead' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'bg-primary/20 text-primary-light border border-primary/30'
                      }`}>
                        {team.role}
                      </span>
                    </div>
                    <p className="text-secondary font-medium mt-1">{team.eventName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Team Size</p>
                    <p className="text-xl font-bold">{team.size.joined} / {team.size.allowed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Payment</p>
                    <span className={`text-sm font-bold ${team.paymentStatus === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {team.paymentStatus}
                    </span>
                  </div>
                  {team.role === 'Team Lead' && (
                    <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">
                      Manage Team
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Team Members</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {team.members.map((member, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      member.status === 'Invited' ? 'bg-white/[0.02] border-dashed border-white/20' : 'bg-white/5 border-white/10 hover:border-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        member.status === 'Invited' ? 'bg-gray-500/10 text-gray-500' : 'bg-secondary/10 text-secondary'
                      }`}>
                        {member.role === 'Lead' ? <Crown size={20} /> : <Users size={20} />}
                      </div>
                      {member.status === 'Joined' ? (
                        <CheckCircle2 size={16} className="text-green-500" />
                      ) : (
                        <ShieldCheck size={16} className="text-yellow-500" />
                      )}
                    </div>
                    <h5 className={`font-bold ${member.status === 'Invited' ? 'text-gray-500' : 'text-white'}`}>
                      {member.name}
                    </h5>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">{member.role}</p>
                    
                    {member.status === 'Invited' && team.role === 'Team Lead' && (
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
                          <UserMinus size={14} className="mx-auto" />
                        </button>
                        <button className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
                          <Mail size={14} className="mx-auto" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                {team.size.joined < team.size.allowed && team.role === 'Team Lead' && (
                  <button className="p-4 rounded-2xl border border-dashed border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-all flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UserPlus size={20} className="text-secondary" />
                    </div>
                    <span className="text-sm font-bold text-secondary">Invite Member</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyTeams;
