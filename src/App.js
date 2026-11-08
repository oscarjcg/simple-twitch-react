import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Browse from './containers/Browse/Browse';
import Discover from './containers/Discover/Discover';
import GameCont from './containers/GameCont/GameCont';
import ChannelCont from './containers/ChannelCont/ChannelCont';
import * as actions from './store/actions/index';

class App extends Component {

  headerHeightHandler = (height) => { 
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

const mapStateToProps = state => {
  return {
    headerHeight: state.userInterface.headerHeight
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onUpdateHeaderHeight: (height) => dispatch(actions.updateHeaderHeight(height))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
