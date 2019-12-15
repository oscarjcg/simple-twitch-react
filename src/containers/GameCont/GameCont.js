import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from '../../components/Game/Game';
import * as actions from '../../store/actions/index';
import Error from '../../components/UI/Error/Error';

class GameCont extends Component {
    componentDidMount() {        
        this.props.onLoadCategories();
        this.props.onLoadChannels();
    }

    selectChannelHandler = (id) => {     
        this.props.history.push('/' + id);
    }

    render () {      
        let height = window.innerHeight - this.props.headerHeight;
        let category = null;
        if (this.props.categories) {
            category = 
                this.props.categories.find(cat => {
                    return cat.name === this.props.match.params.category;
                });
        };          
     
        return (
            <div>           
                <Game 
                    height= {height}
                    category={category}
                    channels={this.props.channels}
                    selectChannel={this.selectChannelHandler}
                    channelError={this.props.categoryError}
                    categoryError={this.props.channelError}></Game>
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
        categoryError: state.category.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategories: () => dispatch(actions.fetchCategories()),
        onLoadChannels: () => dispatch(actions.fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCont);