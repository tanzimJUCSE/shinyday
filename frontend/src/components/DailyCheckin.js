import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyCheckin.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { AuthContext } from '../AuthContext';

const habits = [
  { id: 'sleep', name: 'Sleep 7h' },
  { id: 'water', name: 'Drink Water at Least 3L' },
  { id: 'exercise', name: 'Exercise' },
  { id: 'reading', name: 'Read' },
  { id: 'meditation', name: 'Meditate' },
];

const moodEmojis = ['😞', '😟', '😐', '😊', '😁'];

function DailyCheckin() {
  const [mood, setMood] = useState(3);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const navigate = useNavigate();
  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:7071/api'
    : 'https://shinydayfunctions.azurewebsites.net/api';
  const [openSnack, setOpenSnack] = useState(false);
  const { user } = useContext(AuthContext);

  if(!user) { navigate('/signin'); return null; }

  const handleHabitToggle = (habitId) => {
    setSelectedHabits((prev) =>
      prev.includes(habitId)
        ? prev.filter((id) => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkinData = { mood, habits: selectedHabits };
    
    try {
      const response = await fetch(`${API_BASE}/dailyCheckin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...checkinData, email: user.email }),
      });
      await response.json();
      setOpenSnack(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting check-in:', error);
    }
  };

  return (
    <div className="daily-checkin">
      <h2>How are you feeling today?</h2>
      <div className="mood-selector">
        {moodEmojis.map((emoji, index) => (
          <button
            key={index}
            className={`mood-button ${mood === index + 1 ? 'selected' : ''}`}
            onClick={() => setMood(index + 1)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <h2>What have you done today?</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          {habits.map((habit) => (
            <FormControlLabel
              key={habit.id}
              control={
                <Checkbox
                  checked={selectedHabits.includes(habit.id)}
                  onChange={() => handleHabitToggle(habit.id)}
                  color="primary"
                />
              }
              label={habit.name}
              sx={{ '.MuiFormControlLabel-label': { color: '#0d47a1', fontWeight: 500 } }}
            />
          ))}
        </FormGroup>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </form>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => setOpenSnack(false)}>
        <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
          Submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DailyCheckin; 