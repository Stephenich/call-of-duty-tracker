import Head from 'next/head';
import styles from './styles/login.module.css';
import LoginForm from './components/Login';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Call of Duty Tracker</title>
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Call Of Duty Tracker</h1>
        </header>
        <div className={styles.loginForm}>
          <LoginForm />
        </div>
      </main>
      <footer className={styles.footer}>Copyright 2021</footer>
    </div>
  );
};

export default Home;
