
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  MessageSquare, 
  Settings, 
  User,
  Bell,
  File,
  Clock,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  role: 'admin' | 'caregiver' | 'patient' | 'family';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: Home },
    { label: 'Scheduler', href: '/admin/calendar', icon: Calendar },
    { label: 'Caregivers', href: '/admin/caregivers', icon: User },
    { label: 'Patients', href: '/admin/patients', icon: User },
    { label: 'Billing', href: '/admin/billing', icon: File },
    { label: 'Reports', href: '/admin/reports', icon: File },
    { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { label: 'Notifications', href: '/admin/notifications', icon: Bell },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  const caregiverNavItems: NavItem[] = [
    { label: 'Home', href: '/caregiver', icon: Home },
    { label: 'Schedule', href: '/caregiver/schedule', icon: Calendar },
    { label: 'Checklist', href: '/caregiver/checklist', icon: File },
    { label: 'Notes', href: '/caregiver/notes', icon: File },
    { label: 'Certifications', href: '/caregiver/certifications', icon: File },
    { label: 'Messages', href: '/caregiver/messages', icon: MessageSquare },
    { label: 'Notifications', href: '/caregiver/notifications', icon: Bell },
    { label: 'Profile', href: '/caregiver/profile', icon: User },
  ];
  
  const patientNavItems: NavItem[] = [
    { label: 'Home', href: '/patient', icon: Home },
    { label: 'Visit History', href: '/patient/visits', icon: Clock },
    { label: 'Care Plan', href: '/patient/care-plan', icon: File },
    { label: 'Requests', href: '/patient/requests', icon: File },
    { label: 'Feedback', href: '/patient/feedback', icon: MessageSquare },
    { label: 'Messages', href: '/patient/messages', icon: MessageSquare },
    { label: 'Notifications', href: '/patient/notifications', icon: Bell },
    { label: 'Settings', href: '/patient/settings', icon: Settings },
  ];
  
  const familyNavItems: NavItem[] = [
    { label: 'Home', href: '/family', icon: Home },
    { label: 'Visit Summary', href: '/family/visits', icon: Clock },
    { label: 'Feedback', href: '/family/feedback', icon: MessageSquare },
    { label: 'Requests', href: '/family/requests', icon: File },
    { label: 'Messages', href: '/family/messages', icon: MessageSquare },
    { label: 'Notifications', href: '/family/notifications', icon: Bell },
    { label: 'Settings', href: '/family/settings', icon: Settings },
  ];
  
  const navItemsByRole = {
    admin: adminNavItems,
    caregiver: caregiverNavItems,
    patient: patientNavItems,
    family: familyNavItems,
  };
  
  const navItems = navItemsByRole[role];
  
  const handleLogout = () => {
    // In a real app this would clear auth tokens, etc.
    toast.success("You've been logged out successfully");
    navigate('/');
  };
  
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-secondary text-white">
      <div className="p-4 flex items-center">
        <h1 className="text-xl font-bold">Homecare</h1>
      </div>
      
      <div className="p-2 flex-grow">
        <div className="text-sm uppercase text-white/60 mb-2 px-3">
          {role === 'admin' ? 'Agency Admin' : role.charAt(0).toUpperCase() + role.slice(1)}
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 rounded-md transition-colors w-full text-white/80 hover:bg-white/10"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-secondary font-medium mr-2">
            {role.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium">
              {role === 'admin' ? 'Admin User' : 
               role === 'caregiver' ? 'Jane Doe, RN' : 
               role === 'patient' ? 'John Smith' : 
               'Family Member'}
            </div>
            <div className="text-xs text-white/60">
              {role === 'admin' ? 'Administrator' : 
               role === 'caregiver' ? 'Caregiver' : 
               role === 'patient' ? 'Patient' : 
               'Family Access'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
