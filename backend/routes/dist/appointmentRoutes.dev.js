"use strict";

var Appointment = require('../models/appointment');

var User = require('../models/user');

var express = require('express');

var router = express.Router();

var _require = require('../controllers/appointmentController'),
    bookAppointment = _require.bookAppointment;

var authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookAppointment); // Book appointment

module.exports = router;

exports.bookAppointment = function _callee(req, res) {
  var _req$body, doctorId, date, patientId, doctor, appointment;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, doctorId = _req$body.doctorId, date = _req$body.date;
          patientId = req.user.id;

          if (!(!doctorId || !date)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Doctor ID and date are required'
          }));

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findById(doctorId));

        case 7:
          doctor = _context.sent;

          if (!(!doctor || doctor.role !== 'doctor')) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Doctor not found'
          }));

        case 10:
          appointment = new Appointment({
            patientId: patientId,
            doctorId: doctorId,
            date: new Date(date)
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(appointment.save());

        case 13:
          res.status(201).json({
            message: 'Appointment booked successfully',
            appointment: appointment
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          res.status(500).json({
            message: 'Server error',
            error: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 16]]);
};
//# sourceMappingURL=appointmentRoutes.dev.js.map
