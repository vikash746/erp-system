const PurchaseOrder = require('../models/PurchaseOrder');

// @desc    Get all purchase orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find({}).populate('vendor', 'name email').populate('createdBy', 'name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new purchase order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { vendor, items, expectedDelivery } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

    const order = new PurchaseOrder({
      vendor,
      items,
      totalAmount,
      createdBy: req.user._id,
      expectedDelivery
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);

    if (order) {
      await order.deleteOne();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOrders, createOrder, updateOrderStatus, deleteOrder };
