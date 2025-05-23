
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, MessageSquare, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface BottomNavProps {
  role: 'admin' | 'caregiver' | 'patient' | 'family';
}

const BottomNav: React.FC<BottomNavProps> = ({ role }) => {
  const location = useLocation();
  
  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: Home },
    { label: 'Calendar', href: '/admin/calendar', icon: Calendar },
    { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  const caregiverNavItems: NavItem[] = [
    { label: 'Home', href: '/caregiver', icon: Home },
    { label: 'Schedule', href: '/caregiver/schedule', icon: Calendar },
    { label: 'Messages', href: '/caregiver/messages', icon: MessageSquare },
    { label: 'Profile', href: '/caregiver/profile', icon: User },
  ];
  
  const patientNavItems: NavItem[] = [
    { label: 'Home', href: '/patient', icon: Home },
    { label: 'Visits', href: '/patient/visits', icon: Calendar },
    { label: 'Messages', href: '/patient/messages', icon: MessageSquare },
    { label: 'Settings', href: '/patient/settings', icon: Settings },
  ];
  
  const familyNavItems: NavItem[] = [
    { label: 'Home', href: '/family', icon: Home },
    { label: 'Visits', href: '/family/visits', icon: Calendar },
    { label: 'Messages', href: '/family/messages', icon: MessageSquare },
    { label: 'Profile', href: '/family/profile', icon: User },
  ];
  
  const navItemsByRole = {
    admin: adminNavItems,
    caregiver: caregiverNavItems,
    patient: patientNavItems,
    family: familyNavItems,
  };
  
  const navItems = navItemsByRole[role];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 md:hidden z-10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        
        return (
          <Link 
            key={item.href}
            to={item.href} 
            className={cn(
              "flex flex-col items-center justify-center px-2 py-1 w-full",
              isActive ? "text-primary" : "text-gray-500"
            )}
          >
            <item.icon className={cn(
              "w-6 h-6 mb-1",
              isActive ? "text-primary" : "text-gray-500"
            )} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
