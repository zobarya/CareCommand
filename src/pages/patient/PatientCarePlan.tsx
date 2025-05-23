
import React from 'react';
import { Calendar, Check, File, HeartPulse, Pills, Stethoscope } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const PatientCarePlan: React.FC = () => {
  // Mock data
  const carePlan = {
    name: "Comprehensive Care Plan",
    createdDate: "April 15, 2025",
    updatedDate: "May 12, 2025",
    assignedBy: "Dr. Wilson",
    categories: [
      {
        id: "1",
        name: "Medication Management",
        icon: Pills,
        description: "Daily medication administration and monitoring",
        schedule: "3 times daily",
        details: [
          "Blood pressure medication - 8:00 AM, 8:00 PM",
          "Pain management - as needed, max 4 times daily",
          "Insulin - before meals if blood glucose > 140 mg/dl",
          "Monitor for side effects and document any adverse reactions"
        ]
      },
      {
        id: "2",
        name: "Physical Therapy",
        icon: HeartPulse,
        description: "Mobility exercises and strengthening",
        schedule: "Monday, Wednesday, Friday",
        details: [
          "Range of motion exercises - 15 minutes",
          "Assisted walking - 10 minutes, twice daily",
          "Strength training with resistance bands - as tolerated",
          "Record progress on mobility and strength measures"
        ]
      },
      {
        id: "3",
        name: "Vital Signs Monitoring",
        icon: Stethoscope,
        description: "Regular checking of vital health indicators",
        schedule: "Daily",
        details: [
          "Blood pressure monitoring - morning and evening",
          "Temperature check - if symptoms present",
          "Blood glucose monitoring - before meals",
          "Weight monitoring - weekly"
        ]
      },
      {
        id: "4",
        name: "Nutritional Support",
        icon: File,
        description: "Diet monitoring and meal assistance",
        schedule: "With every meal",
        details: [
          "Low sodium diet plan adherence",
          "Meal preparation assistance",
          "Ensure adequate hydration (minimum 8 glasses daily)",
          "Monitor food intake and document any concerns"
        ]
      }
    ],
    goals: [
      "Maintain blood pressure below 140/90",
      "Increase walking distance to 100 feet without assistance",
      "Maintain healthy weight between 155-165 lbs",
      "Minimize pain levels to below 3 on the pain scale"
    ]
  };

  return (
    <Layout title="Care Plan" role="patient">
      <div className="flex flex-wrap justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">{carePlan.name}</h1>
          <p className="text-gray-600">
            Last updated: {carePlan.updatedDate} • Assigned by: {carePlan.assignedBy}
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
            <File className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Care Goals</h2>
        <ul className="space-y-2">
          {carePlan.goals.map((goal, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                <Check className="h-3 w-3" />
              </span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-6">
        {carePlan.categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  <category.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold">{category.name}</h2>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium">{category.schedule}</span>
              </div>
              
              <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
              <ul className="space-y-2">
                {category.details.map((detail, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-2 mt-0.5">
                      <span className="text-xs">{index + 1}</span>
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PatientCarePlan;
