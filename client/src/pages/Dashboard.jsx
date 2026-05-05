import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Package, Users, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

const DashboardCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        {icon}
      </div>
      {trend && (
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
          <TrendingUp size={12} className="mr-1" /> {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    approvedOrders: 0,
    activeVendors: 0,
    totalInventoryValue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">GroceryERP / Overview</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input type="text" placeholder="Search products, vendors, POs" className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent w-64 shadow-sm" />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <button className="bg-[#1e8449] hover:bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            + New PO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Products" 
          value="1,284" 
          icon={<Package className="text-emerald-500" size={24} />} 
          color="bg-emerald-500" 
          trend="4.2%" 
        />
        <DashboardCard 
          title="Active Vendors" 
          value={stats.activeVendors} 
          icon={<Users className="text-blue-500" size={24} />} 
          color="bg-blue-500" 
        />
        <DashboardCard 
          title="Open Purchase Orders" 
          value={stats.pendingOrders} 
          icon={<ShoppingCart className="text-orange-500" size={24} />} 
          color="bg-orange-500" 
        />
        <DashboardCard 
          title="Low Stock Items" 
          value="23" 
          icon={<AlertTriangle className="text-red-500" size={24} />} 
          color="bg-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Recent Purchase Orders</h3>
            <button className="text-sm text-brand-accent hover:underline font-medium">View All &rarr;</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200">
                  <th className="pb-3 px-4">PO Number</th>
                  <th className="pb-3 px-4">Vendor</th>
                  <th className="pb-3 px-4 text-right">Amount</th>
                  <th className="pb-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Placeholder static row until dynamic fetch in PO component */}
                <tr className="text-sm hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">PO-2024-0047</td>
                  <td className="py-3 px-4 text-gray-600">GreenValley Farms</td>
                  <td className="py-3 px-4 font-medium text-gray-800 text-right">$5,357.08</td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">Approved</span>
                  </td>
                </tr>
                <tr className="text-sm hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">PO-2024-0046</td>
                  <td className="py-3 px-4 text-gray-600">SunDry Foods Co.</td>
                  <td className="py-3 px-4 font-medium text-gray-800 text-right">$2,890.00</td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col justify-center items-center">
             <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                 <TrendingUp size={32} className="text-emerald-600" />
             </div>
             <h3 className="text-3xl font-bold text-gray-800">${(stats.totalInventoryValue || 284000).toLocaleString()}</h3>
             <p className="text-gray-500 text-sm font-medium mt-1">Total Inventory Value</p>
             <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full mt-3 flex items-center">
               <TrendingUp size={12} className="mr-1" /> 8.1% vs last month
             </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
