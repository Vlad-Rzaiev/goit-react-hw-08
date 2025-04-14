import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address!')
    .required('Required field! Please enter your email.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters!')
    .max(20, 'Password must be less than 20 characters!')
    .required('Required field! Please enter your password.'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, actions) => {
    const credentials = {
      email: values.email.toLowerCase().trim(),
      password: values.password.trim(),
    };

    try {
      const data = await dispatch(logIn(credentials)).unwrap();
      toast.success(`Welcome ${data.user.name}`);
    } catch {
      toast.error('Login error');
    }

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
          Log In
        </button>
      </Form>
    </Formik>
  );
};
