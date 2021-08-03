import axios from '../../axios/axios-category';
import * as actionsTypes from './actionTypes';
import { updateObject } from '../../shared/utility';

// All categories
export const fetchCategoriesSuccess = (categories) => {
    return {
        type: actionsTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categories
    }
}

export const fetchCategoriesFail = (error) => {
    return {
        type: actionsTypes.FETCH_CATEGORIES_FAIL,
        error: error
    }
}

export const fetchCategories = () => {
    return dispatch => {
        axios.get('/categories')
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
export const fetchCategoryChannelsSuccess = (categoryChannels) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_CHANNELS_SUCCESS,
        categoryChannels: categoryChannels
    }
}

export const fetchCategoryChannelsFail = (error) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_CHANNELS_FAIL,
        error: error
    }
}

export const fetchCategoryChannels = (name) => {
    return dispatch => {
        axios.get('/categories/' + name + '/channels')
            .then(res => {     
                dispatch(fetchCategoryChannelsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchCategoryChannelsFail(err));
            });    
    };    
}

// Category by name
export const fetchCategoryByNameSuccess = (category) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_SUCCESS,
        category: category
    }
}

export const fetchCategoryByNameFail = (error) => {
    return {
        type: actionsTypes.FETCH_CATEGORY_FAIL,
        error: error
    }
}

export const fetchCategoryByName = (name) => {
    return dispatch => {
        axios.get('/categories/name/' + name)
            .then(res => {     
                dispatch(fetchCategoryByNameSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchCategoryByNameFail(err));
            });    
    };    
}