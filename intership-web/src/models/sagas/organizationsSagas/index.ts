import { all, call } from 'redux-saga/effects';
import { watchAddOrgToDelete, watchDeleteOrganization } from './sagaDeleteOrganization';
import { watchAddToEditOrg, watchEditOrganization } from './sagaEditOrganization';
import { watchFetchOrganizations } from './sagaFetchOrganizations';
import { watchAddToPost, watchPostOrganization } from './sagaPostOrganization';

export default function* organizationsSaga() {
  yield all([
    call(watchFetchOrganizations),
    call(watchPostOrganization),
    call(watchAddToPost),
    call(watchDeleteOrganization),
    call(watchAddOrgToDelete),
    call(watchEditOrganization),
    call(watchAddToEditOrg),
  ]);
}
