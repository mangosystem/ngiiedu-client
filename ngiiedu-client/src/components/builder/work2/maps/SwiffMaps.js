import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';


import './Maps.css';
  

class SwiffMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            swiffTemplate: 'sw1',
            itemValue: 1,
            itemValue2: 1,
            items: [
                { value: 1, text: '레이어1'},
                { value: 2, text: '레이어2'},
                { value: 3, text: '레이어3'},
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


    getStepContent(stepIndex) {

        const { itemValue, itemValue2, swiffTemplate, items } = this.state;

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
                    <br />
                    <Subheader style={{textAlign: 'left'}}>제목</Subheader>
                    <TextField 
                        fullWidth={true}
                        hintText="*스토리맵 제목을 입력해주세요"/>
                    <br /><br />
                    <div style={{display: 'flex'}}>
                        <figure>
                            <img 
                               src="/ngiiedu/assets/images/sw1.png" 
                                // src="/assets/images/sw1.png" 
                                alt="sw1" 
                                style={swiffTemplate == "sw1"? style.selected : style.unselected}
                                onClick={() => this.setState({ swiffTemplate: 'sw1' })}/>
                                <figcaption>가로 스와이프</figcaption>
                        </figure>
                        &nbsp;&nbsp;&nbsp;
                        <figure>
                            <img 
                                src="/ngiiedu/assets/images/sw2.png" 
                                // src="/assets/images/sw2.png" 
                                alt="sw2" 
                                style={swiffTemplate == "sw2"? style.selected : style.unselected}
                                onClick={() => this.setState({ swiffTemplate: 'sw2' })}/>
                                <figcaption>세로 스와이프</figcaption>
                            </figure>
                    </div>
                    <br />
                </div>
            );
          case 2:
            return (
                <table style={{textAlign: 'left'}}>
                    <br />
                    <tr style={{verticalAlign: 'top'}}>
                        <td className="td">
                            <Subheader>{swiffTemplate == 'sw1' ? '왼쪽맵' : '아래쪽맵'}</Subheader>
                            <Paper className="swiffPaper">
                                {items.map((item) => (
                                    <MenuItem 
                                        key={item.value}
                                        value={item.value} 
                                        style={item.value == itemValue? style.itemSelected : style.itemUnselected} 
                                        primaryText={item.text} 
                                        onClick={() => this.setState({ itemValue: item.value })}/>
                                ))}
                            </Paper>
                            <br />
                        </td>
                        <td style={{ paddingLeft: '20px' }}>
                            <Subheader>{swiffTemplate == 'sw1' ? '오른쪽맵' : '위쪽맵'}</Subheader>
                            <Paper className="swiffPaper">
                                {items.map((item) => (
                                    <MenuItem 
                                        key={item.value}
                                        value={item.value} 
                                        style={item.value == itemValue2? style.itemSelected : style.itemUnselected} 
                                        primaryText={item.text} 
                                        onClick={() => this.setState({ itemValue2: item.value })}/>
                                ))}
                            </Paper>
                            <br />
                        </td>
                    </tr>
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

export default SwiffMaps;