import { API_CONFIG } from '../config';

export const fetchChordsByName = async (name) => {
  const queryParams = new URLSearchParams();
  if (name) queryParams.append('name', name);

  const response = await fetch(`${API_CONFIG.BASE_URL}/chords?${queryParams.toString()}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to fetch chords');
  }

  return await response.json();
};

export const uploadFingeringImage = async (fingeringJson, imageFile) => {
  const formData = new FormData();
  formData.append('fingering', fingeringJson);
  formData.append('image', imageFile);

  const response = await fetch(`${API_CONFIG.BASE_URL}/fingerings`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to upload image');
  }

  return await response.json();
};
