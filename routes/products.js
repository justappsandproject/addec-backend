const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/vendorOrAdminAuth');

// Public route to get all products
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes - can be accessed by admin or vendor
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
