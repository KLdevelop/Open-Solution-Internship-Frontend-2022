import React from 'react';
import s from './styled.module.scss';
import logo from './images/logo.svg';

export const AuthPage: React.FC = () => {
  return (
    <div className={s.container}>
      <img src={logo} alt="" className={s.logo} />
      <h1>Please sign in</h1>
      <input className={s.login} />
      <input className={s.login} type="password" />
      <label className={s.remember}>
        <input type="checkbox" />
        Remember me
      </label>
      <button type="button" className={s.sign}>
        Sign in
      </button>
      <p className={s.years}>2020-2022</p>
    </div>
  );
};
