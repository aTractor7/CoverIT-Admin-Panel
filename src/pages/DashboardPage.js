import React from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../theme/colors';

const DashboardPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Панель адміністора</h1>

      <div style={styles.linksContainer}>
        <Link to="/add-chord" style={styles.textLink}>
          Додати акорд
        </Link>
        <Link to="/fingerings" style={styles.textLink}>
          Аплікатури
        </Link>
        <Link to="/users" style={styles.textLink}>
          Користувачі
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: Colors.BASE,
    minHeight: '100vh',
  },
  title: {
    color: Colors.DARKER_3,
    fontSize: '36px',
    marginBottom: '30px',
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  textLink: {
    color: Colors.DARKER_2,
    textDecoration: 'underline',
    fontSize: '25px',
    cursor: 'pointer',
  },
};

export default DashboardPage;
