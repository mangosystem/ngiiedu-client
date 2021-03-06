import React, { Component } from 'react';

import { cyan500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import MapsView from './MapsView';

class BasicRight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maps: {},
            isInputChecked: true            
        };
    }

    componentWillMount() {

        let description = decodeURIComponent(this.props.maps.items[0].description);

        this.setState({
            maps: this.props.maps,
            items: this.props.maps.items,
            description
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isInputChecked: nextProps.isInputChecked
        });
    }

    render() {

        let style = {
            paper: {
                padding: '20px',
                margin: '10px'
            }
        };

        return (
            <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>
                {this.state.isInputChecked ?
                <div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 400 }}>
                        <Paper
                            style={style.paper}
                            dangerouslySetInnerHTML={ {__html: this.state.description} }
                        >
                        </Paper>
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 400 }}>
                        <MapsView
                            items={this.state.items}
                        />
                    </div>
                </div>
                :
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <MapsView
                        items={this.state.items}
                    />
                </div>
                }
            </div>
        );
    }
}

export default BasicRight;