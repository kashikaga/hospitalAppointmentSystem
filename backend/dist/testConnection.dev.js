"use strict";

var mongoose = require('mongoose');

require('dotenv').config();

var testConnection = function testConnection() {
  return regeneratorRuntime.async(function testConnection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          console.log('✅ MongoDB connected successfully!');
          process.exit(0);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('❌ MongoDB connection failed:', _context.t0.message);
          process.exit(1);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

testConnection();
//# sourceMappingURL=testConnection.dev.js.map
