import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import '../main/Maps.css';

import {List, ListItem, makeSelectable} from 'material-ui/List';
let SelectableList = makeSelectable(List);

class CreateItems extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            radioType: 'layer',
            items: [{}],
            mode: 'add'
        };
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

                this.props.setDefaultLayerId(items[0].pinogioOutputId);
        
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

    }


    createItems() {

        let { itemTitle, layerId, mapsId } = this.props;
        let { radioType } = this.state;

        if (radioType == 'text') {
            layerId = null;
        }

        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + mapsId + "/item" + '.json'],
            {
                title: itemTitle,
                pinoLayer: layerId
            },
            function (data) {
                
                let mapsItem = JSON.parse(JSON.stringify(data)).response.data.data;
                this.props.addItems(mapsItem);
                //console.log(mapsItem);
    
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        this.props.itemHandle();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.mode == 'edit') {
            this.setState({
                itemTitle: nextProps.itemTitle,
                layerId: nextProps.layerId
            });

            if (nextProps.layerId == '') {
                this.setState({
                    radioType: 'text'
                });
            }
        }
    }

    modifyItems() {

        let { itemTitle, layerId, mapsId, item } = this.props;
        let itemId = item.id;

        let { radioType } = this.state;
        if (radioType == 'text') {
            layerId = "";
        }


        //maps_item수정
        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + mapsId + '/item/' + itemId + '.json'],
            {
                title: itemTitle,
                pinoLayer: layerId
            },
            function (data) {
                let mapsItem = JSON.parse(JSON.stringify(data)).response.data.data;
                this.props.modifyItems(mapsItem);
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        this.props.itemHandle();
    }

    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.itemHandle}
            />,
            <FlatButton
              label={this.props.mode == 'add' ? '추가' : '변경'}
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.props.mode == 'add' ? this.createItems.bind(this) : this.modifyItems.bind(this)}
            />
        ];
        
        const { radioType, items } = this.state;

        const style = {
            radioButton: {
                marginBottom: 16,
            },
            disabled: {
                color: '#ccc',
                cursor: 'no-drop'
            },
            abled: {

            }
        };

        return (
            <Dialog
                title={this.props.mode == 'add' ? '탭 추가하기' : '탭 편집하기'}
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={false}
                contentStyle={{width: '50%'}}
            >
                <div>
                    <Subheader>제목</Subheader>
                    {this.props.mode == 'add' ? 
                    <TextField
                        id="itemTitle"
                        fullWidth={true}
                        hintText="*탭 제목을 입력해주세요"
                        onChange={(e, value) => this.props.changeItemTitle(value)}
                        value={this.props.itemTitle}
                    />
                    :
                    <TextField
                        id="itemTitle"
                        fullWidth={true}
                        hintText="*탭 제목을 입력해주세요"
                        onChange={(e, value) => this.props.changeItemTitle(value)}
                        value={this.state.itemTitle}
                    />
                    }
                    <br /><br />
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Paper className="paper">
                            {this.props.mode == 'add' ? 
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
                            )):null}
                            </SelectableList>
                            :
                            <SelectableList value={radioType == 'layer' ? this.state.layerId : null}>
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
                            )):null}
                            </SelectableList>
                            }
                        </Paper>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default withRouter(CreateItems);