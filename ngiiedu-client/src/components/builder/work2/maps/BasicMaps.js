import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';


import './Maps.css';
  

class BasicMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            basicTemplate: 'b1',
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
        console.log("Basic Map : " + stepIndex);

        const { itemValue, basicTemplate, items } = this.state;

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
                        <img 
                            src="/ngiiedu/assets/images/b1.png" 
                            // src="/assets/images/b1.png" 
                            alt="b1" 
                            style={basicTemplate == "b1"? style.selected : style.unselected}
                            onClick={() => this.setState({ basicTemplate: 'b1' })}/>
                        &nbsp;&nbsp;&nbsp;
                        <img 
                            src="/ngiiedu/assets/images/b2.png" 
                            // src="/assets/images/b2.png" 
                            alt="b2" 
                            style={basicTemplate == "b2"? style.selected : style.unselected}
                            onClick={() => this.setState({ basicTemplate: 'b2' })}/>
                    </div>
                    <br />
                    <div style={{display: 'flex'}}>
                        <img 
                            src="/ngiiedu/assets/images/b3.png" 
                            // src="/assets/images/b3.png" 
                            alt="b3" 
                            style={basicTemplate == "b3"? style.selected : style.unselected}
                            onClick={() => this.setState({ basicTemplate: 'b3' })}/>
                        &nbsp;&nbsp;&nbsp;
                        <img 
                            src="/ngiiedu/assets/images/b4.png" 
                            // src="/assets/images/b4.png" 
                            alt="b4" 
                            style={basicTemplate == "b4"? style.selected : style.unselected}
                            onClick={() => this.setState({ basicTemplate: 'b4' })}/>
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
                <h2>기본형 스토리맵 만들기</h2>
                <div>{this.getStepContent(stepIndex)}</div>
                <br />
            </div>
        );
    }
}

export default BasicMaps;