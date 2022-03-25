import React, { ChangeEvent, ReactEventHandler, useState } from 'react';
import s from './styled.module.scss';
import logo from './images/logo.svg';

export const AuthPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onCheck: ReactEventHandler = () => {
    setChecked(!checked);
  };
  const doAuth = () => {
    const fields = {
      loginData: {
        login,
        password,
      },
    };
    fetch('http://127.0.0.1:8080/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(fields),
    }).catch((error) => console.log(error));
  };
  const onSignClick: ReactEventHandler = () => {
    doAuth();
  };
  return (
    <div className={s.container}>
      <img src={logo} alt="" className={s.logo} />
      <h1>Please sign in</h1>
      <input className={s.login} value={login} onChange={onLoginChange} />
      <input className={s.login} type="password" value={password} onChange={onPasswordChange} />
      <label className={s.remember}>
        <input type="checkbox" checked={checked} onChange={onCheck} />
        Remember me
      </label>
      <button type="button" className={s.sign} onClick={onSignClick}>
        Sign in
      </button>
      <p className={s.years}>2020-2022</p>
    </div>
  );
};
