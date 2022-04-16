import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addToDeleteOrg,
  decDeleteOrgProcesses,
  deleteOrganization,
  incDeleteOrgProcesses,
  removeOrganization,
} from '../../actions';
import waitApi from '../waitApi';

async function organizationDelete(id: number) {
  await fetch(`/api/organization/?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({}),
  });
}

function* deleteOrganizationWorker(arg) {
  const id: number = arg.payload;
  yield waitApi();
  yield call(organizationDelete, id);
  yield put(removeOrganization(id));
  yield put(decDeleteOrgProcesses(id));
}

function* addToDeleteOrgWorker(arg) {
  const id: number = arg.payload;
  yield put(incDeleteOrgProcesses(id));
  yield put(deleteOrganization(id));
}

export function* watchAddOrgToDelete() {
  yield takeEvery(addToDeleteOrg.toString(), addToDeleteOrgWorker);
}

export function* watchDeleteOrganization() {
  yield takeEvery(deleteOrganization.toString(), deleteOrganizationWorker);
}
