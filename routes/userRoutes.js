const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { syncFirebaseUser } = require('../controllers/UserController');

router.post('/sync', auth, syncFirebaseUser);


module.exports = router;