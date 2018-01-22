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
            boundsValue:'sd',
            dataType:null,
            fileName:'파일선택',
            title:'',
            boundaryJoinType:'NAME',
            sidoId:11,

        }

        this.handleChange = this.handleChange.bind(this);
        this.createDataset = this.createDataset.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
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
                boundsValue:value
            })
        }else if(type=='boundaryJoinType'){
            this.setState({
                boundaryJoinType:value
            })
        }else if(type =='sidoId'){
            this.setState({
                sidoId:value
            })
        }
        
    }
    componentDidMount() {
        var setFileName = this.setFileName.bind(this);
        let setType = this.setType.bind(this);
         $('#boundaryUploadForm').change(function () {
            let nameSplit = document.getElementById('uploadFile').files[0].name.split('.');
            let type = nameSplit[nameSplit.length-1].toLowerCase();
            if(type=='xls'||type=='xlsx'){
                setType(type);
                setFileName(document.getElementById('uploadFile').files[0].name)
            } else{
                alert('엑셀파일을 업로드해 주세요');
                setType(null);
                setFileName('파일선택');
            }
        });
    } 


    createDataset(){
        // let courseId=this.props.match.params.COURSEID;
        // let courseWorkId = this.props.match.params.WORKID;
        let year = this.state.year;
        let boundsValue = this.state.boundsValue;
        let dataType = this.state.dataType;
        let sidoId = this.state.sidoId;
        

        let courseWorkSubId = this.props.courseWorkSubId;
        let boundaryJoinType = this.state.boundaryJoinType;//code, name 행정경계 명 , 코드
        let title = this.state.title; //제목
        let boundaryId = 'bnd='+boundsValue+year; //boundary_id
        let boundaryFilter; //시도 필터

        var form = new FormData(document.getElementById('boundaryUploadForm')); //data를 담을 form

        if(boundaryJoinType=='CODE'||boundsValue=='sd'){
            boundaryFilter = ""
        }else if(boundsValue ='sg'){
            boundaryFilter = "sigungu_cd like '"+sidoId +"%'"
        }else if(boundsValue='ad'){
            boundaryFilter = "adm_cd like '"+sidoId +"%'"
        }


    
        if(dataType==null){
            alert("엑셀 파일을 선택해 주세요");
            return;
        }else if(title==''){

        }
        form.append("boundaryFilter",boundaryFilter);
        form.append("boundaryId",boundaryId);
        form.append("boundaryJointype",boundaryJoinType);
        form.append("courseWorkSubId",courseWorkSubId);
        form.append("title",title)
        // form.append("options", '{"lon":"x",  "lat":"y", "srid":5179}');
        let handleStep = this.props.handleStep;
        $.ajax({
            type: "post",
            url:  apiSvr + '/coursesWork/boundaryJoinDataset.json',
            data: form,
            // processData: true=> get방식, false => post방식
            dataType: "text",
            // contentType: true => application/x-www-form-urlencoded, 
            //                false => multipart/form-data
            processData: false,
            contentType: false,
            success: function(data){
                console.dir(data)
                handleStep('addDataset')

            }
        });

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

    handleTitle(v){
        this.setState({
            title:v
        })
    }


    render() {

        var year = [2016,2015,2010,2005,2000];
        var bounds = ['시도 행정경계','시군구 행정경계','행정동 행정경계'];
        var boundsValue = ['sd','sg','ad'];
        var sidoId =[11,21,22,23,24,25,26,31,32,33,34,35,36,37,38,39]
        var sido =['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','경기도','강원도','충청북도','충청남도','전라북도','전라남도','경상북도','경상남도','제주특별자치도']

        return (
            <div>
                <h2>인구 데이터 생성</h2>
                <TextField
                    floatingLabelFixed={true}
                    floatingLabelText="제목"
                    style={{marginLeft:'0%'}}
                    hintText="제목을 입력하세요"
                    onChange={(e,v)=>this.handleTitle(v)}
                />
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Paper style={{width:550,paddin:10}}>
                    <h3 style={{margin:10}}>행정경계 선택</h3>
                    <Divider />
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <SelectField value={this.state.year} style={{width:170,marginRight:50}} onChange={(event,index,value)=>this.handleChange('year',value)}
                                floatingLabelText="연도 선택"
                            >
                                {year.map((row,index)=>(
                                    <MenuItem key={index} style={{width:170}} value={row} primaryText={row+'년'} />
                                ))}
                            </SelectField>

                            <SelectField value={this.state.boundsValue} style={{width:180}} onChange={(event,index,value)=>this.handleChange('bound',value)}
                                floatingLabelText="경계구분 선택"
                            >
                                {bounds.map((row,index)=>(
                                    <MenuItem key={index} style={{width:180}} value={boundsValue[index]} primaryText={row} />
                                ))}
                            </SelectField>
                        </div>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:20}}>
                            <SelectField value={this.state.boundaryJoinType} style={{width:170,marginRight:50}} onChange={(event,index,value)=>this.handleChange('boundaryJoinType',value)}
                                floatingLabelText="결합구분"
                            >
                                    <MenuItem style={{width:170}} value="NAME" primaryText="행정구역명" />
                                    <MenuItem style={{width:170}} value="CODE" primaryText="행정구역코드" />
                            </SelectField>
                            {this.state.boundaryJoinType=='NAME'&&this.state.boundsValue!='sd'?
                                <SelectField value={this.state.sidoId} style={{width:180}} onChange={(event,index,value)=>this.handleChange('sidoId',value)}
                                    floatingLabelText="해당 시도"
                                >
                                    {sidoId.map((row,index)=>(
                                        <MenuItem key={index} style={{width:180}} value={row} primaryText={sido[index]} />
                                    ))}
                                    {this.state.year==2015||this.state.year==2016?
                                        <MenuItem style={{width:180}} value={29} primaryText="세종특별자치시" />
                                    :
                                    null
                                    }
                                </SelectField>
                            :
                                    <div style={{width:180}}></div>
                            }
                            

                        </div>


                    </Paper>
                    <Paper style={{width:350,paddin:10,marginLeft:30}}>
                        <h3 style={{margin:10}}>데이터 파일 업로드</h3>
                        <Divider style={{marginBottom:10}}/>
                        <div style={{display:'flex',justifyContent:'center',marginTop:45}}>

                            <form id="boundaryUploadForm" style={{marginTop:30,marginBottom:20}}>
                                <div className="filebox">
                                    <input className="upload-name" value={this.state.fileName} disabled="disabled"/> 
                                    <label htmlFor="uploadFile">업로드</label>
                                    <input type="file" name="uFile" id="uploadFile" className="upload-hidden"/> 
                                </div>
                            </form>
                            
                        </div>
                    </Paper>
            </div>
                    
                    <Paper style={{margin:'20px 30px',padding:'20px 100px'}}>
                            <h3>참고</h3>
                            엑셀자료의 첫번째 열은 행정경계결합에 사용될 행정구역코드 또는 행정구역명이어야 합니다.<br/>
                            엑셀자료의 첫번째 행은 자료의 컬럼이름이어야 합니다.
                            <img src="/ngiiedu/assets/images/populationExample.png" style={{width:700}}></img>
                    </Paper>

            
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