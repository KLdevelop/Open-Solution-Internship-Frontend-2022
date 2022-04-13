import { createReducer } from '@reduxjs/toolkit';
import {
  decDeleteOrgProcesses,
  decEditOrgProcesses,
  decPostOrgProcesses,
  incDeleteOrgProcesses,
  incEditOrgProcesses,
  incPostOrgProcesses,
} from '../actions';

const initialState = {
  postProcesses: 0,
  deleteProcesses: 0,
  editProcesses: 0,
  deleteArr: new Array<number>(),
};

export const inProcessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incPostOrgProcesses, (state) => ({
      ...state,
      postProcesses: state.postProcesses + 1,
    }))
    .addCase(incDeleteOrgProcesses, (state, action) => ({
      ...state,
      deleteProcesses: state.deleteProcesses + 1,
      deleteArr: [...state.deleteArr, action.payload],
    }))
    .addCase(decPostOrgProcesses, (state) => ({
      ...state,
      postProcesses: state.postProcesses - 1,
    }))
    .addCase(decDeleteOrgProcesses, (state, action) => {
      const ind = state.deleteArr.indexOf(action.payload);
      return {
        ...state,
        deleteArr: [...state.deleteArr.slice(0, ind), ...state.deleteArr.slice(ind + 1)],
        deleteProcesses: state.deleteProcesses - 1,
      };
    })
    .addCase(incEditOrgProcesses, (state) => ({
      ...state,
      editProcesses: state.editProcesses + 1,
    }))
    .addCase(decEditOrgProcesses, (state) => ({
      ...state,
      editProcesses: state.editProcesses - 1,
    }));
});
