import { put, call, takeEvery } from 'redux-saga/effects';
import {
  addToEditEmp,
  decEditEmpProcesses,
  editEmployee,
  incEditEmpProcesses,
  Employee,
  redEmployee,
} from '../../actions';
import waitApi from '../waitApi';

async function employeeEdit(emp: Employee) {
  await fetch(`/api/employee/?id=${emp.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(emp),
  });
}

function* editEmployeeWorker(arg) {
  const div: Employee = arg.payload;
  yield waitApi();
  yield call(employeeEdit, div);
  yield put(redEmployee(div));
  yield put(decEditEmpProcesses());
}

function* addToEditEmpWorker(arg) {
  const div: Employee = arg.payload;
  yield put(incEditEmpProcesses());
  yield put(editEmployee(div));
}

export function* watchAddToEditEmp() {
  yield takeEvery(addToEditEmp.toString(), addToEditEmpWorker);
}

export function* watchEditEmployee() {
  yield takeEvery(editEmployee.toString(), editEmployeeWorker);
}
