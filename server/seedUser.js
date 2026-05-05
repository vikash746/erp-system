const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: 'vikashsinghvks2003@gmail.com' });
    if (!existing) {
      await User.create({
        name: 'Vikash Singh',
        email: 'vikashsinghvks2003@gmail.com',
        password: 'password123', // From authController this gets hashed automatically in User.js pre-save hook
        role: 'Admin'
      });
      console.log('Successfully created admin user: vikashsinghvks2003@gmail.com / password123');
    } else {
      console.log('User already exists');
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

seedUser();
