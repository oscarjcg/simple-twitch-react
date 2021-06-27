import axios from '../../axios/axios-category';
import * as actionsTypes from './actionTypes';
import { updateObject } from '../../shared/utility';

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

export const fetchComments = () => {
    return dispatch => {
        /*
        axios.get('/comments')
            .then(res => {                
                let comments = res.data.map(comment => {
                    return comment;               
                });            

                dispatch(fetchCommentsSuccess(comments));
            })
            .catch(err => {
                dispatch(fetchCommentsFail(err));
            });         
        */

        // Test
        let comments = [
            {"username" : "user1", "time" : "1", "comment" : "dasdas1"},
            {"username" : "user2", "time" : "5", "comment" : "dsdsa sd asas sda sdas2"},
            {"username" : "user3", "time" : "6", "comment" : "dsdsa sd s das dassd asa3"}

        ]
        dispatch(fetchCommentsSuccess(comments));

    };    
};

export const addComment = (comment) => {
    return dispatch => {


        // Test
    
        dispatch({
            type: actionsTypes.ADD_COMMENT_SUCCESS,
            comment: comment
        });

    };    
};