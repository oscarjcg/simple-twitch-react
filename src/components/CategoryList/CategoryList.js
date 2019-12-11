import React from 'react';

import CategoryListItem from './CategoryListItem/CategoryListItem';
import classes from './CategoryList.module.css';
import Spinner from '../UI/Spinner/Spinner';

const categoryList = (props) => { 
    let categories = null;
    let spinner = null;
    if  (props.categories) {
        categories = 
            props.categories.map(cat => (
                <CategoryListItem 
                    key={cat.name}
                    image={cat.image}
                    name={cat.name}
                    selectCategory={props.selectCategory}></CategoryListItem>
            ));   
    } 
    else {
        spinner = <Spinner></Spinner>;
    }

    return (            
        <div className={classes.Container}>  
            {spinner}        
            {categories}            
        </div>            
    );
    
}

export default categoryList;