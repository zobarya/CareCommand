
import React, { useState } from 'react';
import { Search, User, ChevronRight, Send, PaperclipIcon, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Message {
  id: string;
  sender: string;
  senderRole: 'caregiver' | 'patient' | 'family' | 'admin' | 'you';
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: 'caregiver' | 'patient' | 'family' | 'system' | 'group';
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const AdminMessages: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'caregivers' | 'patients' | 'family'>('all');
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  
  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Jane Doe',
      role: 'caregiver',
      avatar: 'JD',
      lastMessage: 'I'll need coverage for my Thursday shift.',
      timestamp: '10:30 AM',
      unread: 2,
    },
    {
      id: '2',
      name: 'John Smith',
      role: 'patient',
      avatar: 'JS',
      lastMessage: 'When will the nurse arrive tomorrow?',
      timestamp: 'Yesterday',
      unread: 1,
    },
    {
      id: '3',
      name: 'Nursing Team',
      role: 'group',
      avatar: 'NT',
      lastMessage: 'Training session scheduled for Friday at 2pm.',
      timestamp: 'Yesterday',
      unread: 0,
    },
    {
      id: '4',
      name: 'Mary Johnson',
      role: 'family',
      avatar: 'MJ',
      lastMessage: 'Thank you for arranging the extra visit.',
      timestamp: 'May 21',
      unread: 0,
    },
  ];
  
  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '101',
        sender: 'Jane Doe',
        senderRole: 'caregiver',
        content: 'Hello, I'll need coverage for my Thursday shift. I have a doctor's appointment I can't reschedule.',
        timestamp: '10:30 AM',
        read: false,
      },
      {
        id: '102',
        sender: 'Jane Doe',
        senderRole: 'caregiver',
        content: 'It's for the Johnson and Williams patients. Both are scheduled for medication administration and vital checks.',
        timestamp: '10:32 AM',
        read: false,
      },
    ],
    '2': [
      {
        id: '201',
        sender: 'John Smith',
        senderRole: 'patient',
        content: 'When will the nurse arrive tomorrow? I need to coordinate with my family member who's visiting.',
        timestamp: 'Yesterday, 3:15 PM',
        read: true,
      },
      {
        id: '202',
        sender: 'you',
        senderRole: 'you',
        content: 'Good afternoon Mr. Smith. Nurse Sarah is scheduled to arrive between 9:30 and 10:00 AM tomorrow. Will that work for you?',
        timestamp: 'Yesterday, 4:22 PM',
        read: true,
      },
    ],
    '3': [
      {
        id: '301',
        sender: 'You',
        senderRole: 'you',
        content: '@team Training session scheduled for Friday at 2pm in the conference room. Please confirm your attendance.',
        timestamp: 'Yesterday, 11:45 AM',
        read: true,
      },
      {
        id: '302',
        sender: 'Mike Johnson',
        senderRole: 'caregiver',
        content: 'I'll be there.',
        timestamp: 'Yesterday, 12:30 PM',
        read: true,
      },
      {
        id: '303',
        sender: 'Sarah Williams',
        senderRole: 'caregiver',
        content: 'Confirmed, thank you!',
        timestamp: 'Yesterday, 1:15 PM',
        read: true,
      },
    ],
    '4': [
      {
        id: '401',
        sender: 'Mary Johnson',
        senderRole: 'family',
        content: 'Thank you for arranging the extra visit for my mother. The aide was very helpful.',
        timestamp: 'May 21, 2:45 PM',
        read: true,
      },
      {
        id: '402',
        sender: 'You',
        senderRole: 'you',
        content: "You're welcome, Mrs. Johnson. We're glad we could provide the additional support. Please let us know if you need anything else.",
        timestamp: 'May 21, 3:30 PM',
        read: true,
      },
    ],
  };
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;
    
    setMessageText('');
    // In a real app, would send the message to the backend
  };
  
  const filteredConversations = activeFilter === 'all' 
    ? conversations 
    : conversations.filter(c => c.role === activeFilter);
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'caregiver':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Caregiver</span>;
      case 'patient':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Patient</span>;
      case 'family':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Family</span>;
      case 'group':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Group</span>;
      default:
        return null;
    }
  };
  
  const handleNewMessage = () => {
    setIsNewMessageOpen(true);
  };

  const handleSendNewMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewMessageOpen(false);
    // In a real app, would create a new conversation
  };
  
  return (
    <Layout title="Messages" role="admin">
      <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)]">
        {!activeConversation ? (
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Messages</h2>
              <Button size="sm" onClick={handleNewMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Message
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                <button
                  className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'all' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Messages
                </button>
                <button
                  className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'caregivers' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveFilter('caregivers')}
                >
                  Caregivers
                </button>
                <button
                  className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'patients' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveFilter('patients')}
                >
                  Patients
                </button>
                <button
                  className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'family' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveFilter('family')}
                >
                  Family Members
                </button>
              </div>
            </div>
            
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
              />
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center"
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${conversation.unread > 0 ? 'bg-primary' : 'bg-gray-400'}`}>
                        {conversation.avatar}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <h3 className="font-medium mr-2">{conversation.name}</h3>
                            {getRoleBadge(conversation.role)}
                          </div>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      <div className="ml-2 flex items-center">
                        {conversation.unread > 0 && (
                          <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                            {conversation.unread}
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No conversations found</h3>
                    <p className="text-gray-500 mt-2">
                      No {activeFilter === 'all' ? '' : activeFilter} conversations match your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="bg-white border-b border-gray-200 p-3 flex items-center">
              <button 
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setActiveConversation(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${
                  conversations.find(c => c.id === activeConversation)?.role === 'caregiver' ? 'bg-blue-500' :
                  conversations.find(c => c.id === activeConversation)?.role === 'patient' ? 'bg-green-500' :
                  conversations.find(c => c.id === activeConversation)?.role === 'family' ? 'bg-purple-500' :
                  'bg-gray-500'
                } text-white flex items-center justify-center`}>
                  {conversations.find(c => c.id === activeConversation)?.avatar}
                </div>
                <div className="ml-2">
                  <div className="flex items-center">
                    <h3 className="font-medium text-sm mr-2">
                      {conversations.find(c => c.id === activeConversation)?.name}
                    </h3>
                    {getRoleBadge(conversations.find(c => c.id === activeConversation)?.role || '')}
                  </div>
                </div>
              </div>
              
              <div className="ml-auto flex">
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="ml-1 p-1 rounded-full hover:bg-gray-100 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages[activeConversation]?.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.senderRole === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.senderRole === 'you' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-white rounded-bl-none border border-gray-200'
                    }`}
                  >
                    {message.senderRole !== 'you' && (
                      <p className="text-xs font-medium mb-1 text-gray-500">{message.sender}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.senderRole === 'you' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white border-t border-gray-200 p-3">
              <div className="flex items-center">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <PaperclipIcon className="h-5 w-5 text-gray-400" />
                </button>
                <input
                  type="text"
                  className="flex-1 border-none focus:ring-0 focus:outline-none"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className={`p-2 rounded-full ${
                    messageText.trim() ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSendNewMessage}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Type</Label>
                <select id="recipient" className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="">Select recipient type</option>
                  <option value="caregiver">Caregiver</option>
                  <option value="patient">Patient</option>
                  <option value="family">Family Member</option>
                  <option value="group">Create Group</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="person">Select Recipient</Label>
                <select id="person" className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="">Select recipient</option>
                  <option value="1">Jane Doe (Caregiver)</option>
                  <option value="2">John Smith (Patient)</option>
                  <option value="3">Mary Johnson (Family)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Type your message here..."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsNewMessageOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminMessages;
