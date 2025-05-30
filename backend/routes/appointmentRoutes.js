const Appointment = require('../models/appointment');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const { bookAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookAppointment); // Book appointment

module.exports = router;


exports.bookAppointment = async (req, res) => {
  const { doctorId, date } = req.body;
  const patientId = req.user.id;

  if (!doctorId || !date) {
    return res.status(400).json({ message: 'Doctor ID and date are required' });
  }

  try {
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      date: new Date(date),
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
const { bookAppointment, cancelAppointment } = require('../controllers/appointmentController');

router.delete('/:id', authMiddleware, cancelAppointment);
const { getAppointments } = require('../controllers/appointmentController');

router.get('/', authMiddleware, getAppointments); // Get user’s appointments
router.get('/doctors', authMiddleware, async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});