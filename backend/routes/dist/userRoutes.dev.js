"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/userController'),
    getUsersByRole = _require.getUsersByRole;

var authMiddleware = require('../middleware/authMiddleware'); // GET /api/users?role=doctor OR ?role=patient


router.get('/', authMiddleware, getUsersByRole);
module.exports = router;
//# sourceMappingURL=userRoutes.dev.js.map
