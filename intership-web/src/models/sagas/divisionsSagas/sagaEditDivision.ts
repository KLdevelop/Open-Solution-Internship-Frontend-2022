import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addToEditDiv,
  decEditDivProcesses,
  editDivision,
  incEditDivProcesses,
  Division,
  redDivision,
} from '../../actions';
import waitApi from '../waitApi';

async function divisionEdit(div: Division) {
  await fetch(`/api/division/?id=${div.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(div),
  });
}

function* editDivisionWorker(arg) {
  const div: Division = arg.payload;
  yield waitApi();
  yield call(divisionEdit, div);
  yield put(redDivision(div));
  yield put(decEditDivProcesses());
}

function* addToEditDivWorker(arg) {
  const div: Division = arg.payload;
  yield put(incEditDivProcesses());
  yield put(editDivision(div));
}

export function* watchAddToEditDiv() {
  yield takeEvery(addToEditDiv.toString(), addToEditDivWorker);
}

export function* watchEditDivision() {
  yield takeEvery(editDivision.toString(), editDivisionWorker);
}
