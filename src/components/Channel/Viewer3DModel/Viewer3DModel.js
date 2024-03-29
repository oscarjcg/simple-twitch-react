import React from 'react';

import classes from './Viewer3DModel.module.css';
import Iframe from 'react-iframe'

const URL_MODELS_3D = "https://models3d.codename-project.com/?model=";

const viewer3DModel = (props) => {
    const style = {
        width: props.width,
        height: props.height,
    }

    return (
        <div style={style}>
            <Iframe url={ URL_MODELS_3D + props.model}
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