import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import update from 'react-addons-update';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';


import XLSX from 'xlsx'

class ExcelDataset extends Component {
    constructor(){
        super();
        this.state={
            step:'step1',
            xValue : 'temp1',
            yValue : 'temp2',
            excelJson : [],
            sheetNames: [],
            title:'',
            dataType:null
        }

        this.handleChange = this.handleChange.bind(this);
        // this.xlfEvent = this.xlfEvent.bind(this);
        this.doFile = this.doFile.bind(this)
        this.changeTitle = this.changeTitle.bind(this);
        this.createDataset = this.createDataset.bind(this);
        
    }


    // componentWillMount() { console.log('componentWillMount');} 
    componentDidMount() {
        let setType = this.setType.bind(this);
         $('#uploadForm').change(function () {
            let nameSplit = document.getElementById('uploadFile').files[0].name.split('.');
            let type = nameSplit[nameSplit.length-1].toLowerCase();
            setType(type);
        });
        //  초기화
        // this.setState({
        //     step:'step1',
        //     xValue : 'temp1',
        //     yValue : 'temp2',
        //     excelJson : [],
        //     sheetNames: [],
        //     title:'',
        //     dataType:null
        // })
    } 
    
    setType(type){
        this.setState({
            dataType: type
        })
    }

   
    
    // 다음단계로..
    createDataset(){
        var files = document.getElementById('uploadForm');
        
        // let type = files.files[0].name.split('.')[files[0].name.split('.').length-1].toLowerCase();
        var form = new FormData(files);
        form.append("title",this.state.title);
        form.append("courseWorkSubId",this.props.match.params.COURSEID);
        let Xfiled = $('#Xfiled').val();
        let Yfiled = $('#Yfiled').val();
        let disition = null;
        if(this.state.dataType=='csv'){
            division = $('#division').val();
        }else{
            division = null;
        }

        console.log(Xfiled);
        console.log(Yfiled);
        console.log(division);
        // $.ajax({
        //     type: "post",
        //     url: apiSvr + '/coursesWork/dataset.json',
        //     data: form,
        //     dataType: "text",
        //     processData: false,
        //     contentType: false,
        //     success:function(data){
        //         alert(data);
        //     }
        // })
        // if(value=='step1'){
        //     // document.getElementById('xlf')=this.state.files
        //     this.setState({
        //         step:value
        //     })

        // }else if(value=='step2'){
        //     //엑셀데이터 로딩..
        //     var files = document.getElementById('xlf').files
        //     if(this.state.excelJson.length==0 && files.length==0){
        //         alert('파일을 선택해 주세요')
        //     }else if(this.state.title==''){
        //         alert('제목을 입력해 주세요')
        //     }else if(files.length!=0){
        //         this.doFile(files)
        //         this.setState({
        //             step:value
        //         })
        //     }else(
        //         this.setState({
        //             step:value
        //         })
        //     )
            

        // }else if(value='upload'){
        //     alert('데이터셋 생성')

        // }
        
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


    // 파일선택 이벤트 생성
    // xlfEvent(){
    //     var xlf = document.getElementById('xlf');
    //     function handleFile(e) { 
    //         this.setState({
    //             fileName :  e.target.files[0].name
    //         },function(){
    //             console.log(this.state.fileName)
    //         });
    //     }
    //     xlf.addEventListener('change', handleFile, false);

    //     // var excelJson = null;

    //     // function saveFile(file){
    //     //     var f = file[0]; 
    //     //     var reader = new FileReader();

    //     //     reader.onload = function(e) {
    //     //         var data = e.target.result;
    //     //         const wb = XLSX.read(data, {type:'binary'});
                
    //     //         var result = {};
    //     //         var sheetNames = wb.SheetNames;
    //     //         sheetNames.forEach(function(sheetName) {
    //     //             var roa =XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {header:1});
    //     //             if(roa.length) result[sheetName] = roa;
    //     //         });
                
    //     //         // ExcelDataset.setState({
    //     //         //     excelJson:result
    //     //         // })
    //     //         setExcelJson(result , sheetNames);

    //     //         // return JSON.stringify(result, 2, 2);
    //     //     }
    //     //     reader.readAsBinaryString(f)
    //     // }
    
    // }


    doFile(file){
        var setExcelJson = this.setExcelJson.bind(this) //this 문제 해결
        
        var f = file[0]; 
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result;
            const wb = XLSX.read(data, {type:'binary'});
            
            var result = {};
            var sheetNames = wb.SheetNames;
            sheetNames.forEach(function(sheetName) {
                var roa =XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {header:1});
                if(roa.length) result[sheetName] = roa;
            });
            
            setExcelJson(result , sheetNames);

        }
        reader.readAsBinaryString(f)
    }

    setExcelJson(result, sheetNames){
        this.setState({
            excelJson:result,
            sheetNames:sheetNames
        })

        // console.log('result')
        // console.dir(result);
    }

    changeTitle(value){
        this.setState({
            title:value
        })

        // console.log(value)
    }



    render() {

        let dataOption = 
            <Paper style={{width:500,margin:'auto',marginTop:10,textAlign:'center'}}>
                {this.state.dataType =='xlsx' || this.state.dataType =='xls' || this.state.dataType =='csv'?
                
                <div>
                    {/* <p style={{fontSize:15}}>좌표값 지정</p> */}
                    <TextField
                        hintText="경도 필드를 입력하세요 (ex:X)"
                        floatingLabelText="경도"
                        id='Xfiled'
                        floatingLabelFixed={true}
                    />
                    <br/>
                    <TextField
                        hintText="경도 필드를 입력하세요 (ex:Y)"
                        floatingLabelText="위도"
                        id='Yfiled'
                        floatingLabelFixed={true}
                    />
                    {/* {this.state.dataType == 'csv' ?
                        <TextField
                            hintText="구분자를 입력하세요 (ex:,)"
                            floatingLabelText="구분자"
                            id='division'
                            floatingLabelFixed={true}
                        />
                    :
                        null
                    } */}
                    
                    
                </div>
                :
                this.state.dataType == 'zip' ||this.state.dataType == 'geotiff' ? // this.state.dataType =='geojson' ||
                null 
                :
                this.state.dataType == null ?
                null
                :
                <div>올바른 파일형식이 아닙니다.</div>
            }
            </Paper>

        return (
            <div style={{margin:'30px 0',textAlign:'left'}}>

            <h2>파일 업로드</h2>
            {/* {this.state.step=='step1' ?  */}
                <div style={{textAlign:'left',marginBottom:10}}>
                    <TextField
                        // style={{marginLeft:'0%'}}
                        hintText="제목을 입력하세요"
                        defaultValue={this.state.title}
                        floatingLabelText="제목"
                        floatingLabelFixed={true}
                        onChange={(event,newValue)=>this.changeTitle(newValue)}

                    />
                    <br/>
                    <form id="uploadForm" style={{marginTop:30,marginBottom:20}}>
                        <input type="file" id="uploadFile" name="uFile"/>
                    </form>
                      {dataOption}

                </div>
                
                
                <Divider style={{marginTop:20,marginBottom:20,zIndex:100}}/>

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

export default withRouter(ExcelDataset);
