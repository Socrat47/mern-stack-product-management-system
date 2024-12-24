const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../controller/products.js')

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct)
router.post('/create-product', createProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct)

module.exports = router;