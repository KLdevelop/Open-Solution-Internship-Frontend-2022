import { all, call } from 'redux-saga/effects';
import { watchAddEmpToDelete, watchDeleteEmployee } from './sagaDeleteEmployee';
import { watchAddToEditEmp, watchEditEmployee } from './sagaEditEmployee';
import { watchFetchEmployees } from './sagaFetchEmployees';
import { watchAddEmpToPost, watchPostEmployee } from './sagaPostEmployee';

export default function* employeesSaga() {
  yield all([
    call(watchFetchEmployees),
    call(watchPostEmployee),
    call(watchAddEmpToPost),
    call(watchDeleteEmployee),
    call(watchAddEmpToDelete),
    call(watchEditEmployee),
    call(watchAddToEditEmp),
  ]);
}
