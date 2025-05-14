import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../theme/colors';
import { fetchUsers, fetchUserDetails, updateUser, updateUserRole } from '../services/usersService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortField, setSortField] = useState('');
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');


  useEffect(() => {
    loadUsers();
  }, [page, size, sortField, searchUsername]);

  const loadUsers = async () => {
    setError('');
    setSelectedUser(null);
    try {
        const data = await fetchUsers({ 
            page, 
            size, 
            sortField, 
            username: searchUsername 
          });

        setUsers(data);
    } catch (err) {
        setError(err.message);
    }
  };

  const loadUserDetails  = async (id) => {
    setError('');
    setUpdateError('');
    setUpdateSuccess('');
    try {
      const data = await fetchUserDetails(id); 
      setSelectedUser(data);
      setEditedRole(data.role);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = () => {
    setSearchUsername(username);
  };

  const handleRoleChange = (e) => {
    setEditedRole(e.target.value);
  };

  const handleUpdateUser = async () => {
    setUpdateError('');
    setUpdateSuccess('');
    try {
      const updatedData = {
        ...selectedUser,
        role: editedRole,
      };
  
      const updatedUser = await updateUserRole(selectedUser.id, updatedData);
      setSelectedUser(updatedUser);
      setUpdateSuccess('User updated successfully');
    } catch (err) {
      setUpdateError(err.message);
    }
  };

  return (
    <div style={styles.container}>
        <Link to="/" style={styles.homeLink}>
        ← Back to panel
        </Link>
      <h1 style={styles.title}>User Management</h1>

      <div style={styles.controls}>
        <label style={styles.label}>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Size:
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Sort by:
          <input
            type="text"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            placeholder="e.g. username"
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Search by username"
            style={styles.input}
          />
        </label>
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {error && <p style={styles.error}>Error: {error}</p>}

      <div style={styles.list}>
        {users.map((user) => (
          <div
            key={user.id}
            style={styles.userItem}
            onClick={() => loadUserDetails(user.id)}
          >
            {user.username} ({user.email})
          </div>
        ))}
      </div>

      {selectedUser && (
        <div style={styles.details}>
          <h2 style={styles.subTitle}>User Details</h2>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <div style={{ marginTop: '20px' }}>
            <label style={styles.label}>
              Role:
              <select value={editedRole} onChange={handleRoleChange} style={styles.input}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </label>
            <button onClick={handleUpdateUser} style={{ ...styles.button, marginTop: '10px' }}>
              Update Role
            </button>
            {updateSuccess && <p style={{ color: 'green' }}>{updateSuccess}</p>}
            {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
          </div>
        </div>
      )}
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
    color: Colors.DARKER_3,
    fontSize: '32px',
    marginBottom: '20px',
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px',
    alignItems: 'flex-end'
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
  error: {
    color: 'red',
    marginBottom: '20px',
  },
};

export default UsersPage;
