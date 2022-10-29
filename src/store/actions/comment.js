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
        axios.get('api/comment/' + channelId)
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
        axios.get('/api/comment/ByChannelName/' + channelName)
            .then(res => {                
                let comments = res.data.map(comment => {
                    comment.comment = comment.text
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
        var bodyFormData = new FormData();
        bodyFormData.append('channel_id', channelId);
        bodyFormData.append('author', author);
        bodyFormData.append('comment', comment);

        axios.post('/api/comment', bodyFormData)
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
