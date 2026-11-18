import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-category';
import type { AppThunk } from '../index';
import type { RequestError, SearchResponse, SearchResult } from '../../types';

export const updateHeaderHeight = (headerHeight: number): AppThunk => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_HEADER_HEIGHT,
                headerHeight: headerHeight
            }
        );
    };
};

export const updateHeaderChannelWidth = (width: number): AppThunk => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_HEADER_CHANNEL_WIDTH,
                headerChannelWidth: width
            }
        );
    };
};

export const updateSearchText = (searchText: string | null): AppThunk => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_SEARCH_TEXT,
                searchText: searchText
            }
        );
    };
};

export const updateSearchTextTemp = (searchText: string | null): AppThunk => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_SEARCH_TEXT_TEMP,
                searchText: searchText
            }
        );
    };
};

export const updateNavBarSearchText = (searchText: string | null): AppThunk => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_NAVBAR_SEARCH_TEXT,
                searchText: searchText
            }
        );
    };
};

export const updateRecommendedListMore = (name: string, value: boolean): AppThunk => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_RECOMMENDED_LIST_MORE,
                name: name,
                value: value
            }
        );
    };
};


export const visibilityNavBarSearchResults = (visibility: boolean): AppThunk => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.VISIBILITY_NAVBAR_SEARCH_RESULTS,
                visibilityNavBarSearchResults: visibility
            }
        );
    };
};

// Fetch search results
export const fetchSearchResultsSuccess = (searchResults: SearchResult[] | null) => {
    return {
        type: actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_SUCCESS,
        searchResults: searchResults
    }
};

export const fetchSearchResultsFail = (error: RequestError) => {
    return {
        type: actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_FAIL,
        error: error
    }
};

export const fetchSearchResults = (searchText: string | null): AppThunk => {
    return dispatch => {
        if (searchText == null || searchText === "") {
            dispatch(fetchSearchResultsSuccess(null));
        } else {

            axios.get<SearchResponse>('/api/search/' + searchText)
                .then(res => {
                    var channels: SearchResult[] = res.data.channels.map(result => {
                        return Object.assign(result, { type: "channel" as const });
                    });
                    var categories: SearchResult[] = res.data.categories.map(result => {
                        return Object.assign(result, { type: "category" as const });
                    });

                    let results = [...channels, ...categories];
                    dispatch(fetchSearchResultsSuccess(results));
                })
                .catch(err => {
                    dispatch(fetchSearchResultsFail(err));
                });
        }

    };
};
