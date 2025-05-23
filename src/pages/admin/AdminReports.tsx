
import React from 'react';
import { BarChart3 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const AdminReports: React.FC = () => {
  return (
    <Layout title="Reports & Analytics" role="admin">
      <div className="flex flex-wrap justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">Reports & Analytics</h2>
          <p className="text-gray-600">View and download detailed reports</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          Reports & Analytics
        </h3>
        <p className="text-gray-500 mt-2 mb-6">
          This page is under development. The full reports & analytics module will be available soon.
        </p>
        <Button>Coming Soon</Button>
      </div>
    </Layout>
  );
};

export default AdminReports;
