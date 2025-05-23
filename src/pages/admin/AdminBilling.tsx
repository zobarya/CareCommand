
import React from 'react';
import { FileText } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const AdminBilling: React.FC = () => {
  return (
    <Layout title="Billing & Payments" role="admin">
      <div className="flex flex-wrap justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">Billing & Payments</h2>
          <p className="text-gray-600">Manage invoices and track payments</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Button className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          Billing & Payments
        </h3>
        <p className="text-gray-500 mt-2 mb-6">
          This page is under development. The full billing & payments module will be available soon.
        </p>
      </div>
    </Layout>
  );
};

export default AdminBilling;
