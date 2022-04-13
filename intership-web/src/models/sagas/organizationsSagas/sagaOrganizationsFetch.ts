import { call, put, takeEvery } from 'redux-saga/effects';
import { setOrganizations, fetchOrganizations, Organization } from '../../actions';
import waitApi from '../waitApi';

async function getOrganizations() {
  const data = await fetch('/api/organization');
  const orgs: Organization[] = await data.json();
  return orgs;
}

function* fetchOrganzationsWorker() {
  yield waitApi();
  const orgs: Organization[] = yield call(getOrganizations);
  const fetchedOrgs = { organizations: orgs, isLoaded: true };
  yield put(setOrganizations(fetchedOrgs));
}

export function* watchFetchOrganizations() {
  yield takeEvery(fetchOrganizations.toString(), fetchOrganzationsWorker);
}
