"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  var authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  var token = authHeader.split(' ')[1];

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};
//# sourceMappingURL=authMiddleware.dev.js.map
