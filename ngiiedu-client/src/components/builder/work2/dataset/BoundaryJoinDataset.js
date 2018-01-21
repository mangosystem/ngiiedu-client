import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import update from 'react-addons-update';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';



class BoundaryJoinDataset extends Component {
    constructor(){
        super();
        this.state={
            year:2016,
            bound:'시도 행정경계',
            dataType:null,
            fileName:'파일선택',
        }

        this.handleChange = this.handleChange.bind(this);
        this.createDataset = this.createDataset.bind(this);
    }

    
    //2page
    //x y 좌표 변경 이벤트
    handleChange(type, value){
        if(type=='year'){
            this.setState({
                year:value  
            })
        }else if(type=='bound'){
            this.setState({
                bound:value
            })
        }
        
    }
    componentDidMount() {
        var setFileName = this.setFileName.bind(this);
        let setType = this.setType.bind(this);
         $('#uploadForm').change(function () {
            let nameSplit = document.getElementById('uploadFile').files[0].name.split('.');
            let type = nameSplit[nameSplit.length-1].toLowerCase();
            setType(type);
            setFileName(document.getElementById('uploadFile').files[0].name)
        });
    } 


    createDataset(){
        let courseId=this.props.match.params.COURSEID;
        let courseWorkId = this.props.match.params.WORKID;
        let year = this.state.year;
        let bound = this.state.bound;
        let fileName = this.state.fileName;
        let dataType = this.state.dataType;



        var form = new FormData(document.getElementById('uploadForm')); 
    }

    setFileName(v){
        this.setState({
            fileName : v
        })
    }
    
    setType(type){
        this.setState({
            dataType: type
        })
    }


    render() {

        var year = [2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000];
        var bounds = ['시도 행정경계','시군구 행정경계','읍면동 행정경계'];

        return (
            <div>
                <h2>인구 데이터 생성</h2>
                <TextField
                    floatingLabelFixed={true}
                    floatingLabelText="제목"
                    style={{marginLeft:'0%'}}
                    hintText="제목을 입력하세요"
                />
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Paper style={{width:600,height:150,paddin:10}}>
                    <h3 style={{margin:10}}>행정경계 선택</h3>
                    <Divider />
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <SelectField value={this.state.year} style={{width:200,marginRight:50}} onChange={(event,index,value)=>this.handleChange('year',value)}
                                floatingLabelText="연도 선택"
                            >
                                {year.map((row,index)=>(
                                    <MenuItem key={index} style={{width:200}} value={row} primaryText={row+'년'} />
                                ))}
                            </SelectField>

                            <SelectField value={this.state.bound} style={{width:200}} onChange={(event,index,value)=>this.handleChange('bound',value)}
                                floatingLabelText="경계구분 선택"
                            >
                                {bounds.map((row,index)=>(
                                    <MenuItem key={index} style={{width:200}} value={row} primaryText={row} />
                                ))}
                            </SelectField>
                        </div>

                    </Paper>
                    <Paper style={{width:350,height:150,paddin:10,marginLeft:30}}>
                        <h3 style={{margin:10}}>데이터 파일 업로드</h3>
                        <Divider style={{marginBottom:10}}/>
                        <div style={{display:'flex',justifyContent:'center'}}>

                            <form id="uploadForm" style={{marginTop:30,marginBottom:20}}>
                                <div className="filebox">
                                    <input className="upload-name" value={this.state.fileName} disabled="disabled"/> 
                                    <label htmlFor="uploadFile">업로드</label>
                                    <input type="file" name="uFile" id="uploadFile" className="upload-hidden"/> 
                                </div>
                            </form>
                        </div>
                    </Paper>
            </div>

                    <div style={{width:900,height:300,margin:40, border:'2px solid black'}}>
                        img
                    </div>

            
                <Divider style={{marginTop:20,marginBottom:20}}/>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <FlatButton
                        label="취소"
                        style={{color: 'white',backgroundColor:'#3e81f6'}}
                        onClick={()=>this.props.handleStep('main')}
                    />
                    <FlatButton
                        label="생성"
                        style={{color: 'white',backgroundColor:'#3e81f6'}}
                        onClick={this.createDataset}
                    />
                </div>
            </div>
        );
    }
}

export default BoundaryJoinDataset;