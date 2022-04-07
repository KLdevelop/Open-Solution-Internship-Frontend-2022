import { createAction } from '@reduxjs/toolkit';

export const setAuth =
  createAction<{ isLogin: boolean; login: string; remember: boolean | undefined }>('SET_AUTH');

export interface Organization {
  id: number;
  name: string;
  address: string;
  INN: number;
}

export const setOrganizations = createAction<Organization[]>('SET_ORGANIZATIONS');
export const fetchOrganizations = createAction('FETCH_ORGANIZATIONS');
