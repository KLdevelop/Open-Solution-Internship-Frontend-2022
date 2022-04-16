import { createReducer } from '@reduxjs/toolkit';
import {
  addDivision,
  Division,
  redDivision,
  removeDivision,
  setDivisions,
} from 'Src/models/actions';

const initialState: { divisions: Division[] } = {
  divisions: [],
};

export const divisionsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDivisions, (state, action) => ({
      ...state,
      divisions: action.payload.divisions,
    }))
    .addCase(addDivision, (state, action) => ({
      ...state,
      divisions: [...state.divisions, action.payload],
    }))
    .addCase(removeDivision, (state, action) => {
      const id = action.payload;
      const ind = state.divisions.findIndex((el) => el.id === id);
      state.divisions.splice(ind, 1);
    })
    .addCase(redDivision, (state, action) => {
      const newDivs = [...state.divisions];
      const ind = newDivs.findIndex((org) => org.id === action.payload.id);
      newDivs[ind] = action.payload;
      return {
        ...state,
        divisions: newDivs,
      };
    });
});
