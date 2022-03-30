import { createAction } from '@reduxjs/toolkit';

export const setAuth =
  createAction<{ isLogin: boolean; login: string; remember: boolean | undefined }>('SET_AUTH');
