import { RootState } from "./../root-reducer";
import { Campaign } from './types';

export const data = (state:RootState):Campaign[] => state.campaigns.data;
export const sources = (state:RootState):string[] => state.campaigns.sources;
export const campaigns = (state:RootState):string[] => state.campaigns.campaigns;
export const selectedSources = (state:RootState):string[] => state.campaigns.selectedSources;
export const selectedCampaigns = (state:RootState):string[] => state.campaigns.selectedCampaigns;
export const loading = (state:RootState):boolean => state.campaigns.loading;
export const error = (state:RootState):any => state.campaigns.error;
