import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

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
            let sortingField = 'priority';

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
            },
            seletedTab: {
                backgroundColor: '#3e81f6',
                borderRadius: '15px',
                color: 'white',
                marginLeft: '10px'
            },
            unSelectedTab: {
                backgroundColor: null,
                borderRadius: '15px',
                color: 'white',
                marginLeft: '10px',
                border: '1.5px solid white'
            }
        };

        return (
            <div>
                <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 40, backgroundColor: '#43444c' }}>
                    <div style={{display: 'flex', height: 40}}>        
                        <div style={{display: 'flex'}}>
                            {this.state.items.map((item, index) => (
                                <FlatButton 
                                    id={item.id}
                                    key={item.id}
                                    label={item.title}
                                    onClick={() => this.setState({ itemIndex: index, tempTitle: item.title, description: item.description })}
                                    style={itemIndex == index ? style.seletedTab : style.unSelectedTab}
                                >
                                </FlatButton>
                            ))}
                        </div>
                    </div>
                </div>
                {this.state.items[this.state.itemIndex].pinoLayer != '' && this.state.isInputChecked ? 
                <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 400 }}>
                        <Paper
                            style={style.paper}
                            dangerouslySetInnerHTML={ {__html: this.state.description} }
                        />                      
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 400, right: 0 }}>
                        <MapsView
                            items={this.state.items}
                            itemIndex={this.state.itemIndex}
                        />
                    </div>
                </div>
                :
                this.state.items[this.state.itemIndex].pinoLayer != '' && !this.state.isInputChecked ? 
                <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
                    <MapsView
                        items={this.state.items}
                        itemIndex={this.state.itemIndex}
                    />
                </div>
                :
                <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
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