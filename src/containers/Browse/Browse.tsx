import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as actions from '../../store/actions/index';
import { Routes, Route } from 'react-router-dom';
import withRouter, { RouterProps } from '../../shared/withRouter';
import classes from './Browse.module.css';
import NavTab from '../../components/Navigation/NavTab/NavTab';
import CategoryList from '../../components/CategoryList/CategoryList';
import ChannelList from '../../components/ChannelList/ChannelList';
import Filter from '../../components/UI/Filter/Filter';
import debounce from 'lodash.debounce';
import type { AppDispatch, RootState } from '../../store';
import type { NavItemData, SearchInputEvent } from '../../types';

const mapStateToProps = (state: RootState) => {
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onLoadCategories: () => dispatch(actions.fetchCategories()),
        onLoadChannels: () => dispatch(actions.fetchChannels()),
        onSearchText: (searchText: string | null) => dispatch(actions.updateSearchText(searchText)),
        onSearchTextTemp: (searchText: string) => dispatch(actions.updateSearchTextTemp(searchText))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type BrowseProps = ConnectedProps<typeof connector> & RouterProps;

interface BrowseState {
    tabs: NavItemData[];
}

class Browse extends Component<BrowseProps, BrowseState> {

    state: BrowseState = {
        tabs: [
            {link: "/directory", text: "Categories", exact: true},
            {link: "/directory/all", text: "Live Channels", exact: true}
        ]
    }

    componentDidMount() {
        this.props.onLoadCategories();
        this.props.onLoadChannels();
    }

    selectCategoryHandler = (id: string) => {
        this.props.history.push('/directory/game/' + id);
    }

    selectChannelHandler = (id: string) => {
        this.props.history.push('/' + id);
    }

    searchHandler = (e: SearchInputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        if (value !== undefined) {
            this.props.onSearchTextTemp(value);
        }

        this.debouncedSearch();
    }

    debouncedSearch = debounce(() => this.props.onSearchText(this.props.searchTextTemp), 300);

    searchButtonHandler = () => {
        this.props.onSearchText(this.props.searchTextTemp);
    }

    render () {
        let height = window.innerHeight - (this.props.headerHeight ?? 0);

        // Filtering
        let filteredChannels = this.props.channels;
        let filteredCategories = this.props.categories;

        if (this.props.location.pathname.replace(/\/$/, '') === '/directory/all') {
            const searchText = this.props.searchText;
            if (searchText && this.props.channels) {
                filteredChannels = this.props.channels.filter(channel => {
                    return channel.name.toLowerCase().includes(searchText.toLowerCase())
                });
            }
        } else {
            const searchText = this.props.searchText;
            filteredCategories = this.props.categories
            if (searchText && this.props.categories) {
                filteredCategories = this.props.categories.filter(category => {
                    return category.name.toLowerCase().includes(searchText.toLowerCase())
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
                    <Routes>
                        <Route
                            index
                            element={<CategoryList
                                        categories={filteredCategories}
                                        selectCategory={this.selectCategoryHandler}
                                        error={this.props.categoryError}></CategoryList>} />
                        <Route
                            path="all"
                            element={<ChannelList
                                        key={this.props.location.key}
                                        channels={filteredChannels}
                                        selectChannel={this.selectChannelHandler}
                                        error={this.props.channelError}></ChannelList>} />
                    </Routes>
                </div>
            </div>
        );
    }
};

export default withRouter(connector(Browse));
