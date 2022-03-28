import { createReducer } from '@reduxjs/toolkit';
import { setAuth } from '../actions';

export interface LoginState {
  isLogin: boolean;
  login: null | string;
}

const initialState: LoginState = {
  isLogin: false,
  login: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuth, (state, action) => {
    return { ...state, ...action.payload };
  });
});
