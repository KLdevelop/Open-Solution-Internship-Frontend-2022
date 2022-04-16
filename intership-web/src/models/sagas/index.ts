import { all, call } from 'redux-saga/effects';
import divisionsSaga from './divisionsSagas';
import employeesSaga from './employeesSagas';
import organizationsSaga from './organizationsSagas';

export default function* rootSaga() {
  yield all([call(organizationsSaga), call(divisionsSaga), call(employeesSaga)]);
}
