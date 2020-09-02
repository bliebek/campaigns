import { call, put, takeLatest } from 'redux-saga/effects';

import getData from './../api/api';
import { getCampaignsDataRequest, getCampaignsDataSuccess, getCampaignsDataError } from './actions';

export function* campaignsDataSaga() {
    try {
        yield put(getCampaignsDataRequest());
        const data = yield call(getData);
        yield put(getCampaignsDataSuccess(data));
    } catch(e) {
        yield put(getCampaignsDataError(e));
    }
}

export function* campaignsDataSagas() {
    yield takeLatest('CAMPAIGNS_DATA', campaignsDataSaga);
}