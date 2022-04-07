import React from 'react';
import logo from 'Src/assets/logo/logo.svg';
import s from './style.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.header}>
      <img src={logo} alt="" className={s.logo} />
    </div>
  );
};
