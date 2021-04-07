import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Cards';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
  const [players, setPlayers] = useState([]);

  const getPlayersInfo = async () => {
    const response = await axios.get('/api/identity');
    setPlayers(response.data);
  };

  useEffect(() => {
    getPlayersInfo();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>ssss</header>
      <main className={}>
        {players.map((player) => (
          <Card {...player} key={`${player.activityType}-${player.username}`} />
        ))}
      </main>
      <footer className={styles.footer}>Copyright 2021 </footer>
    </div>
  );
};

export default Dashboard;
