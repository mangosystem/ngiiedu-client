import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import '../main/Maps.css';

import {List, ListItem, makeSelectable} from 'material-ui/List';  
let SelectableList = makeSelectable(List);

class BasicSetting extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stepIndex: 1,
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

    componentWillMount() {
        if (this.props.maps) {
            this.setState({ typeKind: this.props.maps.typeKind });
            this.props.changeLayerId(this.props.maps.items[0].pinoLayer);
        }
    }

    changeTypeKind(typeKind) {
        this.setState({
            typeKind
        });
    }

    updateSetting() {


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


        const itemId = this.props.maps.items[0].id;
        const layerId = this.props.layerId;
        let itemTitle = "";


        //maps_item수정
        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + mapsId + '/item/' + itemId + '.json'],
            {
                title: itemTitle,
                pinoLayer: layerId
            },
            function (data) {
                let items = JSON.parse(JSON.stringify(data)).response.data.data;
                this.props.updateItemSetting(items);
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        this.props.settingHandle();
    }

    cancel() {

        if (this.props.maps) {
            this.props.changeLayerId(this.props.maps.items[0].pinoLayer);
        }

        this.props.settingHandle();
    }


    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.cancel.bind(this)}
            />,
            <FlatButton
              label="변경"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.updateSetting.bind(this)}
            />
        ];

        const { typeKind, items, mapsTitle } = this.state;
        
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

            }
        };

        return (
            <Dialog
                title="설정 변경"
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={false}
                contentStyle={{width: '35%'}}
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
                    <div style={{textAlign: 'center'}}>
                    {/* 
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img 
                                src="/ngiiedu/assets/images/b1.png" 
                                // src="/assets/images/b1.png" 
                                alt="b1" 
                                style={typeKind == "BOTTOM"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('BOTTOM')}/>
                            &nbsp;&nbsp;&nbsp;
                            <img 
                                src="/ngiiedu/assets/images/b2.png" 
                                // src="/assets/images/b2.png" 
                                alt="b2" 
                                style={typeKind == "TOP"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('TOP')}/>
                        </div>
                        <br />
                    */}                        
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img 
                                src="/ngiiedu/assets/images/RIGHT.png" 
                                // src="/assets/images/b3.png" 
                                alt="b3" 
                                style={typeKind == "RIGHT"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('RIGHT')}/>
                            &nbsp;&nbsp;&nbsp;
                            <img 
                                src="/ngiiedu/assets/images/LEFT.png" 
                                // src="/assets/images/b4.png" 
                                alt="b4" 
                                style={typeKind == "LEFT"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('LEFT')}/>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'left'}}>
                    <Subheader>레이어 선택</Subheader>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Paper className="settingPaper">
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
                </div>
            </Dialog>
        );
    }
}

export default withRouter(BasicSetting);