import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

import SwipeMapView from './SwipeMapView';
import Paper from 'material-ui/Paper';

class Swipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maps: {},
            isInputChecked: true
        };
    }

    componentWillReceiveProps(nextProps){

        let items = nextProps.maps.items;

        let sortingField = 'id';

        items.sort(function(a, b) { // 오름차순
            return a[sortingField] - b[sortingField];
        });

        this.setState({
            maps: nextProps.maps,
            items,
            isInputChecked: nextProps.isInputChecked
        });
    }

    componentWillMount() {

        let items = this.props.maps.items;

        let sortingField = 'id';

        items.sort(function(a, b) { // 오름차순
            return a[sortingField] - b[sortingField];
        });

        this.setState({
            maps: this.props.maps,
            items,
            description: items[0].description
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
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 400 }}>
                        <Paper
                            style={style.paper}
                            dangerouslySetInnerHTML={ {__html: this.state.description} }
                        >
                        </Paper>
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 400, right: 0 }}>
                        <SwipeMapView
                            items={this.state.items}
                            typeKind={this.state.maps.typeKind}
                        />
                    </div>
                </div>
                :
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <SwipeMapView
                        items={this.state.items}
                        typeKind={this.state.maps.typeKind}
                    />
                </div>
                }
            </div>
        );
    }
}

export default Swipe;