import React, { useState } from 'react';
import { Colors } from '../theme/colors';
import { fetchChordsByName, uploadFingeringImage } from '../services/fingeringService';

const ChordFingeringUploadForm = () => {
  const [chordName, setChordName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChord, setSelectedChord] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const results = await fetchChordsByName(chordName);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setMessage('');
    setError('');

    if (!selectedChord || !imageFile) {
      setError('Будь ласка, виберіть акорд і завантажте зображення.');
      return;
    }

    const fingeringJson = JSON.stringify({
      chord: {
        id: selectedChord.id,
        name: selectedChord.name,
      },
    });

    try {
      await uploadFingeringImage(fingeringJson, imageFile);
      setMessage('Зображення успішно завантажено!');
      setSelectedChord(null);
      setChordName('');
      setSearchResults([]);
      setImageFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Пошук акорду за назвою"
          value={chordName}
          onChange={(e) => setChordName(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Пошук</button>
      </div>

      <div style={styles.list}>
        {searchResults.map((chord) => (
          <div
            key={chord.id}
            style={{
              ...styles.chordItem,
              backgroundColor: selectedChord?.id === chord.id ? Colors.DARKER_2 : Colors.WHITE,
              color: selectedChord?.id === chord.id ? Colors.DARKEST : Colors.DARKER_1,
            }}
            onClick={() => setSelectedChord(chord)}
          >
            {chord.name}
          </div>
        ))}
      </div>

      <input type="file" accept="image/png" onChange={handleFileChange} style={{ marginTop: '20px' }} />
      <button onClick={handleSubmit} style={{ ...styles.button, marginTop: '10px' }}>Додати</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    flex: 1,
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
  },
  list: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  chordItem: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ChordFingeringUploadForm;
