import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NavBarCont.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar'

class NavBarCont extends Component {

    state = {
        navItems: [
          {link: '/', text: 'Discover', exact: true},
          {link: '/directory', text: 'Browse', exact: false}
        ]
    }

    searchHandler = (e) => {     
        if (e.keyCode == 13) {// Enter
            // Search
            e.target.value = "";
        }
    }

    render () {
        return (
            <NavBar 
                items={this.state.navItems}
                search={this.searchHandler}></NavBar>
        );
    }
}

const mapStateToProps = state => {
    return {
      headerHeight: state.userInterface.headerHeight
    };
  };

export default connect(mapStateToProps)(NavBarCont);