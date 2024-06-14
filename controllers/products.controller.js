const mongoose = require('mongoose');
const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    // Get the name from the URL
    const queryString = req.url.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    const urlName = urlParams.get('name');

    // If urlName is present, search by name
    if (urlName) {
      const query = { name: { $regex: new RegExp(urlName, 'i') } };
      const products = await Product.find(query);
      if (products.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(products);
    }
    // If urlName is not present, retrieve all products
    else {
      const products = await Product.find();
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let idType;

    if (mongoose.Types.ObjectId.isValid(id)){
      idType = 'objectId'
    }else{
      idType = 'productId'
    }

    // Check if the input is a valid ObjectId
    if (idType === 'objectId') {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    }

    // If the input is not a valid ObjectId, search by product_id
    if(idType === 'productId'){
      const product = await Product.findOne({ product_id: id });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.product_id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.product_id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

