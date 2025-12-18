import React from 'react';
import { motion } from 'framer-motion';
import RegistrationMethods from './Components/RegistrationMethods';
import PremiumEvents from './Components/PremiumEvents';
import { GradientOrbs, FloatingParticles } from '../Layout/AnimatedBackground';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-32 pb-20 relative overflow-hidden">
      {/* Global animated background */}
      <GradientOrbs />
      <FloatingParticles count={30} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-orbitron">Registration Open</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron tracking-tight">
              DaKshaa <span className="text-secondary drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">T26</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-poppins">
              Join the ultimate national-level techno-cultural extravaganza. 
              Choose your path to excellence and innovation.
            </p>
          </motion.div>
        </div>

        {/* Section 1: Registration Methods */}
        <RegistrationMethods />

        {/* Section 2: Premium Events */}
        <div className="mt-32">
          <PremiumEvents />
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center p-8 bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-sm border border-white/10"
        >
          <p className="text-gray-400 font-poppins">
            Need help with registration? <a href="/contact" className="text-secondary font-bold hover:underline">Contact our support team</a>
          </p>
        </motion.div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-20 left-0 right-0 p-4 z-40 lg:hidden pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="max-w-md mx-auto pointer-events-auto"
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full py-4 bg-secondary text-white rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Register Now
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
