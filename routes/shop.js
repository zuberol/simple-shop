const express = require('express');

const router = express.Router();

const productsController = require('./../controllers/client');

router.get('/', productsController.getProductsList);

module.exports = router;
