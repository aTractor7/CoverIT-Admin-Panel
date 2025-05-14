import React, { useState } from 'react';
import { Colors } from '../theme/colors';
import { addChord } from '../services/chordsService';

const AddChordForm = () => {
  const [chordName, setChordName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
        await addChord(chordName);
        setSuccessMessage('Chord added successfully!');
        setChordName('');
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false)
      }
      
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add new chord</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="chordName" style={styles.label}>Chord name</label>
          <input
            id="chordName"
            type="text"
            value={chordName}
            onChange={(e) => setChordName(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {successMessage && <p style={styles.success}>{successMessage}</p>}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add chord'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: Colors.WHITE,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: Colors.DARKER_3,
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '24px',
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
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default AddChordForm;
