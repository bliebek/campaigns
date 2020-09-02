import { call, put, takeLatest } from 'redux-saga/effects';

import getData from './../api/api';
import { getCampaignsListRequest, getCampaignsListSuccess, getCampaignsListError } from './actions';
import { CampaignRow } from "../campaigns-data/types";

export function* campaignsListSaga() {
    try {
        yield put(getCampaignsListRequest());
        const data = yield call(getData);
        const campaigns:Set<string> = new Set();

        data.forEach((r:CampaignRow) => {
            campaigns.add(r.Campaign);
        });

        yield put(getCampaignsListSuccess(Array.from(campaigns)));
    } catch(e) {
        yield put(getCampaignsListError(e));
    }
}

export function* campaignsListSagas() {
    yield takeLatest('CAMPAIGNS_LIST', campaignsListSaga);
}