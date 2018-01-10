import React, { Component } from 'react';

import { withRouter } from "react-router-dom";


import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List, ListItem, makeSelectable} from 'material-ui/List';


import './Maps.css';
  
let SelectableList = makeSelectable(List);


class SwipeMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            typeKind: 'HORIZONTAL',
            items: [{}]
        };
    }

    componentDidMount() {
        
        if (this.props.map) {
            this.setState({ 
                typeKind: this.props.map.pngoData.typeKind
            });
        } else {
            this.props.changeTypeKind("HORIZONTAL");
        }

        let items = this.props.items;

        this.setState({
            items: items
        });

    }

    componentWillMount() {
        if (this.props.map) {

            let items = this.props.map.pngoData.items;

            if (items.length >= 2) {
                let sortingField = 'id';
    
                items.sort(function(a, b) { // 오름차순
                    return a[sortingField] - b[sortingField];
                });
            }

            this.props.changeLayerId(items[0].pinoLayer);
            this.props.changeLayerId2(items[1].pinoLayer);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.items != nextProps.items) {
            this.setState({
                items: nextProps.items
            });
        }
    }

    handleNext() {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1
        });
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    };

    changeTypeKind(typeKind) {
        this.setState({
            typeKind
        });

        this.props.changeTypeKind(typeKind);
    }

    getStepContent(stepIndex) {

        const { itemValue, itemValue2, typeKind, items } = this.state;

        const style = {
            selected: {
                border: '3px solid',
                borderRadius: '15px',
                borderColor: cyan500,
                width: '264px',
                height: '164px'
            },

            unselected: {
                padding: '3px',
                width: '264px',
                height: '164px'
            },

            itemSelected: {
                color: pink400,
                backgroundColor: 'rgba(128, 128, 128, 0.2)'
            },

            itemUnselected: {

            }
        };


        switch (stepIndex) {
          case 1:
            return (
                <div>
                    <br />
                    <Subheader style={{textAlign: 'left'}}>제목</Subheader>
                    <TextField 
                        fullWidth={true}
                        hintText="*스토리맵 제목을 입력해주세요"
                        onChange={(e, value) => this.props.changeTitle(value)}
                        defaultValue={this.props.map ? this.props.map.outputName : ''}
                    />
                    <br /><br />
                    <div style={{display: 'flex'}}>
                        <figure>
                            <img 
                               src="/ngiiedu/assets/images/HORIZONTAL.png" 
                                // src="/assets/images/sw1.png" 
                                alt="HORIZONTAL" 
                                style={typeKind == "HORIZONTAL"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('HORIZONTAL')}/>
                                <figcaption>가로 스와이프</figcaption>
                        </figure>
                        &nbsp;&nbsp;&nbsp;
                        <figure>
                            <img 
                                src="/ngiiedu/assets/images/VERTICAL.png" 
                                // src="/assets/images/sw2.png" 
                                alt="VERTICAL" 
                                style={typeKind == "VERTICAL"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('VERTICAL')}/>
                                <figcaption>세로 스와이프</figcaption>
                        </figure>
                    </div>
                    <br />
                </div>
            );
          case 2:
            return (
                <table style={{textAlign: 'left', margin: '10px auto'}}>
                    <tbody>
                        <tr style={{verticalAlign: 'top'}}>
                            <td className="td">
                                <Subheader>{typeKind == 'VERTICAL' ? '왼쪽맵' : '아래쪽맵'}</Subheader>
                                <Paper className="swipePaper">
                                    <SelectableList value={this.props.layerId}>
                                    {"pinogioOutputId" in items[0] ?                         
                                        items.map((item, i) => (
                                        <ListItem 
                                            key={item.idx}
                                            value={item.pinogioOutputId} 
                                            primaryText={item.outputName}
                                            onClick={(i) => this.props.changeLayerId(item.pinogioOutputId)}
                                        />
                                    )): null}
                                    </SelectableList>
                                </Paper>
                                <br />
                            </td>
                            <td style={{ paddingLeft: '20px' }}>
                                <Subheader>{typeKind == 'VERTICAL' ? '오른쪽맵' : '위쪽맵'}</Subheader>
                                <Paper className="swipePaper">
                                    <SelectableList value={this.props.layerId2}>
                                    {"pinogioOutputId" in items[0] ?                         
                                        items.map((item, i) => (
                                        <ListItem 
                                            key={item.idx}
                                            value={item.pinogioOutputId} 
                                            primaryText={item.outputName}
                                            onClick={(i) => this.props.changeLayerId(item.pinogioOutputId)}
                                        />
                                    )): null}
                                    </SelectableList>
                                </Paper>
                                <br />
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
          default:
            return 'You\'re a long way from home sonny jim!';
        }
      }


    render() {
        const {stepIndex} = this.props;

        return (
            <div>
                <h2>스와이프형 스토리맵 만들기</h2>
                <div>{this.getStepContent(stepIndex)}</div>
                <br />
            </div>
        );
    }
}

export default withRouter(SwipeMaps);