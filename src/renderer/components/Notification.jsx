import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon  } from '@heroicons/react/24/solid';

export default function Notification() {
  const { notification, showNotification } = useAppContext();

  if (!notification) return null;

  const getNotificationStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5" />;
      default:
        return <InformationCircleIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${getNotificationStyles()} flex items-start max-w-md z-50`}>
      <div className="mr-2 mt-0.5">
        {getNotificationIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{notification.message}</p>
      </div>
      <button
        onClick={() => showNotification(null)}
        className="ml-2 text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon  className="h-5 w-5" />
      </button>
    </div>
  );
}