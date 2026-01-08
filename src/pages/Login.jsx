import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setToken } from '../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Try to login with ReqRes API
      const response = await api.post('/login', {
        email: email,
        password: password,
      });

      const token = response.data.token;
      
      // Store token with expiry in localStorage
      setToken(token);
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
      
    } catch (error) {
      // If API fails, fallback to mock authentication
      console.log('API login failed, using mock auth');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock validation
      if (email && password) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        setToken(mockToken);
        navigate('/dashboard');
      } else {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error || 'Login failed');
        } else {
          setErrorMessage('Please check your email and password');
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eve.holt@reqres.in"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={styles.input}
            />
          </div>

          {errorMessage && (
            <div style={styles.error}>
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.hint}>
          Try: <strong>eve.holt@reqres.in</strong> with any password
          <br />
          Or use any email/password for demo
        </p>
      </div>
    </div>
  );
}

// Simple inline styles for clean UI
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    padding: '12px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
    fontSize: '14px',
  },
  hint: {
    marginTop: '20px',
    fontSize: '13px',
    color: '#666',
    textAlign: 'center',
    lineHeight: '1.6',
  },
};

export default Login;
