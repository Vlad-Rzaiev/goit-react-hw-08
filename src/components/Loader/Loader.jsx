import PulseLoader from 'react-spinners/PulseLoader';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <PulseLoader
        color="#adff2f"
        size={26}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
