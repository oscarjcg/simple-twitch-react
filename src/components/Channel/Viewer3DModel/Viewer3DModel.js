import React from 'react';

import classes from './Viewer3DModel.module.css';
import Iframe from 'react-iframe'

import { MODELS_3D_URL } from '../../../config';

const viewer3DModel = (props) => {
    const style = {
        width: props.width,
        height: props.height,
    }

    return (
        <div style={style}>
            <Iframe url={ MODELS_3D_URL + props.model}
                    width="100%"
                    height="100%"
                    id="myId"
                    className={classes.IframeClass}
                    display="initial"
                    position="relative"/>
        </div>
    );
};

export default viewer3DModel;