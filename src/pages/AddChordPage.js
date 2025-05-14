import React from 'react';
import AddChordForm from '../components/AddChordForm';
import { Link } from 'react-router-dom';
import { Colors } from '../theme/colors';

const AddChordPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: Colors.BASE,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <Link to="/" style={styles.homeLink}>← Back to panel</Link>
      <AddChordForm />
    </div>
  );
};

export default AddChordPage;

const styles = {
    homeLink: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: Colors.DARKER_2,
      fontWeight: 'bold',
      fontSize: '25px',
    },
  };
