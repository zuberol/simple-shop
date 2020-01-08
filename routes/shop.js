const express = require('express');

const router = express.Router();

const productsController = require('./../controllers/client');

const isAuth = require('./../Middleware/isAuthenticated')

router.get('/', productsController.getProductsList);

router.get('/cart', isAuth, productsController.getCartList);

// product details => GET
router.get('/products', productsController.getProductDetails);

// add-to-cart => POST
router.post('/add-to-cart', isAuth, productsController.addToCart);

// delete-from-cart => POST
router.post('/delete-from-cart', isAuth, productsController.deleteFromCart);

module.exports = router;
