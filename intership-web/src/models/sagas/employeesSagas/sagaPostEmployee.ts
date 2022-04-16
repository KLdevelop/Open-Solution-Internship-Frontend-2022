import { call, actionChannel, ActionPattern, take, put, takeEvery } from 'redux-saga/effects';
import {
  addEmployee,
  addToPostEmp,
  decPostEmpProcesses,
  incPostEmpProcesses,
  Employee,
  postEmployee,
} from '../../actions';
import waitApi from '../waitApi';

async function employeePost(emp: Employee) {
  const resp = await fetch('/api/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(emp),
  });
  const r = await resp.json();
  return r;
}

function* postEmployeeWorker(arg) {
  const emp: Employee = arg;
  yield waitApi();
  const resp: { success: boolean; id: number } = yield call(employeePost, emp);
  emp.id = resp.id;
  yield put(decPostEmpProcesses());
  yield put(addEmployee(emp));
}

function* addToPostEmpWorker(arg) {
  const emp: Employee = arg.payload;
  yield put(incPostEmpProcesses());
  yield put(postEmployee(emp));
}

export function* watchAddEmpToPost() {
  yield takeEvery(addToPostEmp.toString(), addToPostEmpWorker);
}

export function* watchPostEmployee() {
  const channel: ActionPattern = yield actionChannel(postEmployee.toString());
  while (1) {
    const { payload } = yield take(channel);
    yield call(postEmployeeWorker, payload);
  }
}
