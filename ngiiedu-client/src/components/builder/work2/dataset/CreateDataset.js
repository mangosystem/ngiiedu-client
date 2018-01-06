import React, { Component } from 'react';

//material ui
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DeleteButton from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import AddButton from 'material-ui/svg-icons/content/add-box';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

//component
import NewDataset from './NewDataset';
import ExcelDataset from './ExcelDataset';
import GoogleDataset from './GoogleDataset';
import JoinDataset from './JoinDataset';
import BoundaryJoinDataset from './BoundaryJoinDataset';

class CreateDataset extends Component {
    constructor(){
        super();
        this.state={
            columns:[],
            tabStep:'newDataset', //file google join
        }

        this.tapChange = this.tapChange.bind(this);

    }


    tapChange(value){
        
        if(value != this.state.tabStep){
            this.setState({
                tabStep:value
            });
            
        }
    }

  
    render() {

        return (
            <div>
                <Paper style={{width:1024, padding:20,paddingBottom:50}}>
                    <h3 className='edge'> 데이터 추가 </h3>
                    <div >
                    <Tabs
                        tabItemContainerStyle={{backgroundColor:'#3e81f6'}}
                    >
                        <Tab label="데이터 생성" 
                            buttonStyle={{fontSize:20}}
                            onActive={()=>this.tapChange('newDataset')}
                            
                            
                        >   
                            {this.state.tabStep == 'newDataset'?
                                <NewDataset
                                    handleStep={this.props.handleStep}
                                />
                            :
                                null
                            }
                        </Tab>

                        <Tab label="파일 업로드" 
                            buttonStyle={{fontSize:20}}
                            onActive={()=>this.tapChange('file')}
                            
                            
                        >   
                            {this.state.tabStep == 'file'?
                                <ExcelDataset
                                    handleStep={this.props.handleStep}
                                />
                            :
                                null
                            }
                        </Tab>
                        
                        {/* <Tab label="구글 시트" 
                            buttonStyle={{fontSize:20}}
                            onActive={()=>this.tapChange('google')}
                            
                        >
                            {this.state.tabStep == 'google'?
                                <GoogleDataset
                                    handleStep={this.props.handleStep}
                                />
                            :
                                null
                            }
                            
                        </Tab>

                        <Tab label="행정경계 결합" 
                            buttonStyle={{fontSize:20}}
                            onActive={()=>this.tapChange('join')}
                            
                        >
                            {this.state.tabStep == 'join'?
                                <BoundaryJoinDataset
                                    handleStep={this.props.handleStep}
                                />
                            :
                                null
                            }
                            
                        </Tab> */}
                    </Tabs>
                    </div>
                    

                </Paper>
                {/* <div style={{width:'90%',textAlign:'center',display:'flex',justifyContent:'center'}}>
                    <Tabs
                        style={{marginTop:50,marginLeft:100}}
                        tabItemContainerStyle={{backgroundColor:'rgba(0,0,0,0)'}}
                        inkBarStyle={{width:200,marginRight:70}}
                    >
                        <Tab label="데이터 생성" 
                            buttonStyle={{color:'black'}}
                            style={{width:120,marginRight:70}}
                        >
                            <NewDataset/>
                        </Tab>

                        <Tab label="파일 업로드" 
                            buttonStyle={{color:'black'}}
                            style={{width:200,marginRight:70}}
                        >
                            <ExcelDataset/>
                        </Tab>
                        
                        <Tab label="구글 시트" 
                            buttonStyle={{color:'black'}}
                            style={{width:200,marginRight:70}}
                        >
                            <GoogleDataset/>
                        </Tab>

                        <Tab label="데이터 결합" 
                            buttonStyle={{color:'black'}}
                            style={{width:200,marginRight:70}}

                        >
                            <JoinDataset/>
                        </Tab>


                        <Tab label="행정경계 결합" 
                            buttonStyle={{color:'black'}}
                            style={{width:200,marginRight:70}}
                        >
                            <BoundaryJoinDataset/>
                        </Tab>
                    </Tabs>
                </div> */}

            </div>
        );
    }
}

export default CreateDataset;