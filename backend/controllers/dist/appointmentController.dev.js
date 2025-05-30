"use strict";

var Appointment = require('../models/appointment');

var User = require('../models/user');

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

exports.cancelAppointment = function _callee2(req, res) {
  var appointmentId, userId, appointment;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          appointmentId = req.params.id;
          userId = req.user.id;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Appointment.findById(appointmentId));

        case 5:
          appointment = _context2.sent;

          if (appointment) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Appointment not found'
          }));

        case 8:
          if (!(appointment.patientId.toString() !== userId && appointment.doctorId.toString() !== userId)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(403).json({
            message: 'Unauthorized to cancel this appointment'
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(Appointment.findByIdAndDelete(appointmentId));

        case 12:
          res.json({
            message: 'Appointment cancelled successfully'
          });
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](2);
          res.status(500).json({
            message: 'Server error',
            error: _context2.t0.message
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 15]]);
};

exports.getAppointments = function _callee3(req, res) {
  var userId, userRole, filter, appointments;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.user.id;
          userRole = req.user.role;
          _context3.prev = 2;
          filter = {};

          if (userRole === 'patient') {
            filter.patientId = userId;
          } else if (userRole === 'doctor') {
            filter.doctorId = userId;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(Appointment.find(filter).populate('patientId', 'name email').populate('doctorId', 'name email').sort({
            date: 1
          }));

        case 7:
          appointments = _context3.sent;
          res.json(appointments);
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          res.status(500).json({
            message: 'Server error',
            error: _context3.t0.message
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 11]]);
};
//# sourceMappingURL=appointmentController.dev.js.map
