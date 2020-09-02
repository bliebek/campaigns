import { RootState } from "./../root-reducer";
import { CampaignRow } from './types';

export const data = (state:RootState):CampaignRow[] => state.campaignsData.data;
export const selectedCampaigns = (state:RootState):string[] => state.campaignsData.filters.campaigns;
export const selectedSources = (state:RootState):string[] => state.campaignsData.filters.sources;
export const loading = (state:RootState):boolean => state.campaignsData.loading;
export const error = (state:RootState):any => state.campaignsData.error;
