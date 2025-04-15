import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Box, Button, Modal } from '@mui/material';
import { editContact } from '../../redux/contacts/operations';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './EditForm.module.css';

const editContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must contain at least 3 characters!')
    .max(50, 'Name must be less than 50 characters!')
    .required('Required field!'),
  number: Yup.string()
    .min(3, 'The phone number must consist of at least 3 digits!')
    .max(50, 'Too long number')
    .required('Required field!'),
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  p: 4,
  minWidth: '300px',
  width: '90%',
  maxWidth: '400px',
};

export default function EditForm({ isOpen, onClose, name, number, id }) {
  if (!isOpen) return null;

  const dispatch = useDispatch();

  const fieldId = useId();

  const initialValues = {
    name: name,
    number: number,
  };

  const handleSubmit = async (values, actions) => {
    const newContact = {
      id: id,
      name: values.name.toLowerCase().trim(),
      number: values.number.trim(),
    };

    try {
      const data = await dispatch(editContact(newContact)).unwrap();
      console.log(data);
      toast.success('Your contact has been successfully edited.');
    } catch {
      toast.error(
        'Ooops. Something went wrong. Please reload the page and try again.'
      );
    }

    onClose();
    actions.resetForm();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <Box sx={modalStyle}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editContactSchema}
        >
          <Form className={css.form}>
            <div className={css.inputWrap}>
              <label className={css.label} htmlFor={fieldId + 'name'}>
                Name
              </label>
              <Field
                className={css.input}
                type="text"
                name="name"
                id={fieldId + 'name'}
              />
              <ErrorMessage
                className={css.error}
                name="name"
                component="span"
              />
            </div>

            <div className={css.inputWrap}>
              <label className={css.label} htmlFor={fieldId + 'number'}>
                Number
              </label>
              <Field
                className={css.input}
                type="text"
                name="number"
                id={fieldId + 'number'}
              />
              <ErrorMessage
                className={css.error}
                name="number"
                component="span"
              />
            </div>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}
