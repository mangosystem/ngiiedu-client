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
            columns:[]
        }
    }


    render() {

        return (
            <div style={{width:'90%',textAlign:'center',display:'flex',justifyContent:'center'}}>
                <Tabs
                    style={{marginTop:0,marginLeft:100}}
                    tabItemContainerStyle={{backgroundColor:'rgba(0,0,0,0)'}}
                    inkBarStyle={{width:120,marginRight:70}}
                >
                    <Tab label="데이터셋 생성" 
                        buttonStyle={{color:'black'}}
                        style={{width:120,marginRight:70}}
                    >
                        <NewDataset/>
                    </Tab>
                    <Tab label="엑셀 데이터" 
                        buttonStyle={{color:'black'}}
                        style={{width:120,marginRight:70}}
                    >
                        <ExcelDataset/>
                    </Tab>
                    
                    <Tab label="구글 시트" 
                        buttonStyle={{color:'black'}}
                        style={{width:120,marginRight:70}}
                    >
                        <GoogleDataset/>
                    </Tab>

                    <Tab label="데이터셋 결합" 
                        buttonStyle={{color:'black'}}
                        style={{width:120,marginRight:70}}

                    >
                        <JoinDataset/>
                    </Tab>
                    <Tab label="행정경계 결합" 
                        buttonStyle={{color:'black'}}
                        style={{width:120,marginRight:70}}
                    >
                        <BoundaryJoinDataset/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default CreateDataset;