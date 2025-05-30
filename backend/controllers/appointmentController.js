const Appointment = require('../models/appointment');
const User = require('../models/user');

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
exports.cancelAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const userId = req.user.id;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ensure only the patient or doctor involved can cancel
    if (
      appointment.patientId.toString() !== userId &&
      appointment.doctorId.toString() !== userId
    ) {
      return res.status(403).json({ message: 'Unauthorized to cancel this appointment' });
    }

    await Appointment.findByIdAndDelete(appointmentId);

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.getAppointments = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let filter = {};

    if (userRole === 'patient') {
      filter.patientId = userId;
    } else if (userRole === 'doctor') {
      filter.doctorId = userId;
    }

    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name email')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
