import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './RecommendedList.module.css';
import * as actions from '../../../store/actions/index';

import CategoryList from '../../../components/CategoryList/CategoryList';
import ChannelList from '../../../components/ChannelList/ChannelList';

const WIDTH_CATEGORY_ITEM = 150 + 15;
const WIDTH_CHANNEL_ITEM = 340;

class RecommendedList extends Component {

    constructor(props) {
        super(props);
        this.containerList = React.createRef();
      }

    moreHandler = () => {
        this.props.onMore(this.props.name, false);
    }

    calculateSizeList(rows = 1) {
        const width = this.containerList.current.clientWidth;
        // Temporal fix for mobile
        var mobile = 0;
        if (width < WIDTH_CHANNEL_ITEM)
            mobile = 100;

        let nItems = 0;
        if (this.props.categories != null) {
          nItems = Math.floor(width / (WIDTH_CATEGORY_ITEM));
        } else {
          nItems = Math.floor(width / (WIDTH_CHANNEL_ITEM-mobile));
        }

        return rows * nItems;
    }

    render () {
        // Showing row
        let filteredChannels = this.props.channels;
        let filteredCategories = this.props.categories;

        let list = null;

        if (this.props.categories != null && this.containerList.current != null) { // Categories
            // Init values
            if (!this.props.recommendedListMore.hasOwnProperty(this.props.name)) {
                let more = (this.props.categories.length > this.calculateSizeList(1)) ? true : false;
                this.props.onMore(this.props.name, more);
            }

            if (this.props.recommendedListMore[this.props.name])
                filteredCategories = filteredCategories.slice(0, this.calculateSizeList(1));
            else
                filteredCategories = filteredCategories.slice(0, this.calculateSizeList(2));

            list =
            <CategoryList
                categories={filteredCategories}
                selectCategory={this.props.selectCategory}
                error={this.props.categoryError}></CategoryList>
        } else if (this.props.channels != null && this.containerList.current != null) { // Channels
            // Init values
            if (!this.props.recommendedListMore.hasOwnProperty(this.props.name)) {
                let more = (this.props.channels.length > this.calculateSizeList(1)) ? true : false;
                this.props.onMore(this.props.name, more);
            }

            if (this.props.recommendedListMore[this.props.name])
                filteredChannels = filteredChannels.slice(0, this.calculateSizeList(1));
            else
                filteredChannels = filteredChannels.slice(0, this.calculateSizeList(2));
            list =
                <ChannelList
                    channels={filteredChannels}
                    selectChannel={this.props.selectChannel}
                    error={this.props.channelError}></ChannelList>
        }

        // Show more
        let more = null;
        if (this.props.recommendedListMore[this.props.name])
            more =
                <div className={classes.MoreContainer}>
                    <hr className={classes.LeftLine}/>
                    <p
                        className={classes.More}
                        onClick={this.moreHandler}>
                        Show more
                    </p>
                    <hr className={classes.RightLine}/>
                </div>;


        // Render
        return (
            <div className={classes.Content} >
                <h4 className={classes.Title}>Recommended <a href="#" className={classes.LinkCategory}>{ this.props.name }</a></h4>

                <div ref={this.containerList}>
                    { list }
                </div>

                { more }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      headerHeight: state.userInterface.headerHeight,
      recommendedListMore: state.userInterface.recommendedListMore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMore: (name, value) => dispatch(actions.updateRecommendedListMore(name, value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedList);
