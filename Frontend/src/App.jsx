import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Events from "./Pages/Events/Events"
import Home from "./Pages/Home/Home"
import "./App.css";
import ParticlesComponent from "./Pages/Layout/ParticlesComponent";
import Navbar from "./Pages/Layout/Navbar";
import Tags from "./Pages/Layout/Tags";
import GuestLecture from "./Pages/GuestLecture/GuestLecture";
import UltraFooter from "./Pages/Layout/UltraFooter";
import Workshop from "./Pages/Workshop/Workshop";
import Sponsors  from "./Pages/Sponsors/Sponsors";
import Contact from "./Pages/Home/Components/Contact";
import Harmonics from "./Pages/Harmonics/Harmonics";
import EventDetails from "./Pages/Events/EventDetails/EventDetails";
import Teams from "./Pages/Teams/Teams";
import Startup from "./Pages/Startup/Startup";
import Accomodation from "./Pages/Accomodation/Accomodation";
import Hackathon from "./Pages/Hackathon/Hackathon";
import Codathon from "./Pages/Codathon/Codathon";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Schedule from "./Pages/Schedule/Schedule";
import LoadingScreen from "./Pages/Layout/LoadingScreen";
import ScrollToTop from "./Pages/Layout/ScrollToTop";
import FloatingCallButton from "./Pages/Layout/FloatingCallButton";
import FloatingDashboardButton from "./Pages/Layout/FloatingDashboardButton";
import BottomNavbar from "./Pages/Layout/BottomNavbar";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard && <Tags />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/events/conference" element={<GuestLecture />} />
          <Route path="/events/workshop" element={<Workshop />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/events/hormonics" element={<Harmonics/>} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/startups" element={<Startup />} />
          <Route path="/accomodation" element={<Accomodation />} />
          <Route path="/event/hackathon" element={<Hackathon />} />
          <Route path="/event/codeathon" element={<Codathon />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>

      {!isDashboard && <UltraFooter />}
      <FloatingDashboardButton />
      {!isDashboard && <FloatingCallButton />}
      {!isDashboard && <BottomNavbar />}
      <ScrollToTop />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen variant="cyber" text="Initializing..." />
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <Router>
          <ParticlesComponent id="particlesBG" />
          <AppContent />
        </Router>
      )}
    </>
  );       
}  

export default App;
