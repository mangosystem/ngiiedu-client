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
            items: [],
            itemTitle: '',
            radioType: 'layer'
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

        const workId = this.props.match.params.WORKID;

        ajaxJson(
            ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
            null,
            function (data) {
              
              let workSubData = JSON.parse(JSON.stringify(data)).response.data;
              let items = workSubData.filter(val => (val.outputType == 'layer'))[0].workOutputList;

              this.setState({
                  items: items
              });

      
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
          );
    }

    componentWillMount() {
        if (this.props.map) {
            this.props.changeTitle(this.props.map.outputName);
            this.props.changeItemTitle(this.props.map.pngoData.items[0].title);
            this.props.changeLayerId(this.props.map.pngoData.items[0].pinoLayer);
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
                color: pink400,
                backgroundColor: 'rgba(128, 128, 128, 0.2)'
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
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src="/ngiiedu/assets/images/tab.png" 
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
                        </div>
                    </div>
                    <br />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src="/ngiiedu/assets/images/accordion.png" 
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
                    </div>
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
                        onChange={(e, value) => this.setState({ radioType: value })}
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
                        {items.map((item, i) => (
                            <ListItem
                                disabled={radioType == 'layer'? false : true}
                                key={item.idx}
                                value={item.pinogioOutputId} 
                                primaryText={item.outputName}
                                onClick={(i) => this.props.changeLayerId(item.pinogioOutputId)}
                            />
                        ))}
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