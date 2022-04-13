import React from 'react';
import logo from 'Src/assets/logo/logo.svg';
import { useAppDispatch } from 'Src/hooks';
import { setAuth } from 'Src/models/actions';
import s from './style.module.scss';

export const Header: React.FC = () => {
  const dispath = useAppDispatch();
  const onLogoutClick = () => {
    dispath(setAuth({ isLogin: false, login: null }));
  };
  return (
    <div className={s.header}>
      <img src={logo} alt="" className={s.logo} />
      <button type="button" className={s.logout} onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
};
