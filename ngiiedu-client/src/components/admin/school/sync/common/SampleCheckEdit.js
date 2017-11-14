import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';


import Paper from 'material-ui/Paper';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import './SampleCheckEdit.css';

//redux
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import { actionSchoolSyncEditColumn }  from '../../../../../actions/index';


const style = {
width:230,
height:40,
marginTop:5
};



class SampleCheckEdit extends Component {
    constructor(){
        super();
        this.state = {
            dbColumnIndex:[],//api기준 수정된 컬럼의 인댁스
            menuItemStyle:[],//display 옵션
            
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, key, value, idx){
        console.dir('event:'+event);
        console.log('key:'+key);
        console.log('value:'+value);
        console.log('idx:'+idx);
        let dbColumnIndex = this.state.dbColumnIndex;
        dbColumnIndex[idx]=key;
        this.setState({
            dbColumnIndex:dbColumnIndex
        });
        console.log("dbColumnIndex"+this.state.dbColumnIndex);

        var styleArray=[];
        for(var i =0;i<this.props.apiColumn.length;i++){
            styleArray.push({
                display:"block"
            })
        }

        for(var i =0;i<dbColumnIndex.length;i++){
            styleArray[dbColumnIndex[i]]={
                display:"none"
            }
        }

        this.setState({
            menuItemStyle:styleArray
        })

        this.props.handleNextStep(dbColumnIndex,this.props.apiColumn,this.props.dbColum);

    }

    componentWillReceiveProps(nextProps){
        let dbColumn = nextProps.dbColumn;
        let apiColumn = nextProps.apiColumn;
        var tempArray =[];

        var styleArray=[]
        for(var i=0;i<apiColumn.length;i++){
            styleArray.push({
                display:"block"
            })
        }

        for(var i=0;i<dbColumn.length;i++){

            let index = apiColumn.indexOf(dbColumn[i])
            tempArray.push(index);


            styleArray[index]={
                display:"none"
            };
        }

        this.setState({
            dbColumnIndex:tempArray,
            menuItemStyle:styleArray
        })
        this.props.handleNextStep(tempArray,apiColumn,dbColumn);
    }



    render() {
        return (
            <div >
                <Table
                bodyStyle={{
                    width:850,
                    height:160
                }}
                selectable={false}

                >
                    <TableBody
                        displayRowCheckbox={false}
                    >

                        <TableRow>
                        {this.props.dbColumnRows.first.map((row, idx) => (
                            <TableRowColumn key={row}  >
                                <Paper style={style}>
                                    <div style={{float:'left'}}>
                                        <span style={{color: 'rgba(0, 0, 0, 0.87)', display:'block', fontSize:13}}>{row}</span>
                                        <span style={{color: 'rgba(0, 0, 0, 0.54)', display:'block', fontSize:12}}>{this.props.apiColumn[this.state.dbColumnIndex[idx]]}</span>
                                    </div>
                                    <div style={{float:'right'}}>
                                        <IconMenu
                                            iconButtonElement={<IconButton><ArrowDropDown /></IconButton>}
                                            onChange={(event, key, value) => this.handleChange(event, key, value, idx)}
                                            value={this.state.dbColumnIndex[idx]}
                                            >
                                            <MenuItem  style={{display:"block"}} value={-1} primaryText={"선택안함"} />
                                            {this.props.apiColumn.map((row, idx) => (
                                                <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={idx} primaryText={this.props.apiColumn[idx]} />
                                            ))}
                                        </IconMenu>
                                    </div>
                                </Paper>
                            </TableRowColumn>
                        ))}
                        </TableRow>
                        <TableRow>
                        {this.props.dbColumnRows.second.map((row, idx) => (
                            <TableRowColumn key={row}>
                                <Paper style={style}>
                                    <div style={{float:'left'}}>
                                        <span style={{color: 'rgba(0, 0, 0, 0.87)', display:'block', fontSize:13}}>{row}</span>
                                        <span style={{color: 'rgba(0, 0, 0, 0.54)', display:'block', fontSize:12}}>{this.props.apiColumn[this.state.dbColumnIndex[idx+3]]}</span>
                                    </div>
                                    <div style={{float:'right'}}>
                                        <IconMenu
                                            iconButtonElement={<IconButton><ArrowDropDown /></IconButton>}
                                            onChange={(event, key, value) => this.handleChange(event, key, value, idx+3)}
                                            value={this.state.dbColumnIndex[idx+3]}
                                            >
                                            <MenuItem  style={{display:"block"}} value={-1} primaryText={"선택안함"} />
                                            {this.props.apiColumn.map((row, idx) => (
                                                <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={idx} primaryText={this.props.apiColumn[idx]} />
                                            ))}
                                        </IconMenu>
                                    </div>
                                </Paper>
                            </TableRowColumn>
                        ))}
                        </TableRow>
                        <TableRow>
                        {this.props.dbColumnRows.third.map((row, idx) => (
                            <TableRowColumn key={row}>
                                <Paper style={style}>
                                    <div style={{float:'left'}}>
                                        <span style={{color: 'rgba(0, 0, 0, 0.87)', display:'block', fontSize:13}}>{row}</span>
                                        <span style={{color: 'rgba(0, 0, 0, 0.54)', display:'block', fontSize:12}}>{this.props.apiColumn[this.state.dbColumnIndex[idx+6]]}</span>
                                    </div>
                                    <div style={{float:'right'}}>
                                        <IconMenu
                                            iconButtonElement={<IconButton><ArrowDropDown /></IconButton>}
                                            onChange={(event, key, value) => this.handleChange(event, key, value, idx+6)}
                                            value={this.state.dbColumnIndex[idx+6]}
                                            >
                                            <MenuItem  style={{display:"block"}} value={-1} primaryText={"선택안함"} />
                                            {this.props.apiColumn.map((row, idx) => (
                                                <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={idx} primaryText={this.props.apiColumn[idx]} />
                                            ))}
                                        </IconMenu>
                                    </div>
                                </Paper>
                            </TableRowColumn>
                        ))}
                        </TableRow>
                        <TableRow>
                        {this.props.dbColumnRows.fourth.map((row, idx) => (
                            <TableRowColumn key={row}>
                                <Paper style={style}>
                                    <div style={{float:'left'}}>
                                        <span style={{color: 'rgba(0, 0, 0, 0.87)', display:'block', fontSize:13}}>{row}</span>
                                        <span style={{color: 'rgba(0, 0, 0, 0.54)', display:'block', fontSize:12}}>{this.props.apiColumn[this.state.dbColumnIndex[idx+9]]}</span>
                                    </div>
                                    <div style={{float:'right'}}>
                                        <IconMenu
                                            iconButtonElement={<IconButton><ArrowDropDown /></IconButton>}
                                            onChange={(event, key, value) => this.handleChange(event, key, value, idx+9)}
                                            value={this.state.dbColumnIndex[idx+9]}
                                            >
                                            <MenuItem  style={{display:"block"}} value={-1} primaryText={"선택안함"} />
                                            {this.props.apiColumn.map((row, idx) => (
                                                <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={idx} primaryText={this.props.apiColumn[idx]} />
                                            ))}
                                        </IconMenu>
                                    </div>
                                </Paper>
                            </TableRowColumn>
                        ))}
                        </TableRow>
                        <TableRow>
                        {this.props.dbColumnRows.fifth.map((row, idx) => (
                            <TableRowColumn key={row}>
                                <Paper style={style}>
                                    <div style={{float:'left'}}>
                                        <span style={{color: 'rgba(0, 0, 0, 0.87)', display:'block', fontSize:13}}>{row}</span>
                                        <span style={{color: 'rgba(0, 0, 0, 0.54)', display:'block', fontSize:12}}>{this.props.apiColumn[this.state.dbColumnIndex[idx+12]]}</span>
                                    </div>
                                    <div style={{float:'right'}}>
                                        <IconMenu
                                            iconButtonElement={<IconButton><ArrowDropDown /></IconButton>}
                                            onChange={(event, key, value) => this.handleChange(event, key, value, idx+12)}
                                            value={this.state.dbColumnIndex[idx+12]}
                                            >
                                            <MenuItem  style={{display:"block"}} value={-1} primaryText={"선택안함"} />
                                            {this.props.apiColumn.map((row, idx) => (
                                                <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={idx} primaryText={this.props.apiColumn[idx]} />
                                            ))}
                                        </IconMenu>
                                    </div>
                                </Paper>
                            </TableRowColumn>
                        ))}
                        </TableRow>
                        <TableRow>
                        {this.props.dbColumnRows.sixth.map((row, idx) => (
                            <TableRowColumn key={row}>
                                <Paper style={style}>
                                    <div style={{float:'left'}}>
                                        <span style={{color: 'rgba(0, 0, 0, 0.87)', display:'block', fontSize:13}}>{row}</span>
                                        <span style={{color: 'rgba(0, 0, 0, 0.54)', display:'block', fontSize:12}}>{this.props.apiColumn[this.state.dbColumnIndex[idx+15]]}</span>
                                    </div>
                                    <div style={{float:'right'}}>
                                        <IconMenu
                                            iconButtonElement={<IconButton><ArrowDropDown /></IconButton>}
                                            onChange={(event, key, value) => this.handleChange(event, key, value, idx+15)}
                                            value={this.state.dbColumnIndex[idx+15]}
                                            >
                                            <MenuItem  style={{display:"block"}} value={-1} primaryText={"선택안함"} />
                                            {this.props.apiColumn.map((row, idx) => (
                                                <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={idx} primaryText={this.props.apiColumn[idx]} />
                                            ))}
                                        </IconMenu>
                                    </div>
                                </Paper>
                            </TableRowColumn>
                        ))}
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
            
        );
    }
}

SampleCheckEdit.defaultProps = {
    dbColumn : [
        "학교ID",
        "학교명",
        "학교급구분",
        "운영상태",
        "교육지원청명",
        "교육지원청코드",
        "시도교육청명",
        "시도교육청코드",
        "소재지지번주소",
        "설립일자",
        "설립형태",
        "위도",
        "경도",
        "본교분교구분",
        "소재지도로명주소",
        "데이터기준일자",
        "생성일자",
        "변경일자"
    ],
    apiColumn:[],
    dbColumnRows:{
        rows:['first','second','third','fourth','fifth','sixth'],
        first:[
            "학교ID",
            "학교명",
            "학교급구분"
        ],
        second:[
            "운영상태",
            "교육지원청명",
            "교육지원청코드"
        ],
        third:[
            "시도교육청명",
            "시도교육청코드",
            "소재지지번주소"
        ],
        fourth:[
            "설립일자",
            "설립형태",
            "위도"
        ],
        fifth:[
            "경도",
            "본교분교구분",
            "소재지도로명주소"
        ],
        sixth:[
            "데이터기준일자",
            "생성일자",
            "변경일자"
        ]
    }
};


const mapDispatchToProps = (dispatch) => ({

        handleNextStep: (dbColumnIndex,apiColumn,dbColumn) => {
            var editColumn =[];
            console.log("db인덱스요:"+dbColumnIndex.toString());
            for(var i=0;i<dbColumnIndex.length;i++){

                if(dbColumnIndex[i]==-1){
                    editColumn.push("");
                }else{
                    editColumn.push(apiColumn[dbColumnIndex[i]]);
                }
            }
            dispatch(actionSchoolSyncEditColumn(editColumn));
        }
});

SampleCheckEdit = connect(
    null,
    mapDispatchToProps
)(SampleCheckEdit);


export default SampleCheckEdit;
