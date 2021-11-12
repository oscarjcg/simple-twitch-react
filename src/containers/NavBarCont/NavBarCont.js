import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './NavBarCont.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';
import * as actions from '../../store/actions/index';


class NavBarCont extends Component {

    state = {
        navItems: [
          {link: '/', text: 'Discover', exact: true},
          {link: '/directory', text: 'Browse', exact: false}
        ]
    }

    searchHandler = (e) => {
        // Search
        this.props.onChangeVisibilitySearchResults(true);
        this.props.onLoadSearchResults(e.target.value);

        this.props.onSearchText(e.target.value);

    }

    selectSearchHandler = (type, name) => {
        if (type === "channel") {
            this.props.history.push('/' + name);
        } else {
            this.props.history.push('/directory/game/' + name);
        }
        this.props.onChangeVisibilitySearchResults(false);

    }

    visibilitySearchResultsHandler = (visibility) => {
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

const mapStateToProps = state => {
    return {
      headerHeight: state.userInterface.headerHeight,
      navBarSearchText: state.userInterface.navBarSearchText,
      searchResults: state.userInterface.searchResults
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchText: (searchText) => dispatch(actions.updateNavBarSearchText(searchText)),
        onLoadSearchResults: (searchText) => dispatch(actions.fetchSearchResults(searchText)),
        onChangeVisibilitySearchResults: (visibility) => dispatch(actions.visibilityNavBarSearchResults(visibility))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarCont));
