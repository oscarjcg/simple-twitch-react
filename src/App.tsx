import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Browse from './containers/Browse/Browse';
import Discover from './containers/Discover/Discover';
import GameCont from './containers/GameCont/GameCont';
import ChannelCont from './containers/ChannelCont/ChannelCont';
import * as actions from './store/actions/index';
import type { AppDispatch, RootState } from './store';

const mapStateToProps = (state: RootState) => {
  return {
    headerHeight: state.userInterface.headerHeight
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
      onUpdateHeaderHeight: (height: number) => dispatch(actions.updateHeaderHeight(height))
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

class App extends Component<AppProps> {

  headerHeightHandler = (height: number) => {
    this.props.onUpdateHeaderHeight(height);
  }

  render () {
    return (
      <React.Fragment>
        <Layout
          headerHeight={this.headerHeightHandler}>
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/directory/game/:category" element={<GameCont />} />
            <Route path="/directory/*" element={<Browse />} />
            <Route path="/:channel" element={<ChannelCont />} />
          </Routes>
        </Layout>

      </React.Fragment>
    );
  }
}

export default connector(App);
