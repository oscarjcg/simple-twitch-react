import React from 'react';

import CategoryListItem from './CategoryListItem/CategoryListItem';
import classes from './CategoryList.module.css';

const categoryList = (props) => { 
    let categories = null;
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

    return (            
        <div className={classes.Container}>               
            {categories}
        </div>            
    );
    
}

export default categoryList;