
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  role: 'admin' | 'caregiver' | 'patient' | 'family';
}

const Layout: React.FC<LayoutProps> = ({ children, title, role }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} role={role} />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
          {children}
        </main>
        
        <BottomNav role={role} />
      </div>
    </div>
  );
};

export default Layout;
