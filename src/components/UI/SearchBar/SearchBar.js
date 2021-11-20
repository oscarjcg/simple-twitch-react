import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './SearchBar.module.css';
import SearchIcon from '../../../shared/Icons/SearchIcon';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.visibilitySearchResults)
                this.props.visibilitySearchResults(false);
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    buildResult() {
        // Search result in dropdown. Channels and categories
        let results = null;
        if (this.props.searchResult) {
            results = this.props.searchResult.map(result => {
                if (result.type === "channel")
                    return (
                        <div className={classes.Container} key={result.name}>
                            <img
                                src={result.image}
                                alt={result.name}
                                height="30"
                                className={classes.ImageChannel}
                                onClick={() => this.props.selectSearch(result.type, result.name)}></img>
                            <a onClick={() => this.props.selectSearch(result.type, result.name)} className={classes.SearchItem}>{result.name}</a>
                        </div>
                    );
                else {
                    return (
                        <div className={classes.Container} key={result.name}>
                            <img
                                src={result.image}
                                alt={result.name}
                                height="30"
                                width="30"
                                className={classes.ImageCategory}
                                onClick={() => this.props.selectSearch(result.type, result.name)}></img>
                            <a onClick={() => this.props.selectSearch(result.type, result.name)} className={classes.SearchItem}>{result.name}</a>
                        </div>
                    );
                }
            });
        }
        return results;
    }

    render () {
        let results = this.buildResult();
        if (!this.props.visibilityNavBarSearchResults)
            results = null;

        return (
            <div ref={this.wrapperRef} className={classes.ContainerSearchBar}>
                <div className={[classes.SearchBar, classes.ActivePurple].join(' ')}>
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={this.props.search}
                        onKeyDown={this.props.search}></input>

                        <div className={classes.SearchItemContainer}>
                            { results }
                        </div>

                </div>

                <div
                    className={classes.IconContainer}
                    onClick={this.props.searchButton}>
                    <SearchIcon
                        width={36}
                        fill="rgb(85, 85, 85)"
                        color="white"
                        className={classes.Icon}></SearchIcon>
                </div>
            </div>
        );
    }

};


const mapStateToProps = state => {
    return {
        visibilityNavBarSearchResults: state.userInterface.visibilityNavBarSearchResults
    };
};

export default connect(mapStateToProps)(SearchBar);
