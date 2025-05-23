
import React, { useState } from 'react';
import { Calendar, BarChart3, Download, PieChart, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const AdminReports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [activeReport, setActiveReport] = useState('visits');
  
  // Mock data
  const reportTypes = [
    { id: 'visits', name: 'Visit Analytics', icon: Calendar },
    { id: 'caregivers', name: 'Caregiver Performance', icon: Users },
    { id: 'revenue', name: 'Revenue Report', icon: BarChart3 },
    { id: 'patients', name: 'Patient Distribution', icon: PieChart },
  ];
  
  const visitStats = {
    total: 248,
    completed: 220,
    missed: 8,
    rescheduled: 20,
    byType: {
      nursing: 120,
      therapy: 58,
      aide: 70
    },
    timeData: [
      { month: "Jan", visits: 165 },
      { month: "Feb", visits: 190 },
      { month: "Mar", visits: 210 },
      { month: "Apr", visits: 232 },
      { month: "May", visits: 248 }
    ]
  };
  
  const caregiverStats = {
    total: 12,
    activeToday: 8,
    averageVisits: 21,
    topPerformer: "Jane Doe",
    performance: [
      { name: "Jane Doe", rating: 4.9, visits: 28 },
      { name: "Mike Johnson", rating: 4.8, visits: 25 },
      { name: "Sarah Williams", rating: 4.7, visits: 22 },
      { name: "Robert Brown", rating: 4.5, visits: 18 },
    ]
  };
  
  return (
    <Layout title="Reports & Analytics" role="admin">
      <div className="flex flex-wrap justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">Reports & Analytics</h2>
          <p className="text-gray-600">View and download detailed reports</p>
        </div>
        <div className="flex mt-3 sm:mt-0 space-x-2 items-center">
          <div>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="thisYear">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {reportTypes.map(report => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id)}
            className={`p-4 rounded-lg border ${
              activeReport === report.id 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <report.icon className={`h-6 w-6 ${activeReport === report.id ? 'text-white' : 'text-gray-600'}`} />
              <p className={`mt-2 font-medium ${activeReport === report.id ? 'text-white' : 'text-gray-900'}`}>
                {report.name}
              </p>
            </div>
          </button>
        ))}
      </div>
      
      {activeReport === 'visits' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold mb-4">Visit Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-gray-900">{visitStats.total}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{visitStats.completed}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Missed</p>
                <p className="text-2xl font-bold text-red-600">{visitStats.missed}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Rescheduled</p>
                <p className="text-2xl font-bold text-yellow-600">{visitStats.rescheduled}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold mb-4">Visits by Type</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="space-y-4 w-full">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Nursing Visits</span>
                      <span className="text-sm text-gray-600">{visitStats.byType.nursing}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(visitStats.byType.nursing / visitStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Therapy Visits</span>
                      <span className="text-sm text-gray-600">{visitStats.byType.therapy}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(visitStats.byType.therapy / visitStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Aide Visits</span>
                      <span className="text-sm text-gray-600">{visitStats.byType.aide}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(visitStats.byType.aide / visitStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold mb-4">Visits Over Time</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full">
                  <div className="flex items-end justify-between h-40">
                    {visitStats.timeData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center w-1/5">
                        <div 
                          className="bg-primary rounded-t w-12" 
                          style={{ height: `${(item.visits / 250) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-2">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeReport === 'caregivers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold mb-4">Caregiver Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Caregivers</p>
                <p className="text-2xl font-bold text-gray-900">{caregiverStats.total}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Active Today</p>
                <p className="text-2xl font-bold text-green-600">{caregiverStats.activeToday}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Visits/Month</p>
                <p className="text-2xl font-bold text-purple-600">{caregiverStats.averageVisits}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Top Performer</p>
                <p className="text-xl font-bold text-yellow-600">{caregiverStats.topPerformer}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="font-bold p-4 border-b border-gray-100">Top Performers</h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">Caregiver</th>
                  <th className="px-4 py-3 text-left">Rating</th>
                  <th className="px-4 py-3 text-left">Monthly Visits</th>
                  <th className="px-4 py-3 text-left">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {caregiverStats.performance.map((caregiver, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{caregiver.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">{caregiver.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(caregiver.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              aria-hidden="true" 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="currentColor" 
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{caregiver.visits}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${95 - index * 3}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{95 - index * 3}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {(activeReport === 'revenue' || activeReport === 'patients') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            {activeReport === 'revenue' ? (
              <BarChart3 className="h-8 w-8 text-gray-400" />
            ) : (
              <PieChart className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {activeReport === 'revenue' ? 'Revenue Report' : 'Patient Distribution'}
          </h3>
          <p className="text-gray-500 mt-2 mb-6">
            {activeReport === 'revenue' 
              ? 'Detailed revenue analytics will be displayed here.' 
              : 'Patient demographic and distribution data will be displayed here.'}
          </p>
          <Button className="mx-auto">Coming Soon</Button>
        </div>
      )}
    </Layout>
  );
};

export default AdminReports;
