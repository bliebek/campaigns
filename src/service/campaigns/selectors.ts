import { RootState } from "./../root-reducer";

export const campaigns = (state:RootState):string[] => state.campaigns.data;
export const loading = (state:RootState):boolean => state.campaigns.loading;
export const error = (state:RootState):any => state.campaigns.error;
