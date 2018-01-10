import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

import MapsView from './MapsView';
import IconButton from 'material-ui/IconButton';

import Paper from 'material-ui/Paper/Paper';

class SeriesSlide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maps: {},
            items: [],
            isInputChecked: true
        };
    }

    componentWillMount() {

        let items = this.props.maps.items;

        if (items.length >= 2) {
            let sortingField = 'priority';

            items.sort(function(a, b) { // 오름차순
                return a[sortingField] - b[sortingField];
            });
        }

        let description = decodeURIComponent(this.props.maps.description);

        this.setState({
            maps: this.props.maps,
            items,
            tempTitle: items[0].title,
            itemIndex: 0,
            description
        });
    }

    handleSlider(v) {
        this.setState({
            itemIndex: v,
            tempTitle: this.state.items[v].title
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isInputChecked: nextProps.isInputChecked
        });
    }

    render() {

        let { itemIndex } = this.state;

        let style = {
            paper: {
                padding: '20px',
                margin: '10px'
            },

            seletedTab: {
                backgroundColor: '#3e81f6',
                borderRadius: '15px',
                color: 'white',
                marginLeft: '10px'
            }
            
        }

        return (
            <div>
                <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 40, backgroundColor: '#43444c', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{display: 'flex', height: 40, alignItems: 'center'}}>
                        <FlatButton 
                            label={this.state.items[itemIndex].title}
                            style={style.seletedTab}
                        >
                        </FlatButton>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', right: 30, width: 'calc(100% - 400px)'}}>
                        <Slider
                            min={0}
                            max={this.state.items.length == 1 ? 1 : this.state.items.length-1}
                            disabled={this.state.items.length == 1 ? true : false}
                            step={1}
                            value={this.state.itemIndex}
                            sliderStyle={{ margin: '0' }}
                            style={{ width: '100%', marginRight: '30px' }}
                            onChange={(e, v) => this.handleSlider(v)}
                        />
                    </div>
                </div>
                {this.state.isInputChecked ?
                <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 400, height: '100%' }}>
                        <Paper
                            style={style.paper}
                            dangerouslySetInnerHTML={ {__html: this.state.description} }
                        /> 
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 400, right: 0 }}>
                        <MapsView
                            maps={this.state.maps}
                            items={this.state.items}
                            itemIndex={this.state.itemIndex}
                        />
                    </div>
                </div>
                :
                <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
                    <MapsView
                        items={this.state.items}
                        itemIndex={this.state.itemIndex}
                    />
                </div>
                }
            </div>
        );
    }
}

export default SeriesSlide;