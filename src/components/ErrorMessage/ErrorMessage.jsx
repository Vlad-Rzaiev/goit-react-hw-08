import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Ooops! Something went wrong. Please reload page...
      </p>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
