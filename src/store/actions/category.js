import axios from '../../axios/axios-category';
import * as actionsTypes from './actionTypes';
import { updateObject } from '../../shared/utility';

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