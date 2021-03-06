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
import CircularProgress from 'material-ui/CircularProgress';



class GoogleDataset extends Component {
    constructor(){
        super();
        this.state={
            step:'step1',
            xValue : 'temp1',
            yValue : 'temp2',
            files : [], //google api loading files
            sheetData : [], //google api loading sheet json,
            loading:'false',
            title:''
            
        }

        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.googleConnect = this.googleConnect.bind(this);
        this.listFiles = this.listFiles.bind(this);
        this.filesSetState = this.filesSetState.bind(this);
        this.sheetConnect = this.sheetConnect.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        // this.updateSigninStatus = this.updateSigninStatus.bind(this);
    }


    changeTitle(v){
        title:v
    }
    
    
    // 다음단계로..
    handleNextStep(value){
        
        if(value!='complete'){
            this.setState({
                step:value
            })
        }else{
        }
    }
    
    //2page
    //x y 좌표 변경 이벤트
    handleChange(type, value){
        if(type=='x'){
            this.setState({
                xValue:value  
            })
        }else if(type=='y'){
            this.setState({
                yValue:value
            })
        }
        
    }
    
    //구글로그인 이벤트
    googleConnect(value){
        if(value =='connect'){
            var listFiles = this.listFiles;
            gapi.auth2.getAuthInstance().signIn().then(listFiles);
            
            
        }else if(value=='disconnect'){
            gapi.auth2.getAuthInstance().disconnect();
            this.setState({
                files:[],
                sheetData:[],
            })

        }

    }
    //get google file list
    listFiles() {
        var filesSetState=this.filesSetState;
        gapi.client.drive.files.list({
          'pageSize': 1000,
          'fields': "nextPageToken, files(id, name)",
          'supportsTeamDrives':false,
          'q':"mimeType contains 'application/vnd.ms-excel' or mimeType contains 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
        }).then(function(response) {
            filesSetState(response.result.files);
            
        });

        this.setState({
            loading:'true'
        })
      }

    filesSetState(value){
        this.setState({
            files:value,
            loading:'false'
        })
    }

    sheetDataSetState(value){
        this.setState({
            sheetData:value
        })
    }
    
    //시트 정보 가져오기 google api
    sheetConnect(sheetId){
        var courseWorkSubId= this.props.courseWorkSubId ;
        var fileId = sheetId;
        var vendorId = 'GOOGLE';
        var title = this.state.title;

        ajaxJson(
            ['POST',apiSvr+ '/coursesWork/onlineDataset.json'],
            {
                courseWorkSubId:courseWorkSubId,
                fileId: fileId,
                vendorId:vendorId,
                title:title
            },
            function(res) {
				console.dir(res)

			}.bind(this),
			function(xhr, status, err) {
				alert('Error');
			}.bind(this)
        )


        // var sheetDataSetState = this.sheetDataSetState.bind(this);
        // var columnAlpha = this.columnAlpha.bind(this);
        // var params = {
        // // The spreadsheet to request.
        // spreadsheetId: sheetId,// TODO: Update placeholder value.

        // // The ranges to retrieve from the spreadsheet.
        // ranges: [],  // TODO: Update placeholder value.

        // };

        //sheet 기본정보 요청
        // var request = gapi.client.sheets.spreadsheets.get(params);
        // request.then(function(response) {
        //     let properties = response.result.sheets[0].properties
            
        //     //sheet 세부정보요청
        //     //내부 재요청...
        //     gapi.client.sheets.spreadsheets.values.get({
        //         spreadsheetId: response.result.spreadsheetId,
        //         range: properties.title+'!A1:'+columnAlpha(properties.gridProperties.columnCount),
        //     }).then(function(response) {
        //         sheetDataSetState(response.result.values);
        //     }, function(response) {
        //     console('Error: ' + response.result.error.message);
        //     });



        // }, function(reason) {
        // console.error('error: ' + reason.result.error.message);
        // });
    
    }
    
