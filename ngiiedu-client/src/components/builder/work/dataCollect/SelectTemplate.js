import React from 'react';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper';


import { cyan500 } from 'material-ui/styles/colors';


class SelectTemplate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stepIndex: 0
        };
    }

    handleNext() {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1
        });
    };
    
    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return (
                <div>
                    <Subheader>템플릿 선택</Subheader>
                    <FlatButton label="탭"></FlatButton>
                    <FlatButton label="아코디언"></FlatButton>
                </div>
            );
        case 1:
            return (
                <TextField
                    id="mapTitle"
                    name="title"
                    floatingLabelText="제목"
                    fullWidth={true}
                    floatingLabelFixed={true}
                />
            );
        default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    addMapTitle() {
        const title = $('#mapTitle').val();

        this.setState({
            stepIndex: 0
        });

        this.props.addMap(title);
        this.props.templateHandle();
    }

    render() {

        const {stepIndex} = this.state;        

        return (
            <div>
                <Dialog
                    title="스토리맵 만들기"
                    open={this.props.open}
                    autoScrollBodyContent={false}
                    contentStyle={{width: '50%'}}
                >
                    <div>{this.getStepContent(stepIndex)}</div>
                    
                    <div style={{textAlign: 'right', marginTop: 30}}>
                        <FlatButton
                            label={stepIndex == 0? "취소" : "이전"}
                            onClick={stepIndex == 0? this.props.templateHandle : this.handlePrev.bind(this)}
                        />
                        <FlatButton
                            label={stepIndex == 1? "확인" : "다음"}
                            backgroundColor={cyan500}
                            style={{color: 'white'}}
                            onClick={stepIndex == 1? this.addMapTitle.bind(this) : this.handleNext.bind(this)}
                        />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default SelectTemplate;