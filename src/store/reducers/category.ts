import type { UnknownAction } from '@reduxjs/toolkit';

import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';
import type { Category, Channel, RequestError } from '../../types';

export interface CategoryState {
    categories: Category[] | null;
    error: RequestError | null;
    categoryChannels: Channel[] | null;
    category: Category | null;
}

interface CategoryAction {
    type: string;
    categories?: Category[];
    categoryChannels?: Channel[];
    category?: Category;
    error?: RequestError;
}

const initialState: CategoryState = {
    categories: null,
    error: null,
    categoryChannels: null,
    category: null
};

const fetchCategoriesSuccess = (state: CategoryState, action: CategoryAction) => {
    return updateObject(state, {
        categories: action.categories,
        error: null
    });
};

const fetchCategoriesFail = (state: CategoryState, action: CategoryAction) => {
    return updateObject(state, {
        error: action.error
    });
};

const fetchCategoryChannelsSuccess = (state: CategoryState, action: CategoryAction) => {
    return updateObject(state, {
        categoryChannels: action.categoryChannels,
        error: null
    });
};

const fetchCategoryChannelsFail = (state: CategoryState, action: CategoryAction) => {
    return updateObject(state, {
        error: action.error
    });
};

const fetchCategoryByNameSuccess = (state: CategoryState, action: CategoryAction) => {
    return updateObject(state, {
        category: action.category,
        error: null
    });
};

const fetchCategoryByNameFail = (state: CategoryState, action: CategoryAction) => {
    return updateObject(state, {
        error: action.error
    });
};

const reducer = (state: CategoryState = initialState, unknownAction: UnknownAction): CategoryState => {
    const action = unknownAction as CategoryAction;
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
