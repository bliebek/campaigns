import { GenericAction, GenericActionListSuccess, GenericActionError } from './../types';
import { CampaignsState, Campaign } from './types';

const initialCampaignsState: CampaignsState = {
    data: [],
    loading: false,
    error: undefined
}

const getCampaignsData = ():GenericAction => ({
    type: 'CAMPAIGNS_DATA'
});

const getCampaignsDataRequest = ():GenericAction => ({
    type: 'CAMPAIGNS_DATA_REQUEST'
});

const getCampaignsDataSuccess = (data:Campaign[]):GenericActionListSuccess<Campaign> => ({
    type: 'CAMPAIGNS_DATA_SUCCESS',
    data
});

const getCampaignsDataError = (e:Error):GenericActionError => ({
    type: 'CAMPAIGNS_DATA_ERROR',
    e
});

const campaignsReducer = (state: CampaignsState = initialCampaignsState, action: any):CampaignsState => {
    switch (action.type) {
        case 'CAMPAIGNS_DATA_REQUEST':
            return { ...state, loading: true, error: undefined };
        case 'CAMPAIGNS_DATA_SUCCESS':
            return { ...state, loading: false, error: undefined, data: action.data };
        case 'CAMPAIGNS_DATA_ERROR':
            return { ...state, loading: false, error: action.e };
        default:
            return state;
    }
};

export { getCampaignsData }
export { getCampaignsDataRequest }
export { getCampaignsDataSuccess }
export { getCampaignsDataError }
export { campaignsReducer }
