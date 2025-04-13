import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import clsx from 'clsx';
import css from './Navigation.module.css';

const biuldLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <NavLink className={biuldLinkClass} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={biuldLinkClass} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
