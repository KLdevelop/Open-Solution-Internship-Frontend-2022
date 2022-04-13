import { call, actionChannel, ActionPattern, take, put, takeEvery } from 'redux-saga/effects';
import {
  addOrganization,
  addToPostOrg,
  decPostOrgProcesses,
  incPostOrgProcesses,
  Organization,
  postOrganization,
} from '../../actions';
import waitApi from '../waitApi';

async function organizationPost(org: Organization) {
  const resp = await fetch('/api/organization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(org),
  });
  const r = await resp.json();
  return r;
}

function* postOrganizationWorker(arg) {
  const org: Organization = arg;
  yield waitApi();
  const resp: { success: boolean; id: number } = yield call(organizationPost, org);
  org.id = resp.id;
  yield put(decPostOrgProcesses());
  yield put(addOrganization(org));
}

function* addToPostOrgWorker(arg) {
  const org: Organization = arg.payload;
  yield put(incPostOrgProcesses());
  yield put(postOrganization(org));
}

export function* watchAddToPost() {
  yield takeEvery(addToPostOrg.toString(), addToPostOrgWorker);
}

export function* watchPostOrganization() {
  const channel: ActionPattern = yield actionChannel(postOrganization.toString());
  while (1) {
    const { payload } = yield take(channel);
    yield call(postOrganizationWorker, payload);
  }
}
