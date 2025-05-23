
import React, { useState } from 'react';
import { Search, MessageCircle, User, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  sender: string;
  role: string;
  message: string;
  time: string;
  isUnread: boolean;
  avatar?: string;
}

const CaregiverMessages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'patients' | 'admin'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock messages data
  const allMessages: Message[] = [
    {
      id: 1,
      sender: 'John Smith',
      role: 'Patient',
      message: 'When will you arrive for today\'s appointment?',
      time: '10 min ago',
      isUnread: true
    },
    {
      id: 2,
      sender: 'Admin Team',
      role: 'Admin',
      message: 'Please complete your timesheet for last week',
      time: '1 hour ago',
      isUnread: true
    },
    {
      id: 3,
      sender: 'Emma Wilson',
      role: 'Patient',
      message: 'Thank you for your help yesterday',
      time: 'Yesterday',
      isUnread: false
    },
    {
      id: 4,
      sender: 'Sarah Johnson',
      role: 'Patient',
      message: 'Can we reschedule Friday\'s appointment?',
      time: '2 days ago',
      isUnread: false
    },
    {
      id: 5,
      sender: 'Scheduling',
      role: 'Admin',
      message: 'New visit added to your schedule',
      time: '3 days ago',
      isUnread: false
    }
  ];
  
  // Filter messages based on active tab and search query
  const filteredMessages = allMessages
    .filter(msg => {
      if (activeTab === 'all') return true;
      if (activeTab === 'patients') return msg.role === 'Patient';
      if (activeTab === 'admin') return msg.role === 'Admin';
      return true;
    })
    .filter(msg => {
      if (!searchQuery) return true;
      return msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
             msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
  // Count unread messages
  const unreadCount = allMessages.filter(msg => msg.isUnread).length;
  
  return (
    <Layout title="Messages" role="caregiver">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-1">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('all')}
            className="relative"
          >
            All
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
          <Button 
            variant={activeTab === 'patients' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('patients')}
          >
            Patients
          </Button>
          <Button 
            variant={activeTab === 'admin' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`p-4 ${message.isUnread ? 'border-l-4 border-l-primary' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <User className="h-5 w-5" />
              </div>
              
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-medium flex items-center">
                      {message.sender}
                      {message.isUnread && (
                        <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">{message.role}</p>
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                
                <p className="text-sm text-gray-600">{message.message}</p>
                
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" className="mr-2">View</Button>
                  <Button size="sm">Reply</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No messages found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? 'Try changing your search terms' 
                : 'Your message inbox is empty'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CaregiverMessages;
