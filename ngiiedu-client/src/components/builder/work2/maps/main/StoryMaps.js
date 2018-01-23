import React, { Component } from 'react';

import { withRouter } from "react-router-dom";


import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import {List, ListItem, makeSelectable} from 'material-ui/List';
let SelectableList = makeSelectable(List);

class StoryMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            typeKind: 'TAB',
            items: [{}],
            itemTitle: ''
        };
    }

    componentDidMount() {

        if (this.props.map) {
            this.setState({ 
                typeKind: this.props.map.pngoData.typeKind
            });
        } else {
            this.props.changeTypeKind("TAB");
        }

        let items = this.props.items;

        this.setState({
            items: items
        });

    }
    

    componentWillMount() {
        //수정할때
        if (this.props.map) {

            let items = this.props.map.pngoData.items;

            if (items.length >= 2) {
                let sortingField = 'priority';
    
                items.sort(function(a, b) { // 오름차순
                    return a[sortingField] - b[sortingField];
                });
            }

            this.props.changeTitle(this.props.map.outputName);
            this.props.changeItemTitle(items[0].title);
            this.props.changeLayerId(items[0].pinoLayer);
            
            if (items[0].pinoLayer == '') {
                this.props.changeRadioType('text');
            } else {
                this.props.changeRadioType('layer');
            }
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            radioType: nextProps.radioType
        });

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

        const { itemValue, typeKind, items, radioType } = this.state;

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

            disabled: {
                color: '#ccc',
                cursor: 'no-drop'
            },

            abled: {

            },

            radioButton: {
                marginBottom: 16,
            },

            text: {
                textAlign: 'center'
            }
        };

        
        switch (stepIndex) {
            case 1:
            return (
                <div style={{textAlign: 'left', width: '100%'}}>
                    <br />
                    <Subheader>제목</Subheader>
                    <TextField 
                        id="title"
                        fullWidth={true}
                        hintText="*스토리맵 제목을 입력해주세요"
                        onChange={(e, value) => this.props.changeTitle(value)}
                        value={this.props.title}
                    />
                    <br /><br />
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {/*<img 
                            src="/ngiiedu/assets/images/TAB.png" 
                            // src="/assets/images/tab.png" 
                            alt="tab" 
                            style={typeKind == "TAB"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('TAB')}/>
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <h4>탭</h4> <br />
                            <p>
                                설명 텍스트에 대한 옵션 패널과 함께 탭을 사용하여 <br />
                                맵과 다른 콘텐츠를 나타냅니다.
                            </p>
                        </div>*/}
                        <figure>
                            <img 
                                src={contextPath+"/assets/images/TAB.png"} 
                                // src="/assets/images/accordion.png" 
                                alt="tab" 
                                style={typeKind == "TAB"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('TAB')}/>
                            <figcaption style={style.text}>탭</figcaption>
                        </figure>
                    </div>
                    <br />
                    {/*<div style={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src="/ngiiedu/assets/images/ACCORDION.png" 
                            // src="/assets/images/accordion.png" 
                            alt="accordion" 
                            style={typeKind == "ACCORDION"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('ACCORDION')}/>
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <h4>아코디언</h4> <br />
                            <p>
                                설명 텍스트를 포함하는 확장 가능한 컨트롤을 사용하여 <br />
                                맵과 다른 콘텐츠를 나타냅니다.
                            </p>
                        </div>
                    </div>*/}
                </div>
            );
          case 2:
            return (
                <div style={{textAlign: 'left'}}>
                    <br />
                    <Subheader>제목</Subheader>
                    <TextField
                        id="itemTitle"
                        fullWidth={true}
                        hintText="*탭 제목을 입력해주세요"
                        onChange={(e, value) => this.props.changeItemTitle(value)}
                        value={this.props.itemTitle}
                    />
                    <RadioButtonGroup 
                        name="" 
                        defaultSelected={radioType}
                        onChange={(e, value) => this.props.changeRadioType(value)}
                    >
                        <RadioButton
                            value="text"
                            label="텍스트"
                            style={style.radioButton}
                        />
                        <RadioButton
                            value="layer"
                            label="초기 레이어 선택"
                            style={style.radioButton}
                        />
                    </RadioButtonGroup>
                    <Paper className="paper">
                        <SelectableList value={radioType == 'layer' ? this.props.layerId : null}>
                        {"pinogioOutputId" in items[0] ? 
                            items.map((item, i) => (
                            <ListItem
                                disabled={radioType == 'layer'? false : true}
                                style={radioType == 'layer'? style.abled : style.disabled}
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
                <h2>스토리형 스토리맵 만들기</h2>
                <div>{this.getStepContent(stepIndex)}</div>
                <br />
            </div>
        );
    }
}

export default withRouter(StoryMaps);