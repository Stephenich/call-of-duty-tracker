import styles from './styles/statsCards.module.css';

const StatCard = ({ title, value }) => {
  return (
    <div className={styles.cardData}>
      <p className={styles.cardTitle}>{title}</p>
      <h2 className={styles.cardValue}>{value}</h2>
    </div>
  );
};

export default StatCard;
