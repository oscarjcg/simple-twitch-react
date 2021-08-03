import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    categories: null,
    error: null,
    categoryChannels: null,
    category: null
};

const fetchCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        categories: action.categories,
        error: null
    });  
};

const fetchCategoriesFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });      
};

const fetchCategoryChannelsSuccess = (state, action) => {
    return updateObject(state, {
        categoryChannels: action.categoryChannels,
        error: null
    });  
};

const fetchCategoryChannelsFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });      
};

const fetchCategoryByNameSuccess = (state, action) => {
    return updateObject(state, {
        category: action.category,
        error: null
    });  
};

const fetchCategoryByNameFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });      
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEGORIES_SUCCESS:           
            return fetchCategoriesSuccess(state, action);           
        case actionTypes.FETCH_CATEGORIES_FAIL:           
            return fetchCategoriesFail(state, action);
        case actionTypes.FETCH_CATEGORY_CHANNELS_SUCCESS:           
            return fetchCategoryChannelsSuccess(state, action);           
        case actionTypes.FETCH_CATEGORY_CHANNELS_FAIL:           
            return fetchCategoryChannelsFail(state, action);
        case actionTypes.FETCH_CATEGORY_SUCCESS:           
            return fetchCategoryByNameSuccess(state, action);           
        case actionTypes.FETCH_CATEGORY_FAIL:           
            return fetchCategoryByNameFail(state, action);
        default:    
            return state;
    }
}

export default reducer;