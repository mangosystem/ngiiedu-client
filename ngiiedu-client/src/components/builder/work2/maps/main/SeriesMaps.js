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

class SeriesMaps extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 0,
            typeKind: 'SLIDE',
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

    componentDidMount() {
        
        if (this.props.map) {
            this.setState({ 
                typeKind: this.props.map.pngoData.typeKind
            });
        } else {
            this.props.changeTypeKind("CAROUSEL");
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

                if (!this.props.map) {
                    this.props.changeLayerId(items[0].pinogioOutputId);
                }

        
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
    }

    componentWillMount() {
        if (this.props.map) {
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
                <div style={{textAlign: 'left'}}>
                    <br />
                    <Subheader>제목</Subheader>
                    <TextField 
                        fullWidth={true}
                        hintText="*스토리맵 제목을 입력해주세요"
                        onChange={(e, value) => this.props.changeTitle(value)}
                        defaultValue={this.props.map ? this.props.map.outputName : ''}
                    />
                    <br /><br />
                    {/*<div style={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src="/ngiiedu/assets/images/c1.png" 
                            // src="/assets/images/tab.png" 
                            alt="c1" 
                            style={typeKind == "CAROUSEL"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('CAROUSEL')}/>
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <h4>화면전환형</h4> <br />
                            <p>
                                설명 텍스트에 대한 옵션 패널과 함께 탭을 사용하여 <br />
                                맵과 다른 콘텐츠를 나타냅니다.
                            </p>
                        </div>
                    </div>
                    <br />*/}
                    <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                        {/*<img 
                            src="/ngiiedu/assets/images/c2.png" 
                            // src="/assets/images/accordion.png" 
                            alt="c2" 
                            style={typeKind == "SLIDE"? style.selected : style.unselected}
                            onClick={() => this.changeTypeKind('SLIDE')}/>
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <h4>슬라이더형</h4> <br />
                            <p>
                                설명 텍스트를 포함하는 확장 가능한 컨트롤을 사용하여 <br />
                                맵과 다른 콘텐츠를 나타냅니다.
                            </p>
                        </div>*/}
                        <figure>
                            <img 
                                src="/ngiiedu/assets/images/SLIDE.png" 
                                // src="/assets/images/accordion.png" 
                                alt="c2" 
                                style={typeKind == "SLIDE"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('SLIDE')}/>
                            <figcaption style={style.text}>슬라이더형</figcaption>
                        </figure>
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
                        {items.map((item, i) => (
                            <ListItem 
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
                <h2>연속데이터형 스토리맵 만들기</h2>
                <div>{this.getStepContent(stepIndex)}</div>
                <br />
            </div>
        );
    }
}

export default withRouter(SeriesMaps);