
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Home, Calendar, FileText, Heart } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const PatientProfile: React.FC = () => {
  // Mock patient data
  const patientData = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    dob: "May 15, 1955",
    emergencyContact: "Mary Smith (Wife) - (555) 987-6543",
    primaryPhysician: "Dr. Robert Williams",
    medicalConditions: ["Hypertension", "Type 2 Diabetes", "Osteoarthritis"],
    allergies: ["Penicillin", "Shellfish"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", schedule: "Once daily" },
      { name: "Metformin", dosage: "500mg", schedule: "Twice daily" },
      { name: "Acetaminophen", dosage: "500mg", schedule: "As needed for pain" }
    ],
    insuranceProvider: "HealthPlus Insurance",
    policyNumber: "HP-12345678",
    lastVisit: "May 20, 2025"
  };

  return (
    <Layout title="My Profile" role="patient">
      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex justify-center md:justify-start">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-12 w-12" />
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold">{patientData.name}</h2>
              <p className="text-gray-500">Patient ID: PT-10042</p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{patientData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{patientData.phone}</span>
                </div>
                <div className="flex items-center">
                  <Home className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{patientData.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span>DOB: {patientData.dob}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end items-start">
              <Button>Edit Profile</Button>
            </div>
          </div>
        </Card>
        
        {/* Medical Information */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Medical Information</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Emergency Contact</h4>
              <p>{patientData.emergencyContact}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-gray-700">Primary Physician</h4>
              <p>{patientData.primaryPhysician}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-gray-700">Medical Conditions</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientData.medicalConditions.map((condition, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-gray-700">Allergies</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientData.allergies.map((allergy, index) => (
                  <span key={index} className="bg-red-50 text-red-700 px-2 py-1 text-xs rounded-full">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Medications */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Medications</h3>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Full List
            </Button>
          </div>
          
          <div className="space-y-4">
            {patientData.medications.map((medication, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <Heart className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">{medication.name}</h4>
                  <p className="text-sm text-gray-600">{medication.dosage} - {medication.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Insurance */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Insurance Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Provider</h4>
              <p>{patientData.insuranceProvider}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">Policy Number</h4>
              <p>{patientData.policyNumber}</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientProfile;
