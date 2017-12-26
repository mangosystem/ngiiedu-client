import React, { Component } from 'react';

import { withRouter } from "react-router-dom";


import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import './Maps.css';
  

class SplitMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            typeKind: 'DOUBLE1',
            itemValue1: 1,
            itemValue2: 1,
            itemValue3: 1,
            itemValue4: 1,
            splitType: '2',
            defaultSplitType: '2',
            items: [
                { value: 1, text: '구글지도'},
                { value: 2, text: '네이버지도'},
                { value: 3, text: '다음지도'}
            ]
        };
    }

    componentDidMount() {
        
        if (this.props.map) {

            let typeKind = this.props.map.pngoData.typeKind;

            this.setState({ 
                typeKind
            });

            if (typeKind.indexOf("DOUBLE") != -1) {
                this.setState({
                    defaultSplitType: '2',
                    splitType: '2'
                });
            } else if (typeKind.indexOf("TRIPLE") != -1) {
                this.setState({
                    defaultSplitType: '3',
                    splitType: '3'
                });
            } else {
                this.setState({
                    defaultSplitType: '4',
                    splitType: '4'
                });
            }
        } else {
            this.props.changeTypeKind("DOUBLE1");
        }

        
    }


    handleChange(num, value) {

        if (num == "1") {
            this.setState({
                itemValue1: value
            });
        } else if (num == "2") {
            this.setState({
                itemValue2: value
            });
        } else if (num == "3") {
            this.setState({
                itemValue3: value
            });
        } else {
            this.setState({
                itemValue4: value
            })
        }

    }

    changeTypeKind(typeKind, splitType) {
        this.setState({
            typeKind,
            splitType
        });

        this.props.changeTypeKind(typeKind);
    }

    getStepContent(stepIndex) {

        const { itemValue, typeKind, items, splitType, defaultSplitType } = this.state;

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
                <div style={{textAlign: 'left'}}>
                    <Subheader>제목</Subheader>
                    <TextField 
                        id="title"
                        fullWidth={true}
                        hintText="*스토리맵 제목을 입력해주세요"
                        onChange={(e, value) => this.props.changeTitle(value)}
                        value={this.props.title}
                    />
                    <br /><br />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src="/ngiiedu/assets/images/DOUBLE1.png" 
                            // src="/assets/images/s1.png" 
                            alt="s1" 
                            style={typeKind == "DOUBLE1"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('DOUBLE1', '2')}/>
                        &nbsp;&nbsp;&nbsp;
                        <img 
                            src="/ngiiedu/assets/images/DOUBLE2.png" 
                            // src="/assets/images/s2.png" 
                            alt="s2" 
                            style={typeKind == "DOUBLE2"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('DOUBLE2', '2')}/>
                        &nbsp;&nbsp;&nbsp;
                        <img 
                            src="/ngiiedu/assets/images/QUADRUPLE.png" 
                            // src="/assets/images/s6.png" 
                            alt="s6" 
                            style={typeKind == "QUADRUPLE"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('QUADRUPLE','4')}/>
                    </div>
                    <br />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        
                    </div>
                </div>
            );
          case 2:
            return (
                <div style={{textAlign: 'left'}}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img 
                                src={"/ngiiedu/assets/images/" + typeKind + ".png"}  
                                // src={"/assets/images/" + typeKind + ".png"}
                                style={style.selected}
                            />
                        </div>
                        <SelectField
                            floatingLabelText="1"
                            fullWidth={true}
                            value={this.state.itemValue1}
                            onChange={(e, i, value) => this.handleChange("1", value)}
                        >
                            {items.map((item) => (
                                <MenuItem 
                                    key={item.value}
                                    value={item.value}
                                    primaryText={item.text} 
                                />
                            ))}
                        </SelectField>
                        <SelectField
                            floatingLabelText="2"
                            fullWidth={true}
                            value={this.state.itemValue2}
                            onChange={(e, i, value) => this.handleChange("2", value)}
                        >
                            {items.map((item) => (
                                <MenuItem 
                                    key={item.value}
                                    value={item.value}
                                    primaryText={item.text} 
                                />
                            ))}
                        </SelectField>
                        {this.state.splitType == '4' ?
                        <div>
                            <SelectField
                                floatingLabelText="3"
                                fullWidth={true}
                                value={this.state.itemValue3}
                                onChange={(e, i, value) => this.handleChange("3", value)}
                            >
                                {items.map((item) => (
                                    <MenuItem 
                                        key={item.value}
                                        value={item.value}
                                        primaryText={item.text} 
                                    />
                                ))}
                            </SelectField>
                            <SelectField
                                floatingLabelText="4"
                                fullWidth={true}
                                value={this.state.itemValue4}
                                onChange={(e, i, value) => this.handleChange("4", value)}
                            >
                                {items.map((item) => (
                                    <MenuItem 
                                        key={item.value}
                                        value={item.value}
                                        primaryText={item.text} 
                                    />
                                ))}
                            </SelectField>
                        </div>
                        :
                        null
                        }
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
                <h3>화면분할형 스토리맵 만들기</h3>
                <br />
                <div>{this.getStepContent(stepIndex)}</div>
            </div>
        );
    }
}

export default withRouter(SplitMaps);