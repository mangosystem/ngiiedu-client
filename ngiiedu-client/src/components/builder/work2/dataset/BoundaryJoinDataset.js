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


class BoundaryJoinDataset extends Component {
    constructor(){
        super();
        this.state={
            boundaryDataset:'안양시 동안구 소음지도',
            targetDataset:'읍면동 인구',
        }

        this.handleChange = this.handleChange.bind(this);
        this.createDataset = this.createDataset.bind(this);
    }

    
    //2page
    //x y 좌표 변경 이벤트
    handleChange(type, value){
        console.log(type +', '+value)
        if(type=='BD'){
            this.setState({
                boundaryDataset:value  
            })
        }else if(type=='TD'){
            this.setState({
                targetDataset:value
            })
        }
        
    }

    createDataset(){
        alert('데이터 생성완료 페이지이동')
    }


    render() {

        return (
            <div style={{marginTop:50
            }}>
                <div>
                    <p>제목</p>
                    <TextField
                        style={{marginLeft:'0%'}}
                        hintText="제목"
                    />
                    <br/>

                    <div style={{marginTop:20}}>
                        <div style={{display:'flex'}}>
                            <span style={{width:300}}>행정경계 데이터</span>
                        </div>
                        <div style={{display:'flex'}}>
                            <DropDownMenu value={this.state.boundaryDataset} style={{marginLeft:0, width:300}} onChange={(event,index,value)=>this.handleChange('BD',value)}>
                            {['temp1','temp2','temp3','안양시 동안구 소음지도'].map((row,index)=>(
                                <MenuItem key={index} value={row} primaryText={row} />
                            ))}
                            </DropDownMenu>
                        </div>
                    </div>

                    <div style={{marginTop:20}}>
                        <div style={{display:'flex'}}>
                            <span style={{width:300}}>타겟 데이터</span>
                        </div>
                        <div style={{display:'flex'}}>
                            <DropDownMenu value={this.state.targetDataset} style={{marginLeft:0, width:300}} onChange={(event,index,value)=>this.handleChange('TD',value)}>
                            {['temp1','temp2','temp3','읍면동 인구'].map((row,index)=>(
                                <MenuItem key={index} value={row} primaryText={row} />
                            ))}
                            </DropDownMenu>

                        </div>
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
            </div>
        );
    }
}

export default BoundaryJoinDataset;