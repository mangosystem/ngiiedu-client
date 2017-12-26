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

import {List, ListItem, makeSelectable} from 'material-ui/List';  
let SelectableList = makeSelectable(List);

class SwipeSetting extends Component {
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

            let items = this.props.maps.items;

            let sortingField = 'id';

            items.sort(function(a, b) { // 오름차순
                return a[sortingField] - b[sortingField];
            });

            this.setState({ typeKind: this.props.maps.typeKind });
            this.props.changeLayerId(items[0].pinoLayer);
            this.props.changeLayerId2(items[1].pinoLayer)
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
        const item2Id = this.props.maps.items[1].id;
        const layerId = this.props.layerId;
        const layerId2 = this.props.layerId2;
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

        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + mapsId + '/item/' + item2Id + '.json'],
            {
                title: itemTitle,
                pinoLayer: layerId2
            },
            function (data) {
                let items = JSON.parse(JSON.stringify(data)).response.data.data;
                this.props.updateItemSetting2(items);
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
            this.props.changeLayerId2(this.props.maps.items[1].pinoLayer)
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

        const { typeKind, items } = this.state;
        
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <figure>
                            <img 
                               src="/ngiiedu/assets/images/HORIZONTAL.png" 
                                // src="/assets/images/sw1.png" 
                                alt="HORIZONTAL" 
                                style={typeKind == "HORIZONTAL"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('HORIZONTAL')}/>
                                <figcaption>가로 스와이프</figcaption>
                        </figure>
                        &nbsp;&nbsp;&nbsp;
                        <figure>
                            <img 
                                src="/ngiiedu/assets/images/VERTICAL.png" 
                                // src="/assets/images/sw2.png" 
                                alt="VERTICAL" 
                                style={typeKind == "VERTICAL"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('VERTICAL')}/>
                                <figcaption>세로 스와이프</figcaption>
                        </figure>
                    </div>
                </div>
                <Subheader style={{marginTop: '10px'}}>레이어 선택</Subheader>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <table style={{textAlign: 'left'}}>
                        <tbody>
                            <tr style={{verticalAlign: 'top'}}>
                                <td>
                                    <Subheader>{typeKind == 'VERTICAL' ? '왼쪽맵' : '아래쪽맵'}</Subheader>
                                    <Paper className="settingSwipePaper">
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
                                    <br />
                                </td>
                                <td style={{ paddingLeft: '20px' }}>
                                    <Subheader>{typeKind == 'VERTICAL' ? '오른쪽맵' : '위쪽맵'}</Subheader>
                                    <Paper className="settingSwipePaper">
                                        <SelectableList value={this.props.layerId2}>
                                        {items.map((item, i) => (
                                            <ListItem 
                                                key={item.idx}
                                                value={item.pinogioOutputId} 
                                                primaryText={item.outputName}
                                                onClick={(i) => this.props.changeLayerId2(item.pinogioOutputId)}
                                            />
                                        ))}
                                        </SelectableList>
                                    </Paper>
                                    <br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Dialog>
        );
    }
}

export default withRouter(SwipeSetting);