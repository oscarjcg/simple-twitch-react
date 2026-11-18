import React from 'react';

import classes from './Chat.module.css';
import CommentList from './CommentList/CommentList';
import InputComment from './InputComment/InputComment';
import type { Comment } from '../../../types';

interface ChatProps {
    comments: Comment[] | null;
    addComment: React.KeyboardEventHandler<HTMLInputElement>;
}

const chat = (props: ChatProps) => (
    <div className={classes.Content}>
        <div className={classes.Header}>
            <p className={classes.Title}>CHAT</p>
        </div>

        <CommentList comments={props.comments}></CommentList>

        <InputComment addComment={props.addComment}></InputComment>

    </div>
);

export default chat;
