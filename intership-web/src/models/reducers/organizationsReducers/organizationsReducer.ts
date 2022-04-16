import { createReducer } from '@reduxjs/toolkit';
import {
  addOrganization,
  Organization,
  redOrganization,
  removeOrganization,
  setOrganizations,
} from 'Src/models/actions';

const initialState: { organizations: Organization[]; isLoaded: boolean } = {
  organizations: [],
  isLoaded: false,
};

export const organizationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOrganizations, (state, action) => ({
      ...state,
      organizations: action.payload.organizations,
      isLoaded: action.payload.isLoaded,
    }))
    .addCase(addOrganization, (state, action) => ({
      ...state,
      organizations: [...state.organizations, action.payload],
    }))
    .addCase(removeOrganization, (state, action) => {
      const id = action.payload;
      const ind = state.organizations.findIndex((el) => el.id === id);
      state.organizations.splice(ind, 1);
    })
    .addCase(redOrganization, (state, action) => {
      const newOrgs = [...state.organizations];
      const ind = newOrgs.findIndex((org) => org.id === action.payload.id);
      newOrgs[ind] = action.payload;
      return {
        ...state,
        organizations: newOrgs,
      };
    });
});
