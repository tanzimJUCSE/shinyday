import React, { useState, useEffect, useContext } from 'react';
import History from '../components/History';
import Timeline from '../components/Timeline';
import Button from '@mui/material/Button';
import { AuthContext } from '../AuthContext';
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:7071/api'
  : 'https://shinydayfunctions.azurewebsites.net/api';

function Dashboard() {
  const [history, setHistory] = useState([]);

  const { user } = useContext(AuthContext);

  const load = () => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE}/getCheckinHistory?email=${encodeURIComponent(user.email)}`);
        const data = await response.json();
        setHistory(data.checkins || []);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  };
  useEffect(load, []);

  const handleDelete = async ()=>{
    await fetch(`${API_BASE}/deleteMyCheckins?email=${encodeURIComponent(user.email)}`,{method:'DELETE'});
    load();
  };

  return (
    <div>
      <Button onClick={handleDelete} variant="contained" color="error" sx={{ mb: 2 }}>Delete My Data</Button>
      <Timeline history={history} />
      <History history={history} />
    </div>
  );
}

export default Dashboard; 