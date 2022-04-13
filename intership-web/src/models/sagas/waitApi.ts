import { delay } from 'redux-saga/effects';

export default function* waitApi() {
  while (1) {
    try {
      const resp: Response = yield fetch('/api/status');
      const { status } = resp;
      if (status === 200) break;
      else yield delay(2000);
    } catch {
      yield delay(2000);
    }
  }
}
