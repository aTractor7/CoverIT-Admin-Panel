import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Colors } from '../theme/colors';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(username, password);
      await onLoginSuccess();
      navigate('/');
    } catch (err) {
      setError('Wrong username or password');
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CoverIT</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        
        {error && <p style={styles.error}>{error}</p>}
        
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    minWidth: '300px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: Colors.WHITE,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: Colors.DARKER_3,
    textAlign: 'center',
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: Colors.DARKER_1,
    fontSize: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #255E69',
    backgroundColor: 'white',
    color: '#255E69',
    fontSize: '16px',
    height: '25px',
  },
  button: {
    backgroundColor: Colors.DARKER_2,
    color: Colors.DARKEST,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '48px',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: '10px 0',
  },
};

export default LoginForm;