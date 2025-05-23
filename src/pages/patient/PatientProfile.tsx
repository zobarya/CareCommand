
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, FileText, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PatientProfile: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout title="My Profile" role="patient">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <Card className="p-6 col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">John Smith</h2>
            <p className="text-gray-500 mb-2">Patient</p>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Active
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p>john.smith@example.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>(555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>123 Main Street<br />Hometown, CA 90210</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p>January 15, 1955</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full">Edit Profile</Button>
          </div>
        </Card>
        
        {/* Middle Column - Medical Info */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" /> Medical Information
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Primary Diagnosis</h4>
              <p className="text-sm">Type 2 Diabetes, Hypertension</p>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Allergies</h4>
              <p className="text-sm">Penicillin, Shellfish</p>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Current Medications</h4>
              <ul className="text-sm space-y-1">
                <li>• Metformin 500mg twice daily</li>
                <li>• Lisinopril 10mg once daily</li>
                <li>• Aspirin 81mg once daily</li>
              </ul>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Emergency Contact</h4>
              <p className="text-sm">Jennifer Smith (Daughter)<br />(555) 987-6543</p>
            </div>
          </div>
          
          <Button variant="outline" className="mt-4 w-full">
            View Complete Medical Record
          </Button>
        </Card>
        
        {/* Right Column - Care Plan & Recent Activity */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" /> Care Plan & Activity
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Next Visit</h4>
              <Card className="p-3 bg-blue-50 border-blue-200">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="font-medium">May 25, 2025 at 10:00 AM</p>
                    <p className="text-sm text-gray-600">Physical Therapy with Robert Johnson</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-3 w-full border-blue-200 text-blue-800 hover:bg-blue-100">
                  View Details
                </Button>
              </Card>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Completed physical therapy session</p>
                  <p className="text-xs text-gray-500">Yesterday at 11:00 AM</p>
                </div>
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Blood pressure checked: 128/82</p>
                  <p className="text-xs text-gray-500">May 20, 2025 at 9:30 AM</p>
                </div>
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Medication review completed</p>
                  <p className="text-xs text-gray-500">May 18, 2025 at 2:15 PM</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Care Team</h4>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Emily Chen</p>
                    <p className="text-xs text-gray-500">Primary Physician</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-xs text-gray-500">Registered Nurse</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Robert Johnson</p>
                    <p className="text-xs text-gray-500">Physical Therapist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientProfile;
