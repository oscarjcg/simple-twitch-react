import * as actionTypes from './actionTypes';

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