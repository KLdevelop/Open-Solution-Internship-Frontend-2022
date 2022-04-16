import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addToDeleteEmp,
  decDeleteEmpProcesses,
  deleteEmployee,
  incDeleteEmpProcesses,
  removeEmployee,
} from '../../actions';
import waitApi from '../waitApi';

async function employeeDelete(id: number) {
  await fetch(`/api/employee/?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({}),
  });
}

function* deleteEmployeeWorker(arg) {
  const id: number = arg.payload;
  yield waitApi();
  yield call(employeeDelete, id);
  yield put(removeEmployee(id));
  yield put(decDeleteEmpProcesses(id));
}

function* addToDeleteEmpWorker(arg) {
  const id: number = arg.payload;
  yield put(incDeleteEmpProcesses(id));
  yield put(deleteEmployee(id));
}

export function* watchAddEmpToDelete() {
  yield takeEvery(addToDeleteEmp.toString(), addToDeleteEmpWorker);
}

export function* watchDeleteEmployee() {
  yield takeEvery(deleteEmployee.toString(), deleteEmployeeWorker);
}
