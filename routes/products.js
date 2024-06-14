var express = require('express');
var router = express.Router();
var productsController = require('../controllers/products.controller')

router
  .get('/', productsController.getProducts)
  .get('/:id', productsController.getProductById)
  .post('/', productsController.createProduct)
  .put('/:id', productsController.updateProduct)
  .delete('/', productsController.deleteProducts)
  .delete('/:id', productsController.deleteProduct)
  .get('/:id', productsController.getProductByIdWithName);

module.exports = router;
