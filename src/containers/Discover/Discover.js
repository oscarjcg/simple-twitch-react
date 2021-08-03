import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import classes from './Discover.module.css';
import RecommendedList from './RecommendedList/RecommendedList';

class Discover extends Component {

    componentDidMount() {
        this.props.onLoadCategories();
        this.props.onLoadChannels();
    }

    selectCategoryHandler = (name) => {     
        this.props.history.push('/directory/game/' + name);
    }

    selectChannelHandler = (id) => {     
        this.props.history.push('/' + id);
    }

    render () {
        let height = window.innerHeight - this.props.headerHeight;
        let paddingTopBottom = 50;

        return (
            <div className={classes.Content} style={{height: height - paddingTopBottom}}>
                <RecommendedList 
                    categories={this.props.categories} 
                    name={"categories"}
                    selectCategory={this.selectCategoryHandler}></RecommendedList>  
                <RecommendedList 
                    channels={this.props.channels} 
                    name={"Simulation"}
                    selectChannel={this.selectChannelHandler}></RecommendedList>  
            </div>          
        );
    }
}

const mapStateToProps = state => {
    return {
        headerHeight: state.userInterface.headerHeight,
        categories: state.category.categories,
        channels: state.channel.channels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategories: () => dispatch(actions.fetchCategories()),
        onLoadChannels: () => dispatch(actions.fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);