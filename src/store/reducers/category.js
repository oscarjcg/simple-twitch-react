import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    categories: null,
    error: null
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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEGORIES_SUCCESS:           
            return fetchCategoriesSuccess(state, action);           
        case actionTypes.FETCH_CATEGORIES_FAIL:           
            return fetchCategoriesFail(state, action);
        default:    
            return state;
    }
}

export default reducer;