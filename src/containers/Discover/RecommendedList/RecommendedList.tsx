import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import classes from './RecommendedList.module.css';
import * as actions from '../../../store/actions/index';
import type { AppDispatch, RootState } from '../../../store';
import type { Category, Channel, RequestError } from '../../../types';

import CategoryList from '../../../components/CategoryList/CategoryList';
import ChannelList from '../../../components/ChannelList/ChannelList';

const WIDTH_CATEGORY_ITEM = 150 + 15;
const WIDTH_CHANNEL_ITEM = 340;

// A list shows either categories (with selectCategory) or channels (with selectChannel).
interface OwnProps {
    name: string;
    categories?: Category[] | null;
    channels?: Channel[] | null;
    selectCategory?: (name: string) => void;
    selectChannel?: (name: string) => void;
    categoryError?: RequestError | null;
    channelError?: RequestError | null;
}

const mapStateToProps = (state: RootState) => {
    return {
      headerHeight: state.userInterface.headerHeight,
      recommendedListMore: state.userInterface.recommendedListMore
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        onMore: (name: string, value: boolean) => dispatch(actions.updateRecommendedListMore(name, value))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type RecommendedListProps = OwnProps & ConnectedProps<typeof connector>;

class RecommendedList extends Component<RecommendedListProps> {

    containerList = React.createRef<HTMLDivElement>();

    moreHandler = () => {
        this.props.onMore(this.props.name, false);
    }

    calculateSizeList(rows = 1) {
        const width = this.containerList.current!.clientWidth;
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

        if (filteredCategories != null && this.containerList.current != null) { // Categories
            // Init values
            if (!this.props.recommendedListMore.hasOwnProperty(this.props.name)) {
                let more = (filteredCategories.length > this.calculateSizeList(1)) ? true : false;
                this.props.onMore(this.props.name, more);
            }

            if (this.props.recommendedListMore[this.props.name])
                filteredCategories = filteredCategories.slice(0, this.calculateSizeList(1));
            else
                filteredCategories = filteredCategories.slice(0, this.calculateSizeList(2));

            list =
            <CategoryList
                categories={filteredCategories}
                selectCategory={this.props.selectCategory!}
                error={this.props.categoryError}></CategoryList>
        } else if (filteredChannels != null && this.containerList.current != null) { // Channels
            // Init values
            if (!this.props.recommendedListMore.hasOwnProperty(this.props.name)) {
                let more = (filteredChannels.length > this.calculateSizeList(1)) ? true : false;
                this.props.onMore(this.props.name, more);
            }

            if (this.props.recommendedListMore[this.props.name])
                filteredChannels = filteredChannels.slice(0, this.calculateSizeList(1));
            else
                filteredChannels = filteredChannels.slice(0, this.calculateSizeList(2));
            list =
                <ChannelList
                    channels={filteredChannels}
                    selectChannel={this.props.selectChannel!}
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
                <h4 className={classes.Title}>Recommended <span className={classes.LinkCategory}>{ this.props.name }</span></h4>

                <div ref={this.containerList}>
                    { list }
                </div>

                { more }

            </div>
        );
    }
}

export default connector(RecommendedList);
