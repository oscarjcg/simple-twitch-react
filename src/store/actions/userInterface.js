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