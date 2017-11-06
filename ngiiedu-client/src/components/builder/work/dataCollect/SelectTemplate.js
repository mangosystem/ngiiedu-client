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

    }

    changeTemplate(template) {

        this.props.changeTemplate(template);

    }


    addMapTitle() {

        const title = $('#title').val();

        const template = this.props.template;
        
        if (this.props.title == '') {
            this.props.addMap(title, template);
        } else {
            this.props.editMapSetting(title, template);
        }

        this.props.templateHandle();
    }

    render() {


        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.templateHandle}
            />,
            <FlatButton
              label={this.props.title == ''? "확인" : "변경"}
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.addMapTitle.bind(this)}
            />
        ];

        const style = {
            selected: {
                border: '3px solid',
                borderColor: cyan500,
                width: '300px',
                height: '206px'
            },

            unselected: {
                border: '1px solid',
                width: '300px',
                height: '206px'
            }
        };

        return (
            <div>
                <Dialog
                    title={this.props.title == ''? "스토리맵 만들기" : "스토리맵 수정하기"}
                    actions={actions}
                    open={this.props.open}
                    autoScrollBodyContent={false}
                    contentStyle={{width: '50%'}}
                >
                    <div>
                        <br />
                        <p>템플릿 선택</p>
                        <br />
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <img 
                                src="/assets/images/tab.png" 
                                alt="Tab" 
                                style={this.props.template == "tab"? style.selected : style.unselected} 
                                onClick={() => this.changeTemplate("tab")}/>
                            <img 
                                src="/assets/images/accordion.png" 
                                alt="accordion" 
                                style={this.props.template == "accordion" ? style.selected : style.unselected} 
                                onClick={() => this.changeTemplate("accordion")}/>
                        </div>
                    </div>
                    <br />
                    <div>
                        <p>스토리맵 제목</p>
                        <TextField
                            id="title"
                            name="title"
                            defaultValue={this.props.title}
                            fullWidth={true}
                            floatingLabelFixed={true}
                        />
                    </div>                    
                </Dialog>
            </div>
        );
    }
}

export default SelectTemplate;