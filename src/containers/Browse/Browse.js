import React, { Component } from 'react';

import { Switch, Route} from 'react-router-dom';
import classes from './Browse.module.css';
import NavTab from '../../components/Navigation/NavTab/NavTab';
import CategoryList from '../../components/CategoryList/CategoryList';
import ChannelList from '../../components/ChannelList/ChannelList';

class Browse extends Component {

    selectCategoryHandler = () => {
        console.log('PROPS');
    }

    render () {
        return (
            <div className={classes.Content}>
                <h1 className={classes.Title}>Browse</h1>
                <NavTab></NavTab>
                <h2 className={classes.Title}>Search</h2>

                <Switch>
                    <Route 
                        path="/directory" 
                        exact 
                        render={(props) => <CategoryList selectCategory={props.selectCategoryHandler}></CategoryList>}></Route>
                    <Route 
                        path="/directory/all" 
                        component={ChannelList}></Route>
                </Switch>     
            </div>
        );
    }
};

export default Browse;