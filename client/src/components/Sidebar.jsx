import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, LogOut, Bell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Vendors', path: '/vendors', icon: <Users size={20} /> },
    { name: 'Purchase Orders', path: '/orders', icon: <ShoppingCart size={20} /> }
  ];

  return (
    <div className="w-64 bg-[#0f3a24] text-white flex flex-col h-screen overflow-y-auto">
      <div className="p-6 flex items-center gap-3 border-b border-[#1e5c3a]">
        <div className="bg-white p-2 rounded-lg">
          <ShoppingCart className="text-[#0f3a24]" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">GroceryERP</h1>
          <span className="text-xs text-gray-300">Wholesale Management</span>
        </div>
      </div>

      <div className="flex-1 py-6">
        <div className="px-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-[#1e5c3a] text-white font-medium' : 'text-gray-300 hover:bg-[#1e5c3a]/50 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          <NavLink
             to="/alerts"
             className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-[#1e5c3a]/50 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Bell size={20} />
              Alerts
            </div>
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">7</span>
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-[#1e5c3a]">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1e8449] flex items-center justify-center font-bold text-sm">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
