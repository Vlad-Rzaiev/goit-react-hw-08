import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import css from './RegisterForm.module.css';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must contain at least 3 characters!')
    .max(30, 'Name must be less than 30 characters!')
    .required('Required field! Please enter your name.'),
  email: Yup.string()
    .email('Invalid email address!')
    .required('Required field! Please enter your email.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters!')
    .max(20, 'Password must be less than 20 characters!')
    .required('Required field! Please enter your password.'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      register({
        name: values.name.toLowerCase().trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      })
    );

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Username
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>
        <label className={css.label}>
          Email
          <Field className={css.input} type="email" name="email" />
          <ErrorMessage className={css.error} name="email" component="span" />
        </label>
        <label className={css.label}>
          Password
          <Field className={css.input} type="password" name="password" />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
        </label>

        <button className={css.btn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};
