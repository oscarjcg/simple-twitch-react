import React from 'react';

import classes from './CommentItem.module.css';

const commentItem = (props) => (
    <div className={classes.CommentContainer}>
        <p>{props.time}</p>
        <p >{props.username}:</p>
        <p className={classes.Comment}>{props.comment}</p>
    </div>
);

export default commentItem;