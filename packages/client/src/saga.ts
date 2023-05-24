import { spawn } from 'redux-saga/effects';

// Common saga
import socketSaga from './socket-saga';

//----------------------------------------------------------------------
export default function* sagas() {
  console.log('root saga run.....')
  yield spawn(socketSaga);
}
