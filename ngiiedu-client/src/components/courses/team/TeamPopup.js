import React from 'react';
// import ReactRouter from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import Checkbox from 'material-ui/Checkbox';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import ToggleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import Chip from 'material-ui/Chip';
import {red500, yellow500, blue500, grey500} from 'material-ui/styles/colors';
import NotificationDoNotDisturbAlt from 'material-ui/svg-icons/notification/do-not-disturb-alt';
import CancleIcon from 'material-ui/svg-icons/navigation/cancel';
import ClearIcon from 'material-ui/svg-icons/content/clear';



class TeamPopup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            open: false,
            value : '',
            // selectMember:null
            selectedTeam : props.selectedTeam,
            selectedUserId :[], //선택한 팀원들의 id가 저장
            teamName:null
            
        }
        
        this.search = this.search.bind(this);
        this.enterKey = this.enterKey.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.checkedChange = this.checkedChange.bind(this);
        this.changeTeamName = this.changeTeamName.bind(this);
    }


    //팀이름변경 sate에 저장
    changeTeamName(event,newValue){
        this.setState({
            teamName:newValue
        });
    }

    //checkbox
    checkedChange(event, isInputChecked,userId){
        var selectedUserId =[]
        selectedUserId = selectedUserId.concat(this.state.selectedUserId);
        var index = selectedUserId.indexOf(userId)
        if(index==-1){
            selectedUserId.push(userId);
        }else{
            selectedUserId.splice(index,1);
        }
        this.setState({
            selectedUserId:selectedUserId
        });
    }
   

    search() {
        
        // let schoolLevel = this.state.schoolLevel;
        let keyword = this.state.value;

        // this.props.searchList(schoolLevel, keyword);

    };

    enterKey(e) {
        if(e.keyCode==13){
        }
        // if (e.keyCode == 13) this.search();
    };

    handleRequestDelete (userId) {
        var selectedUserId =[]
        selectedUserId = selectedUserId.concat(this.state.selectedUserId);
        
        var index = selectedUserId.indexOf(userId)
        selectedUserId.splice(index,1);
        
        this.setState({
            selectedUserId:selectedUserId
        });
     }
    
    componentWillReceiveProps(nextProps) {
        var selectedUserId = []
        
        this.setState({
            selectedUserId : nextProps.selectedUserId,
            teamName : nextProps.selectedTeamName,
            open : nextProps.open,
        });
    }

     

  render() {


    const actions = [
        <div>
            <div style={{display:'flex',alignItems: 'center', justifyContent:'space-between'}}>
            <TextField
                defaultValue={this.state.teamName}
                inputStyle={{color:'#fff',paddingLeft:10}}
                style={{width:350,color:'#fff',backgroundColor:'#619bff',height:40,display:'flex',alignItems: 'center'}}
                hintText="팀이름"
                onChange={(event,newValue)=>this.changeTeamName(event,newValue)}
                underlineShow={false}
                hintStyle={{bottom:10,marginLeft:10}}

            />,
            <FlatButton
                label="확인"
                primary={true}
                onClick={(summit,teamId,teamName)=>this.props.handleClose(true,this.props.selectedTeamId,this.state.teamName,this.state.selectedUserId)}
                style={{width:105,height:40,backgroundColor:'#43444c',color:'#fff',borderRadius:3}}
            />
            </div>
            {/* <FloatingActionButton secondary={true} 
                style={{position:'absolute', bottom:-100,left:200}}
                onClick={(summit)=>this.props.handleClose(false)}
            >
                <CancleIcon />
            </FloatingActionButton> */}
        </div>
    ];

    const dialLogStyle = {
        width:'100%',
        height:400
    }

    const leftStyle = {
        position:'absolute',
        left:0,
        width:'60%',
        height:400,
        overflow:'auto'
        // height:'70%',
        // border:'1px solid #ccc'
    }

    const rightStyle = {
        position:'absolute',
        right:0,
        width:'40%',
        height:400,
        // height:'70%',
        // border:'1px solid #ccc'
    }

    

    return (
        <Dialog
            title="팀"
            titleStyle={{fontSize:18,height:40,padding:'5px 0 5px 0',inlineHeight:0, backgroundColor:'#3e81f6',inlineHeight:0,color:'white',margin:0,width:'97%',paddingLeft:'3%'}}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={(summit)=>this.props.handleClose(false)}
            contentStyle={{width:500, maxWidth: 'none'}}
            autoScrollBodyContent={true}
            actionsContainerStyle={{backgroundColor:'#3e81f6'}}
            bodyStyle={{padding:1}}
        >
            
            <div style={dialLogStyle}>
                <div style={leftStyle}>
                 
                <div style={{height:'100%',paddingLeft:10,paddingTop:10}}>
                    {this.props.member.map((row,index)=>(

                        <div key={index}>
                            <p style={{color:'#3e81f6'}}>{row[0].teamId==null?'미배정':row[0].teamName}</p>
                            
                            <div style={{marginTop:10,marginLeft:20}}>
                            {this.props.member[index].map((row2,index2)=>(
                                    
                                (() => {
                                    if (row2.joinStatus=='CJS02') {
                                        return(
                                        
                                        <Checkbox
                                            key ={index2}
                                            style={{marginBottom:10}}
                                            label={row2.userName}
                                            labelPosition="left"
                                            disabled={row2.teamId==this.props.selectedTeamId ? false:row2.teamId != null}
                                            checked = {this.state.selectedUserId.indexOf(row2.userId)>=0}
                                            checkedIcon={
                                                <ToggleRadioButtonChecked color={grey500} style={{fill: "#A9BCF5"}}/>
                                            }
                                            uncheckedIcon={
                                                    <ToggleRadioButtonUnchecked color={grey500} style={{fill: "#E6E6E6"}}/> 
                                            }
                                            onClick ={(event, isInputChecked) => this.checkedChange(event, isInputChecked, row2.userId)}
                                        />
                                    )}
                                    else if(row2.joinStatus=='CJS04'){
                                        return(
                                            // <Checkbox
                                            //     key ={index2}
                                            //     style={{marginBottom:10}}
                                            //     label={row2.userName}
                                            //     labelPosition="left"
                                            //     disabled={true}
                                            //     checked = {this.state.selectedUserId.indexOf(row2.userId)>=0}
                                            //     checkedIcon={
                                            //         <NotificationDoNotDisturbAlt style={{fill: "#E6E6E6"}}/>
                                            //     }
                                            //     uncheckedIcon={
                                            //         <NotificationDoNotDisturbAlt style={{fill: "#E6E6E6"}}/>
                                            //     }
                                            //     onClick ={(event, isInputChecked) => this.checkedChange(event, isInputChecked, row2.userId)}
                                            // />
                                            null
                                        )
                                    }else{
                                        return;
                                    }
                                })()
                            ))}
                            </div>
                            <Divider style={{marginTop:10}}/>
                        </div>
                    ))}

                    {(() => {
                        if (this.state.isAccessor && this.state.isOwner) {
                        return(
                            <div style={{padding:10,width:'30%',textAlign:'right'}}>
                            <FlatButton label="차단" secondary={true} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'BLOCK')}/>
                            </div>
                        )
                        }
                    })()}

                  

                    
                </div>

            </div>
                <div style={rightStyle}>
                        {this.state.selectedUserId.map((row2,index2)=>(
                            <div key={row2}>
                            {this.props.member.map((row,index)=>(
                                <div key={index} >
                                {this.props.member[index].map((row3,index3)=>(
                                    row3.userId==row2 &&row3.joinStatus=='CJS02'?

                                    <div key={row3.userId} style={{display:'flex',padding:'10px 0px 0px 10px',alignItems:'center'}}>
                                        <div>{row3.userName}</div>
                                        <ClearIcon style={{width:20,height:20,marginLeft:10}} onClick={()=>this.handleRequestDelete(row3.userId)}/>
                                    </div>

                                    // <Chip
                                    //     key={row3.userId}
                                    //     style={{margin: 4,marginLeft:15,backgroundColor:'#fff'}}
                                    //     onRequestDelete={(userId)=>this.handleRequestDelete(row3.userId)}
                                    // >
                                    //     {row3.userName}
                                    // </Chip>
                                     : null
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
                </div>    
            </div>
        </Dialog>
    );
  }
}

TeamPopup.defaultProps={
    selectedTeamId:null,
    blockMember:[]
}


export default TeamPopup;

