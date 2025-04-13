import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './AuthNav.module.css';

const biuldLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const AuthNav = () => {
  return (
    <div>
      <NavLink className={biuldLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={biuldLinkClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
