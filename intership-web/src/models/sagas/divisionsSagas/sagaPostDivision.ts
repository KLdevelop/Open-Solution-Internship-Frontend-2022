import { call, actionChannel, ActionPattern, take, put, takeEvery } from 'redux-saga/effects';
import {
  addDivision,
  addToPostDiv,
  decPostDivProcesses,
  incPostDivProcesses,
  Division,
  postDivision,
} from '../../actions';
import waitApi from '../waitApi';

async function divisionPost(div: Division) {
  const resp = await fetch('/api/division', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(div),
  });
  const r = await resp.json();
  return r;
}

function* postDivisionWorker(arg) {
  const div: Division = arg;
  yield waitApi();
  const resp: { success: boolean; id: number } = yield call(divisionPost, div);
  div.id = resp.id;
  yield put(decPostDivProcesses());
  yield put(addDivision(div));
}

function* addToPostDivWorker(arg) {
  const div: Division = arg.payload;
  yield put(incPostDivProcesses());
  yield put(postDivision(div));
}

export function* watchAddDivToPost() {
  yield takeEvery(addToPostDiv.toString(), addToPostDivWorker);
}

export function* watchPostDivision() {
  const channel: ActionPattern = yield actionChannel(postDivision.toString());
  while (1) {
    const { payload } = yield take(channel);
    yield call(postDivisionWorker, payload);
  }
}
