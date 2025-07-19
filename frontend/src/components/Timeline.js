import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';
import './Timeline.css';

const moodEmojis = ['😞', '😟', '😐', '😊', '😁'];
const habitColors = {
  sleep: '#8884d8',
  water: '#82ca9d',
  exercise: '#ffc658',
  reading: '#ff8042',
  meditation: '#0088FE',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="intro">Mood: {moodEmojis[data.mood - 1]}</p>
        <p className="desc">Habits: {data.habits.join(', ')}</p>
      </div>
    );
  }

  return null;
};

function Timeline({ history }) {
  const data = history.map(item => ({
    ...item,
    date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })).slice(-7);

  return (
    <div className="timeline">
      <h2>Your 7-Day Mood Trend</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="mood" domain={[1, 5]} tickFormatter={(value) => moodEmojis[value - 1]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
          {Object.keys(habitColors).map(habit => (
            <Scatter 
              key={habit}
              data={data.filter(d => d.habits.includes(habit))} 
              fill={habitColors[habit]} 
              name={habit}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Timeline; 