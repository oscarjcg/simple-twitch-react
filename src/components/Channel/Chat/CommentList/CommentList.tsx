import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import classes from './CommentList.module.css';
import Comment from './Comment/Comment';
import type { Comment as CommentData } from '../../../../types';

interface CommentListProps {
    comments: CommentData[] | null;
}

const CommentList = (props: CommentListProps) => {

    let comments = null;
    const listRef = React.useRef<HTMLDivElement>(null);
    const location = useLocation();

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

    useEffect(() => {
        const list = listRef.current!;
        list.scrollTo(0, list.scrollHeight);
    }, [location]);


    return (
        <div className={classes.ContentContainer} ref={listRef}>
            {comments}
        </div>
    );

};

export default CommentList;
