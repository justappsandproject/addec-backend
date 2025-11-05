const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'Please provide vendor']
  },
  vendorName: {
    type: String,
    required: [true, 'Please provide vendor name']
  },
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide product category']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price']
  },
  originalPrice: {
    type: Number
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  deliveryTime: {
    type: String,
    default: '2-3 days'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);










