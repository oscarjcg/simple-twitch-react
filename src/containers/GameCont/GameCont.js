import React, { Component } from 'react';

import Game from '../../components/Game/Game';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

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
                {category ? <Game 
                                height= {height}
                                category={category}
                                channels={this.props.channels}
                                selectChannel={this.selectChannelHandler}></Game>: null}
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        channels: state.channel.channels,
        headerHeight: state.userInterface.headerHeight
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategories: () => dispatch(actions.fetchCategories()),
        onLoadChannels: () => dispatch(actions.fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCont);