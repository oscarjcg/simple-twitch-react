import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import withRouter, { RouterProps } from '../../shared/withRouter';

import NavBar from '../../components/Navigation/NavBar/NavBar';
import * as actions from '../../store/actions/index';
import debounce from 'lodash.debounce';
import type { AppDispatch, RootState } from '../../store';
import type { NavItemData, SearchInputEvent, SearchResultType } from '../../types';

const mapStateToProps = (state: RootState) => {
    return {
      headerHeight: state.userInterface.headerHeight,
      navBarSearchText: state.userInterface.navBarSearchText,
      searchResults: state.userInterface.searchResults
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onSearchText: (searchText: string) => dispatch(actions.updateNavBarSearchText(searchText)),
        onLoadSearchResults: (searchText: string | null) => dispatch(actions.fetchSearchResults(searchText)),
        onChangeVisibilitySearchResults: (visibility: boolean) => dispatch(actions.visibilityNavBarSearchResults(visibility))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type NavBarContProps = ConnectedProps<typeof connector> & RouterProps;

interface NavBarContState {
    navItems: NavItemData[];
}

class NavBarCont extends Component<NavBarContProps, NavBarContState> {

    state: NavBarContState = {
        navItems: [
          {link: '/', text: 'Discover', exact: true},
          {link: '/directory', text: 'Browse', exact: false}
        ]
    }

    searchHandler = (e: SearchInputEvent) => {
        // Search
        this.props.onChangeVisibilitySearchResults(true);
        this.props.onSearchText((e.target as HTMLInputElement).value);
        this.debouncedSearch()
    }

    debouncedSearch = debounce(() => this.props.onLoadSearchResults(this.props.navBarSearchText), 300);

    selectSearchHandler = (type: SearchResultType, name: string) => {
        if (type === "channel") {
            this.props.history.push('/' + name);
        } else {
            this.props.history.push('/directory/game/' + name);
        }
        this.props.onChangeVisibilitySearchResults(false);

    }

    visibilitySearchResultsHandler = (visibility: boolean) => {
        this.props.onChangeVisibilitySearchResults(visibility);
    }

    searchButtonHandler = () => {
        this.props.onChangeVisibilitySearchResults(true);
        this.props.onLoadSearchResults(this.props.navBarSearchText);
    }

    render () {

        return (
            <NavBar
                items={this.state.navItems}
                search={this.searchHandler}
                searchButton={this.searchButtonHandler}
                searchResult={this.props.searchResults}
                selectSearch={this.selectSearchHandler}
                visibilitySearchResults={this.visibilitySearchResultsHandler}></NavBar>
        );
    }
}

export default withRouter(connector(NavBarCont));
