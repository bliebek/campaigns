import { GenericAction, GenericActionListSuccess, GenericActionError } from './../types';
import { CampaignsState, Campaign } from './types';

const initialCampaignsState: CampaignsState = {
    data: [],
    campaigns: [],
    sources: [],
    selectedSources: [],
    selectedCampaigns: [],
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

const setSelectedSources = (data:string[]):GenericActionListSuccess<string> => ({
    type: 'SET_SELECTED_SOURCES',
    data
});

const setSelectedCampaigns = (data:string[]):GenericActionListSuccess<string> => ({
    type: 'SET_SELECTED_CAMPAIGNS',
    data
});

const campaignsReducer = (state: CampaignsState = initialCampaignsState, action: any):CampaignsState => {
    switch (action.type) {
        case 'CAMPAIGNS_DATA_REQUEST':
            return { ...state, loading: true, error: undefined };
        case 'CAMPAIGNS_DATA_SUCCESS':
            const campaigns:Set<string> = new Set();
            const sources:Set<string> = new Set();

            action.data.forEach((r:Campaign) => {
                campaigns.add(r.Campaign);
                sources.add(r.Datasource);
            });

            return {
                ...state,
                loading: false,
                error: undefined,
                data: action.data,
                campaigns: Array.from(campaigns),
                sources: Array.from(sources),
            };
        case 'CAMPAIGNS_DATA_ERROR':
            return { ...state, loading: false, error: action.e };
        case 'SET_SELECTED_SOURCES':
            return { ...state, selectedSources: action.data };
        case 'SET_SELECTED_CAMPAIGNS':
            return { ...state, selectedCampaigns: action.data };
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
export { campaignsReducer }
