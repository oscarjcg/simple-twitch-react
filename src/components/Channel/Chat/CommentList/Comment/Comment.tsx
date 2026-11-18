import React from 'react';

import classes from './CommentItem.module.css';

interface CommentItemProps {
    time?: string;
    author: string;
    comment?: string;
}

const commentItem = (props: CommentItemProps) => (
    <div className={classes.CommentContainer}>
        <p >{props.author}:</p>
        <p className={classes.Comment}>{props.comment}</p>
    </div>
);

export default commentItem;
