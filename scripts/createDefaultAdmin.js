const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Default admin credentials
const defaultAdmin = {
  email: 'admin@abujadettydecember.com',
  password: 'admin123',
  name: 'Admin User',
  role: 'admin'
};

async function createDefaultAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/abuja-detty-december');

    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: defaultAdmin.email });
    
    if (existingAdmin) {
      console.log('⚠️  Default admin already exists');
      console.log(`   Email: ${defaultAdmin.email}`);
      console.log('   Login with existing credentials');
    } else {
      // Create new admin user
      const admin = await User.create(defaultAdmin);
      console.log('✅ Default admin created successfully!');
      console.log('==========================================');
      console.log('Admin Credentials:');
      console.log(`   Email: ${defaultAdmin.email}`);
      console.log(`   Password: ${defaultAdmin.password}`);
      console.log('==========================================');
      console.log('⚠️  Please change the password after first login!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
    process.exit(1);
  }
}

// Run the script
createDefaultAdmin();
