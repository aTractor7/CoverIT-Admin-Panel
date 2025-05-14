import { API_CONFIG } from '../config';

export const addChord = async (chordName) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/chords`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name: chordName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.message || 'Failure adding chord';
    throw new Error(message);
  }
};
