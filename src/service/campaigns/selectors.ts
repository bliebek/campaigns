import { RootState } from "./../root-reducer";
import { Campaign } from './types';

export const data = (state:RootState):Campaign[] => state.campaigns.data;
export const loading = (state:RootState):boolean => state.campaigns.loading;
export const error = (state:RootState):any => state.campaigns.error;
