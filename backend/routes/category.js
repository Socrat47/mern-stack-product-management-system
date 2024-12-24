const express = require('express');
const deneme = require('../controller/category.js');

const router = express.Router();

router.post('/create-category', deneme);

module.exports = router;