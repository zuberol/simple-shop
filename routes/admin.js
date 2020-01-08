const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')

const isAuth = require('./../Middleware/isAuthenticated')


// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postProducts);

// /admin/products => GET
router.get('/products', isAuth, adminController.getAdminProducts);

module.exports = router;