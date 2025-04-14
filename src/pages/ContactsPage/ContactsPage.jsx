import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectLoading,
} from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import Loader from '../../components/Loader/Loader';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import NoContacts from '../../components/NoContacts/NoContacts';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const inputNameRef = useRef(null);

  const isLoading = useSelector(selectLoading);
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <title>Your contacts</title>

      <ContactForm inputNameRef={inputNameRef} />
      <SearchBox />

      {isLoading && !error && <Loader />}
      {error && <ErrorMessage message={error} />}
      {contacts.length > 0 && <ContactList />}
      {contacts.length === 0 && !isLoading && (
        <NoContacts inputNameRef={inputNameRef} />
      )}
    </>
  );
}
