import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
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

    searchHandler = (e) => {     

        if (e.target.value != undefined) {
            this.props.onSearchTextTemp(e.target.value);
        }

        if (e.keyCode == 13) { // Enter
            // Search
            this.props.onSearchText(e.target.value);
            //e.target.value = "";
        } 
    }

    searchButtonHandler = () => {
        this.props.onSearchText(this.props.searchTextTemp);
    }

    render () { 
        let height = window.innerHeight - this.props.headerHeight;    
        
        // Filtering
        let filteredChannels = this.props.channels;
        let filteredCategories = this.props.categories;

        if (this.props.location.pathname === (this.props.match.url + '/all')) {
            if (this.props.searchText) {
                filteredChannels = this.props.channels.filter(channel => {
                    return channel.name.toLowerCase().includes(this.props.searchText.toLowerCase())
                });
            } 
        } else {
            filteredCategories = this.props.categories
            if (this.props.searchText) {
                filteredCategories = this.props.categories.filter(category => {
                    return category.name.toLowerCase().includes(this.props.searchText.toLowerCase())
                });
            }
        }

        // Render
        return (
            <div className={classes.Content} style={{height: height}}>
                <h1 className={classes.Title}>Browse</h1>
                <NavTab tabs={this.state.tabs}></NavTab>
                <Filter search={this.searchHandler} searchButton={this.searchButtonHandler}></Filter>                
                
                <div className={classes.List}>
                    <Switch>
                        <Route 
                            path={this.props.match.url} 
                            exact 
                            render={() => <CategoryList 
                                            categories={filteredCategories}
                                            selectCategory={this.selectCategoryHandler}
                                            error={this.props.categoryError}></CategoryList>}></Route>
                        <Route 
                            path={this.props.match.url + '/all'}  
                            render={() => <ChannelList
                                            key={this.props.location.key}
                                            channels={filteredChannels}
                                            selectChannel={this.selectChannelHandler}
                                            error={this.props.channelError}></ChannelList>}></Route>

                    </Switch>
                </div>
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
        categoryError: state.category.error,
        searchText: state.userInterface.searchText,
        searchTextTemp: state.userInterface.searchTextTemp
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategories: () => dispatch(actions.fetchCategories()),
        onLoadChannels: () => dispatch(actions.fetchChannels()),
        onSearchText: (searchText) => dispatch(actions.updateSearchText(searchText)),
        onSearchTextTemp: (searchText) => dispatch(actions.updateSearchTextTemp(searchText))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Browse));