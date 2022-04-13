import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer, organizationsReducer, inProcessReducer } from 'Src/models/reducers';
import rootSaga from 'Src/models/sagas';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer,
    organizations: organizationsReducer,
    inProcess: inProcessReducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
