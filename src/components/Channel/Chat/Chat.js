import React from 'react';

import classes from './Chat.module.css';
import CommentList from './CommentList/CommentList';
import InputComment from './InputComment/InputComment';

const chat = (props) => (
    <div className={classes.Content}>
        <div className={classes.Header}>
            <p className={classes.Title}>CHAT</p>
        </div>

        <CommentList comments={props.comments}></CommentList>

        <InputComment addComment={props.addComment}></InputComment>

    </div>
);

export default chat;