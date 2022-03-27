import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'Src/hooks';
import { setAuth } from 'Src/store/actions';

export const CheckForAuth: React.FC = () => {
  const { isLogin } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      const login = localStorage.getItem('authed');
      if (login === null) navigate('/auth');
      else dispatch(setAuth(true, login));
    }
  }, [isLogin, dispatch, navigate]);

  return <div />;
};
