import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from 'Src/assets/logo/logo.svg';
import s from './style.module.scss';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Not Found';
  }, []);
  return (
    <div className={s.notfound}>
      <img src={logo} alt="" />
      <h1>Not Found</h1>
      <Link to="/organizations">Go away</Link>
    </div>
  );
};
