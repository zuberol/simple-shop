const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const isAuthenticated = require('./../Middleware/isAuthenticated');
const isAuthorized = require('./../Middleware/isAuthorized');


// /admin/add-product => GET
router.get('/add-product', isAuthenticated, isAuthorized, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuthenticated, isAuthorized, adminController.postProducts);

// /admin/products => GET
router.get('/products', isAuthenticated, isAuthorized, adminController.getAdminProducts);

// /admin/edit-product => GET
router.get('/edit-product', isAuthenticated, isAuthorized, adminController.editProduct);

// /admin/edit-product => POST
router.post('/edit-product', isAuthenticated, isAuthorized, adminController.postEditedProduct);

// /admin/delete-product => POST
router.post('/delete-product', isAuthenticated, isAuthorized, adminController.deleteProduct);

module.exports = router;