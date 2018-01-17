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
import SelectField from 'material-ui/SelectField';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import './FileInput.css';
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
            dataType:null,
            fileName:'파일선택',
            sridCode:3857
        }

        this.handleChange = this.handleChange.bind(this);
        // this.xlfEvent = this.xlfEvent.bind(this);
        this.doFile = this.doFile.bind(this)
        this.changeTitle = this.changeTitle.bind(this);
        this.createDataset = this.createDataset.bind(this);
        this.sridHandler = this.sridHandler.bind(this);
        
    }


    // componentWillMount() { console.log('componentWillMount');} 
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

   
    
    // 다음단계로..
    createDataset(){
        let courseId=this.props.match.params.COURSEID;
        let courseWorkId = this.props.match.params.WORKID;
        // var files = document.getElementById('uploadForm');
//폼객체를 불러와서
// var form = $('uploadForm')[0];
//FormData parameter에 담아줌
// var formData = new FormData(form);


        
        // let type = files.files[0].name.split('.')[files[0].name.split('.').length-1].toLowerCase();
        // var form = new FormData(files);
        // form.append("title",this.state.title);
        // form.append("courseId",this.props.match.params.COURSEID);
        // form.append("courseWorkId",this.props.match.params.WORKID);
        // form.append("")
        var form = new FormData(document.getElementById('uploadForm')); 
        let delimiter=''
        let xField =''
        let yField =''
        let srid = this.state.sridCode;
        if(this.state.dataType =='xlsx' || this.state.dataType =='xls' || this.state.dataType =='csv'){
            xField = $('#xField').val();
            yField = $('#yField').val();
            if(xField ==''){
                xField = 'X'
            }
            if(yField ==''){
                yField = 'Y'
            }
            
        }

        //form으로 처리
        
        let options = {}
        options.lon = xField;
        options.lat = yField;
        options.srid = srid;
        
        if(this.state.dataType =='csv'){
            options.delimiter = ','
        }
        
        form.append('options',JSON.stringify(options))
        // form.append('options',"")

        // let ajaxData = {
        //     // courseId:this.props.match.params.COURSEID,
        //     // courseWorkId:this.props.match.params.WORKID,
        //     options:options,
        //     uFile:formData

        // }

        // ajaxJson(
        //     ['POST', apiSvr + '/coursesWork/dataset.json'],
        //     {
        //         courseId:this.props.match.params.COURSEID,
        //         courseWorkId:this.props.match.params.WORKID,
        //         options:options,
        //         uFiles:form
        //     },
		// 	function (data) {
		// 	//   let columns =data.response.data.data
		// 	//   this.setState({
		// 	// 	layerColumns:columns
		// 	//   })
		// 	//   console.log('columns');
        //       console.dir(columns);
              
		// 	  // console.log('ajaxcolumn')
		// 	  // console.dir(data.response.data.data);
		// 	}.bind(this),
		// 	function (xhr, status, err) {
		// 	  alert('Error');
		// 	}.bind(this)
        //   );
        //   $.ajax({
        //     method: "POST",
        //     dataType: 'json',
        //     processData: false,
        //     contentType: false,
        //     // cache: false,
        //     url:  apiSvr + '/coursesWork/dataset/'+courseId +'/'+courseWorkId+'.json',
        //     data: {
        //         // courseId:courseId,
        //         // courseWorkId:courseWorkId,
        //         options:JSON.stringify(options),
        //         uFile:formData
        //     },
        //     // processData: true=> get방식, false => post방식
        //     //dataType: "text",
        //     // contentType: true => application/x-www-form-urlencoded, 
        //     //                false => multipart/form-data
        //     //processData: false,
        //     //contentType: false,
        //     success: function(data){
        //         console.dir(data);
        //         alert(data);
        //     }
        // });


        $.ajax({
            type: "post",
            url:  apiSvr + '/coursesWork/dataset/'+courseId +'/'+courseWorkId+'.json',
            data: form,
            // processData: true=> get방식, false => post방식
            dataType: "text",
            // contentType: true => application/x-www-form-urlencoded, 
            //                false => multipart/form-data
            processData: false,
            contentType: false,
            success: function(data){
                alert(data);
            }
        });
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
    }

    changeTitle(value){
        this.setState({
            title:value
        })

        // console.log(value)
    }

    sridHandler(e, i, v){
        this.setState({
            sridCode:v
        })
    }



    render() {

        let srid =[
            {value: 5179, text:'UTM-K (GRS80) - EPSG:5179'},
            {value: 3857, text:'Google Mercator - EPSG:3857'},
            {value: 4326, text:'WGS84 - EPSG:4326'},
            {value: 5178, text:'UTM-K (Bessel) - EPSG:5178'},
            {value: 5185, text:'서부원점(GRS80) - EPSG:5185'},
            {value: 5186, text:'중부원점(GRS80) - EPSG:5186'},
            {value: 5187, text:'동부원점(GRS80) - EPSG:5187'},
            {value: 5188, text:'동해(울릉)원점(GRS80) - EPSG:5188'},
            {value: 2096, text:'동부원점(Bessel) - EPSG:2096'},
            {value: 2097, text:'중부원점(Bessel) - EPSG:2097'},
            {value: 2098, text:'서부원점(Bessel) - EPSG:2098'},
            {value: 5173, text:'보정된 서부원점(Bessel) - EPSG:5173'},
            {value: 5174, text:'보정된 중부원점(Bessel) - EPSG:5174'},
            {value: 5175, text:'보정된 제주원점(Bessel) - EPSG:5175'},
            {value: 5176, text:'보정된 동부원점(Bessel) - EPSG:5176'},
            {value: 5177, text:'보정된 동해(울릉)원점(Bessel) - EPSG:5177'}
        ]

        let uploadexplan = {
            xlxs : ['데이터의 필드명은 해당 파일의 첫번째 열에 있어야 합니다.','데이터의 기본 SRID는 3857 입니다.'],
            xls:['데이터의 필드명은 해당 파일의 첫번째 열에 있어야 합니다.','데이터의 기본 SRID는 3857 입니다.'],
            csv:['데이터의 필드명은 해당 파일의 첫번째 열에 있어야 합니다.','데이터의 기본 SRID는 3857 입니다.','csv구분자는 ,로 구분해 주시기 바랍니다.'],
            zip:['좌표정보를 가진 PRJ파일을 동봉한 zip파일을 업로드해야 합니다.','PRJ 파일이 없을 시 기본 SRID는 3857 입니다.'],
            geotiff:['올바른 좌표정보를 가진 파일을 입력해 주세요'],
        }
        
        let dataOption = 
            this.state.dataType =='xlsx' || this.state.dataType =='xls' || this.state.dataType =='csv'?
                <Paper  style={{width:600,margin:'auto',marginTop:10,textAlign:'left',padding:20}}>
                    <div>
                            <h3>참고</h3>
                        {uploadexplan[this.state.dataType].map((row,idx)=>(
                            <div key={idx}>
                                {row}<br/>
                            </div>
                        ))}
                    </div>
                    <div style={{textAlign:'center'}}>
                    <SelectField
                        style={{textAlign:'left',width:350}}
                        floatingLabelFixed={true}
                        floatingLabelText="SRID"
                        value={this.state.sridCode}
                        onChange={this.sridHandler}
                        maxHeight={200}
                    >
                    {srid.map((row,idx)=>(
                        <MenuItem key={idx} value={row.value} primaryText={row.text} />
                    ))}
                    </SelectField>
                    <br/>
                    {/* <p style={{fontSize:15}}>좌표값 지정</p> */}
                    <TextField
                        style={{width:350}}
                        hintText="경도 필드를 입력하세요 (ex:X)"
                        floatingLabelText="경도"
                        id='xField'
                        floatingLabelFixed={true}
                    />
                    <br/>
                    <TextField
                        style={{width:350}}
                        hintText="경도 필드를 입력하세요 (ex:Y)"
                        floatingLabelText="위도"
                        id='yField'
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
            </Paper>
                :
                this.state.dataType == 'zip' ||this.state.dataType == 'geotiff' ? // this.state.dataType =='geojson' ||
                <Paper  style={{width:600,margin:'auto',marginTop:10,textAlign:'left',padding:20}}>
                    <div>
                        <h3>참고</h3>
                        {uploadexplan[this.state.dataType].map((row,idx)=>(
                            <div key={idx}>
                                {row}<br/>
                            </div>
                        ))}
                    </div>
                </Paper>
                :
                this.state.dataType == null ?
                null
                :
                <Paper  style={{width:600,margin:'auto',marginTop:10,textAlign:'center',padding:20}}>
                 <h2>올바른 파일형식이 아닙니다.</h2>
                </Paper>
                
            
            

        return (
            <div style={{margin:'30px 0',textAlign:'left'}}>

            <h2>파일 업로드</h2>
            {/* {this.state.step=='step1' ?  */}
            <TextField
                // style={{marginLeft:'0%'}}
                hintText="제목을 입력하세요"
                defaultValue={this.state.title}
                floatingLabelText="제목"
                floatingLabelFixed={true}
                onChange={(event,newValue)=>this.changeTitle(newValue)}

            />
            <br/>
            <Paper style={{marginTop:20,marginBottom:20,textAlign:'center',padding:'20px 0'}}>
                    
                    <form id="uploadForm" style={{marginTop:30,marginBottom:20}}>
                        <div className="filebox">
                            {/* <input type="file" id="uploadFile" name="uFile"/> */}

                            <input className="upload-name" value={this.state.fileName} disabled="disabled"/> 
                            <label htmlFor="uploadFile">업로드</label>
                            <input type="file" name="uFile" id="uploadFile" className="upload-hidden"/> 
                        </div>
                    </form>
                      {dataOption}

                </Paper>
                
                
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
