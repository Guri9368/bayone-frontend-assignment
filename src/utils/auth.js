// Auth utility with token expiry handling

export function setToken(token) {
  const expiryMinutes = import.meta.env.VITE_TOKEN_EXPIRY_MINUTES || 30;
  const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
  
  // Store both token and expiry time
  localStorage.setItem('authToken', token);
  localStorage.setItem('tokenExpiry', expiryTime.toString());
}

export function getToken() {
  const token = localStorage.getItem('authToken');
  const expiry = localStorage.getItem('tokenExpiry');
  
  // Check if token exists and is not expired
  if (token && expiry) {
    const currentTime = Date.now();
    if (currentTime < parseInt(expiry)) {
      return token;
    } else {
      // Token expired, clean up
      removeToken();
      return null;
    }
  }
  
  return null;
}

export function removeToken() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiry');
}

export function isAuthenticated() {
  const token = getToken();
  return token !== null && token !== undefined;
}

export function getTokenExpiryTime() {
  const expiry = localStorage.getItem('tokenExpiry');
  if (expiry) {
    return parseInt(expiry);
  }
  return null;
}

export function getRemainingTime() {
  const expiry = getTokenExpiryTime();
  if (expiry) {
    const remaining = expiry - Date.now();
    return remaining > 0 ? Math.floor(remaining / 1000 / 60) : 0; // Return minutes
  }
  return 0;
}
