import React, { Component } from 'react';

import classes from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

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
                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>            
        )
    }
}

export default Layout;