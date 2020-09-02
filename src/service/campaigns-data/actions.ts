import { GenericAction, GenericActionListSuccess, GenericActionError } from './../types';
import { CampaignsDataState, CampaignRow } from './types';

const initialCampaignsDataState: CampaignsDataState = {
    data: [],
    filters: {
        sources: [],
        campaigns: []
    },
    loading: false,
    error: undefined
}

const getCampaignsData = ():GenericAction => ({
    type: 'CAMPAIGNS_DATA'
});

const getCampaignsDataRequest = ():GenericAction => ({
    type: 'CAMPAIGNS_DATA_REQUEST'
});

const getCampaignsDataSuccess = (data:CampaignRow[]):GenericActionListSuccess<CampaignRow> => ({
    type: 'CAMPAIGNS_DATA_SUCCESS',
    data
});

const getCampaignsDataError = (e:Error):GenericActionError => ({
    type: 'CAMPAIGNS_DATA_ERROR',
    e
});

const setSelectedSources = (data:string[]):GenericActionListSuccess<string> => ({
    type: 'SET_SELECTED_SOURCES',
    data
});

const setSelectedCampaigns = (data:string[]):GenericActionListSuccess<string> => ({
    type: 'SET_SELECTED_CAMPAIGNS',
    data
});

const campaignsDataReducer = (state: CampaignsDataState = initialCampaignsDataState, action: any):CampaignsDataState => {
    switch (action.type) {
        case 'CAMPAIGNS_DATA_REQUEST':
            return { ...state, loading: true, error: undefined };
        case 'CAMPAIGNS_DATA_SUCCESS':
            return {  ...state, loading: false, error: undefined, data: action.data };
        case 'CAMPAIGNS_DATA_ERROR':
            return { ...state, loading: false, error: action.e };
        case 'SET_SELECTED_SOURCES':
            return { ...state, filters: { ...state.filters, sources: action.data } };
        case 'SET_SELECTED_CAMPAIGNS':
            return { ...state, filters: { ...state.filters, campaigns: action.data } };
        default:
            return state;
    }
};

export { getCampaignsData }
export { getCampaignsDataRequest }
export { getCampaignsDataSuccess }
export { getCampaignsDataError }
export { setSelectedCampaigns }
export { setSelectedSources }
export { campaignsDataReducer }
