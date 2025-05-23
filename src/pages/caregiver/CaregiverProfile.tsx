
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, Shield, Clock, Award } from 'lucide-react';

const CaregiverProfile: React.FC = () => {
  return (
    <Layout title="My Profile" role="caregiver">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <Card className="p-6 col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Jane Doe</h2>
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
                <p>(555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>123 Healthcare Ave<br />Medical City, CA 90210</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date Joined</p>
                <p>January 15, 2023</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full">Edit Profile</Button>
          </div>
        </Card>
        
        {/* Middle Column - Skills & Certifications */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" /> Skills & Certifications
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Geriatric Care</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Wound Care</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Diabetes Management</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Physical Therapy</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Active Certifications</h4>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-green-600" />
                    <span>Registered Nurse License</span>
                  </div>
                  <span className="text-sm text-gray-500">Expires: May 2026</span>
                </li>
                <li className="flex justify-between">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-green-600" />
                    <span>CPR Certification</span>
                  </div>
                  <span className="text-sm text-gray-500">Expires: Aug 2025</span>
                </li>
                <li className="flex justify-between">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-amber-600" />
                    <span>First Aid Training</span>
                  </div>
                  <span className="text-sm text-gray-500">Expires: Jun 2024</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">English (Fluent)</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Spanish (Conversational)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">Manage Certifications</Button>
          </div>
        </Card>
        
        {/* Right Column - Schedule & Stats */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" /> Activity & Performance
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Current Schedule</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm mb-2">Next visit:</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-gray-500">Today, 2:00 PM - 3:30 PM</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Performance Stats</h4>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span>Visit Completion Rate</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span>On-time Arrival</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span>Patient Satisfaction</span>
                  <span className="font-medium text-green-600">4.9/5</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Visit completed with Robert Brown</p>
                  <p className="text-xs text-gray-500">Yesterday at 4:30 PM</p>
                </div>
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Note added for Mary Johnson</p>
                  <p className="text-xs text-gray-500">May 20, 2025 at 11:15 AM</p>
                </div>
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Certification updated</p>
                  <p className="text-xs text-gray-500">May 18, 2025 at 2:45 PM</p>
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
