
import React from 'react';
import { Settings } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const AdminSettings: React.FC = () => {
  return (
    <Layout title="Settings" role="admin">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Agency Settings</h2>
        <p className="text-gray-600">
          Configure your agency preferences and system settings
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          Settings & Configuration
        </h3>
        <p className="text-gray-500 mt-2 mb-6">
          This page is under development. The full settings module will be available soon.
        </p>
      </div>
    </Layout>
  );
};

export default AdminSettings;
