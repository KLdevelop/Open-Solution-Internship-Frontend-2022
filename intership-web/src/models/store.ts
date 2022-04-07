import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer, organizationsReducer } from 'Src/models/reducers';
import rootSaga from './sagas';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer,
    organizations: organizationsReducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
