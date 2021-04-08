import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Statsboard = (props) => {
  const [stats, setStats] = useState([]);
  const router = useRouter();

  const username = router?.query?.user?.[0];
  const activityType = router?.query?.user?.[2];
  const platform = router?.query?.user?.[3];
  const title = router?.query?.user?.[1];

  const getPlayersStats = async () => {
    const response = await axios.post('/api/profile', { username, title, activityType, platform });
    setStats(response.data);
  };

  useEffect(() => {
    if (username) getPlayersStats();
  }, username);

  return (
    <div className="statboard-container" style={{ color: 'red' }}>
      <h1>Statsboard</h1>
    </div>
  );
};

export default Statsboard;
