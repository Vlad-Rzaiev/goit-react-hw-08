import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import styles from './HomePage.module.css';

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { name } = useSelector(selectUser);

  return (
    <>
      <title>Home</title>

      <div className={styles.container}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>
            Welcome to your <span className={styles.highlight}>Phonebook</span>{' '}
            📞
          </h1>
          {isLoggedIn && <p className={styles.name}>{name}!</p>}
        </div>
        <p className={styles.subtitle}>
          Securely store and manage all your contacts in one place.
        </p>

        {isLoggedIn ? (
          <Link className={styles.button} to="/contacts">
            Go to your contacts
          </Link>
        ) : (
          <div className={styles.actions}>
            <Link to="/register" className={styles.button}>
              Create Account
            </Link>
            <Link to="/login" className={styles.buttonOutline}>
              Log In
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
