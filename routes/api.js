var express = require('express');
var router = express.Router();
var productsRouter = require('./products');

router.use('/products', productsRouter);

module.exports = router;