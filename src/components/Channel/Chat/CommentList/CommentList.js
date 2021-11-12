import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import classes from './CommentList.module.css';
import Comment from './Comment/Comment';

const CommentList = (props) => {

    let comments = null;
    const listRef = React.useRef();
    const history = useHistory()

    if (props.comments) {
        comments =
            props.comments.map(comment => (
                <Comment
                    key={comment.created_at}
                    time={comment.created_at}
                    author={comment.author}
                    comment={comment.comment}></Comment>
            ));
    }

    useEffect(() => listRef.current.scrollTo(0, listRef.current.scrollHeight, "auto"), [history]);


    return (
        <div className={classes.ContentContainer} ref={listRef}>
            {comments}
        </div>
    );

};

export default CommentList;
