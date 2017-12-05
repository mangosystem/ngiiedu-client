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
        }

        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.xlfEvent = this.xlfEvent.bind(this);
        this.doFile = this.doFile.bind(this)
        this.changeTitle = this.changeTitle.bind(this);
        
    }

    
   
    
    // 다음단계로..
    handleNextStep(value){

        if(value=='step1'){
            // document.getElementById('xlf')=this.state.files
            this.setState({
                step:value
            })

        }else if(value=='step2'){
            //엑셀데이터 로딩..
            var files = document.getElementById('xlf').files
            if(this.state.excelJson.length==0 && files.length==0){
                alert('파일을 선택해 주세요')
            }else if(this.state.title==''){
                alert('제목을 입력해 주세요')
            }else if(files.length!=0){
                this.doFile(files)
                this.setState({
                    step:value
                })
            }else(
                this.setState({
                    step:value
                })
            )
            

        }else{
            alert('데이터셋 생성')
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

    componentDidMount(){
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

        return (
            <div style={{marginTop:50,
                paddingRight:70
            }}>
            {this.state.step=='step1' ? 
                <div>
                    <p>제목</p>
                    <TextField
                        style={{marginLeft:'0%'}}
                        hintText="Hint Text"
                        defaultValue={this.state.title}
                        onChange={(event,newValue)=>this.changeTitle(newValue)}

                    />
                    <br/>
                    <div style={{marginTop:20}}>
                        <input type="file" name="xlfile" id="xlf"/>
                    <Divider style={{marginTop:20,marginBottom:20}}/>
                    </div>

                    <FlatButton
                        label="다음"
                        backgroundColor={cyan500}
                        style={{color: 'white',position:'absolute',right:0,marginRight:70}}
                        onClick={()=>this.handleNextStep('step2')}
                    />
                </div>
            :

            //step2
                <div>
                    <p>좌표값 설정</p>
                    <div style={{display:'flex', marginTop:10,marginLeft:10, alignItems:'center'}}>
                        <span>X좌표</span>
                        {this.state.sheetNames.length !=0 ?
                            <DropDownMenu value={this.state.xValue} style={{width:200,marginLeft:0}} onChange={(event,index,value)=>this.handleChange('x',value)}>
                                {this.state.excelJson[this.state.sheetNames[0]][0].map((row,index)=>(
                                    <MenuItem key={index} value={row} primaryText={row} />
                                ))}
                                
                            </DropDownMenu>
                        :null}
                        <span style={{marginLeft:100}}>Y좌표</span>
                        {this.state.sheetNames.length !=0 ?
                            <DropDownMenu value={this.state.yValue} style={{width:200,marginLeft:0}} onChange={(event,index,value)=>this.handleChange('y',value)}>
                                {this.state.excelJson[this.state.sheetNames[0]][0].map((row,index)=>(
                                    <MenuItem key={index} value={row} primaryText={row} />
                                ))}
                            </DropDownMenu>
                        :null}

                    </div>
                   {/* <div style={{width:900}}> */}
                    <div style={{width:900,overflow:'auto',marginTop:20}}>
                        {this.state.sheetNames.length !=0 ?
                            <Table
                                fixedHeader={true}
                                height={'300px'}
                                headerStyle={{
                                    width:this.state.excelJson[this.state.sheetNames[0]][0].length*150,
                                    minWidth:900,
                                    height:50
                                }}
                                bodyStyle={{
                                    width:this.state.excelJson[this.state.sheetNames[0]][0].length*150,
                                    minWidth:900,
                                    height:232
                                }}
                            >
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                >
                                    <TableRow>
                                        {this.state.excelJson[this.state.sheetNames[0]][0].map((row,index)=>(
                                            <TableHeaderColumn key={index}>{row}</TableHeaderColumn>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                        
                                <TableBody
                                    displayRowCheckbox={false}
                                >
                                    {this.state.excelJson[this.state.sheetNames[0]].slice(1,20).map((row,index)=>(
                                        <TableRow key={index}>
                                            {row.map((row2,index2)=>(
                                                <TableRowColumn key={index2}>{row2}</TableRowColumn>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            :
                            null
                        }
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

export default ExcelDataset;