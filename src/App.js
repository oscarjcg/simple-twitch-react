import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Browse from './containers/Browse/Browse';
import Discover from './containers/Discover/Discover';
import GameCont from './containers/GameCont/GameCont';

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Layout>       
          <Switch>     
            <Route path="/" exact component={Discover}></Route>
            <Route path="/directory/game/:category" component={GameCont}></Route>  
            <Route path="/directory" component={Browse}></Route>  
          </Switch>          
        </Layout>
      
      </React.Fragment>     
    );
  }  
}

export default App;
