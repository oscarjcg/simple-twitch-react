import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { Switch, Route} from 'react-router-dom';
import classes from './Browse.module.css';
import NavTab from '../../components/Navigation/NavTab/NavTab';
import CategoryList from '../../components/CategoryList/CategoryList';
import ChannelList from '../../components/ChannelList/ChannelList';
import Filter from '../../components/UI/Filter/Filter';   

class Browse extends Component {

    state = {
        tabs: [
            {link: "/directory", text: "Categories", exact: true},
            {link: "/directory/all", text: "Live Channels", exact: true}
        ]
    }
    
    componentDidMount() {
        this.props.onLoadCategories();
        this.props.onLoadChannels();
    }

    selectCategoryHandler = (id) => {     
        this.props.history.push('/directory/game/' + id);
    }

    selectChannelHandler = (id) => {     
        this.props.history.push('/' + id);
    }

    render () { 
        let height = window.innerHeight - this.props.headerHeight;       

        return (
            <div className={classes.Content} style={{height: height}}>
                <h1 className={classes.Title}>Browse</h1>
                <NavTab tabs={this.state.tabs}></NavTab>
                <Filter></Filter>                
                    
                <Switch>
                    <Route 
                        path={this.props.match.url} 
                        exact 
                        render={() => <CategoryList 
                                        categories={this.props.categories}
                                        selectCategory={this.selectCategoryHandler}
                                        error={this.props.categoryError}></CategoryList>}></Route>
                    <Route 
                        path={this.props.match.url + '/all'}  
                        render={() => <ChannelList
                                        channels={this.props.channels}
                                        selectChannel={this.selectChannelHandler}
                                        error={this.props.channelError}></ChannelList>}></Route>
                    
                </Switch>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        channels: state.channel.channels,
        headerHeight: state.userInterface.headerHeight,
        channelError: state.channel.error,
        categoryError: state.category.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategories: () => dispatch(actions.fetchCategories()),
        onLoadChannels: () => dispatch(actions.fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse);