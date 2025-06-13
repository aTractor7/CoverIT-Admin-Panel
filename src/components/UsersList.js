import React from 'react';
import { Colors } from '../theme/colors';

const UsersList = ({ users, onUserSelect }) => {
  return (
    <div style={styles.list}>
      {users.map((user) => (
        <div key={user.id} style={styles.userItem} onClick={() => onUserSelect(user.id)}>
          {user.username} ({user.email})
        </div>
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: Colors.WHITE,
    padding: '20px',
    borderRadius: '8px',
  },
  userItem: {
    cursor: 'pointer',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    color: Colors.DARKER_2,
  },
};

export default UsersList;
