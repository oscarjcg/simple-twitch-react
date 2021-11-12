import React from 'react';

import classes from './InputComment.module.css';

const inputComment = (props) => (
    <div className={classes.InputCommentContainer}>

        <br></br>
        <div className={classes.ActivePurple}>
            <input

                type="text"
                onKeyDown={props.addComment}
                placeholder="Send a message">
                </input>
        </div>
    </div>
);

export default inputComment;
