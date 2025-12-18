import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingDashboardButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the button if we're already on the dashboard
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <motion.button
      onClick={() => navigate('/dashboard')}
      className="fixed bottom-24 right-6 z-50 hidden md:flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300 lg:bottom-24 lg:right-8 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Go to Dashboard"
    >
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <LayoutDashboard size={28} />
      </motion.div>
      
      {/* Pulsing effect */}
      <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20 pointer-events-none"></span>
      
      {/* Tooltip for desktop */}
      <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
        My Dashboard
      </span>
    </motion.button>
  );
};

export default FloatingDashboardButton;
