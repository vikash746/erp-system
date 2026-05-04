const Vendor = require('../models/Vendor');

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({});
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new vendor
// @route   POST /api/vendors
// @access  Private
const createVendor = async (req, res) => {
  try {
    const { name, contactPerson, email, phone, address, category } = req.body;
    
    const vendorExists = await Vendor.findOne({ name });
    if (vendorExists) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const vendor = new Vendor({
      name, contactPerson, email, phone, address, category
    });

    const createdVendor = await vendor.save();
    res.status(201).json(createdVendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update vendor
// @route   PUT /api/vendors/:id
// @access  Private
const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
      vendor.name = req.body.name || vendor.name;
      vendor.contactPerson = req.body.contactPerson || vendor.contactPerson;
      vendor.email = req.body.email || vendor.email;
      vendor.phone = req.body.phone || vendor.phone;
      vendor.address = req.body.address || vendor.address;
      vendor.category = req.body.category || vendor.category;
      vendor.status = req.body.status || vendor.status;

      const updatedVendor = await vendor.save();
      res.json(updatedVendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete vendor
// @route   DELETE /api/vendors/:id
// @access  Private
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
      await vendor.deleteOne();
      res.json({ message: 'Vendor removed' });
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVendors, createVendor, updateVendor, deleteVendor };
