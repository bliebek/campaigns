import { RootState } from "./../root-reducer";

export const sources = (state:RootState):string[] => state.sources.data;
export const loading = (state:RootState):boolean => state.sources.loading;
export const error = (state:RootState):any => state.sources.error;
