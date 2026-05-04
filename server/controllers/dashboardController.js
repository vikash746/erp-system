const PurchaseOrder = require('../models/PurchaseOrder');
const Vendor = require('../models/Vendor');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await PurchaseOrder.countDocuments();
    const pendingOrders = await PurchaseOrder.countDocuments({ status: 'Pending' });
    const approvedOrders = await PurchaseOrder.countDocuments({ status: 'Approved' });
    const activeVendors = await Vendor.countDocuments({ status: 'Active' });
    
    // Calculate total inventory value (mock calculation for dashboard based on POs)
    const orders = await PurchaseOrder.find();
    const totalInventoryValue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    res.json({
      totalOrders,
      pendingOrders,
      approvedOrders,
      activeVendors,
      totalInventoryValue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
