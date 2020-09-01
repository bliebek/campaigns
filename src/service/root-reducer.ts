import { all, call } from 'redux-saga/effects';
import { combineReducers } from 'redux';

export interface RootState {}

export default combineReducers({});

export function* rootSaga() {
    yield all([]);
}
