
import React, { useState } from 'react';
import { User, Shield, Settings, Building, Bell, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('agency');
  
  // Mock agency data
  const agencyData = {
    name: 'Homecare Agency',
    address: '123 Health Street, Medical City, CA 90210',
    phone: '(555) 123-4567',
    email: 'contact@homecare.example',
    website: 'www.homecare.example',
    licenseNumber: 'HC-12345678',
    taxId: '12-3456789'
  };
  
  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    newPatients: true,
    missedVisits: true,
    scheduleChanges: true,
    certificationExpiring: true,
    billingAlerts: true,
    systemUpdates: false
  });
  
  const handleToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast.success(`${setting} notifications ${notificationSettings[setting] ? 'disabled' : 'enabled'}`);
  };

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <Layout title="Settings" role="admin">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Agency Settings</h2>
        <p className="text-gray-600">
          Configure your agency preferences and system settings
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 border-r border-gray-100">
            <nav className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible">
              <button
                onClick={() => setActiveTab('agency')}
                className={`p-3 text-left flex items-center ${activeTab === 'agency' ? 'bg-gray-50 border-l-2 border-primary text-primary' : 'text-gray-700'}`}
              >
                <Building className="h-5 w-5 mr-2" />
                <span>Agency Info</span>
              </button>
              <button
                onClick={() => setActiveTab('user')}
                className={`p-3 text-left flex items-center ${activeTab === 'user' ? 'bg-gray-50 border-l-2 border-primary text-primary' : 'text-gray-700'}`}
              >
                <User className="h-5 w-5 mr-2" />
                <span>User Management</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`p-3 text-left flex items-center ${activeTab === 'security' ? 'bg-gray-50 border-l-2 border-primary text-primary' : 'text-gray-700'}`}
              >
                <Shield className="h-5 w-5 mr-2" />
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`p-3 text-left flex items-center ${activeTab === 'notifications' ? 'bg-gray-50 border-l-2 border-primary text-primary' : 'text-gray-700'}`}
              >
                <Bell className="h-5 w-5 mr-2" />
                <span>Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`p-3 text-left flex items-center ${activeTab === 'system' ? 'bg-gray-50 border-l-2 border-primary text-primary' : 'text-gray-700'}`}
              >
                <Settings className="h-5 w-5 mr-2" />
                <span>System</span>
              </button>
            </nav>
          </div>
          
          <div className="flex-1 p-6">
            {activeTab === 'agency' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Agency Information</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Agency Name
                      </label>
                      <input 
                        type="text" 
                        defaultValue={agencyData.name}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Number
                      </label>
                      <input 
                        type="text" 
                        defaultValue={agencyData.licenseNumber}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input 
                        type="text" 
                        defaultValue={agencyData.phone}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        defaultValue={agencyData.email}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input 
                        type="text" 
                        defaultValue={agencyData.website}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax ID
                      </label>
                      <input 
                        type="text" 
                        defaultValue={agencyData.taxId}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea 
                      defaultValue={agencyData.address}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo
                    </label>
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <Building className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline" size="sm">
                        Upload New Logo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Patient Registrations</p>
                      <p className="text-sm text-gray-600">Get notified when a new patient is registered</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.newPatients} 
                          onChange={() => handleToggle('newPatients')}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Missed Visits</p>
                      <p className="text-sm text-gray-600">Get alerted when a caregiver misses a scheduled visit</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.missedVisits} 
                          onChange={() => handleToggle('missedVisits')}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Schedule Changes</p>
                      <p className="text-sm text-gray-600">Notifications for changes to the care schedule</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.scheduleChanges} 
                          onChange={() => handleToggle('scheduleChanges')}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Certification Expiration</p>
                      <p className="text-sm text-gray-600">Get reminded when caregiver certifications are about to expire</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.certificationExpiring} 
                          onChange={() => handleToggle('certificationExpiring')}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Billing Alerts</p>
                      <p className="text-sm text-gray-600">Notifications about billing and payment activities</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.billingAlerts} 
                          onChange={() => handleToggle('billingAlerts')}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-gray-600">Get notified about system maintenance and updates</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.systemUpdates} 
                          onChange={() => handleToggle('systemUpdates')}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleSaveChanges}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'user' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
                  Manage admin users, permissions, and access controls.
                </p>
                <Button>Coming Soon</Button>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
                  Configure security policies, password requirements, and two-factor authentication.
                </p>
                <Button>Coming Soon</Button>
              </div>
            )}
            
            {activeTab === 'system' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
                <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
                  Customize system defaults, data retention policies, and integration settings.
                </p>
                <Button>Coming Soon</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSettings;
