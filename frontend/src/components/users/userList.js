import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [role, setRole] = useState('doctor');  // toggle to patient or doctor
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setError('');
      try {
        const res = await api.get(`/users?role=${role}`);
        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [role]);

  return (
    <div>
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} List</h2>
      <select onChange={e => setRole(e.target.value)} value={role}>
        <option value="doctor">Doctors</option>
        <option value="patient">Patients</option>
      </select>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            {role === 'doctor' && <Link to="/book"> - Book Appointment</Link>}
          </li>
        ))}
      </ul>
      <Link to="/appointments">View My Appointments</Link>
    </div>
  );
};

export default UserList;
