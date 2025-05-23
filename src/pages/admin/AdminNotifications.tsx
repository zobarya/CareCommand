
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminNotifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const isMobile = useIsMobile();
  
  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: 'schedule',
      title: 'Schedule Conflict',
      message: 'Caregiver Jane Doe has overlapping appointments',
      time: '30 mins ago',
      isRead: false,
      linkTo: '/admin/calendar'
    },
    {
      id: 2,
      type: 'staff',
      title: 'Staff Availability',
      message: 'Two caregivers called in sick today',
      time: '2 hours ago',
      isRead: false,
      linkTo: '/admin/caregivers'
    },
    {
      id: 3,
      type: 'billing',
      title: 'Billing Alert',
      message: 'Three invoices require approval',
      time: 'Yesterday',
      isRead: true,
      linkTo: '/admin/billing'
    },
    {
      id: 4,
      type: 'report',
      title: 'Monthly Report',
      message: 'April performance report is ready for review',
      time: 'May 20, 2025',
      isRead: true,
      linkTo: '/admin/reports'
    }
  ];
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'schedule':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'staff':
        return <Bell className="h-5 w-5 text-red-500" />;
      case 'billing':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'report':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const markAllAsRead = () => {
    // In a real app, this would call an API to mark all notifications as read
    console.log('Marking all notifications as read');
  };
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications.filter(n => n.isRead);
  
  return (
    <Layout title="Notifications" role="admin">
      <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} mb-6`}>
        <div className={`flex ${isMobile ? 'mb-3 w-full' : 'space-x-1'}`}>
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('all')}
            className={isMobile ? 'flex-1' : ''}
          >
            All
          </Button>
          <Button 
            variant={activeTab === 'unread' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('unread')}
            className={`relative ${isMobile ? 'flex-1' : ''}`}
          >
            Unread
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </Button>
          <Button 
            variant={activeTab === 'read' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('read')}
            className={isMobile ? 'flex-1' : ''}
          >
            Read
          </Button>
        </div>
        
        <Button variant="outline" className="flex items-center" onClick={markAllAsRead}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>
      
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`p-4 ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}
          >
            <div className={`flex ${isMobile ? 'flex-col' : ''}`}>
              <div className={`${isMobile ? 'mb-3' : 'mr-4'}`}>
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">
                    {notification.title}
                    {!notification.isRead && (
                      <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </h3>
                  <span className={`text-xs text-gray-500 whitespace-nowrap ${isMobile ? 'ml-auto' : 'ml-2'}`}>
                    {notification.time}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
              </div>
              
              <div className={`${isMobile ? 'mt-3 text-right' : 'ml-4'}`}>
                <Button variant="outline" size="sm" asChild>
                  <Link to={notification.linkTo}>View</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {activeTab === 'unread' ? 'You have no unread notifications' : 'No notifications to display'}
            </p>
          </div>
        )}
      </div>
      
      {filteredNotifications.length > 0 && (
        <div className="mt-6 text-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </Layout>
  );
};

export default AdminNotifications;
