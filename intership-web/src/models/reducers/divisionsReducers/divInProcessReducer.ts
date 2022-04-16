import { createReducer } from '@reduxjs/toolkit';
import {
  decDeleteDivProcesses,
  decEditDivProcesses,
  decPostDivProcesses,
  incDeleteDivProcesses,
  incEditDivProcesses,
  incPostDivProcesses,
} from 'Src/models/actions';

const initialState = {
  postProcesses: 0,
  deleteProcesses: 0,
  editProcesses: 0,
  deleteArr: new Array<number>(),
};

export const divInProcessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incPostDivProcesses, (state) => ({
      ...state,
      postProcesses: state.postProcesses + 1,
    }))
    .addCase(incDeleteDivProcesses, (state, action) => ({
      ...state,
      deleteProcesses: state.deleteProcesses + 1,
      deleteArr: [...state.deleteArr, action.payload],
    }))
    .addCase(decPostDivProcesses, (state) => ({
      ...state,
      postProcesses: state.postProcesses - 1,
    }))
    .addCase(decDeleteDivProcesses, (state, action) => {
      const ind = state.deleteArr.indexOf(action.payload);
      return {
        ...state,
        deleteArr: [...state.deleteArr.slice(0, ind), ...state.deleteArr.slice(ind + 1)],
        deleteProcesses: state.deleteProcesses - 1,
      };
    })
    .addCase(incEditDivProcesses, (state) => ({
      ...state,
      editProcesses: state.editProcesses + 1,
    }))
    .addCase(decEditDivProcesses, (state) => ({
      ...state,
      editProcesses: state.editProcesses - 1,
    }));
});
