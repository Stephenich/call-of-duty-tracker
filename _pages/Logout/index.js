import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import styles from './styles/logoutbutton.module.css';

const cookies = new Cookies();

const LogoutButton = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const router = useRouter();

  const logout = () => {
    cookies.remove('token');
    setLoggedOut(true);
  };

  if (loggedOut) {
    router.push('/');
  }

  return (
    <button onClick={logout} className={styles.button}>
      LogOut
    </button>
  );
};

export default LogoutButton;
