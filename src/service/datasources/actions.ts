import { GenericAction, GenericActionListSuccess, GenericActionError } from './../types';
import { SourcesState } from './types';

const initialSourcesState: SourcesState = {
    data: [],
    loading: false,
    error: undefined
}

const getSourcesList = ():GenericAction => ({
    type: 'SOURCES_LIST'
});

const getSourcesListRequest = ():GenericAction => ({
    type: 'SOURCES_LIST_REQUEST'
});

const getSourcesListSuccess = (data:string[]):GenericActionListSuccess<string> => ({
    type: 'SOURCES_LIST_SUCCESS',
    data
});

const getSourcesListError = (e:Error):GenericActionError => ({
    type: 'SOURCES_LIST_ERROR',
    e
});

const sourcesListReducer = (state: SourcesState = initialSourcesState, action: any):SourcesState => {
    switch (action.type) {
        case 'SOURCES_LIST_REQUEST':
            return { ...state, loading: true, error: undefined };
        case 'SOURCES_LIST_SUCCESS':
            return { ...state, loading: false, error: undefined, data: action.data };
        case 'SOURCES_LIST_ERROR':
            return { ...state, loading: false, error: action.e };
        default:
            return state;
    }
};

export { getSourcesList }
export { getSourcesListRequest }
export { getSourcesListSuccess }
export { getSourcesListError }
export { sourcesListReducer }
