import axios from '../../axios/axios-category';
import * as actionsTypes from './actionTypes';
import { updateObject } from '../../shared/utility';
import type { AppThunk } from '../index';
import type { Category, Channel, RequestError } from '../../types';

// All categories
export const fetchCategoriesSuccess = (categories: Category[]) => {
    return {
        type: actionsTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categories
    }
}

export const fetchCategoriesFail = (error: RequestError) => {
    return {
        type: actionsTypes.FETCH_CATEGORIES_FAIL,
        error: error
    }
}

export const fetchCategories = (): AppThunk => {
    return dispatch => {
        axios.get<Category[]>('/api/category')
            .then(res => {
                let categories = res.data.map(cat => {
                    return updateObject(cat, {});
                });

                dispatch(fetchCategoriesSuccess(categories));
            })
            .catch(err => {
                dispatch(fetchCategoriesFail(err));
            });
    };
}

// Category channels
export const fetchCategoryChannelsSuccess = (categoryChannels: Channel[]) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_CHANNELS_SUCCESS,
        categoryChannels: categoryChannels
    }
}

export const fetchCategoryChannelsFail = (error: RequestError) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_CHANNELS_FAIL,
        error: error
    }
}

export const fetchCategoryChannels = (name: string): AppThunk => {
    return dispatch => {
        axios.get<Channel[]>('/api/category/byname/' + name + '/channels')
            .then(res => {
                dispatch(fetchCategoryChannelsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchCategoryChannelsFail(err));
            });
    };
}

// Category by name
export const fetchCategoryByNameSuccess = (category: Category) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_SUCCESS,
        category: category
    }
}

export const fetchCategoryByNameFail = (error: RequestError) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_FAIL,
        error: error
    }
}

export const fetchCategoryByName = (name: string): AppThunk => {
    return dispatch => {
        axios.get<Category>('/api/category/byname/' + name)
            .then(res => {
                dispatch(fetchCategoryByNameSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchCategoryByNameFail(err));
            });
    };
}
