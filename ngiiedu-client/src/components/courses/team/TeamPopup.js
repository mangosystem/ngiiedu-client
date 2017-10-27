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

        alert(keyword);
        // this.props.searchList(schoolLevel, keyword);

    };

    enterKey(e) {
        if(e.keyCode==13){
            alert(e.keyCode);
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
        // alonsole.dir('teamname'+this.props.teamMember[0].team_name);
        // console.dir(this.state.selectedTeam);
     }
    
    componentWillReceiveProps(nextProps) {
        var selectedUserId = []
        
        this.setState({
            selectedUserId : nextProps.selectedUserId,
            teamName : nextProps.selectedTeamName,
            open : nextProps.open,
        });
        // console.dir('componentWillReceiveProps');
    }

     

  render() {


    const actions = [
      <FlatButton
        label="취소"
        primary={true}
        onClick={(summit)=>this.props.handleClose(false)}
      />,
      <FlatButton
        label="확인"
        primary={true}
        keyboardFocused={true}
        onClick={(summit,teamId,teamName)=>this.props.handleClose(true,this.props.selectedTeamId,this.state.teamName,this.state.selectedUserId)}
        />,
    ];

    const dialLogStyle = {
        width:'100%',
        height:350
    }

    const leftStyle = {
        position:'absolute',
        left:0,
        width:'60%',
        height:'70%',
        border:'1px solid #ccc'
    }

    const rightStyle = {
        position:'absolute',
        right:0,
        width:'40%',
        height:'70%',
        border:'1px solid #ccc'
    }

    

    return (
        <Dialog
            title="팀원관리"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={(summit)=>this.props.handleClose(false)}
            contentStyle={{width:500,  maxWidth: 'none' ,overflow:'auto'}}
            autoScrollBodyContent={true}
            >
            <TextField
                defaultValue={this.state.teamName}
                hintText="팀이름"
                onChange={(event,newValue)=>this.changeTeamName(event,newValue)}
            />
            <div style={dialLogStyle}>
                <div style={leftStyle}>
                    <Paper
                        style={{
                            maxWidth: '100%',
                            margin: 'auto',
                            marginTop:20,
                            height:'10%'
                        }}
                    >
                    <TextField
                        hintText="Search"
                        style={{
                            marginLeft: 20,
                            maxWidth: '80%'
                        }}
                        fullWidth={true}
                        underlineShow={false}
                        onChange={(event, value) => this.setState({value: value})}
                        onKeyDown={(event) => this.enterKey(event)}
                    />
                    <i
                        className="fa fa-search"
                        aria-hidden="true"
                        style={{
                            marginLeft: 10,
                            color: 'grey',
                            cursor: 'pointer'
                        }}
                        onMouseUp={this.search.bind(this)}
                    >
                    </i>
                </Paper>
                <div style={{overflow:'auto',height:'80%'}}>
                    {this.props.member.map((row,index)=>(
                        <div key={index}>
                            <Divider style={{marginTop:10}}/>
                            <p>{row[0].teamName==null?'미배정':row[0].teamName}</p>
                            
                            <div style={{marginTop:10,marginLeft:10}}>
                            {this.props.member[index].map((row2,index2)=>(
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
                                        index<this.props.checkIndex? 
                                            <ToggleRadioButtonUnchecked color={grey500} style={{fill: "#E6E6E6"}}/> 
                                            :  
                                            <NotificationDoNotDisturbAlt style={{fill: "#E6E6E6"}}/>
                                    }
                                    onClick ={(event, isInputChecked) => this.checkedChange(event, isInputChecked, row2.userId)}
                                />
                            ))}
                            </div>
                        </div>
                    ))}

                    
                </div>

            </div>
                <div style={rightStyle}>
                        {this.state.selectedUserId.map((row2,index2)=>(
                            <div key={row2}>
                            {this.props.member.map((row,index)=>(
                                <div key={index} style={{overflow:"auto"}}>
                                {this.props.member[index].map((row3,index3)=>(
                                    row3.userId==row2 ?
                                    <Chip
                                        key={row3.userId}
                                        style={{margin: 4,marginLeft:15}}
                                        onRequestDelete={(userId)=>this.handleRequestDelete(row3.userId)}
                                    >
                                        {row3.userName}
                                    </Chip>
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
    selectedTeamId:null
}


export default TeamPopup;

