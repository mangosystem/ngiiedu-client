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

class CreateSeriesItems extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
                let items = workSubData.filter(val => (val.outputType == 'layer'||val.outputType=='populationLayer'))[0].workOutputList;

                if (items.length == 0) {
                    items = [{}];
                }

                this.setState({
                    items: items
                });

                if ("pinogioOutputId" in items[0]) {
                    this.props.setDefaultLayerId(items[0].pinogioOutputId);
                }
        
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

    }


    createItems() {

        let { itemTitle, layerId, mapsId } = this.props;

        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + mapsId + "/item" + '.json'],
            {
                title: itemTitle,
                pinoLayer: layerId
            },
            function (data) {
                
                let mapsItem = JSON.parse(JSON.stringify(data)).response.data.data;
                this.props.addItems(mapsItem);
    
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
        }
    }

    modifyItems() {

        let { itemTitle, layerId, mapsId, item } = this.props;
        let itemId = item.id;

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
        
        const { items } = this.state;

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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Paper className="paper">
                            {this.props.mode == 'add' ? 
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
                            :
                            <SelectableList value={this.state.layerId}>
                            {"pinogioOutputId" in items[0] ?
                                items.map((item, i) => (
                                <ListItem
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

export default withRouter(CreateSeriesItems);