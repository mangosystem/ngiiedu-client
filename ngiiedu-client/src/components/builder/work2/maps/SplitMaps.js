import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';

import './Maps.css';
  

class SplitMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            splitTemplate: 's1',
            itemValue1: 1,
            itemValue2: 1,
            itemValue3: 1,
            itemValue4: 1,
            splitType: '2',
            items: [
                { value: 1, text: '구글지도'},
                { value: 2, text: '네이버지도'},
                { value: 3, text: '다음지도'},
                { value: 4, text: '레이어4'},
                { value: 5, text: '레이어5'},
                { value: 6, text: '레이어6'},
                { value: 7, text: '레이어7'},
                { value: 8, text: '레이어8'},
                { value: 9, text: '레이어9'},
                { value: 10, text: '레이어10'}
            ]
        };
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


    getStepContent(stepIndex) {

        const { itemValue, splitTemplate, items, splitType } = this.state;

        const style = {
            selected: {
                border: '3px solid',
                borderColor: cyan500,
                width: '200px',
                height: '136px'
            },

            unselected: {
                padding: '3px',
                width: '200px',
                height: '136px'
            },

            itemSelected: {
                color: pink400
            },

            itemUnselected: {

            }
        };


        switch (stepIndex) {
          case 1:
            return (
                <div>
                    <Tabs>
                        <Tab 
                            label="2분할" 
                        >
                            <br />
                            <div style={{display: 'flex'}}>
                                <img 
                                    src="/ngiiedu/assets/images/s1.png" 
                                    // src="/assets/images/s1.png" 
                                    alt="s1" 
                                    style={splitTemplate == "s1"? style.selected : style.unselected}
                                    onClick={() => this.setState({ splitTemplate: 's1', splitType: '2' })}/>
                                &nbsp;&nbsp;&nbsp;
                                <img 
                                    src="/ngiiedu/assets/images/s2.png" 
                                    // src="/assets/images/s2.png" 
                                    alt="s2" 
                                    style={splitTemplate == "s2"? style.selected : style.unselected}
                                    onClick={() => this.setState({ splitTemplate: 's2', splitType: '2' })}/>
                            </div>
                        </Tab>
                        <Tab 
                            label="3분할" 
                        >
                            <br />
                            <div style={{display: 'flex'}}>
                                <img 
                                   src="/ngiiedu/assets/images/s3.png" 
                                    // src="/assets/images/s3.png" 
                                    alt="s3" 
                                    style={splitTemplate == "s3"? style.selected : style.unselected}
                                    onClick={() => this.setState({ splitTemplate: 's3', splitType: '3' })}/>
                                &nbsp;&nbsp;&nbsp;
                                <img 
                                    src="/ngiiedu/assets/images/s4.png" 
                                    // src="/assets/images/s4.png" 
                                    alt="s4" 
                                    style={splitTemplate == "s4"? style.selected : style.unselected}
                                    onClick={() => this.setState({ splitTemplate: 's4', splitType: '3' })}/>
                                &nbsp;&nbsp;&nbsp;
                                <img 
                                    src="/ngiiedu/assets/images/s5.png" 
                                    // src="/assets/images/s5.png" 
                                    alt="s5" 
                                    style={splitTemplate == "s5"? style.selected : style.unselected}
                                    onClick={() => this.setState({ splitTemplate: 's5', splitType: '3' })}/>
                            </div>
                        </Tab>
                        <Tab 
                            label="4분할" 
                        >
                            <br />
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <img 
                                    src="/ngiiedu/assets/images/s6.png" 
                                    // src="/assets/images/s6.png" 
                                    alt="s6" 
                                    style={splitTemplate == "s6"? style.selected : style.unselected}
                                    onClick={() => this.setState({ splitTemplate: 's6', splitType: '4' })}/>
                            </div>
                        </Tab>
                    </Tabs>
                    <Subheader style={{textAlign: 'left'}}>제목</Subheader>
                    <TextField 
                        fullWidth={true}
                        hintText="*스토리맵 제목을 입력해주세요"/>
                    <br />
                </div>
            );
          case 2:
            return (
                <Tabs style={{width: 651.77}} value={splitType}>
                    <Tab 
                        label="2분할" 
                        disabled={splitType == '2' ? false : true}
                        value="2"
                    >
                        <br />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img 
                                src={"/ngiiedu/assets/images/" + splitTemplate + ".png"}  
                                // src={"/assets/images/" + splitTemplate + ".png"}
                                style={style.selected}
                            />
                        </div>
                        <SelectField
                            floatingLabelText="①"
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
                            floatingLabelText="①"
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
                    </Tab>
                    <Tab 
                        label="3분할" 
                        disabled={splitType == '3' ? false : true}
                        value="3"
                    >
                        <br />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img 
                                src={"/ngiiedu/assets/images/" + splitTemplate + ".png"}  
                                // src={"/assets/images/" + splitTemplate + ".png"}  
                                style={style.selected}
                            />
                        </div>
                        <SelectField
                            floatingLabelText="①"
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
                            floatingLabelText="①"
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
                        <SelectField
                            floatingLabelText="①"
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
                    </Tab>
                    <Tab 
                        label="4분할" 
                        disabled={splitType == '4' ? false : true}
                        value="4"
                    >
                        <br />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img 
                                src={"/ngiiedu/assets/images/" + splitTemplate + ".png"}
                                // src={"/assets/images/" + splitTemplate + ".png"}
                                style={style.selected}
                            />
                        </div>
                        <SelectField
                            floatingLabelText="①"
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
                            floatingLabelText="①"
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
                        <SelectField
                            floatingLabelText="①"
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
                            floatingLabelText="①"
                            fullWidth={true}
                            value={this.state.itemValue4}
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
                    </Tab>
                </Tabs>
            );
          default:
            return 'You\'re a long way from home sonny jim!';
        }
      }


    render() {
        const {stepIndex} = this.props;

        return (
            <div>
                <h2>화면분할형 스토리맵 만들기</h2>
                <br />
                <div>{this.getStepContent(stepIndex)}</div>
            </div>
        );
    }
}

export default SplitMaps;