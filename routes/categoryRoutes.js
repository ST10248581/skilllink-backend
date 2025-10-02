const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/CategoryController');

// Optional: protect with auth middleware if needed
// const auth = require('../middleware/authMiddleware');
// router.get('/', auth, getAllCategories);

router.get('/', getAllCategories);

module.exports = router;