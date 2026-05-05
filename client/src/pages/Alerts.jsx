import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, Trash2 } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'Low stock alert: Organic Bananas (SKU-1029)', time: '2 hours ago', read: false },
    { id: 2, type: 'warning', message: 'Vendor SunDry Foods Co. updated their pricing catalog', time: '5 hours ago', read: false },
    { id: 3, type: 'info', message: 'Purchase Order PO-2024-0047 has been delivered', time: '1 day ago', read: true },
    { id: 4, type: 'critical', message: 'Payment overdue for invoice #99281', time: '1 day ago', read: false },
    { id: 5, type: 'warning', message: 'System maintenance scheduled for tonight at 2 AM', time: '2 days ago', read: true },
    { id: 6, type: 'info', message: 'New user registered: admin-assistant@groceryerp.com', time: '2 days ago', read: true },
    { id: 7, type: 'critical', message: 'Database backup failed!', time: '3 days ago', read: false },
  ]);

  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <AlertTriangle className="text-red-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
      case 'info': return <Info className="text-blue-500" size={20} />;
      case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
      default: return <Bell className="text-gray-500" size={20} />;
    }
  };

  const getBgColor = (type, read) => {
    if (read) return 'bg-white';
    switch(type) {
      case 'critical': return 'bg-red-50';
      case 'warning': return 'bg-orange-50';
      case 'info': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">System Alerts</h1>
          <p className="text-sm text-gray-500">You have {unreadCount} unread notifications</p>
        </div>
        <button 
          onClick={markAllRead}
          className="text-brand-accent hover:text-brand-dark text-sm font-medium border border-brand-accent/30 px-4 py-2 rounded-lg bg-brand-accent/5 transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {alerts.length > 0 ? alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 flex items-start gap-4 transition-colors hover:bg-gray-50 ${getBgColor(alert.type, alert.read)}`}
            >
              <div className="mt-1">
                {getIcon(alert.type)}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${alert.read ? 'text-gray-600' : 'text-gray-800 font-semibold'}`}>
                  {alert.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
              </div>
              <button 
                onClick={() => deleteAlert(alert.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Delete alert"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center">
              <Bell size={48} className="text-gray-300 mb-4" />
              <p>You're all caught up!</p>
              <p className="text-sm mt-1 text-gray-400">No new alerts to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
