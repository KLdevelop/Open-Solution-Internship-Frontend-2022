import { createReducer } from '@reduxjs/toolkit';
import {
  addEmployee,
  Employee,
  redEmployee,
  removeEmployee,
  setEmployees,
} from 'Src/models/actions';

const initialState: { employees: Employee[] } = {
  employees: [],
};

export const employeesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setEmployees, (state, action) => ({
      ...state,
      employees: action.payload.employees,
    }))
    .addCase(addEmployee, (state, action) => ({
      ...state,
      employees: [...state.employees, action.payload],
    }))
    .addCase(removeEmployee, (state, action) => {
      const id = action.payload;
      const ind = state.employees.findIndex((el) => el.id === id);
      state.employees.splice(ind, 1);
    })
    .addCase(redEmployee, (state, action) => {
      const newEmps = [...state.employees];
      const ind = newEmps.findIndex((org) => org.id === action.payload.id);
      newEmps[ind] = action.payload;
      return {
        ...state,
        employees: newEmps,
      };
    });
});
