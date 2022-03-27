import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'Src/hooks';
import { SET_AUTH } from 'Src/store/reducers/authReducer';

export const CheckForAuth: React.FC = () => {
  const { isLogin } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      const login = localStorage.getItem('authed');
      if (login === null) navigate('/auth');
      else dispatch({ type: SET_AUTH, payload: login });
    }
  }, [isLogin, dispatch, navigate]);

  return <div />;
};
