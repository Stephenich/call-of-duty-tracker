import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [players, setPlayers] = useState([]);

  const getPlayersInfo = async () => {
    const response = await axios.get('/api/identity');
    setPlayer(response.data);
  };

  useEffect(() => {
    getPlayersInfo();
  }, []);

  return (
    <div className="dashboard-container" style={{ color: 'red' }}>
      <h1>Dashboard</h1>
      {players.map((player) => (
        <div className="players" style={{ color: 'white' }}>
          <h2>userName: {player.username}</h2>
          <p>Platform: {player.platform}</p>
          <p>Game title: {player.title}</p>
          <p>Game mode: {player.activityType}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
