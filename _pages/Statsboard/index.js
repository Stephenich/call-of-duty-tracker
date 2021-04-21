import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles/statsboard.module.css';

const lang = {
  kdRatio: 'Kill Death Ratio:',
  wins: 'Wins:',
  kills: 'Kills:',
  downs: 'Downs:',
  deaths: 'Deaths:',
  topTwentyFive: 'Top Twentyfive:',
  scorePerMinute: 'Score per minute:',
  topTen: 'Top Ten: ',
  topFive: 'Top Five:',
  gamesPlayed: 'Total Games:',
  timePlayed: 'Total Time:',
  score: 'Score:',
  revives: 'Revives:',
  contracts: 'Contracts:',
  kdratio: 'Kill Death Ratio:',
};

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

  const statsArr = Object.keys(stats).map((key) => {
    if (lang[key])
      return (
        <span className={styles.lifetimeStats} key={key}>
          {' '}
          {lang[key]} {stats[key]}
        </span>
      );
  });
  //  const statsArr = [];
  // REFERENCE: for (const property in stats) {
  //   if (lang[property])
  //     statsArr.push(
  //       <div>
  //         <p key={property}>
  //           {' '}
  //           {lang[property]} {stats[property]}
  //         </p>
  //       </div>,
  //     );
  // }
  // const imagePath = title === 'cw' ? '/images/cw1.jpg' : ' /images/background2.jpg' : ;

  return (
    <div className={`${styles.container} ${title === 'cw' ? styles.cwBackground : styles.wzBackground}`}>
      {/* <img className={styles.image} style={{ backgroundImage: `url(${imagePath})` }} /> */}
      <header className={styles.header}>
        <h1>Statsboard</h1>
      </header>
      <main className={styles.mainContainer}>
        <h2 className={styles.title}>Your Lifetime Stats</h2>
        <div className={styles.main}>
          <div className={styles.stats}> {statsArr} </div>
        </div>
      </main>
      <footer className={styles.footer}> Copyright 2021</footer>
    </div>
  );
};

export default Statsboard;
