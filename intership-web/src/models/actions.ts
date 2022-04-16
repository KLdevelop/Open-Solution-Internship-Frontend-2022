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
export const incPostOrgProcesses = createAction('INC_POST_ORG_PROCESSES');
export const decPostOrgProcesses = createAction('DEC_POST_ORG_PROCESSES');
export const addToPostOrg = createAction<Organization>('ADD_TO_POST_ORG');

export const removeOrganization = createAction<number>('REMOVE_ORGANIZATION');
export const deleteOrganization = createAction<number>('DELETE_ORGANIZATION');
export const incDeleteOrgProcesses = createAction<number>('INC_DELETE_ORG_PROCESSES');
export const decDeleteOrgProcesses = createAction<number>('DEC_DELETE_ORG_PROCESSES');
export const addToDeleteOrg = createAction<number>('ADD_TO_DELETE_ORG');

export const editOrganization = createAction<Organization>('EDIT_ORGANIZATION');
export const redOrganization = createAction<Organization>('RED_ORGANIZATION');
export const addToEditOrg = createAction<Organization>('ADD_TO_EDIT_ORG');
export const incEditOrgProcesses = createAction('INC_EDIT_ORG_PROCESSES');
export const decEditOrgProcesses = createAction('DEC_EDIT_ORG_PROCESSES');

export interface Division {
  id: number;
  id_organization: number;
  name: string;
  phone: number;
}

export interface fetchedDivisions {
  divisions: Division[];
}

export const setDivisions = createAction<fetchedDivisions>('SET_DIVISIONS');
export const fetchDivisions = createAction<number>('FETCH_DIVISIONS');

export const addDivision = createAction<Division>('ADD_DIVISION');
export const postDivision = createAction<Division>('POST_DIVISION');
export const incPostDivProcesses = createAction('INC_POST_DIV_PROCESSES');
export const decPostDivProcesses = createAction('DEC_POST_DIV_PROCESSES');
export const addToPostDiv = createAction<Division>('ADD_TO_POST_DIV');

export const removeDivision = createAction<number>('REMOVE_DIVISION');
export const deleteDivision = createAction<number>('DELETE_DIVISION');
export const incDeleteDivProcesses = createAction<number>('INC_DELETE_DIV_PROCESSES');
export const decDeleteDivProcesses = createAction<number>('DEC_DELETE_DIV_PROCESSES');
export const addToDeleteDiv = createAction<number>('ADD_TO_DELETE_DIV');

export const editDivision = createAction<Division>('EDIT_DIVISION');
export const redDivision = createAction<Division>('RED_DIVISION');
export const addToEditDiv = createAction<Division>('ADD_TO_EDIT_DIV');
export const incEditDivProcesses = createAction('INC_EDIT_DIV_PROCESSES');
export const decEditDivProcesses = createAction('DEC_EDIT_DIV_PROCESSES');

export interface Employee {
  id: number;
  id_division: number;
  FIO: string;
  address: string;
  position: string;
}

export interface fetchedEmployees {
  employees: Employee[];
}

export const setEmployees = createAction<fetchedEmployees>('SET_EMPLOYEES');
export const fetchEmployees = createAction<number>('FETCH_EMPLOYEES');

export const addEmployee = createAction<Employee>('ADD_EMPLOYEE');
export const postEmployee = createAction<Employee>('POST_EMPLOYEE');
export const incPostEmpProcesses = createAction('INC_POST_EMP_PROCESSES');
export const decPostEmpProcesses = createAction('DEC_POST_EMP_PROCESSES');
export const addToPostEmp = createAction<Employee>('ADD_TO_POST_EMP');

export const removeEmployee = createAction<number>('REMOVE_EMPLOYEE');
export const deleteEmployee = createAction<number>('DELETE_EMPLOYEE');
export const incDeleteEmpProcesses = createAction<number>('INC_DELETE_EMP_PROCESSES');
export const decDeleteEmpProcesses = createAction<number>('DEC_DELETE_EMP_PROCESSES');
export const addToDeleteEmp = createAction<number>('ADD_TO_DELETE_EMP');

export const editEmployee = createAction<Employee>('EDIT_EMPLOYEE');
export const redEmployee = createAction<Employee>('RED_EMPLOYEE');
export const addToEditEmp = createAction<Employee>('ADD_TO_EDIT_EMP');
export const incEditEmpProcesses = createAction('INC_EDIT_EMP_PROCESSES');
export const decEditEmpProcesses = createAction('DEC_EDIT_EMP_PROCESSES');
