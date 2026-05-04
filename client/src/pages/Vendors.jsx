import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Phone, Mail, MapPin } from 'lucide-react';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/vendors', config);
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors", error);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vendors</h1>
          <p className="text-sm text-gray-500">Manage your supplier network ({vendors.length} active vendors)</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
            <input type="text" placeholder="Search vendors..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent w-64 shadow-sm" />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <button className="bg-[#1e8449] hover:bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            + Add Vendor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vendors.map(vendor => (
          <div key={vendor._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                {vendor.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 leading-tight">{vendor.name}</h3>
                <p className="text-xs text-gray-500">{vendor.category}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-6 flex-1">
              <div className="flex items-center text-sm text-gray-600">
                <User size={14} className="mr-2 text-gray-400" /> {vendor.contactPerson}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={14} className="mr-2 text-gray-400" /> {vendor.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={14} className="mr-2 text-gray-400" /> {vendor.email}
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin size={14} className="mr-2 text-gray-400 mt-0.5" /> <span className="flex-1">{vendor.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${vendor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                • {vendor.status}
              </span>
              <div className="flex gap-2">
                <button className="text-xs font-medium text-gray-600 hover:text-brand-dark px-2 py-1 border border-gray-200 rounded">Edit</button>
                <button className="text-xs font-medium text-white bg-brand-dark hover:bg-[#1e5c3a] px-2 py-1 rounded">New PO</button>
              </div>
            </div>
          </div>
        ))}
        {vendors.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No vendors found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
