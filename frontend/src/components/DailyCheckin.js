import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyCheckin.css';

const habits = [
  { id: 'sleep', name: 'Sleep 7h' },
  { id: 'water', name: 'Drink Water' },
  { id: 'exercise', name: 'Exercise' },
  { id: 'reading', name: 'Read' },
  { id: 'meditation', name: 'Meditate' },
];

const moodEmojis = ['😞', '😟', '😐', '😊', '😁'];

function DailyCheckin() {
  const [mood, setMood] = useState(3);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const navigate = useNavigate();

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
      const response = await fetch('/api/dailyCheckin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkinData),
      });
      await response.json();
      navigate('/dashboard'); // Redirect to dashboard
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
        <div className="habit-list">
          {habits.map((habit) => (
            <div key={habit.id}>
              <input
                type="checkbox"
                id={habit.id}
                checked={selectedHabits.includes(habit.id)}
                onChange={() => handleHabitToggle(habit.id)}
              />
              <label htmlFor={habit.id}>{habit.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DailyCheckin; 