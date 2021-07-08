import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    comments: null,
    error: null,
    updateComments: null
};

const fetchCommentsSuccess = (state, action) => {
    return updateObject(state, {
        comments: action.comments,
        error: null
    });  
};

const fetchCommentsFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });      
};

const addCommentSuccess = (state, action) => {
    return updateObject(state, {
        error: null
    });  
};

const updateCommentsSucess = (state, action) => {
    return updateObject(state, {
        updateComments: action.updateComments
    }); 
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_COMMENTS_SUCCESS:           
            return fetchCommentsSuccess(state, action);           
        case actionTypes.FETCH_COMMENTS_FAIL:           
            return fetchCommentsFail(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS:           
            return addCommentSuccess(state, action); 
        case actionTypes.UPDATE_COMMENTS_SUCCESS:           
            return updateCommentsSucess(state, action);    
        default:    
            return state;
    }
}

export default reducer;