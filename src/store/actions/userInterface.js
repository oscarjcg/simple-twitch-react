import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-category';

export const updateHeaderHeight = (headerHeight) => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_HEADER_HEIGHT,
                headerHeight: headerHeight
            }
        );
    };    
};

export const updateHeaderChannelWidth = (width) => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_HEADER_CHANNEL_WIDTH,
                headerChannelWidth: width
            }
        );
    };    
};

export const updateSearchText = (searchText) => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_SEARCH_TEXT,
                searchText: searchText
            }
        );
    };    
};

export const updateSearchTextTemp = (searchText) => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_SEARCH_TEXT_TEMP,
                searchText: searchText
            }
        );
    };    
};

export const updateNavBarSearchText = (searchText) => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.UPDATE_NAVBAR_SEARCH_TEXT,
                searchText: searchText
            }
        );
    };    
};

export const updateRecommendedListMore = (name, value) => {
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


export const visibilityNavBarSearchResults = (visibility) => {
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
export const fetchSearchResultsSuccess = (searchResults) => {
    return {
        type: actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_SUCCESS,
        searchResults: searchResults
    }
};

export const fetchSearchResultsFail = (error) => {
    return {
        type: actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_FAIL,
        error: error
    }
};

export const fetchSearchResults = (searchText) => {
    return dispatch => {
        if (searchText == null || searchText === "") {
            dispatch(fetchSearchResultsSuccess(null));
        } else {
            
            axios.get('/api/search/' + searchText)
                .then(res => {                
                    var channels =  res.data.channels.map(result => {
                        result.type = "channel";
                        return result;               
                    });    
                    var categories =  res.data.categories.map(result => {
                        result.type = "category";
                        return result;               
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