import React, { Component } from 'react';

import classes from './Layout.module.css';
//import NavBar from '../../components/Navigation/NavBar/NavBar';
import NavBar from '../../containers/NavBarCont/NavBarCont';

import SimpleChannelListCont from '../../containers/SimpleChannelListCont/SimpleChannelListCont'

interface LayoutProps {
    headerHeight: (height: number) => void;
    children?: React.ReactNode;
}

interface LayoutState {
    header: React.RefObject<HTMLDivElement | null>;
}

class Layout extends Component<LayoutProps, LayoutState> {

    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            header: React.createRef<HTMLDivElement>()
        }
    }

    componentDidMount() {
        this.props.headerHeight(this.state.header.current!.clientHeight);
    }

    render () {
        return (
            <React.Fragment>
                <div ref={this.state.header}>
                    <NavBar></NavBar>
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
