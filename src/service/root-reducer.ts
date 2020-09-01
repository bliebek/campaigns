import { all, call } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { campaignsReducer } from './campaigns/actions';
import { CampaignsState } from './campaigns/types';
import {campaignsSaga} from "./campaigns/sagas";

export interface RootState {
    campaigns: CampaignsState
}

export default combineReducers({
    campaigns: campaignsReducer
});

export function* rootSaga() {
    yield all([ call(campaignsSaga) ]);
}
