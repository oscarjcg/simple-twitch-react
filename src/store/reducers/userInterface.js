import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    headerHeight: null,
    headerChannelWidth: null,
    searchText: null,
    searchTextTemp: null

};

const updateHeaderHeight = (state, action) => {
    return updateObject(state, {
        headerHeight: action.headerHeight
    }); 
};

const updateHedaerChannelWidth = (state, action) => {
    return updateObject(state, {        
        headerChannelWidth: action.headerChannelWidth        
    });
};

const updateSearchText = (state, action) => {
    return updateObject(state, {
        searchText: action.searchText
    }); 
};

const updateSearchTextTemp = (state, action) => {
    return updateObject(state, {
        searchTextTemp: action.searchText
    }); 
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_HEADER_HEIGHT:           
            return updateHeaderHeight(state, action);
        case actionTypes.UPDATE_HEADER_CHANNEL_WIDTH:           
            return updateHedaerChannelWidth(state, action);   
        case actionTypes.UPDATE_SEARCH_TEXT:           
            return updateSearchText(state, action);   
        case actionTypes.UPDATE_SEARCH_TEXT_TEMP:           
            return updateSearchTextTemp(state, action); 
        default:    
            return state;
    };
};

export default reducer;