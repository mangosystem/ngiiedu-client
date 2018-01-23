import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


import '../main/Maps.css';
  

class StorySetting extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 1,
            itemValue: 1,
            items: [
                { idx: 1, text: '레이어1'}
            ]
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.maps) {
            this.setState({ 
                typeKind: nextProps.maps.typeKind,
                mapsTitle: nextProps.mapsTitle
            });
        }
    }

    componentWillMount() {    
        
        const workId = this.props.match.params.WORKID;

        ajaxJson(
            ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
            null,
            function (data) {
                
                let workSubData = JSON.parse(JSON.stringify(data)).response.data;
                let items = workSubData.filter(val => (val.outputType == 'layer'||val.outputType=='populationLayer'))[0].workOutputList;

                this.setState({
                    items: items
                });

        
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
    }

    changeTypeKind(typeKind) {
        this.setState({
            typeKind
        });typeKind
    }

    updateMapsSetting() {

        const { typeKind, mapsTitle } = this.state;
        const mapsId = this.props.maps.mapsId;

        //maps수정
        ajaxJson(
            ['PUT', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
            {
                typeKind,
                title: mapsTitle
            },
            function (data) {
                let maps = JSON.parse(JSON.stringify(data)).response.data.result;                
                this.props.updateMapsSetting(maps);
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        this.props.settingHandle();

    }


    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.settingHandle}
            />,
            <FlatButton
              label="변경"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.updateMapsSetting.bind(this)}
            />
        ];

        const { itemValue, typeKind, items, mapsTitle } = this.state;
        
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

            text: {
                textAlign: 'center'
            }
        };

        return (
            <Dialog
                title="설정 변경"
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={false}
                contentStyle={{width: '50%'}}
            >
                <div>
                    <Subheader>제목</Subheader>
                    <TextField
                        fullWidth={true}
                        hintText="*스토리맵 제목"
                        onChange={(e, value) => this.setState({ mapsTitle: value })}
                        value={this.state.mapsTitle}
                        style={{ marginBottom: '8px' }}
                    />
                    <Subheader>템플릿 변경</Subheader>
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
            </Dialog>
        );
    }
}

export default withRouter(StorySetting);