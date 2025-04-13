import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import css from './LoginForm.module.css';

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
      console.log(`Welcome ${data.user.name}`);
    } catch {
      toast.error('Login error');
    }

    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <label className={css.label}>
          Email
          <Field className={css.input} type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field className={css.input} type="password" name="password" />
        </label>
        <button className={css.btn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};
