import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { Switch, Route} from 'react-router-dom';
import classes from './Browse.module.css';
import NavTab from '../../components/Navigation/NavTab/NavTab';
import CategoryList from '../../components/CategoryList/CategoryList';
import ChannelList from '../../components/ChannelList/ChannelList';
import SearchBar from '../../components/UI/SearchBar/SearchBar';    

class Browse extends Component {

    componentDidMount() {
        this.props.onLoadCategories();
        this.props.onLoadChannels();
    }

    selectCategoryHandler = (id) => {     
        this.props.history.push('/directory/game/' + id);
    }

    render () {
        let headerHeight = 54;
        let height = window.innerHeight - headerHeight;

        let tabs = [
            {link: "/directory", text: "Categories"},
            {link: "/directory/all", text: "Live Channels"}
        ];

        return (
            <div className={classes.Content} style={{height: height}}>
                <h1 className={classes.Title}>Browse</h1>
                <NavTab tabs={tabs}></NavTab>
                <h2 className={classes.Title}>Search</h2>
                {/* <div>
                    <SearchBar></SearchBar>
                </div> */}
                

                <Switch>
                    <Route 
                        path={this.props.match.url} 
                        exact 
                        render={() => <CategoryList 
                                        categories={this.props.categories}
                                        selectCategory={this.selectCategoryHandler}></CategoryList>}></Route>
                    <Route 
                        path={this.props.match.url + '/all'}  
                        render={() => <ChannelList
                                        channels={this.props.channels}></ChannelList>}></Route>
                    
                </Switch>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Browse);