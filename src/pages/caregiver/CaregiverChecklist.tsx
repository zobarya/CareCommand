
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle, Circle, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
  tasks: Task[];
}

const CaregiverChecklist: React.FC = () => {
  // Mock data
  const patientName = "John Smith";
  const visitTime = "9:00 AM";
  const visitDate = "Today";
  const visitDuration = "1 hour";
  
  const [currentStep, setCurrentStep] = useState<'checklist' | 'notes' | 'complete'>('checklist');

  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([
    {
      id: '1',
      name: 'Medication Administration',
      tasks: [
        { id: '1-1', name: 'Morning medications given', description: 'Check medication chart and administer as prescribed', completed: false },
        { id: '1-2', name: 'Record vitals before medication', description: 'Temperature, blood pressure, pulse rate', completed: false },
        { id: '1-3', name: 'Document any adverse reactions', description: 'Note any unusual symptoms or side effects', completed: false },
      ]
    },
    {
      id: '2',
      name: 'Personal Care',
      tasks: [
        { id: '2-1', name: 'Assist with bathing', description: 'Help with shower or bed bath as needed', completed: false },
        { id: '2-2', name: 'Assist with dressing', description: 'Help with clothing selection and dressing', completed: false },
        { id: '2-3', name: 'Oral care', description: 'Assist with brushing teeth and oral hygiene', completed: false },
      ]
    },
    {
      id: '3',
      name: 'Physical Activity',
      tasks: [
        { id: '3-1', name: 'Range of motion exercises', description: 'Follow physical therapist recommendations', completed: false },
        { id: '3-2', name: 'Short walk', description: 'Assist with walking around the home if able', completed: false },
      ]
    },
  ]);

  const [notes, setNotes] = useState('');

  const handleTaskToggle = (categoryId: string, taskId: string) => {
    setServiceCategories(categories => 
      categories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              tasks: category.tasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
              )
            }
          : category
      )
    );
  };

  const allTasksCompleted = serviceCategories.every(category => 
    category.tasks.every(task => task.completed)
  );

  return (
    <Layout title="Visit Checklist" role="caregiver">
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">{patientName}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <Clock className="h-4 w-4 mr-1" />
                <span>{visitTime} - {visitDate} ({visitDuration})</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="text-sm text-gray-600 mr-2">Visit in progress</span>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${currentStep === 'checklist' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            onClick={() => setCurrentStep('checklist')}
          >
            Tasks & Checklist
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${currentStep === 'notes' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            onClick={() => setCurrentStep('notes')}
          >
            Notes & Observations
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${currentStep === 'complete' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            onClick={() => setCurrentStep('complete')}
          >
            Complete Visit
          </button>
        </div>

        <div className="p-4">
          {currentStep === 'checklist' && (
            <div className="space-y-6">
              {serviceCategories.map(category => (
                <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3">
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.tasks.map(task => (
                      <div key={task.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <button 
                            className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-primary"
                            onClick={() => handleTaskToggle(category.id, task.id)}
                          >
                            {task.completed ? 
                              <CheckCircle className="h-5 w-5 text-primary" /> : 
                              <Circle className="h-5 w-5" />
                            }
                          </button>
                          <div className="ml-3">
                            <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                              {task.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button 
                  className="bg-primary text-white px-6 py-2 rounded-lg flex items-center"
                  onClick={() => setCurrentStep('notes')}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 'notes' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block font-medium">Visit Notes & Observations</label>
                <textarea 
                  className="w-full h-48 p-3 border border-gray-200 rounded-lg"
                  placeholder="Enter any observations, concerns, or notes about the patient's condition..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button 
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg flex items-center"
                  onClick={() => setCurrentStep('checklist')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
                <button 
                  className="bg-primary text-white px-6 py-2 rounded-lg flex items-center"
                  onClick={() => setCurrentStep('complete')}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 'complete' && (
            <div className="space-y-6">
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="flex flex-col items-center justify-center text-center">
                  {allTasksCompleted ? (
                    <>
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <Check className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Ready to Complete</h3>
                      <p className="text-gray-600 max-w-md">
                        You've completed all required tasks for this visit. 
                        Click the button below to finalize and submit your visit record.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                        <X className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Incomplete Tasks</h3>
                      <p className="text-gray-600 max-w-md">
                        There are some incomplete tasks. You can still complete the visit,
                        but you should document the reason for any skipped tasks.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button 
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg flex items-center"
                  onClick={() => setCurrentStep('notes')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
                <Link to="/caregiver" className="bg-primary text-white px-6 py-2 rounded-lg flex items-center">
                  Complete Visit
                  <Check className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CaregiverChecklist;
