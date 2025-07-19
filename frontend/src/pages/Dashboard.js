import React, { useState, useEffect } from 'react';
import History from '../components/History';
import Timeline from '../components/Timeline';

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/getCheckinHistory');
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