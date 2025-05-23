
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = (role: 'admin' | 'caregiver' | 'patient' | 'family') => {
    toast({
      title: "Logged in successfully",
      description: `You are now logged in as ${role}`,
    });
    
    // Redirect based on role using React Router
    switch(role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'caregiver':
        navigate('/caregiver');
        break;
      case 'patient':
        navigate('/patient');
        break;
      case 'family':
        navigate('/family');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hero section */}
      <div className="bg-secondary md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Homecare</h1>
          <p className="text-xl mb-8">Healthcare coordination platform for homecare agencies, caregivers, patients, and families.</p>
          <div className="space-y-6 text-sm">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary font-bold mr-3 flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold mb-1">Streamlined Care Coordination</h3>
                <p className="text-white/80">Schedule visits, track care delivery, and maintain clear communication between all stakeholders.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary font-bold mr-3 flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold mb-1">Real-time Updates</h3>
                <p className="text-white/80">Access up-to-date information on patient care, caregiver activities, and visit status.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary font-bold mr-3 flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold mb-1">Role-based Access</h3>
                <p className="text-white/80">Tailored interfaces designed specifically for agencies, caregivers, patients, and family members.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login section */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gray-50">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Sign In</h2>
            <p className="text-gray-600">Access your Homecare account</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
            <Button className="w-full" onClick={() => handleLogin('admin')}>
              Sign in
            </Button>
            
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">Demo Access:</p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button variant="outline" onClick={() => handleLogin('admin')}>
                  Agency Admin
                </Button>
                <Button variant="outline" onClick={() => handleLogin('caregiver')}>
                  Caregiver
                </Button>
                <Button variant="outline" onClick={() => handleLogin('patient')}>
                  Patient
                </Button>
                <Button variant="outline" onClick={() => handleLogin('family')}>
                  Family Member
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
