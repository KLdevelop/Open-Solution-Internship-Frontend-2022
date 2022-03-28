import { createAction } from '@reduxjs/toolkit';

export const setAuth = createAction<{ isLogin: boolean; login: string }>('SET_AUTH');
export const SET_AUTH = setAuth.toString();
