import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import RecruiterNavbar from './RecruiterNavbar';
import RecruiterTopbar from './RecruiterTopbar';
import { useAuth } from '../../Context/AuthContext';

const RecruiterLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      <RecruiterTopbar setIsMobileOpen={setIsMobileOpen} />
      <RecruiterNavbar />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;
