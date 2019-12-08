import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import CategoryListItem from './CategoryListItem/CategoryListItem';
import classes from './CategoryList.module.css';

class CategoryList extends Component {

    componentDidMount() {
        this.props.onLoadList();
    }

    render () {
        let categories = null;
        if  (this.props.categories) {
            categories = 
                this.props.categories.map(cat => (
                    <CategoryListItem 
                        key={cat.name}
                        image={cat.image}
                        name={cat.name}
                        selectCategory={this.props.selectCategory}></CategoryListItem>
                ));   
        }

        return (            
            <div className={classes.Container}>               
                {categories}
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadList: () => dispatch(actions.fetchCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);