import React, { useState } from 'react';
import { Colors } from '../theme/colors';
import { updateUserRole } from '../services/usersService';

const UserDetailsForm = ({ user, onUserUpdate }) => {
  const [editedRole, setEditedRole] = useState(user.role);
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');

  const handleRoleChange = (e) => setEditedRole(e.target.value);

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUserRole(user.id, { ...user, role: editedRole });
      onUserUpdate(updatedUser);
      setUpdateSuccess('Користувача успішно змінено');
      setUpdateError('');
    } catch (err) {
      setUpdateError(err.message);
      setUpdateSuccess('');
    }
  };

  const handleBanUser = async () => {
    try {
      const updatedUser = await updateUserRole(user.id, { ...user, role: 'BANNED' });
      onUserUpdate(updatedUser);
      setUpdateSuccess('Користувача заблоковано');
      setUpdateError('');
    } catch (err) {
      setUpdateError(err.message);
      setUpdateSuccess('');
    }
  };

  return (
    <div style={styles.details}>
      <h2 style={styles.subTitle}>Дані користувача</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Ім'я користувача:</strong> {user.username}</p>
      <p><strong>Пошта:</strong> {user.email}</p>

      <label style={styles.label}>
        Роль:
        <select value={editedRole} onChange={handleRoleChange} style={styles.input}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </label>

      <button onClick={handleUpdateUser} style={{ ...styles.button, marginTop: '10px' }}>
        Оновити роль
      </button>
      <br/>
      <button onClick={handleBanUser} style={{ ...styles.banButton, marginTop: '25px' }}>
        Заблокувати користувача
      </button>

      {updateSuccess && <p style={{ color: 'green' }}>{updateSuccess}</p>}
      {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
    </div>
  );
};

const styles = {
  details: {
    marginTop: '30px',
    backgroundColor: Colors.WHITE,
    padding: '20px',
    borderRadius: '8px',
  },
  subTitle: {
    fontSize: '24px',
    marginBottom: '10px',
    color: Colors.DARKER_2,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    color: Colors.DARKER_1,
    fontWeight: 'bold',
    marginTop: '15px',
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
  banButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '42px',
  },
};

export default UserDetailsForm;
