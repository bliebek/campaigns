import { GenericAction, GenericActionListSuccess, GenericActionError } from './../types';
import { CampaignsState } from './types';

const initialCampaignsState: CampaignsState = {
    data: [],
    loading: false,
    error: undefined
}

const getCampaignsList = ():GenericAction => ({
    type: 'CAMPAIGNS_LIST'
});

const getCampaignsListRequest = ():GenericAction => ({
    type: 'CAMPAIGNS_LIST_REQUEST'
});

const getCampaignsListSuccess = (data:string[]):GenericActionListSuccess<string> => ({
    type: 'CAMPAIGNS_LIST_SUCCESS',
    data
});

const getCampaignsListError = (e:Error):GenericActionError => ({
    type: 'CAMPAIGNS_LIST_ERROR',
    e
});

const campaignsListReducer = (state: CampaignsState = initialCampaignsState, action: any):CampaignsState => {
    switch (action.type) {
        case 'CAMPAIGNS_LIST_REQUEST':
            return { ...state, loading: true, error: undefined };
        case 'CAMPAIGNS_LIST_SUCCESS':
            return { ...state, loading: false, error: undefined, data: action.data };
        case 'CAMPAIGNS_LIST_ERROR':
            return { ...state, loading: false, error: action.e };
        default:
            return state;
    }
};

export { getCampaignsList }
export { getCampaignsListRequest }
export { getCampaignsListSuccess }
export { getCampaignsListError }
export { campaignsListReducer }
