import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from '../../components/Game/Game';
import * as actions from '../../store/actions/index';
import Error from '../../components/UI/Error/Error';

class GameCont extends Component {
    componentDidMount() {        
        this.props.onLoadCategory(this.props.match.params.category);
        this.props.onLoadCategoryChannels(this.props.match.params.category);
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
        let filteredChannels = this.props.categoryChannels

        if (this.props.searchText) {
            filteredChannels = this.props.categoryChannels.filter(channel => {
                return channel.name.toLowerCase().includes(this.props.searchText.toLowerCase())
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
                    categoryError={this.props.channelError}
                    search={this.searchHandler} 
                    searchButton={this.searchButtonHandler}></Game>
            </div>            
        );
    }
}

const mapStateToProps = state => {
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

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategory: (name) => dispatch(actions.fetchCategoryByName(name)),
        onLoadCategoryChannels: (name) => dispatch(actions.fetchCategoryChannels(name)),
        onSearchText: (searchText) => dispatch(actions.updateSearchText(searchText)),
        onSearchTextTemp: (searchText) => dispatch(actions.updateSearchTextTemp(searchText))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCont);