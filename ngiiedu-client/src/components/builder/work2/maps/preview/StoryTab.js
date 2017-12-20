import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import { cyan500, limeA100 } from 'material-ui/styles/colors';
import MapsView from './MapsView';
import Paper from 'material-ui/Paper';


class StoryTab extends Component {

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
            let sortingField = 'id';

            items.sort(function(a, b) { // 오름차순
                return a[sortingField] - b[sortingField];
            });
        }

        this.setState({
            maps: this.props.maps,
            items: this.props.maps.items,
            itemIndex: 0,
            description: this.props.maps.items[0].description
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
            }
        };

        return (
            <div>
                <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 60, backgroundColor: cyan500 }}>
                    <div style={{display: 'flex', height: 60}}>        
                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'flex-end'}}>
                            {this.state.items.map((item, index) => (
                                <RaisedButton 
                                    key={item.id}
                                    label={item.title}
                                    onClick={() => this.setState({ itemIndex: index, description: item.description })}
                                    backgroundColor={itemIndex == index ? limeA100 : null}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {this.state.items[this.state.itemIndex].pinoLayer != '' && this.state.isInputChecked ? 
                <div style={{ position: 'absolute', top: 120, bottom: 0, left: 0, right: 0 }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 300 }}>
                        <Paper
                            style={style.paper}
                            dangerouslySetInnerHTML={ {__html: this.state.description} }
                        />                      
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 300, right: 0 }}>
                        <MapsView
                            items={this.state.items}
                            itemIndex={this.state.itemIndex}
                        />
                    </div>
                </div>
                :
                this.state.items[this.state.itemIndex].pinoLayer != '' && !this.state.isInputChecked ? 
                <div style={{ position: 'absolute', top: 120, bottom: 0, left: 0, right: 0 }}>
                    <MapsView
                        items={this.state.items}
                        itemIndex={this.state.itemIndex}
                    />
                </div>
                :
                <div style={{ position: 'absolute', top: 120, bottom: 0, left: 0, right: 0 }}>
                    <Paper
                        style={style.paper}
                        dangerouslySetInnerHTML={ {__html: this.state.description} }
                    />
                </div>
                }
            </div>
        );
    }
}

export default StoryTab;