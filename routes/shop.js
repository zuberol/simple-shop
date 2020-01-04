const express = require('express');

const router = express.Router();

const productsController = require('./../controllers/client');

router.get('/', productsController.getProductsList);

router.get('/cart', productsController.getCartList);

// product details => GET
router.get('/products', productsController.getProductDetails);

// add-to-cart => POST
router.post('/add-to-cart', productsController.addToCart);

// delete-from-cart => POST
router.post('/delete-from-cart', productsController.deleteFromCart);

module.exports = router;
