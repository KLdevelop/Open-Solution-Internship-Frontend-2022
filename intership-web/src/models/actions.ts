import { createAction } from '@reduxjs/toolkit';

export const setAuth =
  createAction<{ isLogin: boolean; login: string | null; remember?: boolean }>('SET_AUTH');

export interface Organization {
  id: number;
  name: string;
  address: string;
  INN: number;
}

export interface fetchedOrganizations {
  organizations: Organization[];
  isLoaded: boolean;
}

export const setOrganizations = createAction<fetchedOrganizations>('SET_ORGANIZATIONS');
export const fetchOrganizations = createAction('FETCH_ORGANIZATIONS');

export const addOrganization = createAction<Organization>('ADD_ORGANIZATION');
export const postOrganization = createAction<Organization>('POST_ORGANIZATION');
export const incPostOrgProcesses = createAction('INC_POST_PROCESSES');
export const decPostOrgProcesses = createAction('DEC_POST_PROCESSES');
export const addToPostOrg = createAction<Organization>('ADD_TO_POST_ORG');

export const removeOrganization = createAction<number>('REMOVE_ORGANIZATION');
export const deleteOrganization = createAction<number>('DELETE_ORGANIZATION');
export const incDeleteOrgProcesses = createAction<number>('INC_DELETE_PROCESSES');
export const decDeleteOrgProcesses = createAction<number>('DEC_DELETE_PROCESSES');
export const addToDeleteOrg = createAction<number>('ADD_TO_DELETE_ORG');

export const editOrganization = createAction<Organization>('EDIT_ORGANIZATION');
export const redOrganization = createAction<Organization>('RED_ORGANIZATION');
export const addToEditOrg = createAction<Organization>('ADD_TO_EDIT_ORG');
export const incEditOrgProcesses = createAction('INC_EDIT_PROCESSES');
export const decEditOrgProcesses = createAction('DEC_EDIT_PROCESSES');
