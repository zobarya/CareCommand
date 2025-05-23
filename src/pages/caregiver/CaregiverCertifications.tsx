
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Upload, Clock, CheckCircle } from 'lucide-react';

const CaregiverCertifications: React.FC = () => {
  // Mock data for certifications
  const certifications = [
    {
      id: 1,
      name: 'Registered Nurse License',
      issuedBy: 'State Board of Nursing',
      expiryDate: '2026-05-10',
      status: 'active',
      dateUploaded: '2022-05-10'
    },
    {
      id: 2,
      name: 'CPR Certification',
      issuedBy: 'American Heart Association',
      expiryDate: '2025-08-15',
      status: 'active',
      dateUploaded: '2023-08-15'
    },
    {
      id: 3,
      name: 'First Aid Training',
      issuedBy: 'Red Cross',
      expiryDate: '2025-07-22',
      status: 'active',
      dateUploaded: '2023-07-22'
    },
    {
      id: 4,
      name: 'Dementia Care Specialist',
      issuedBy: 'Alzheimer\'s Association',
      expiryDate: '2024-06-30',
      status: 'expiring-soon',
      dateUploaded: '2022-06-30'
    }
  ];

  return (
    <Layout title="My Certifications" role="caregiver">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Certifications & Credentials</h2>
        <Button className="flex items-center whitespace-nowrap">
          <Plus className="h-4 w-4 mr-2" />
          Upload New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{cert.name}</h3>
                  <p className="text-sm text-gray-600">Issued by: {cert.issuedBy}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className={`text-sm ${
                      cert.status === 'expiring-soon' ? 'text-amber-600' : 'text-gray-600'
                    }`}>
                      Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Upload className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      Uploaded: {new Date(cert.dateUploaded).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs flex items-center ${
                cert.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : cert.status === 'expiring-soon'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {cert.status === 'active' ? 'Active' : cert.status === 'expiring-soon' ? 'Expiring Soon' : 'Expired'}
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Replace
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-4 border-dashed border-2 border-gray-300 bg-gray-50">
        <div className="flex flex-col items-center text-center p-4">
          <Upload className="h-10 w-10 text-gray-400 mb-3" />
          <h3 className="font-medium mb-1">Upload a new certification</h3>
          <p className="text-sm text-gray-600 mb-3">
            Drag and drop files here or click to browse
          </p>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default CaregiverCertifications;
