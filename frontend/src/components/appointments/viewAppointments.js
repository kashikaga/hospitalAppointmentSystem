import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments');
        setAppointments(res.data);
      } catch (err) {
        setError('Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  return (
    <div>
      <h2>My Appointments</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {appointments.map(app => (
          <li key={app._id}>
            Doctor: {app.doctor?.name || 'N/A'} <br />
            Date: {app.date} | Time: {app.time}
            <button onClick={() => cancelAppointment(app._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAppointments;
