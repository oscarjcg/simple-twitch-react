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
                    let image = 'data:image/jpeg;base64, ' + new Buffer(cat.image.data.data).toString('base64');              
                    return updateObject(cat, {image: image});               
                });            

                dispatch(fetchCategoriesSuccess(categories));
            })
            .catch(err => {
                dispatch(fetchCategoriesFail(err));
            });    
    };    
}