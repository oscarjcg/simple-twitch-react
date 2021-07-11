import axios from '../../axios/axios-category';
import * as actionsTypes from './actionTypes';
import { updateObject } from '../../shared/utility';

// Fetch comments
export const fetchCommentsSuccess = (comments) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_SUCCESS,
        comments: comments
    }
};

export const fetchCommentsFail = (error) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_FAIL,
        error: error
    }
};

export const fetchComments = (channelId) => {
    return dispatch => {
        console.log("fetchComments");
        axios.get('/comments/' + channelId)
            .then(res => {                
                let comments = res.data.map(comment => {
                    return comment;               
                });            

                dispatch(fetchCommentsSuccess(comments));
            })
            .catch(err => {
                dispatch(fetchCommentsFail(err));
            });         
    };    
};

// Fetch comments by channel name
export const fetchCommentsByNameSuccess = (comments) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_SUCCESS,
        comments: comments
    }
};

export const fetchCommentsByNameFail = (error) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_FAIL,
        error: error
    }
};

export const fetchCommentsByName = (channelName) => {
    return dispatch => {
        axios.get('/comments/name/' + channelName)
            .then(res => {                
                let comments = res.data.map(comment => {
                    return comment;               
                });            

                dispatch(fetchCommentsByNameSuccess(comments));
            })
            .catch(err => {
                dispatch(fetchCommentsByNameFail(err));
            });         
    };    
};

// Add comment
export const addCommentSuccess = () => {
    return {
        type: actionsTypes.ADD_COMMENT_SUCCESS
    }
};

export const addCommentFail = (error) => {
    return {
        type: actionsTypes.ADD_COMMENT_FAIL,
        error: error
    }
};

export const addComment = (channelId, comment, author) => {
    return dispatch => {
        axios.post('/comments', {
            channel_id: channelId,
            author: author,
            comment:comment
        })
        .then(res => {              
            dispatch(addCommentSuccess());
        })
        .catch(err => {
            dispatch(addCommentFail(err));
        });  

    };    
};

// Request update
export const updateComments = (update) => {
    
    return dispatch => {
        dispatch(
            {
                type: actionsTypes.UPDATE_COMMENTS_SUCCESS,
                updateComments: update
            }
        );
    };    
};
