
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Shield, Eye, Phone, Users, Moon } from 'lucide-react';

const PatientSettings: React.FC = () => {
  return (
    <Layout title="Settings" role="patient">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
          </div>
          
          {/* Notifications Section */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Visit Reminders</p>
                  <p className="text-sm text-gray-500">Get reminded before scheduled visits</p>
                </div>
                <div className="bg-primary w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Medication Reminders</p>
                  <p className="text-sm text-gray-500">Get alerts for medication schedules</p>
                </div>
                <div className="bg-primary w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-gray-500">Get notified for new messages</p>
                </div>
                <div className="bg-primary w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Care Plan Updates</p>
                  <p className="text-sm text-gray-500">Notification when care plan changes</p>
                </div>
                <div className="bg-gray-200 w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"></div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Privacy Section */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Privacy</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share Health Data</p>
                  <p className="text-sm text-gray-500">Allow caregivers to access health data</p>
                </div>
                <div className="bg-primary w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Family Access</p>
                  <p className="text-sm text-gray-500">Allow family members to view progress</p>
                </div>
                <div className="bg-primary w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Anonymous Feedback</p>
                  <p className="text-sm text-gray-500">Keep your identity private when giving feedback</p>
                </div>
                <div className="bg-gray-200 w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"></div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Privacy Policy
              </Button>
            </div>
          </Card>
          
          {/* Preferences Section */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
                <div className="bg-gray-200 w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Larger Text</p>
                  <p className="text-sm text-gray-500">Increase text size for better readability</p>
                </div>
                <div className="bg-gray-200 w-12 h-6 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-gray-500">Currently set to English</p>
                </div>
                <Button variant="ghost" size="sm">
                  Change
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Time Zone</p>
                  <p className="text-sm text-gray-500">Currently set to Eastern Time (ET)</p>
                </div>
                <Button variant="ghost" size="sm">
                  Change
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Contact Preferences */}
          <Card className="p-6 md:col-span-3">
            <div className="flex items-center mb-4">
              <Phone className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Contact Preferences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                  </div>
                  <div className="bg-primary w-12 h-6 rounded-full relative">
                    <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive emails for status updates</p>
                  </div>
                  <div className="bg-primary w-12 h-6 rounded-full relative">
                    <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Do Not Disturb Hours</p>
                    <p className="text-sm text-gray-500">Set hours when you don't want to receive notifications</p>
                  </div>
                  <div className="bg-gray-200 w-12 h-6 rounded-full relative">
                    <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Call Preferences</p>
                    <p className="text-sm text-gray-500">Set preferences for receiving calls</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Account Security */}
          <Card className="p-6 md:col-span-3">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Account Security</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <p className="font-medium mb-2">Change Password</p>
                  <Button variant="outline" className="w-full">Update Password</Button>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Two-Factor Authentication</p>
                  <div className="flex items-center">
                    <div className="bg-gray-200 w-12 h-6 rounded-full relative">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"></div>
                    </div>
                    <span className="ml-3 text-sm text-gray-500">Not enabled</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="font-medium mb-2">Login History</p>
                  <Button variant="outline" className="w-full">View Activity</Button>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Connected Devices</p>
                  <Button variant="outline" className="w-full">Manage Devices</Button>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="md:col-span-3 flex justify-center mt-4">
            <Button className="w-full max-w-md" size="lg">
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientSettings;
