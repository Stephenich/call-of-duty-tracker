import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import {LoginForm} from './components/Login'


export default function Home() {
  console.log(styles)
  return (
    <div className={styles.container}>
      <Head>
        <title>Call of Duty Tracker</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Call Of Duty Tracker
        </h1>
            <LoginForm/>
        </main>
    </div>
  )
}
