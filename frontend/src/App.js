import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from './contexts/authContext';

import Login from './components/auth/login';
import Register from './components/auth/register';
import UserList from './components/users/userList';
import BookAppointment from './components/appointments/bookAppointment';
import ViewAppointments from './components/appointments/viewAppointments';

const PrivateRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          } />
          <Route path="/book" element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          } />
          <Route path="/appointments" element={
            <PrivateRoute>
              <ViewAppointments />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
