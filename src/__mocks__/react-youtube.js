const React = require('react');

const YouTube = (props) => React.createElement('div', {
    'data-testid': 'youtube',
    'data-video-id': props.videoId,
    'data-width': props.opts && props.opts.width,
    'data-height': props.opts && props.opts.height,
});

module.exports = YouTube;
