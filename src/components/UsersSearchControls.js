import React from 'react';
import { Colors } from '../theme/colors';

const UsersSearchControls = ({
  page, setPage,
  size, setSize,
  sortField, setSortField,
  username, setUsername,
  onSearch
}) => {
  return (
    <div style={styles.controls}>
      <label style={styles.label}>Сторінка:
        <input type="number" value={page} onChange={(e) => setPage(Number(e.target.value))} style={styles.input} />
      </label>
      <label style={styles.label}>Кількість елементів:
        <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} style={styles.input} />
      </label>
      <label style={styles.label}>Сортувати за:
        <input type="text" value={sortField} onChange={(e) => setSortField(e.target.value)} placeholder="наприклад, username" style={styles.input} />
      </label>
      <label style={styles.label}>Ім'я користувача:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Пошук за ім'ям" style={styles.input} />
      </label>
      <button onClick={onSearch} style={styles.button}>Пошук</button>
    </div>
  );
};

const styles = {
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px',
    alignItems: 'flex-end',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    color: Colors.DARKER_1,
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    backgroundColor: Colors.DARKER_2,
    color: Colors.DARKEST,
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '42px',
  },
};

export default UsersSearchControls;
