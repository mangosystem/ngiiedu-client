import React, { Component } from 'react';

import { withRouter } from "react-router-dom";


import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import {List, ListItem, makeSelectable} from 'material-ui/List';

import './Maps.css';
  
let SelectableList = makeSelectable(List);


class BasicMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            typeKind: 'RIGHT',
            items: [
                {}
            ]
        };
    }

    componentDidMount() {
        
        if (this.props.map) {
            this.setState({ 
                typeKind: this.props.map.pngoData.typeKind
            });
        } else {
            this.props.changeTypeKind("RIGHT");
        }

        let items = this.props.items;

        this.setState({
            items: items
        });

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

    componentWillMount() {
        if (this.props.map) {
            this.props.changeLayerId(this.props.map.pngoData.items[0].pinoLayer);
        }
    }

    getStepContent(stepIndex) {

        const { itemValue, typeKind, items } = this.state;

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
                    {/*
                        <div style={{display: 'flex'}}>
                            <img 
                                src="/ngiiedu/assets/images/b1.png" 
                                // src="/assets/images/b1.png" 
                                alt="b1" 
                                style={typeKind == "BOTTOM"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('BOTTOM')}/>
                            &nbsp;&nbsp;&nbsp;
                            <img 
                                src="/ngiiedu/assets/images/b2.png" 
                                // src="/assets/images/b2.png" 
                                alt="b2" 
                                style={typeKind == "TOP"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('TOP')}/>
                        </div>
                        <br />
                    */}
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img 
                            src={contextPath+"/assets/images/RIGHT.png"} 
                            // src="/assets/images/b3.png" 
                            alt="b3" 
                            style={typeKind == "RIGHT"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('RIGHT')}/>
                        &nbsp;&nbsp;&nbsp;
                        <img 
                            src={contextPath+"/assets/images/LEFT.png"} 
                            // src="/assets/images/b4.png" 
                            alt="b4" 
                            style={typeKind == "LEFT"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('LEFT')}/>
                    </div>
                </div>
            );
          case 2:
            return (
                <div style={{textAlign: 'left'}}>
                    <br />
                    <Subheader>레이어 선택</Subheader>
                    <Paper className="paper">
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
                </div>
            );
          default:
            return 'You\'re a long way from home sonny jim!';
        }
      }


    render() {
        const {stepIndex} = this.props;

        return (
            <div>
                <h2>기본형 스토리맵 만들기</h2>
                <div>{this.getStepContent(stepIndex)}</div>
                <br />
            </div>
        );
    }
}

export default withRouter(BasicMaps);