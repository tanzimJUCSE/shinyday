import React from 'react';
import './History.css';

const moodEmojis = ['😞', '😟', '😐', '😊', '😁'];

function History({ history }) {
  return (
    <div className="history">
      <h2>Check-in History</h2>
      {history.length === 0 ? (
        <p>No check-ins yet.</p>
      ) : (
        <ul>
          {history.map((checkin) => (
            <li key={checkin.id} className="history-item">
              <div className="history-item-mood">{moodEmojis[checkin.mood - 1]}</div>
              <div className="history-item-details">
                <div className="history-item-date">
                  {new Date(checkin.timestamp).toLocaleDateString()}
                </div>
                <div className="history-item-habits">
                  {checkin.habits.join(', ')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History; 