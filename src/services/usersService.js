import { API_CONFIG } from '../config';

export const fetchUsers = async ({ page, size, sortField, username }) => {
  const queryParams = new URLSearchParams({
    page,
    size,
    ...(sortField ? { sortField } : {}),
    ...(username ? { username } : {})
  });

  const response = await fetch(`${API_CONFIG.BASE_URL}/users?${queryParams.toString()}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to fetch users');
  }

  return await response.json();
};

export const fetchUserDetails = async (id) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/users/${id}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to fetch user');
  }

  return await response.json();
};

export const updateUser = async (id, updatedUserData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updatedUserData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Failed to update user');
    }
  
    return await response.json();
  };
