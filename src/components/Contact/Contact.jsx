import { useState } from 'react';
import { FaUser, FaPhone } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import styles from './Contact.module.css';

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleDelete = async () => {
    try {
      const data = await dispatch(deleteContact(id)).unwrap();
      toast.success(`Contact ${data.name} has successfully been deleted.`);
      setIsOpenModal(false);
    } catch {
      toast.error(
        'Ooops. Something went wrong. Please reload the page and try again.'
      );
    }
  };

  const handleEdit = async () => {
    console.log(id);
    try {
    } catch {
      toast.error(
        'Ooops. Something went wrong. Please reload the page and try again.'
      );
    }
  };
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

      <div>
        <Button type="button" onClick={handleEdit}>
          Edit
        </Button>

        <Button type="button" onClick={() => setIsOpenModal(true)}>
          Delete
        </Button>
      </div>

      {isOpenModal && (
        <ConfirmDelete
          isOpen={isOpenModal}
          onConfirm={handleDelete}
          onClose={() => setIsOpenModal(false)}
          name={name}
        />
      )}
    </>
  );
}
