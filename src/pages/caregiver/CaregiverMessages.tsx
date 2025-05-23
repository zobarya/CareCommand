
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Search, User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CaregiverMessages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');
  
  const conversations = [
    {
      id: 1,
      name: 'Admin Office',
      role: 'Admin',
      avatar: 'AO',
      unread: 1,
      lastMessage: 'Your schedule has been updated for next week',
      lastTime: '3:45 PM'
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'Patient',
      avatar: 'JS',
      unread: 0,
      lastMessage: 'Thank you for the help today',
      lastTime: 'Yesterday'
    },
    {
      id: 3,
      name: 'Mary Wilson',
      role: 'Family Member',
      avatar: 'MW',
      unread: 2,
      lastMessage: 'When will you visit next?',
      lastTime: 'Yesterday'
    },
  ];
  
  const messages = [
    {
      id: 1,
      sender: 'Admin Office',
      content: 'Hello, your schedule has been updated for next week. Please review the changes.',
      time: '3:45 PM',
      isOutgoing: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you for letting me know. I will check it right away.',
      time: '3:50 PM',
      isOutgoing: true
    },
  ];
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };
  
  return (
    <Layout title="Messages" role="caregiver">
      <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)]">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-3">
                    {conversation.avatar}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.lastTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate max-w-[150px]">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{conversation.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message area */}
        <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-100 ml-0 md:ml-4 mt-4 md:mt-0 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-3">
                    {conversations.find(c => c.id === selectedConversation)?.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {conversations.find(c => c.id === selectedConversation)?.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversations.find(c => c.id === selectedConversation)?.role}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`mb-4 flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isOutgoing && (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-2 flex-shrink-0">
                        {conversations.find(c => c.id === selectedConversation)?.avatar[0]}
                      </div>
                    )}
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isOutgoing 
                          ? 'bg-primary text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className={`text-xs block text-right mt-1 ${
                        message.isOutgoing ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </span>
                    </div>
                    {message.isOutgoing && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary ml-2 flex-shrink-0">
                        Y
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow border border-gray-200 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    className="rounded-l-none" 
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4 mr-2" /> Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <User className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No conversation selected</h3>
              <p className="text-gray-500 max-w-md">
                Select a conversation from the list to view messages.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CaregiverMessages;
