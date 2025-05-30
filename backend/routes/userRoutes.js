const express = require('express');
const router = express.Router();
const { getUsersByRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/users?role=doctor OR ?role=patient
router.get('/', authMiddleware, getUsersByRole);

module.exports = router;
