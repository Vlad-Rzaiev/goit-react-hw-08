import { FaUser, FaPhone } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import styles from './Contact.module.css';

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <>
      <div>
        <div className={styles.iconTextWrap}>
          <FaUser className={styles.icon} />
          <p className={styles.contactName}>{name}</p>
        </div>
        <div className={styles.iconTextWrap}>
          <FaPhone className={styles.icon} />
          <p className={styles.contactNumber}>{number}</p>
        </div>
      </div>

      <button className={styles.button} type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
