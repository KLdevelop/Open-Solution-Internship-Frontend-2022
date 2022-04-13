import { all, call } from 'redux-saga/effects';
import {
  watchAddToDelete,
  watchDeleteOrganization,
} from './organizationsSagas/sagaDeleteOrganization';
import {
  watchAddToEditOrg,
  watchEditOrganization,
} from './organizationsSagas/sagaEditOrganization';
import { watchFetchOrganizations } from './organizationsSagas/sagaOrganizationsFetch';
import { watchAddToPost, watchPostOrganization } from './organizationsSagas/sagaPostOrganization';

export default function* rootSaga() {
  yield all([
    call(watchFetchOrganizations),
    call(watchPostOrganization),
    call(watchAddToPost),
    call(watchDeleteOrganization),
    call(watchAddToDelete),
    call(watchEditOrganization),
    call(watchAddToEditOrg),
  ]);
}
