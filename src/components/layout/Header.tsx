
import React, { useState } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface HeaderProps {
  title: string;
  role: 'admin' | 'caregiver' | 'patient' | 'family';
}

const Header: React.FC<HeaderProps> = ({ title, role }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const getNotificationsUrl = () => {
    switch (role) {
      case 'admin':
        return '/admin/notifications';
      case 'caregiver':
        return '/caregiver/notifications'; 
      case 'patient':
        return '/patient/notifications';
      case 'family':
        return '/family/notifications';
      default:
        return '/';
    }
  };

  const getRoleSpecificInfo = () => {
    switch (role) {
      case 'admin':
        return {
          name: 'Admin User',
          title: 'Administrator',
          profilePath: '/admin/settings'
        };
      case 'caregiver':
        return {
          name: 'Jane Doe, RN',
          title: 'Caregiver',
          profilePath: '/caregiver/profile'
        }; 
      case 'patient':
        return {
          name: 'John Smith',
          title: 'Patient',
          profilePath: '/patient/profile'
        };
      case 'family':
        return {
          name: 'Family Member',
          title: 'Family Access',
          profilePath: '/family/profile'
        };
    }
  };

  const handleLogout = () => {
    // In a real app this would clear auth tokens, etc.
    toast.success("You've been logged out successfully");
    navigate('/');
  };

  const roleInfo = getRoleSpecificInfo();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="md:hidden font-bold text-secondary text-lg">Homecare</div>
        <h1 className="text-xl font-bold md:text-2xl hidden md:block">{title}</h1>
        <div className="flex items-center space-x-4">
          <Link
            to={getNotificationsUrl()}
            className="relative p-1 rounded-full hover:bg-gray-100"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <div className="hidden md:block text-sm text-right mr-3">
                  <div className="font-medium">{roleInfo.name}</div>
                  <div className="text-xs text-gray-500">{roleInfo.title}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-secondary font-medium">
                  {role.charAt(0).toUpperCase()}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate(roleInfo.profilePath)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/${role}/settings`)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="md:hidden px-4 py-2">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
