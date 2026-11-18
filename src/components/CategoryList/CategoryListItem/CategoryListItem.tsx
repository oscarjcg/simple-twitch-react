import React from 'react';

import classes from './CategoryListItem.module.css';

interface CategoryListItemProps {
    image: string;
    name: string;
    selectCategory: (name: string) => void;
}

const categoryListItem = (props: CategoryListItemProps) => (
    <div className={classes.MainContainer}>
        <img
            className={classes.Image}
            src={props.image}
            alt={props.name}
            onClick={() => props.selectCategory(props.name)}
            ></img>
        <p
            className={classes.Item}
            onClick={() => props.selectCategory(props.name)}>{props.name}</p>
    </div>
);

export default categoryListItem;
