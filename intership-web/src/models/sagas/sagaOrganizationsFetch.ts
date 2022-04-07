import { put, takeEvery } from 'redux-saga/effects';
import { setOrganizations, fetchOrganizations, Organization } from '../actions';

export function* fetchOrganzationsWorker() {
  try {
    const data = yield fetch('/api/organization');
    const orgs: Organization[] = yield data.json();
    yield put(setOrganizations(orgs));
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchOrganizations() {
  yield takeEvery(fetchOrganizations.toString(), fetchOrganzationsWorker);
}
