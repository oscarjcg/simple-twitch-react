import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Game from '../../components/Game/Game';
import * as actions from '../../store/actions/index';
import withRouter, { RouterProps } from '../../shared/withRouter';
import type { AppDispatch, RootState } from '../../store';
import type { SearchInputEvent } from '../../types';

const mapStateToProps = (state: RootState) => {
    return {
        categories: state.category.categories,
        channels: state.channel.channels,
        headerHeight: state.userInterface.headerHeight,
        channelError: state.channel.error,
        categoryError: state.category.error,
        categoryChannels: state.category.categoryChannels,
        category: state.category.category,
        searchText: state.userInterface.searchText,
        searchTextTemp: state.userInterface.searchTextTemp
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onLoadCategory: (name: string) => dispatch(actions.fetchCategoryByName(name)),
        onLoadCategoryChannels: (name: string) => dispatch(actions.fetchCategoryChannels(name)),
        onSearchText: (searchText: string | null) => dispatch(actions.updateSearchText(searchText)),
        onSearchTextTemp: (searchText: string) => dispatch(actions.updateSearchTextTemp(searchText))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameContProps = ConnectedProps<typeof connector> & RouterProps;

class GameCont extends Component<GameContProps> {
    componentDidMount() {
        this.props.onLoadCategory(this.props.match.params.category);
        this.props.onLoadCategoryChannels(this.props.match.params.category);
    }

    selectChannelHandler = (id: string) => {
        this.props.history.push('/' + id);
    }

    searchHandler = (e: SearchInputEvent) => {
        const value = (e.target as HTMLInputElement).value;

        if (value !== undefined) {
            this.props.onSearchTextTemp(value);
        }

        if ((e as React.KeyboardEvent).keyCode === 13) { // Enter
            // Search
            this.props.onSearchText(value);
            //e.target.value = "";
        }
    }

    searchButtonHandler = () => {
        this.props.onSearchText(this.props.searchTextTemp);
    }

    render () {
        let height = window.innerHeight - (this.props.headerHeight ?? 0);

        // Filtering
        let filteredChannels = this.props.categoryChannels

        const searchText = this.props.searchText;
        if (searchText && this.props.categoryChannels) {
            filteredChannels = this.props.categoryChannels.filter(channel => {
                return channel.name.toLowerCase().includes(searchText.toLowerCase())
            });
        }

        return (
            <div>
                <Game
                    height= {height}
                    category={this.props.category}
                    channels={filteredChannels}
                    selectChannel={this.selectChannelHandler}
                    channelError={this.props.categoryError}
                    categoryError={this.props.categoryError}
                    search={this.searchHandler}
                    searchButton={this.searchButtonHandler}></Game>
            </div>
        );
    }
}

export default withRouter(connector(GameCont));
