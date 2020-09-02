import { call, put, takeLatest } from 'redux-saga/effects';

import getData from './../api/api';
import { getSourcesListRequest, getSourcesListSuccess, getSourcesListError } from './actions';
import { CampaignRow } from "../campaigns-data/types";

export function* sourcesListSaga() {
    try {
        yield put(getSourcesListRequest());
        const data = yield call(getData);
        const sources:Set<string> = new Set();

        data.forEach((r:CampaignRow) => {
            sources.add(r.Datasource);
        });

        yield put(getSourcesListSuccess(Array.from(sources)));
    } catch(e) {
        yield put(getSourcesListError(e));
    }
}

export function* sourcesListSagas() {
    yield takeLatest('SOURCES_LIST', sourcesListSaga);
}