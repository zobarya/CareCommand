
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, File, Search } from 'lucide-react';

const CaregiverNotes: React.FC = () => {
  return (
    <Layout title="Patient Notes" role="caregiver">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search notes..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
          />
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <Card key={index} className="p-4 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <File className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-medium">Visit Note #{index}</h3>
              </div>
              <span className="text-xs text-gray-500">May {10 + index}, 2025</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Patient showed improvement in mobility. Completed all prescribed exercises. Blood pressure normal at 120/80.
            </p>
            <div className="text-xs text-gray-500 mt-auto">
              <div>Patient: John Smith</div>
              <div className="mt-1">Visit time: 2:00 PM - 3:30 PM</div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default CaregiverNotes;
