import {all, fork} from 'redux-saga/effects';

import { watchBookCategoriesRequest, watchBookListRequest, watchBookRequest } from './books/sagas';

export function* rootSaga() {
  yield all([
    fork(watchBookListRequest),
    fork(watchBookRequest),
    fork(watchBookCategoriesRequest),
  ])
}