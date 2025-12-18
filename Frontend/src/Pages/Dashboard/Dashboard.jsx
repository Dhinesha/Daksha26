import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './Components/DashboardLayout';
import DashboardHome from './Components/DashboardHome';
import MyRegistrations from './Components/MyRegistrations';
import MyTeams from './Components/MyTeams';
import AttendanceQR from './Components/AttendanceQR';
import Payments from './Components/Payments';
import EventSchedule from './Components/EventSchedule';
import ProfileSettings from './Components/ProfileSettings';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="registrations" element={<MyRegistrations />} />
        <Route path="teams" element={<MyTeams />} />
        <Route path="qr" element={<AttendanceQR />} />
        <Route path="payments" element={<Payments />} />
        <Route path="schedule" element={<EventSchedule />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
