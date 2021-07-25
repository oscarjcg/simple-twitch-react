import React, { Component } from 'react';

import classes from './Layout.module.css';
//import NavBar from '../../components/Navigation/NavBar/NavBar';
import NavBar from '../../containers/NavBarCont/NavBarCont';

import SimpleChannelListCont from '../../containers/SimpleChannelListCont/SimpleChannelListCont'

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: React.createRef()
        }
    }

    componentDidMount() { 
        this.props.headerHeight(this.state.header.current.clientHeight);
    }

    render () {   
        return (
            <React.Fragment>   
                <div ref={this.state.header}>
                    <NavBar items={this.props.navItems}></NavBar>
                </div> 

                <div className={classes.Main}>
                    <div className={classes.ChannelsPanel}>
                        <SimpleChannelListCont></SimpleChannelListCont>
                    </div>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </div>

            </React.Fragment>            
        )
    }
}

export default Layout;