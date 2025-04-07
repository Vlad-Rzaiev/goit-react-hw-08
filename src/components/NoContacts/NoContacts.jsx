import { FaRegAddressBook } from 'react-icons/fa';
import styles from './NoContacts.module.css';

export default function NoContacts({ inputNameRef }) {
  const handleFocus = () => {
    if (inputNameRef.current) {
      inputNameRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <FaRegAddressBook className={styles.icon} />
      <h2 className={styles.title}>No contacts</h2>
      <p className={styles.text}>Add your first contact to get started!</p>
      <button className={styles.button} onClick={handleFocus}>
        Add Contact
      </button>
    </div>
  );
}