    //excel 컬럼 수를 알파벳으로 변환
    columnAlpha(value){
        let alphabet = []
        let result = '';
        while(true){
            if(Math.floor(value/27)>=1){
                alphabet.push(value%26)
                value=Math.floor(value/26)
            }else{
                alphabet.push(value);
                break;
            }
        }

        for(var i =alphabet.length-1;i>=0; i--){
            result=result+String.fromCharCode(alphabet[i]+64);
        }
        return result;        
      }

    render() {

        return (
            <div style={{marginTop:50
            }}>
            {this.state.step=='step1' ? 
                <div style={{textAlign:'center'}}>
                    <p>제목</p>
                    <TextField
                        style={{marginLeft:'0%'}}
                        hintText="제목"
                        onChange={(e,v)=>this.changeTitle(v)}
                    />
                    <br/>
                    <div style={{marginTop:20}}>
                        <p style={{marginBottom:20}}>시트 선택</p>
                        
                        {this.state.files.length !=0 ? 
                        <div>
                            <FlatButton
                                label="해제"
                                onClick={()=>this.googleConnect('disconnect')}
                                style={{color: 'white'}}
                                backgroundColor={'#3e81f6'}
                                
                            /> 
                                <Paper style={{height:400,width:'100%',overflow:'auto',marginTop:40,paddingTop:10}}>
                            {this.state.files.map((row, index)=>(
                                    <Paper key={index} style={{height:60,width:'80%', marginLeft:'10%',marginBottom:10, display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                        <div style={{height:30,width:30,border:'solid 1px gray',textAlign:'center'}}>xls</div>
                                        <h4>{row.name}</h4>
                                        <FlatButton
                                            label="선택"
                                            onClick={()=>this.sheetConnect(row.id)}
                                            style={{marginRight:10,color: 'white'}}
                                            backgroundColor={'#3e81f6'}
                                        />  
                                    </Paper>
                            ))}
                                </Paper>
                        </div>
                        :
                        <FlatButton
                                label="연결"
                                onClick={()=>this.googleConnect('connect')}
                                style={{color: 'white'}}
                                backgroundColor={'#3e81f6'}
                                
                        /> 
                        }
                        {this.state.loading=='true'?
                        <div style={{width:'100%', height:400, marginTop:40, display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <CircularProgress size={80} thickness={5} />
                        </div> 
                        :
                        null}
                        

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
                            // onClick={this.createDataset}
                        />
                    </div>
                </div>
            :

            //step2
                <div>
                    <p>좌표값 설정</p>
                    <div style={{display:'flex', marginTop:10,marginLeft:10, alignItems:'center'}}>
                        <span>X좌표</span>
                        <DropDownMenu value={this.state.xValue} style={{marginLeft:0}} onChange={(event,index,value)=>this.handleChange('x',value)}>
                            {['temp1','temp2','temp3'].map((row,index)=>(
                                <MenuItem key={index} value={row} primaryText={row} />
                            ))}
                        </DropDownMenu>
                        <span style={{marginLeft:100}}>Y좌표</span>
                        <DropDownMenu value={this.state.yValue} style={{marginLeft:0}} onChange={(event,index,value)=>this.handleChange('y',value)}>
                            {['temp1','temp2','temp3'].map((row,index)=>(
                                <MenuItem key={index} value={row} primaryText={row} />
                            ))}
                        </DropDownMenu>
                    </div>
                   
                    <div style={{backgroundColor:'white', width:'100%', height:300,marginTop:20}}>
                            구글시트 테이블 확인
                    </div>
                    <div style={{marginTop:20}}>
                        
                    <Divider style={{marginTop:20,marginBottom:20}}/>
                    </div>
                    <FlatButton
                        label="이전"
                        backgroundColor={cyan500}
                        style={{color: 'white',position:'absolute',left:0}}
                        onClick={()=>this.handleNextStep('step1')}
                    />
                    <FlatButton
                        label="생성"
                        backgroundColor={cyan500}
                        style={{color: 'white',position:'absolute',right:0,marginRight:70}}
                        onClick={()=>this.handleNextStep('complete')}
                    />
                </div>
            }

            </div>
        );
    }
}

export default GoogleDataset;