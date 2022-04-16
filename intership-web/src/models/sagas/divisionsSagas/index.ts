import { all, call } from 'redux-saga/effects';
import { watchAddDivToDelete, watchDeleteDivision } from './sagaDeleteDivision';
import { watchAddToEditDiv, watchEditDivision } from './sagaEditDivision';
import { watchFetchDivisions } from './sagaFetchDivisions';
import { watchAddDivToPost, watchPostDivision } from './sagaPostDivision';

export default function* divisionsSaga() {
  yield all([
    call(watchFetchDivisions),
    call(watchPostDivision),
    call(watchAddDivToPost),
    call(watchDeleteDivision),
    call(watchAddDivToDelete),
    call(watchEditDivision),
    call(watchAddToEditDiv),
  ]);
}
