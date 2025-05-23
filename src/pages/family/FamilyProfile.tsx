
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, Users, Clock } from 'lucide-react';

const FamilyProfile: React.FC = () => {
  return (
    <Layout title="My Profile" role="family">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <Card className="p-6 col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Jennifer Smith</h2>
            <p className="text-gray-500 mb-2">Family Member</p>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Active
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p>jennifer.smith@example.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>(555) 987-6543</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>456 Family Lane<br />Hometown, CA 90210</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p>Daughter</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p>January 10, 2023</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full">Edit Profile</Button>
          </div>
        </Card>
        
        {/* Middle Column - Connected Patients */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" /> Connected Patients
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Robert Smith</h4>
                  <p className="text-sm text-gray-500 mb-1">Father</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Connected since Jan 2023</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs h-fit">
                  Primary Contact
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Care Plan Access</span>
                  <span className="font-medium text-green-600">Full Access</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Medical Information</span>
                  <span className="font-medium text-green-600">Full Access</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Financial Records</span>
                  <span className="font-medium text-amber-600">Limited Access</span>
                </div>
              </div>
              
              <div className="mt-4 space-x-2 flex">
                <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                <Button variant="outline" size="sm" className="flex-1">Manage Access</Button>
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-gray-200 rounded-lg bg-gray-50">
              <div className="flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-gray-400 mb-2" />
                <h4 className="font-medium mb-1">Connect Another Patient</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Add another family member to your care circle
                </p>
                <Button variant="outline" size="sm">
                  Add Patient
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Right Column - Activity & Access */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" /> Recent Activity
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Care Updates</h4>
              <div className="space-y-2">
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Viewed care plan updates for Robert Smith</p>
                  <p className="text-xs text-gray-500">Today at 2:30 PM</p>
                </div>
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Requested additional weekend visit</p>
                  <p className="text-xs text-gray-500">Yesterday at 10:15 AM</p>
                </div>
                <div className="text-sm p-2 border-l-2 border-primary/70 pl-3">
                  <p>Messaged Jane Doe (Caregiver)</p>
                  <p className="text-xs text-gray-500">May 21, 2025 at 4:45 PM</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Pending Actions</h4>
              <div className="space-y-2">
                <Card className="p-2 bg-amber-50 border-amber-200">
                  <p className="text-sm font-medium text-amber-800">Care Plan Review Needed</p>
                  <p className="text-xs text-amber-700 mb-2">Updated May 22, 2025</p>
                  <Button size="sm" variant="outline" className="w-full border-amber-200 text-amber-800 hover:bg-amber-100">
                    Review Now
                  </Button>
                </Card>
                <Card className="p-2 bg-blue-50 border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Provide Feedback</p>
                  <p className="text-xs text-blue-700 mb-2">For visit on May 22, 2025</p>
                  <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-800 hover:bg-blue-100">
                    Submit Feedback
                  </Button>
                </Card>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">My Access</h4>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-sm">Care Plan Permissions</span>
                  <span className="text-sm font-medium text-green-600">Full Access</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-sm">Medical Records</span>
                  <span className="text-sm font-medium text-green-600">Full Access</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-sm">Communication Access</span>
                  <span className="text-sm font-medium text-green-600">Full Access</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Access Settings
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default FamilyProfile;
