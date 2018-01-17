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
            items: [{}],
            radioType: 'layer',
            itemTitle: ''
        };
    }

    componentDidMount() {
        
        if (this.props.map) {
            this.setState({ 
                typeKind: this.props.map.pngoData.typeKind
            });
        } else {
            this.props.changeTypeKind("SLIDE");
        }

        let items = this.props.items;

        this.setState({
            items: items
        });

    }

    changeItemTitle(value) {
        this.setState({
            itemTitle: value
        });

        this.props.changeItemTitle(value);
    }
    

    componentWillMount() {
        if (this.props.map) {

            let items = this.props.map.pngoData.items;

            if (items.length >= 2) {
                let sortingField = 'priority';
    
                items.sort(function(a, b) { // 오름차순
                    return a[sortingField] - b[sortingField];
                });
            }

            this.props.changeItemTitle(items[0].title);
            this.props.changeLayerId(items[0].pinoLayer);
        }
    }

    componentWillReceiveProps(nextProps) {
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
                        id="title"
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
                    <Subheader>제목</Subheader>
                    <TextField
                        fullWidth={true}
                        hintText="*탭 제목을 입력해주세요"
                        onChange={(e, value) => this.changeItemTitle(value)}
                        value={this.state.itemTitle}
                    />
                    <Subheader>레이어 선택</Subheader>
                    <Paper className="paper">
                        <SelectableList value={this.props.layerId}>
                        {"pinogioOutputId" in items[0] ?                         
                            items.map((item, i) => (
                            <ListItem 
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
                <h2>연속데이터형 스토리맵 만들기</h2>
                <div>{this.getStepContent(stepIndex)}</div>
                <br />
            </div>
        );
    }
}

export default withRouter(SeriesMaps);