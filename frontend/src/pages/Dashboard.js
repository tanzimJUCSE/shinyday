import React, { useState, useEffect } from 'react';
import History from '../components/History';
import Timeline from '../components/Timeline';
const API_BASE = 'https://shinydayfunctions.azurewebsites.net/api';
// const API_BASE = 'http://localhost:7071/api';

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE}/getCheckinHistory`);
        const data = await response.json();
        setHistory(data.checkins || []);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <Timeline history={history} />
      <History history={history} />
    </div>
  );
}

export default Dashboard; 