const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')


// /admin/add-product => GET
router.get('/add-product', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postProducts);

// /admin/products => GET
router.get('/products', adminController.getAdminProducts);

module.exports = router;