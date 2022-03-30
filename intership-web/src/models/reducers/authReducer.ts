import { createReducer } from '@reduxjs/toolkit';
import { setAuth } from '../actions';

export interface LoginState {
  isLogin: boolean;
  login: null | string;
}

const user = localStorage.getItem('authed');

const initialState: LoginState = {
  isLogin: user !== null,
  login: user,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuth, (state, action) => {
    const { isLogin, login, remember } = action.payload;
    if (remember) localStorage.setItem('authed', login);
    return { ...state, isLogin, login };
  });
});
