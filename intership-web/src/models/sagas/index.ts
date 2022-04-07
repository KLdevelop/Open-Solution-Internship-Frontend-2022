import { all } from 'redux-saga/effects';
import { watchFetchOrganizations } from './sagaOrganizationsFetch';

export default function* rootSaga() {
  yield all([watchFetchOrganizations()]);
}
