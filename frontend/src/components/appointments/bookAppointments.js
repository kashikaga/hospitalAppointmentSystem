import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
const BookAppointment = () => {
const [form, setForm] = useState({ doctorId: '', date: '', time: '' });
const [message, setMessage] = useState('');
const navigate = useNavigate();

const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

const onSubmit = async e => {
e.preventDefault();
try {
await api.post('/appointments', form);
setMessage('Appointment booked successfully!');
setTimeout(() => navigate('/appointments'), 2000);
} catch (err) {
setMessage('Failed to book appointment');
}
};

return (
<div>
<h2>Book Appointment</h2>
<form onSubmit={onSubmit}>
<input name="doctorId" placeholder="Doctor ID" onChange={onChange} required />
<br />
<input name="date" type="date" onChange={onChange} required />
<br />
<input name="time" type="time" onChange={onChange} required />
<br />
<button type="submit">Book</button>
</form>
<p>{message}</p>
</div>
);
};
