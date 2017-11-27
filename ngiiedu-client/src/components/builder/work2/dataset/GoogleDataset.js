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


class GoogleDataset extends Component {
    constructor(){
        super();
        this.state={
            step:'step1',
            xValue : 'temp1',
            yValue : 'temp2'
        }

        this.selectFile = this.selectFile.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    
    //파일선택 이벤트
    selectFile(){
        alert('selectFile')
    }
    
    // 다음단계로..
    handleNextStep(value){

        if(value!='complete'){
            this.setState({
                step:value
            })
        }else{
            alert('데이터셋 생성')
        }
    }
    
    //2page
    //x y 좌표 변경 이벤트
    handleChange(type, value){
        console.log(type +', '+value)
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
                        hintText="제목"
                    />
                    <br/>
                    <div style={{marginTop:20}}>
                        <p>시트 선택</p>
                        <TextField style={{marginTop:10,height:30,width:200,backgroundColor:'white',paddingLeft:10}} 
                            underlineShow={false}
                            hintText='url 입력'
                        />
                        <FlatButton
                            label="확인"
                            onClick={this.selectFile}
                        />
                        
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