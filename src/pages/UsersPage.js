import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../theme/colors';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortField, setSortField] = useState('');
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page, size, sortField, searchUsername]);

  const fetchUsers = async () => {
    setError('');
    setSelectedUser(null);
    try {
      const queryParams = new URLSearchParams({
        page,
        size,
        ...(sortField ? { sortField } : {}),
        ...(searchUsername ? { username: searchUsername } : {})
      });

      const response = await fetch(`http://localhost:8080/users?${queryParams.toString()}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUserDetails = async (id) => {
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to fetch user');
      }

      const data = await response.json();
      setSelectedUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = () => {
    setSearchUsername(username);
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
            onClick={() => fetchUserDetails(user.id)}
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
          {/* Add other fields here if needed */}
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
