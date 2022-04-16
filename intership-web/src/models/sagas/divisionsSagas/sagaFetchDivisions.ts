import { call, put, takeEvery } from 'redux-saga/effects';
import { setDivisions, fetchDivisions, Division } from '../../actions';
import waitApi from '../waitApi';

async function getDivisions(id: number) {
  const data = await fetch(`/api/division/?id=${id}`);
  const divs: Division[] = await data.json();
  return divs;
}

function* fetchDivisionsWorker(arg) {
  yield waitApi();
  const id: number = arg.payload;
  const divs: Division[] = yield call(getDivisions, id);
  const fetchedDivs = { divisions: divs };
  yield put(setDivisions(fetchedDivs));
}

export function* watchFetchDivisions() {
  yield takeEvery(fetchDivisions.toString(), fetchDivisionsWorker);
}
