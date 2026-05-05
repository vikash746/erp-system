import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { FileText, Plus, Search, Filter, X, Trash2 } from 'lucide-react';

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    vendor: '',
    expectedDelivery: '',
    items: [{ productName: '', quantity: 1, unitPrice: 0, total: 0 }]
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, vendorsRes] = await Promise.all([
          api.get('/orders'),
          api.get('/vendors')
        ]);
        setOrders(ordersRes.data);
        setVendors(vendorsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Sent': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = Number(newItems[index].quantity) * Number(newItems[index].unitPrice);
    }
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productName: '', quantity: 1, unitPrice: 0, total: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    if (!formData.vendor) {
      alert("Please select a vendor.");
      return;
    }
    if (formData.items.length === 0 || formData.items.some(item => !item.productName)) {
      alert("Please add at least one valid item.");
      return;
    }

    try {
      await api.post('/orders', formData);
      // Re-fetch to get populated vendor details
      const { data } = await api.get('/orders');
      setOrders(data);
      setIsModalOpen(false);
      setFormData({ vendor: '', expectedDelivery: '', items: [{ productName: '', quantity: 1, unitPrice: 0, total: 0 }] });
    } catch (error) {
      console.error("Error creating order", error);
      alert('Failed to create order.');
    }
  };

  const grandTotal = formData.items.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Purchase Orders</h1>
          <p className="text-sm text-gray-500">Manage and track your supplier orders</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1e8449] hover:bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
        >
          <Plus size={16} className="mr-2" /> New PO
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
           <div className="flex gap-4">
             <div className="relative">
               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
               <input type="text" placeholder="Search PO number..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent w-64 bg-white" />
             </div>
             <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
               <Filter size={16} className="mr-2" /> Filter
             </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50/50">
                <th className="py-4 px-6">PO Number</th>
                <th className="py-4 px-6">Vendor</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="text-sm hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center font-medium text-gray-800">
                      <FileText size={16} className="mr-2 text-brand-accent" />
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{order.vendor?.name || 'Unknown Vendor'}</td>
                  <td className="py-4 px-6 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 font-semibold text-gray-800 text-right">${order.totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-brand-accent hover:text-brand-dark font-medium text-xs border border-brand-accent/30 hover:border-brand-dark px-3 py-1.5 rounded bg-brand-accent/5">View Details</button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500">
                    No purchase orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Create Purchase Order</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddOrder} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                  <select 
                    required 
                    value={formData.vendor} 
                    onChange={(e) => setFormData({...formData, vendor: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e8449]"
                  >
                    <option value="">Select a vendor...</option>
                    {vendors.map(v => (
                      <option key={v._id} value={v._id}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.expectedDelivery} 
                    onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e8449]" 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Order Items</label>
                  <button type="button" onClick={addItem} className="text-[#1e8449] hover:text-[#166534] text-sm font-medium flex items-center">
                    <Plus size={14} className="mr-1" /> Add Item
                  </button>
                </div>
                
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input 
                          type="text" 
                          required 
                          placeholder="Product Name" 
                          value={item.productName} 
                          onChange={(e) => handleItemChange(index, 'productName', e.target.value)} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e8449]" 
                        />
                      </div>
                      <div className="w-24">
                        <input 
                          type="number" 
                          required 
                          min="1" 
                          placeholder="Qty" 
                          value={item.quantity} 
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e8449]" 
                        />
                      </div>
                      <div className="w-32">
                        <input 
                          type="number" 
                          required 
                          min="0" 
                          step="0.01" 
                          placeholder="Price" 
                          value={item.unitPrice} 
                          onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e8449]" 
                        />
                      </div>
                      <div className="w-24 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-right">
                        ${item.total.toFixed(2)}
                      </div>
                      {formData.items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg mt-0.5">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <div className="flex justify-end pt-3 border-t border-gray-200 mt-3">
                    <span className="font-medium text-gray-700 mr-4">Total Amount:</span>
                    <span className="font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#1e8449] hover:bg-[#166534] text-white rounded-lg text-sm font-medium transition-colors">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;
