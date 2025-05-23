
import React from 'react';
import { MessageSquare } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const AdminMessages: React.FC = () => {
  return (
    <Layout title="Messages" role="admin">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Messages</h2>
        <p className="text-gray-600">
          Communicate with caregivers, patients, and family members
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          Messaging Center
        </h3>
        <p className="text-gray-500 mt-2 mb-6">
          This page is under development. The full messaging module will be available soon.
        </p>
      </div>
    </Layout>
  );
};

export default AdminMessages;
