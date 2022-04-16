import { createReducer } from '@reduxjs/toolkit';
import {
  decDeleteEmpProcesses,
  decEditEmpProcesses,
  decPostEmpProcesses,
  incDeleteEmpProcesses,
  incEditEmpProcesses,
  incPostEmpProcesses,
} from 'Src/models/actions';

const initialState = {
  postProcesses: 0,
  deleteProcesses: 0,
  editProcesses: 0,
  deleteArr: new Array<number>(),
};

export const empInProcessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incPostEmpProcesses, (state) => ({
      ...state,
      postProcesses: state.postProcesses + 1,
    }))
    .addCase(incDeleteEmpProcesses, (state, action) => ({
      ...state,
      deleteProcesses: state.deleteProcesses + 1,
      deleteArr: [...state.deleteArr, action.payload],
    }))
    .addCase(decPostEmpProcesses, (state) => ({
      ...state,
      postProcesses: state.postProcesses - 1,
    }))
    .addCase(decDeleteEmpProcesses, (state, action) => {
      const ind = state.deleteArr.indexOf(action.payload);
      return {
        ...state,
        deleteArr: [...state.deleteArr.slice(0, ind), ...state.deleteArr.slice(ind + 1)],
        deleteProcesses: state.deleteProcesses - 1,
      };
    })
    .addCase(incEditEmpProcesses, (state) => ({
      ...state,
      editProcesses: state.editProcesses + 1,
    }))
    .addCase(decEditEmpProcesses, (state) => ({
      ...state,
      editProcesses: state.editProcesses - 1,
    }));
});
