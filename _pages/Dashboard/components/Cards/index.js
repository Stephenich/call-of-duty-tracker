import styles from './styles/cards.module.css';

function Card({ title, activityType, platform, username, imageUrl }) {
  return (
    <a className={styles.container} href={`/details/${username}/${title}/${activityType}/${platform}`}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="" />
      </div>
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
    </a>
  );
}

export default Card;
