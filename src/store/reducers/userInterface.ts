import type { UnknownAction } from '@reduxjs/toolkit';

import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';
import type { RequestError, SearchResult } from '../../types';

export interface UserInterfaceState {
    headerHeight: number | null;
    headerChannelWidth: number | null;
    searchText: string | null;
    searchTextTemp: string | null;
    navBarSearchText: string | null;
    searchResults: SearchResult[] | null;
    visibilityNavBarSearchResults: boolean;
    recommendedListMore: Record<string, boolean>;
    // Only set once a search request has finished.
    error?: RequestError | null;
}

interface UserInterfaceAction {
    type: string;
    headerHeight?: number;
    headerChannelWidth?: number;
    searchText?: string | null;
    searchResults?: SearchResult[] | null;
    error?: RequestError;
    visibilityNavBarSearchResults?: boolean;
    name?: string;
    value?: boolean;
}

const initialState: UserInterfaceState = {
    headerHeight: null,
    headerChannelWidth: null,
    searchText: null,
    searchTextTemp: null,
    navBarSearchText: null,
    searchResults: null,
    visibilityNavBarSearchResults : false,
    recommendedListMore: {}
};

const updateHeaderHeight = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        headerHeight: action.headerHeight
    });
};

const updateHedaerChannelWidth = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        headerChannelWidth: action.headerChannelWidth
    });
};

const updateSearchText = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        searchText: action.searchText
    });
};

const updateSearchTextTemp = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        searchTextTemp: action.searchText
    });
};

const updateNavBarSearchText = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        navBarSearchText: action.searchText
    });
};

const fetchSearchResultsSuccess = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        searchResults: action.searchResults,
        error: null
    });
};

const fetchSearchResultsFail = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        error: action.error
    });
};

const visibilityNavBarSearchResults = (state: UserInterfaceState, action: UserInterfaceAction) => {
    return updateObject(state, {
        visibilityNavBarSearchResults: action.visibilityNavBarSearchResults
    });
};

const updateRecommendedListMore = (state: UserInterfaceState, action: UserInterfaceAction) => {

    var obj = { ...state.recommendedListMore} ;
    obj[action.name as string] = action.value as boolean

    return updateObject(state, {
        recommendedListMore: obj
    });
};


const reducer = (state: UserInterfaceState = initialState, unknownAction: UnknownAction): UserInterfaceState => {
    const action = unknownAction as UserInterfaceAction;
    switch(action.type) {
        case actionTypes.UPDATE_HEADER_HEIGHT:
            return updateHeaderHeight(state, action);
        case actionTypes.UPDATE_HEADER_CHANNEL_WIDTH:
            return updateHedaerChannelWidth(state, action);
        case actionTypes.UPDATE_SEARCH_TEXT:
            return updateSearchText(state, action);
        case actionTypes.UPDATE_SEARCH_TEXT_TEMP:
            return updateSearchTextTemp(state, action);
        case actionTypes.UPDATE_NAVBAR_SEARCH_TEXT:
            return updateNavBarSearchText(state, action);
        case actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_SUCCESS:
            return fetchSearchResultsSuccess(state, action);
        case actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_FAIL:
            return fetchSearchResultsFail(state, action);
        case actionTypes.VISIBILITY_NAVBAR_SEARCH_RESULTS:
            return visibilityNavBarSearchResults(state, action);
        case actionTypes.UPDATE_RECOMMENDED_LIST_MORE:
            return updateRecommendedListMore(state, action);
        default:
            return state;
    };
};

export default reducer;
