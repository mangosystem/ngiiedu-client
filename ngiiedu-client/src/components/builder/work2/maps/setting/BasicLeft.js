import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import MapsView from './MapsView';
import EditorPanel from './EditorPanel';


class BasicLeft extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maps: this.props.maps,
            items: this.props.maps.items,
            description: this.props.maps.items[0].description
        };
    }

    // componentWillMount() {
    //     this.setState({
    //         maps: this.props.maps,
    //         items: this.props.maps.items,
    //         description: this.props.maps.items[0].description
    //     });
    // }

    componentWillReceiveProps(nextProps){
        this.setState({
            maps: nextProps.maps,
            items: nextProps.maps.items,
        });
    }

    modifyDescription(description) {

        let { items } = this.state;
        let newItems = items;
        newItems[0].description = description;

        this.setState({
            description,
            items: newItems
        });
    }

    render() {
        return (
            <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 400 }}>
                    <EditorPanel
                        description={this.state.description}
                        modifyDescription={this.modifyDescription.bind(this)}
                        mapsId={this.state.maps.mapsId}
                        itemId={this.state.items[0].id}
                        pinoLayer={this.state.items[0].pinoLayer}
                    />
                </div>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 400, right: 0 }}>
                    <MapsView
                        maps={this.state.maps}
                        items={this.state.items}
                    />
                </div>
            </div>
        );
    }
}

export default BasicLeft;