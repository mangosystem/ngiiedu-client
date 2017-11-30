import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';



class ContinuousMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            continuousTemplate: 'c1',
            itemValue: 1,
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
            ],
            radioType: 'layer'
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
        console.log("Story Map : " + stepIndex);

        const { itemValue, continuousTemplate, items, radioType } = this.state;

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

            },

            radioButton: {
                marginBottom: 16,
            }
        };


        switch (stepIndex) {
          case 1:
            return (
                <div style={{textAlign: 'left'}}>
                    <Subheader>제목</Subheader>
                    <TextField 
                        fullWidth={true}
                        hintText="*스토리맵 제목을 입력해주세요"/>
                    <br /><br />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src="/ngiiedu/assets/images/c1.png" 
                            // src="/assets/images/tab.png" 
                            alt="c1" 
                            style={continuousTemplate == "c1"? style.selected : style.unselected}
                            onClick={() => this.setState({ continuousTemplate: 'c1' })}/>
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <h4>화면전환형</h4> <br />
                            <p>
                                설명 텍스트에 대한 옵션 패널과 함께 탭을 사용하여 <br />
                                맵과 다른 콘텐츠를 나타냅니다.
                            </p>
                        </div>
                    </div>
                    <br />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src="/ngiiedu/assets/images/c2.png" 
                            // src="/assets/images/accordion.png" 
                            alt="c2" 
                            style={continuousTemplate == "c2"? style.selected : style.unselected}
                            onClick={() => this.setState({ continuousTemplate: 'c2' })}/>
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <h4>슬라이더형</h4> <br />
                            <p>
                                설명 텍스트를 포함하는 확장 가능한 컨트롤을 사용하여 <br />
                                맵과 다른 콘텐츠를 나타냅니다.
                            </p>
                        </div>
                    </div>
                </div>
            );
          case 2:
            return (
                <div style={{textAlign: 'left'}}>
                    <br />
                    <Subheader>레이어 선택</Subheader>
                    <Paper className="paper">
                        {items.map((item) => (
                            <MenuItem 
                                key={item.value}
                                value={item.value} 
                                style={item.value == itemValue? style.itemSelected : style.itemUnselected} 
                                primaryText={item.text} 
                                onClick={() => this.setState({ itemValue: item.value })}/>
                        ))}
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
                <h2>연속데이터형 스토리맵 만들기</h2>
                <div>{this.getStepContent(stepIndex)}</div>
                <br />
            </div>
        );
    }
}

export default ContinuousMaps;