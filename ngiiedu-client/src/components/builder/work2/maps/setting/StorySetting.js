import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';


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
                typeKind: nextProps.maps.typeKind
            });
        }
    }

    componentDidMount() {    
        
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

    changeTypeKind(typeKind) {
        this.setState({
            typeKind
        });
    }

    updateMapsSetting() {

        const { typeKind } = this.state;
        const mapsId = this.props.maps.mapsId;

        //maps수정
        ajaxJson(
            ['PUT', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
            {
                typeKind,
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

        const { itemValue, typeKind, items } = this.state;
        
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
                    <Subheader>템플릿 변경</Subheader>
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
            </Dialog>
        );
    }
}

export default withRouter(StorySetting);