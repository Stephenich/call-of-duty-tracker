import styles from './styles/cards.module.css';

function Card({ title, activityType, platform, username }) {
  return (
    <div className={styles.container}>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Username:</div>
        <div className={styles.rowValue}>{username}</div>
      </div>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Title:</div>
        <div className={styles.rowValue}>{title}</div>
      </div>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Platform:</div>
        <div className={styles.rowValue}>{platform}</div>
      </div>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Activity:</div>
        <div className={styles.rowValue}>{activityType}</div>
      </div>
    </div>
  );
}

export default Card;
