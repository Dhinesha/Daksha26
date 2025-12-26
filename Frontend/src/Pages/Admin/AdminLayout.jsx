import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  Award, 
  CreditCard, 
  Search, 
  QrCode,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
  UserCog,
  DollarSign,
  Mail,
  Clock,
  Bed,
  Radio,
  ShieldCheck,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabase';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role === 'student') {
        navigate('/dashboard');
        return;
      }

      setUserRole(profile.role);
    } catch (error) {
      console.error('Error checking role:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getMenuItems = () => {
    const items = [];
    
    if (userRole === 'super_admin') {
      items.push(
        { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { label: 'Role Management', icon: ShieldCheck, path: '/admin/roles' },
        { label: 'Event Config', icon: Settings, path: '/admin/events' },
        { label: 'Combo Packages', icon: Package, path: '/admin/combos' },
        { label: 'User Manager', icon: Users, path: '/admin/users' },
        { label: 'Finance', icon: CreditCard, path: '/admin/finance' },
        { label: 'Reports', icon: FileText, path: '/admin/reports' },
        { label: 'Registration Management', icon: UserCog, path: '/admin/registrations' },
        { label: 'Finance Module', icon: DollarSign, path: '/admin/finance-module' },
        { label: 'Participant CRM', icon: Mail, path: '/admin/crm' },
        { label: 'Waitlist', icon: Clock, path: '/admin/waitlist' },
        { label: 'Accommodation', icon: Bed, path: '/admin/accommodation' },
        { label: 'Event Controller', icon: Radio, path: '/admin/event-controller' }
      );
    }

    if (userRole === 'registration_admin' || userRole === 'super_admin') {
      items.push(
        { label: 'Registration Desk', icon: Search, path: '/admin/desk' }
      );
    }

    if (userRole === 'event_coordinator' || userRole === 'super_admin') {
      items.push(
        { label: 'Coordinator Panel', icon: Shield, path: '/coordinator' }
      );
    }

    if (userRole === 'volunteer' || userRole === 'super_admin') {
      items.push(
        { label: 'Global Scanner', icon: QrCode, path: '/volunteer' }
      );
    }

    return items;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900/50 border-r border-white/10 backdrop-blur-xl transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold font-orbitron text-secondary"
            >
              DAKSHAA ADMIN
            </motion.h2>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {getMenuItems().map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-secondary'} />
                {isSidebarOpen && (
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                )}
                {isActive && isSidebarOpen && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
