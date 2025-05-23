
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Settings as SettingsIcon, 
  Shield,
  Save
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    name: 'Admin User',
    email: 'admin@homecareagency.com',
    phone: '(555) 123-4567'
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    schedulingAlerts: true,
    staffingAlerts: true,
    reportAlerts: false,
    billingAlerts: true
  });

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Layout title="Settings" role="admin">
      <div className="space-y-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
            <TabsTrigger value="account" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <SettingsIcon className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Organization</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={accountSettings.name} 
                    onChange={handleAccountChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={accountSettings.email} 
                    onChange={handleAccountChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={accountSettings.phone} 
                    onChange={handleAccountChange}
                  />
                </div>
                
                <Button className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Secure your account with two-factor authentication</p>
                    </div>
                    <Button variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Setup
                    </Button>
                  </div>
                </div>
                
                <Button className="mt-4">Update Password</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Delivery Methods</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notificationSettings.emailNotifications} 
                      onCheckedChange={() => handleNotificationToggle('emailNotifications')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via text message</p>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={notificationSettings.smsNotifications} 
                      onCheckedChange={() => handleNotificationToggle('smsNotifications')} 
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="scheduling-alerts">Scheduling Alerts</Label>
                    <Switch 
                      id="scheduling-alerts" 
                      checked={notificationSettings.schedulingAlerts} 
                      onCheckedChange={() => handleNotificationToggle('schedulingAlerts')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="staffing-alerts">Staffing Alerts</Label>
                    <Switch 
                      id="staffing-alerts" 
                      checked={notificationSettings.staffingAlerts} 
                      onCheckedChange={() => handleNotificationToggle('staffingAlerts')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="report-alerts">Report Alerts</Label>
                    <Switch 
                      id="report-alerts" 
                      checked={notificationSettings.reportAlerts} 
                      onCheckedChange={() => handleNotificationToggle('reportAlerts')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="billing-alerts">Billing Alerts</Label>
                    <Switch 
                      id="billing-alerts" 
                      checked={notificationSettings.billingAlerts} 
                      onCheckedChange={() => handleNotificationToggle('billingAlerts')} 
                    />
                  </div>
                </div>
                
                <Button className="mt-4">Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">System Preferences</h2>
              <p className="text-gray-500 mb-6">Configure your system preferences and display settings</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-view">Compact View</Label>
                  <Switch id="compact-view" />
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="w-full border border-gray-200 rounded-md p-2"
                  >
                    <option value="est">Eastern Time (EST)</option>
                    <option value="cst">Central Time (CST)</option>
                    <option value="mst">Mountain Time (MST)</option>
                    <option value="pst">Pacific Time (PST)</option>
                  </select>
                </div>
                
                <Button className="mt-4">Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="organization">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Organization Settings</h2>
              <p className="text-gray-500 mb-6">Manage your organization details and configuration</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="HomeCare Agency" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-address">Address</Label>
                  <Input id="org-address" defaultValue="123 Healthcare Blvd, Medical City, CA 90210" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-phone">Phone</Label>
                    <Input id="org-phone" defaultValue="(555) 987-6543" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-email">Email</Label>
                    <Input id="org-email" defaultValue="contact@homecareagency.com" />
                  </div>
                </div>
                
                <Button className="mt-4">Update Organization</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminSettings;
