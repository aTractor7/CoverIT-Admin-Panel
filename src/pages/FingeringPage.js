import React from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../theme/colors';
import ChordFingeringUploadForm from '../components/ChordFingeringUploadForm';

const FingeringPage = () => {
  return (
    <div style={styles.container}>
      <Link to="/" style={styles.homeLink}>
        ← До панелі
      </Link>
      <h1 style={styles.title}>Завантаження зображення аплікатури</h1>
      <ChordFingeringUploadForm />
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: Colors.BASE,
    minHeight: '100vh',
  },
  homeLink: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: Colors.DARKER_2,
    fontWeight: 'bold',
    fontSize: '25px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: Colors.DARKER_3,
  },
};

export default FingeringPage;
