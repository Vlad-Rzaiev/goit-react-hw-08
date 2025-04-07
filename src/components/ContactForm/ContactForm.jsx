import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsOps';
import styles from './ContactForm.module.css';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must contain at least 3 characters!')
    .max(50, 'Name must be less than 50 characters!')
    .required('Required field!'),
  number: Yup.string()
    .min(3, 'The phone number must consist of at least 3 digits!')
    .max(50, 'Too long number')
    .required('Required field!'),
});

export default function ContactForm({ inputNameRef }) {
  const dispatch = useDispatch();
  const fieldId = useId();

  const initialValues = {
    name: '',
    number: '',
  };

  const hundleSubmit = (values, actions) => {
    const currentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

      const formatedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

      return formatedDate;
    };

    const newContact = {
      createdAt: currentDate(),
      name: values.name.toLowerCase().trim(),
      number: values.number.trim(),
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={hundleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor={fieldId + 'name'}>
            Name
          </label>
          <Field
            className={styles.input}
            type="text"
            name="name"
            id={fieldId + 'name'}
            autoComplete="name"
            ref={inputNameRef}
          />
          <ErrorMessage className={styles.error} name="name" component="span" />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor={fieldId + 'number'}>
            Number
          </label>
          <Field
            className={styles.input}
            type="text"
            name="number"
            id={fieldId + 'number'}
            autoComplete="tel"
          />
          <ErrorMessage
            className={styles.error}
            name="number"
            component="span"
          />
        </div>

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
