import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addToEditOrg,
  decEditOrgProcesses,
  editOrganization,
  incEditOrgProcesses,
  Organization,
  redOrganization,
} from '../../actions';
import waitApi from '../waitApi';

async function organizationEdit(org: Organization) {
  await fetch(`/api/organization/?id=${org.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(org),
  });
}

function* editOrganizationWorker(arg) {
  const org: Organization = arg.payload;
  yield waitApi();
  yield call(organizationEdit, org);
  yield put(redOrganization(org));
  yield put(decEditOrgProcesses());
}

function* addToEditOrgWorker(arg) {
  const org: Organization = arg.payload;
  yield put(incEditOrgProcesses());
  yield put(editOrganization(org));
}

export function* watchAddToEditOrg() {
  yield takeEvery(addToEditOrg.toString(), addToEditOrgWorker);
}

export function* watchEditOrganization() {
  yield takeEvery(editOrganization.toString(), editOrganizationWorker);
}
