
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, FileText, Clock, Award, Briefcase } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CaregiverProfile: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout title="My Profile" role="caregiver">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <Card className="p-6 col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Jane Doe, RN</h2>
            <p className="text-gray-500 mb-2">Registered Nurse</p>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Active
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p>jane.doe@example.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>(555) 456-7890</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>789 Oak Avenue<br />Hometown, CA 90210</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p>March 15, 2023</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full">Edit Profile</Button>
          </div>
        </Card>
        
        {/* Middle Column - Professional Info */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary" /> Professional Information
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Qualifications</h4>
              <p className="text-sm mb-1">Bachelor of Science in Nursing (BSN)</p>
              <p className="text-sm">Registered Nurse (RN) License #RN123456</p>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Geriatric Care</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Diabetes Management</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Wound Care</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">IV Therapy</span>
              </div>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Languages</h4>
              <div className="space-y-1">
                <p className="text-sm">English (Native)</p>
                <p className="text-sm">Spanish (Conversational)</p>
              </div>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Years of Experience</h4>
              <p className="text-sm">8 years</p>
            </div>
          </div>
          
          <Button variant="outline" className="mt-4 w-full">
            View Complete Profile
          </Button>
        </Card>
        
        {/* Right Column - Certifications & Schedule */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" /> Certifications & Schedule
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Active Certifications</h4>
              <div className="space-y-2">
                <Card className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">BLS Certification</p>
                      <p className="text-xs text-gray-500">Expires: Dec 15, 2025</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">ACLS Certification</p>
                      <p className="text-xs text-gray-500">Expires: Aug 30, 2025</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Wound Care Certification</p>
                      <p className="text-xs text-gray-500">Expires: Feb 10, 2026</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </Card>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Next Scheduled Visit</h4>
              <Card className="p-3 bg-blue-50 border-blue-200">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="font-medium">Today at 2:00 PM</p>
                    <p className="text-sm text-gray-600">Home visit with John Smith</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-3 w-full border-blue-200 text-blue-800 hover:bg-blue-100">
                  View Details
                </Button>
              </Card>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Stats This Week</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-gray-500">Completed Visits</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-xs text-gray-500">Upcoming Visits</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-xs text-gray-500">Total Hours</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">8</p>
                  <p className="text-xs text-gray-500">Patients Served</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CaregiverProfile;
