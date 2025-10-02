const express = require('express');
const router = express.Router();
const { getServicesByCategory } = require('../controllers/ServiceController');

router.get('/category/:categoryId', getServicesByCategory);

module.exports = router;