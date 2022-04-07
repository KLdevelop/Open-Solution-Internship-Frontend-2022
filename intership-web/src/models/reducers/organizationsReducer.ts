import { createReducer } from '@reduxjs/toolkit';
import { Organization, setOrganizations } from '../actions';

const initialState: { organizations: Organization[] } = {
  organizations: [],
};

export const organizationsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setOrganizations, (state, action) => ({
    ...state,
    organizations: action.payload,
  }));
});
