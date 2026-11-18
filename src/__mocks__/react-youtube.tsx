import React from 'react';
import type { YouTubeProps } from 'react-youtube';

const YouTube = (props: YouTubeProps) => (
    <div
        data-testid="youtube"
        data-video-id={props.videoId}
        data-width={props.opts && props.opts.width}
        data-height={props.opts && props.opts.height} />
);

module.exports = YouTube;
