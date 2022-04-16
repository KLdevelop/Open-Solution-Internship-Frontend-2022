import { call, put, takeEvery } from 'redux-saga/effects';
import { setEmployees, fetchEmployees, Employee } from '../../actions';
import waitApi from '../waitApi';

async function getEmployees(id: number) {
  const data = await fetch(`/api/employee/?id=${id}`);
  const divs: Employee[] = await data.json();
  return divs;
}

function* fetchEmployeesWorker(arg) {
  yield waitApi();
  const id: number = arg.payload;
  const emps: Employee[] = yield call(getEmployees, id);
  const fetchedEmps = { employees: emps };
  yield put(setEmployees(fetchedEmps));
}

export function* watchFetchEmployees() {
  yield takeEvery(fetchEmployees.toString(), fetchEmployeesWorker);
}
