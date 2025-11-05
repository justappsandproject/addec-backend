const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads
app.use('/uploads', express.static('uploads'));

// Import routes
const authRoutes = require('./routes/auth');
const vendorAuthRoutes = require('./routes/vendorAuth');
const eventRoutes = require('./routes/events');
const contestRoutes = require('./routes/contests');
const sponsorRoutes = require('./routes/sponsors');
const newsRoutes = require('./routes/news');
const testimonialRoutes = require('./routes/testimonials');
const galleryRoutes = require('./routes/gallery');
const faqRoutes = require('./routes/faq');
const volunteerRoutes = require('./routes/volunteer');
const vendorRoutes = require('./routes/vendors');
const productRoutes = require('./routes/products');
const pageRoutes = require('./routes/pages');
const mediaRoutes = require('./routes/media');

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/abuja-detty-december')
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendor-auth', vendorAuthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/media', mediaRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Abuja Detty December API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
