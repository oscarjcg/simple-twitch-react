import React from 'react';

import CategoryListItem from './CategoryListItem/CategoryListItem';
import classes from './CategoryList.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Error from '../UI/Error/Error';

const categoryList = (props) => { 
    let categories = null;
    let currentState = null;
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
        currentState = props.error ? <Error></Error> : <Spinner></Spinner>;
    }    

    return (            
        <div className={classes.Container}>  
            {currentState}        
            {categories}            
        </div>            
    );
    
}

export default categoryList;