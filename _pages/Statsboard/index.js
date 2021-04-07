import { useState, useEffect } from 'react';
import axios from 'axios';

const Statsboard = () => {
  const [stats, setStats] = useState([]);

  const getPlayersStats = async () => {
    const response = await axios.get('/api/wzprofile');
    setStats(response.data);
  };

  useEffect(() => {
    getPlayersStats();
  }, []);

  console.log(stats);

  return (
    <div className="statboard-container" style={{ color: 'red' }}>
      <h1>Statsboard</h1>
    </div>
  );
};

export default Statsboard;
