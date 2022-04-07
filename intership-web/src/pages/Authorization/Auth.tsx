import React, { ChangeEvent, ReactEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuth } from 'Src/models/actions';
import { useAppDispatch } from 'Src/hooks';
import logo from 'Src/assets/logo/logo.svg';
import s from './styled.module.scss';

export const AuthPage: React.FC = () => {
  const [authData, setAuthData] = useState({ login: '', password: '' });
  const [checked, setChecked] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    authData[e.target.name] = e.target.value;
    setAuthData({ ...authData });
  };

  const onCheck: ReactEventHandler = () => {
    setChecked(!checked);
  };

  const checkLogin = (isLogin: boolean) => {
    setIsFail(!isLogin);
    if (isLogin === true) {
      setIsFail(false);
      dispatch(setAuth({ isLogin, login: authData.login, remember: checked }));
      navigate('/');
    } else {
      setIsFail(true);
    }
  };

  const doAuth = () => {
    const fields = {
      loginData: {
        login: authData.login,
        password: authData.password,
      },
    };
    (async () => {
      const resp = await fetch('/api/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(fields),
      });
      const r: { isLogin: boolean } = await resp.json();
      checkLogin(r.isLogin);
    })().catch(() => checkLogin(false));
  };

  useEffect(() => {
    document.title = 'Authorization';
  }, []);

  return (
    <div className={s.container}>
      <img src={logo} alt="" className={s.logo} />
      <h1>Please sign in</h1>
      <input name="login" className={s.login} value={authData.login} onChange={onInputChange} />
      <input
        name="password"
        className={s.login}
        type="password"
        value={authData.password}
        onChange={onInputChange}
      />
      <label className={s.remember}>
        <input type="checkbox" checked={checked} onChange={onCheck} />
        Remember me
      </label>
      {isFail && <div className={s.error}>login details error try again</div>}
      <button type="button" className={s.sign} onClick={doAuth}>
        Sign in
      </button>
      <p className={s.years}>2020-2022</p>
    </div>
  );
};
