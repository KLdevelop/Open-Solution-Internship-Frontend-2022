import React from 'react';
import logo from 'Src/assets/logo/logo.svg';
import { useAppDispatch } from 'Src/hooks';
import { setAuth } from 'Src/models/actions';
import s from './style.module.scss';

interface Props {
  past?: string;
  title?: string;
  next?: string;
}

export const Header: React.FC<Props> = ({ past, title, next }) => {
  const dispath = useAppDispatch();
  const onLogoutClick = () => {
    dispath(setAuth({ isLogin: false, login: null }));
  };
  return (
    <div className={s.header}>
      <img src={logo} alt="" className={s.logo} />
      <h1 className={s.past}>{past || ''}</h1>
      <h1>{title || ''}</h1>
      <h1>{next || ''}</h1>
      <button type="button" className={s.logout} onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
};
