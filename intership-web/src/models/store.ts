import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from 'Src/models/reducers/authReducer';
import getUserSaga from './example/sagas';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [saga],
});
saga.run(getUserSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
