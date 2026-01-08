import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

function Navbar({ tokenExpiry }) {
  const navigate = useNavigate();

  function handleLogout() {
    // Clear token from localStorage
    removeToken();
    
    // Redirect to login page
    navigate('/login');
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h2 style={styles.title}>Dashboard</h2>
        <div style={styles.actions}>
          {tokenExpiry > 0 && tokenExpiry <= 5 && (
            <span style={styles.warning}>
              ⚠️ Session expiring soon!
            </span>
          )}
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#007bff',
    padding: '15px 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '20px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  warning: {
    color: '#fff3cd',
    fontSize: '14px',
    fontWeight: '600',
  },
  logoutButton: {
    padding: '8px 20px',
    backgroundColor: 'white',
    color: '#007bff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Navbar;
