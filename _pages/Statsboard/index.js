import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles/statsboard.module.css';
import statsLang from './lib/statsLang';
import StatCard from './components/StatsCards';
import lang from '../lib/lang';

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
  }, [username]);

  if (!title) return null;

  return (
    <div className={`${styles.container} ${title === 'cw' ? styles.cwBackground : styles.wzBackground}`}>
      <header className={styles.header}>
        <h1>Statsboard</h1>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.title}>
          <h2 className={styles.title}>Your Lifetime Stats: {title === 'cw' ? lang.cw : lang.wz}</h2>
        </div>
        <div className={styles.main}>
          <div className={styles.stats}>
            {Object.keys(statsLang[title]).map((statId) => {
              return (
                <StatCard
                  className={styles.statsCard}
                  key={statId}
                  title={statsLang[title][statId]}
                  value={stats[statId]}
                />
              );
            })}
          </div>
        </div>
      </main>
      <footer className={styles.footer}> Copyright 2021</footer>
    </div>
  );
};

export default Statsboard;
