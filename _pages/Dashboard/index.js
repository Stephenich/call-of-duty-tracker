import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Cards';
import styles from './styles/dashboard.module.css';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();

const Dashboard = () => {
  const [players, setPlayers] = useState([]);
  const router = useRouter();

  const getPlayersInfo = async () => {
    try {
      const response = await axios.get('/api/identity');
      setPlayers(response.data);
    } catch (error) {
      cookies.remove('token');
      router.push('/');
    }
  };

  useEffect(() => {
    getPlayersInfo();
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.header}>Select Your User</h1>
      </header>
      <main className={styles.main}>
        {players.map((player) => (
          <Card {...player} key={`${player.activityType}-${player.username}`} />
        ))}
      </main>
      <footer className={styles.footer}>Copyright 2021 </footer>
    </div>
  );
};

export default Dashboard;
