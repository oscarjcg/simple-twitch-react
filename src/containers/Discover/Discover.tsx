import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as actions from '../../store/actions/index';
import withRouter, { RouterProps } from '../../shared/withRouter';
import type { AppDispatch, RootState } from '../../store';

import classes from './Discover.module.css';
import RecommendedList from './RecommendedList/RecommendedList';

const mapStateToProps = (state: RootState) => {
    return {
        headerHeight: state.userInterface.headerHeight,
        categories: state.category.categories,
        channels: state.channel.channels
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onLoadCategories: () => dispatch(actions.fetchCategories()),
        onLoadChannels: () => dispatch(actions.fetchChannels())
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type DiscoverProps = ConnectedProps<typeof connector> & RouterProps;

class Discover extends Component<DiscoverProps> {

    componentDidMount() {
        this.props.onLoadCategories();
        this.props.onLoadChannels();
    }

    selectCategoryHandler = (name: string) => {
        this.props.history.push('/directory/game/' + name);
    }

    selectChannelHandler = (id: string) => {
        this.props.history.push('/' + id);
    }

    render () {
        let height = window.innerHeight - (this.props.headerHeight ?? 0);
        let paddingTopBottom = 50;

        return (
            <div className={classes.Content} style={{height: height - paddingTopBottom}}>
                <RecommendedList
                    categories={this.props.categories}
                    name={"categories"}
                    selectCategory={this.selectCategoryHandler}></RecommendedList>
                <RecommendedList
                    channels={this.props.channels}
                    name={"Simulation"}
                    selectChannel={this.selectChannelHandler}></RecommendedList>
            </div>
        );
    }
}

export default withRouter(connector(Discover));
