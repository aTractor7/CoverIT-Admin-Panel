import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../theme/colors';
import { fetchUsers, fetchUserDetails, updateUserRole } from '../services/usersService';
import UsersList from '../components/UsersList';
import UserDetailsForm from '../components/UserDetailsForm';
import UsersSearchControls from '../components/UsersSearchControls';

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
    loadUsers();
  }, [page, size, sortField, searchUsername]);

  const loadUsers = async () => {
    setError('');
    setSelectedUser(null);
    try {
      const data = await fetchUsers({ page, size, sortField, username: searchUsername });
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadUserDetails = async (id) => {
    try {
      const data = await fetchUserDetails(id);
      setSelectedUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.homeLink}>← До панелі</Link>
      <h1 style={styles.title}>Керування користувачами</h1>

      <UsersSearchControls
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
        sortField={sortField}
        setSortField={setSortField}
        username={username}
        setUsername={setUsername}
        onSearch={() => setSearchUsername(username)}
      />

      {error && <p style={styles.error}>Error: {error}</p>}

      <UsersList users={users} onUserSelect={loadUserDetails} />

      {selectedUser && (
        <UserDetailsForm
          user={selectedUser}
          onUserUpdate={(updated) => setSelectedUser(updated)}
        />
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
  error: {
    color: 'red',
    marginBottom: '20px',
  },
};

export default UsersPage;
