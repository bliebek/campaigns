import { all, call } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { campaignsDataReducer } from './campaigns-data/actions';
import { campaignsListReducer } from './campaigns/actions';
import { sourcesListReducer } from './datasources/actions';
import { CampaignsDataState } from './campaigns-data/types';
import { CampaignsState } from './campaigns/types';
import { SourcesState } from './datasources/types';
import { campaignsDataSagas } from "./campaigns-data/sagas";
import { campaignsListSagas } from "./campaigns/sagas";
import { sourcesListSagas } from "./datasources/sagas";

export interface RootState {
    campaignsData: CampaignsDataState,
    campaigns: CampaignsState
    sources: SourcesState
}

export default combineReducers({
    campaignsData: campaignsDataReducer,
    campaigns: campaignsListReducer,
    sources: sourcesListReducer
});

export function* rootSaga() {
    yield all([ call(campaignsDataSagas), call(campaignsListSagas), call(sourcesListSagas) ]);
}
