import styles from './styles/cards.module.css';
import lang from '../../../lib/lang';

const Card = ({ title, activityType, platform, username }) => {
  const imagePath = title === 'cw' ? '/images/cw1.jpg' : '/images/background2.jpg';
  return (
    <a className={styles.container} href={`/details/${username}/${title}/${activityType}/${platform}`}>
      <div className={styles.imageContainer}>
        <img src={imagePath} alt="" />
      </div>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Username:</div>
        <div className={styles.rowValue}>{username}</div>
      </div>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Title:</div>
        <div className={styles.rowValue}>{lang[title]}</div>
      </div>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Platform:</div>
        <div className={styles.rowValue}>{lang[platform]}</div>
      </div>
      <div className={styles.rowData}>
        <div className={styles.rowTitle}>Activity:</div>
        <div className={styles.rowValue}>{lang[activityType]}</div>
      </div>
    </a>
  );
};

export default Card;
