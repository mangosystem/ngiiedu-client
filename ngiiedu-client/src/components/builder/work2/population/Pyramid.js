import React from 'react';
import ReactDOM from 'react-dom';

class Pyramid extends React.Component {

    constructor() {
        super();

    }

    componentDidMount () {
        //let iframe = ReactDOM.findDOMNode(this.refs.iframe);
        //iframe.addEventListener('load', this.props.onLoad);
    }

    render() {

        const iframeStyle = {
            width: '100%',
            height: '100%',
            border: '0',
            position: 'absolute'
        };
   
        return (
            <iframe
                ref="iframe"
                {...this.props}
                frameBorder={'0'}
                style={iframeStyle}
            />
        );
    }
};

export default Pyramid;
