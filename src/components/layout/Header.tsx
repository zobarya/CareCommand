
import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  role: 'admin' | 'caregiver' | 'patient' | 'family';
}

const Header: React.FC<HeaderProps> = ({ title, role }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="md:hidden font-bold text-secondary text-lg">Homecare</div>
        <h1 className="text-xl font-bold md:text-2xl hidden md:block">{title}</h1>
        <div className="flex items-center space-x-4">
          <button className="relative p-1 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
          <div className="flex items-center">
            <div className="hidden md:block text-sm text-right mr-3">
              <div className="font-medium">
                {role === 'admin' ? 'Admin User' : 
                 role === 'caregiver' ? 'Jane Doe, RN' : 
                 role === 'patient' ? 'John Smith' : 
                 'Family Member'}
              </div>
              <div className="text-xs text-gray-500">
                {role === 'admin' ? 'Administrator' : 
                 role === 'caregiver' ? 'Caregiver' : 
                 role === 'patient' ? 'Patient' : 
                 'Family Access'}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-secondary font-medium">
              {role.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden px-4 py-2">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
