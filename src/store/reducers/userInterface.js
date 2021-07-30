import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    headerHeight: null,
    headerChannelWidth: null,
    searchText: null,
    searchTextTemp: null,
    navBarSearchText: null,
    searchResults: null,
    visibilityNavBarSearchResults : false
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

const updateNavBarSearchText = (state, action) => {
    return updateObject(state, {
        navBarSearchText: action.searchText
    }); 
};

const fetchSearchResultsSuccess = (state, action) => {
    return updateObject(state, {
        searchResults: action.searchResults, 
        error: null
    });
};

const fetchSearchResultsFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const visibilityNavBarSearchResults = (state, action) => {
    return updateObject(state, {
        visibilityNavBarSearchResults: action.visibilityNavBarSearchResults
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
        case actionTypes.UPDATE_NAVBAR_SEARCH_TEXT:
            return updateNavBarSearchText(state, action);
        case actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_SUCCESS:  
            return fetchSearchResultsSuccess(state, action);
        case actionTypes.FETCH_NAVBAR_SEARCH_RESULTS_FAIL:  
            return fetchSearchResultsFail(state, action);
        case actionTypes.VISIBILITY_NAVBAR_SEARCH_RESULTS:  
            return visibilityNavBarSearchResults(state, action);
        default:
            return state;
    };
};

export default reducer;