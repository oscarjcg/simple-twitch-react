import React from 'react';

import classes from './CommentList.module.css';
import Comment from './Comment/Comment';

const commentList = (props) => {

    let comments = null;

    if (props.comments) {
        comments =
            props.comments.map(comment => (
                <Comment 
                    key={comment.time}
                    time={comment.time} 
                    username={comment.username} 
                    comment={comment.comment}></Comment>
            ));
    }

    return (
        <div className={classes.ContentContainer}>
            {comments}
        </div>
    );
    
};

export default commentList;