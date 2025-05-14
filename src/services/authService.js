import { API_CONFIG } from '../config';

export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/process_login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'manual'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/authenticated`, {
      credentials: 'include'
    });
    if (response.redirected) {
      return false;
    }
    
    const data = await response.json();
    return data.role === 'ADMIN';
  } catch (error) {
    return false;
  }
};