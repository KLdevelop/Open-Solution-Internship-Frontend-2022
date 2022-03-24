import React, { ChangeEvent, ReactEventHandler, useState } from 'react';
import s from './styled.module.scss';
import logo from './images/logo.svg';

export const AuthPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className={s.container}>
      <img src={logo} alt="" className={s.logo} />
      <h1>Please sign in</h1>
      <input className={s.login} value={login} onChange={onLoginChange} />
      <input className={s.login} type="password" value={password} onChange={onPasswordChange} />
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
