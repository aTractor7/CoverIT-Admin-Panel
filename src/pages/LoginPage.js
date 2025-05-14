import React from 'react';
import LoginForm from '../components/LoginForm';
import { Colors } from '../theme/colors';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.BASE,
      padding: '20px'
    }}>
      <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
  );
};

export default LoginPage;