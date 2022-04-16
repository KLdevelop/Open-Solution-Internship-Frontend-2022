import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addToDeleteDiv,
  decDeleteDivProcesses,
  deleteDivision,
  incDeleteDivProcesses,
  removeDivision,
} from '../../actions';
import waitApi from '../waitApi';

async function divisionDelete(id: number) {
  await fetch(`/api/division/?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({}),
  });
}

function* deleteDivisionWorker(arg) {
  const id: number = arg.payload;
  yield waitApi();
  yield call(divisionDelete, id);
  yield put(removeDivision(id));
  yield put(decDeleteDivProcesses(id));
}

function* addToDeleteDivWorker(arg) {
  const id: number = arg.payload;
  yield put(incDeleteDivProcesses(id));
  yield put(deleteDivision(id));
}

export function* watchAddDivToDelete() {
  yield takeEvery(addToDeleteDiv.toString(), addToDeleteDivWorker);
}

export function* watchDeleteDivision() {
  yield takeEvery(deleteDivision.toString(), deleteDivisionWorker);
}
