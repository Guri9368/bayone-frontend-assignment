import { useState, useEffect } from 'react';
import { externalApi } from '../services/api';
import Navbar from '../components/Navbar';
import { getRemainingTime } from '../utils/auth';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState(0);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
    updateTokenExpiry();
    
    // Update token expiry every minute
    const interval = setInterval(() => {
      updateTokenExpiry();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  function updateTokenExpiry() {
    const remaining = getRemainingTime();
    setTokenExpiry(remaining);
  }

  async function fetchUsers() {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Fetch users from JSONPlaceholder API using environment config
      const response = await externalApi.get('/users');
      setUsers(response.data);
      
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setErrorMessage('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleRetry() {
    fetchUsers();
  }

  return (
    <div>
      <Navbar tokenExpiry={tokenExpiry} />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.heading}>User List</h1>
          {tokenExpiry > 0 && (
            <p style={styles.expiryInfo}>
              Session expires in: <strong>{tokenExpiry} min</strong>
            </p>
          )}
        </div>

        {/* Show loading spinner */}
        {isLoading && (
          <div style={styles.loader}>
            <p>Loading users...</p>
          </div>
        )}

        {/* Show error message with retry button */}
        {errorMessage && !isLoading && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{errorMessage}</p>
            <button onClick={handleRetry} style={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {/* Show users list */}
        {!isLoading && !errorMessage && users.length > 0 && (
          <div style={styles.userList}>
            {users.map((user) => (
              <div key={user.id} style={styles.userCard}>
                <h3 style={styles.userName}>{user.name}</h3>
                <p style={styles.userEmail}>{user.email}</p>
                <p style={styles.userPhone}>📞 {user.phone}</p>
                <p style={styles.userCompany}>🏢 {user.company.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  heading: {
    fontSize: '28px',
    color: '#333',
  },
  expiryInfo: {
    fontSize: '14px',
    color: '#666',
    backgroundColor: '#fff3cd',
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #ffc107',
  },
  loader: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px',
  },
  errorText: {
    color: '#c62828',
    fontSize: '16px',
    marginBottom: '20px',
  },
  retryButton: {
    padding: '10px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  userList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  userCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s',
  },
  userName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '4px',
  },
  userPhone: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '4px',
  },
  userCompany: {
    fontSize: '14px',
    color: '#999',
  },
};

export default Dashboard;
