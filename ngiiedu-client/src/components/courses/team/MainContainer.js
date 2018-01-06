import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';
import TeamPopup from './TeamPopup.js';
import DeletePopup from './DeletePopup.js';
import CheckUserAuthority from '../common/CheckUserAuthority.js';
import CourseHeader from '../common/CourseHeader.js';//과정 해더

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import People from 'material-ui/svg-icons/social/people';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Chip from 'material-ui/Chip';
// import List from 'material-ui/svg-icons/action/list';
import IconList from 'material-ui/svg-icons/action/list';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false,
      open:false,
      teamPopupOpen:false,
      teamsMember :[], //ajax로 불러온 팀멤버 리스트
      editTeams:[], //props 에 전달할 팀리스트
      // seq :null,
      checkIndex:null,
      selectedTeamName: null,
      selectedUserId:[],
      teams:[],
      selectedTeamId:null,
      alertOpen:false
      
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.ajaxCall = this.ajaxCall.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deletehandleClose = this.deletehandleClose.bind(this);
  }

  deletehandleClose(teamId){
    this.setState({
      alertOpen:!this.state.alertOpen,
      selectedTeamId:teamId
    })
  }

 

  
  handleClose(summit,teamId,teamName,selectedUserId){

    if(summit){
      if(teamName==null){
        alert('팀명을 입력하세요');
        return;
      }


      var courseId = this.props.match.params.COURSEID;
  
        //팀생성
      if(teamId==null){
        $.ajax({
          method:'POST',
          url: apiSvr+'/courses/'+courseId+'/team.json',
          dataType: 'json',
          data:{
            teamName : teamName
          },
          async: false,
          success: function(res) {
            teamId = res.response.data.idx;
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(status, err.toString());
          }.bind(this)
        });
      }
        
      // 팀멤버 추가
      for(var i =0;i<selectedUserId.length;i++){
  
        if(this.state.selectedUserId.indexOf(selectedUserId[i])==-1){
          $.ajax({
            type:'POST',
            url: apiSvr+'/courses/'+courseId+'/team/'+teamId+'/member.json',
            dataType: 'json',
            async: false,
            data:{
              memberId:selectedUserId[i]
            },
            success: function(res) {
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
          });
        }
      }
  
      //팀 멤버 삭제
      ///{courseId}/team/{teamId}/member/{memberId}
      // console.log(this.state.selectedUserId);
      for(var i = 0 ; i <this.state.selectedUserId.length;i++){
        if(selectedUserId.indexOf(this.state.selectedUserId[i])==-1){
          $.ajax({
            method:'POST',
            url: apiSvr+'/courses/'+courseId+'/team/'+teamId+'/member/'+this.state.selectedUserId[i]+'.json',
            dataType: 'json',
            data:{_method__ : 'DELETE'},
            async: false,
            success: function(res) {
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
          });
        }
      }

      //팀이름변경
      if(teamName != this.state.selectedTeamId){

        ajaxJson(
            ['PUT',apiSvr+'/courses/'+courseId+'/team/'+teamId+'/name.json'],
            {
                teamName:teamName
            },
            function(res){
              this.ajaxCall();
            }.bind(this)
        )
      }
    }
    this.setState({open: false});
  }


  deleteTeam(teamId){
    var courseId = this.props.match.params.COURSEID;

    ajaxJson(
      ['DELETE',apiSvr+'/courses/'+courseId+'/team/'+teamId+'.json'],
      null,
      function(res){
          this.ajaxCall();
      }.bind(this)
    )

    this.setState({
      alertOpen:false
    })
  }

  handleOpen(seq){
    //배열 재배치 
    //미분류 -> 현재 선택한 팀 순서
    //선택 비선택 변수 설정
    
    var checkIndex = 1;
    var tempArr =[];
    let member = [];
    var selectedTeamId;
    var selectedTeamName;
    var selectedTeamMember=[];
    var selectedUserIds=[];
    member = member.concat(this.state.teamsMember);
    

    //선택한 seq의 값에따른 check disable 수
    if(seq !=null){
      //-----------
      selectedTeamId = this.state.teams[seq].idx;
      selectedTeamName = this.state.teams[seq].teamName;
      for(var i = 0 ; i<member.length;i++){
        if(member[i][0].teamId == selectedTeamId){
          selectedTeamMember = member[i];
          tempArr.push(selectedTeamMember);
          member.splice(i,1);
        }
      }
      //id 배열들;
      for(var i = 0;i<selectedTeamMember.length;i++){
        selectedUserIds.push(selectedTeamMember[i].userId);
      }
    }else{
      checkIndex =checkIndex-1;
    }
    for(var i =0;i<member.length;i++){
      if(member[i][0].teamSeq != null){
        tempArr.push(member[i]);
      }else{
        tempArr.unshift(member[i]);
        checkIndex=checkIndex+1;
      }
    }
     
    this.setState({
      open: true,
      editTeams:tempArr, //edit
      checkIndex:checkIndex,
      selectedUserId:selectedUserIds, //edit
      selectedTeamName: selectedTeamName, //edit
      selectedTeamId:selectedTeamId
    })
  }

  ajaxCall(){
    //ajaxdata connect
    var courseId = this.props.match.params.COURSEID;
    // /courses/20/team.json
    ajaxJson(
      ['GET',apiSvr+'/courses/'+courseId+'/team.json'],
      null,
      function(res){
        var data = res.response.data;
        this.setState({
          teams : data
        });
      }.bind(this)
    );

    ajaxJson(
      ['GET',apiSvr+'/courses/'+courseId+'/team/memberInfos.json'],
      null,
      function(res){
          var data = res.response.data;
          var activeData =[];
          //순서정렬 및 중복제거
          var seq = [];
          var teamsMember=[]

          //data 사용자상태에따라 분류
          for(var i=0;i<data.length;i++){
            if(data[i].joinStatus=='CJS02'||data[i].joinStatus=='CJS04'){
              activeData.push(data[i]);
            }
          }
          //
          data = activeData;
          
          
          for(var i=0;i<data.length;i++){
              var teamSeq = data[i].teamSeq
                seq.push(teamSeq);
          }
          var a = [];
          for(var i=0;i<seq.length;i++){
            if(typeof a[seq[i]]=='undefined'){
              a[seq[i]] = 1;
            }
          }
          seq.length = 0;
          for(var i in a){
            seq[seq.length] = i
            teamsMember.push([]);
          }
              
          for(var i=0;i<data.length;i++){
            var a = seq.indexOf(''+data[i].teamSeq)//index
            teamsMember[a].push(data[i]);
          }
          
          this.setState({
            teamsMember:teamsMember
          })
          
      }.bind(this)
    )
  }
  
  componentWillReceiveProps(nextProps){
    
    //redux owner, member 정보 확인
    let courseId = this.props.match.params.COURSEID;
    if(courseId !=null && nextProps.loginStatus !=null){
      
      let authority = CheckUserAuthority(courseId,nextProps.loginStatus.userIdx);
      this.setState({
        isOwner:authority.isOwner,
        isMember:authority.isMember
      })    
    }else{
      this.setState({
        isOwner:false,
        isMember:false
      })
    }
  } 


  componentDidMount() {
    this.ajaxCall();

    
    //redux owner, member 정보 확인
    var courseId = this.props.match.params.COURSEID;
    if(courseId !=null && this.props.loginStatus !=null){
      
      let authority = CheckUserAuthority(courseId,this.props.loginStatus.userIdx);
      this.setState({
        isOwner:authority.isOwner,
        isMember:authority.isMember
      })    
    }else{
      this.setState({
        isOwner:false,
        isMember:false
      })
    }
  }    

  render() {

    const style = {
      width: '32%',
      height: '250px',
      marginBottom: '1%',
      marginLeft: '1%'
    };

    const divStyle = {
      width: '100%', 
      height: 48, 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between'
    };

    const pStyle = {
      marginLeft: '10%', 
      fontWeight: 'bold',
      fontSize:18,
      width:180,
      overflow:'hidden',
      textOverflow: 'ellipsis'
    };


    const bDivStyle = {
      width: '32%',
      height: '250px',
      marginBottom: '1%',
      marginLeft: '1%', 
      display: 'flex', 
      alignItems: 'center'
    }

    const cDivStyle = {
      widht:'100%',
      height:'60%'
    }


    const styles = {
      chip: {
        margin:10,
        fontSize:16,
      },
      wrapper: {
        padding:10,
        display: 'flex', 
        flexWrap: 'wrap',
        overflow:'auto',
        maxHeight:'100%'
      },
    };

    return (
      <main id="main">
        <div className="inner">
          <CourseHeader
            isAccessor={this.state.isAccessor}
            isOwner={this.state.isOwner}
            isMember={this.state.isMember}
          />
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'TEAM'}
            />
            <section>
            <Paper style={{minHeight:700,paddingTop:20,paddingBottom:20}}>
              <div style={{display:'flex',paddingLeft:20, paddingRight:20,justifyContent:'space-between'}}>
                <h3 className="edge">팀</h3>
                <ul className="location">
                  <li>홈</li>
                  <li>수업</li>
                  <li>수업목록</li>
                  <li style={{fontWeight:'bold'}}>팀</li>
                </ul>
              </div>

      
              {/* 팀생성 버튼 */}
              {(() => {
                  if (this.state.isAccessor && this.state.isOwner) {
                    return(
                      <div style={{width:'100%',display:'flex',flexDirection:'row-reverse'}}>
                        <div style={{border:'2px solid #3e81f6',borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',width:180,margin:20}} onClick={()=>this.handleOpen(null)}>
                            <People style={{fill:'#3e81f6',width:60,height:60}}/>
                            <p style={{color:'#3e81f6',fontSize:25}}>팀생성</p>
                        </div>
                      </div>
                    )
                  }
                })()}

                {/* 팀 그리드 */}
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                {this.state.teams.map((row,index)=>(
                  <Paper  key={index} style={style} className="mouseOverBlue">
                    <div>
                      <div style={divStyle}>
                        <p style={pStyle}>{row.teamName}</p>
                        {(() => {
                          if (this.state.isAccessor && this.state.isOwner) {
                            return(
                              <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                              >
                                <MenuItem primaryText="수정" onClick={(seq)=>this.handleOpen(index)}/>
                                <MenuItem primaryText="삭제"onClick={(teamId)=>this.deletehandleClose(row.idx)}/>
                              </IconMenu>
                            )
                          }

                          
                        })()}
                      </div>
                      <Divider />
                      <div style={cDivStyle}>
                        <div style={styles.wrapper}>
                          {this.state.teamsMember.map((row2,index2)=>(
                            row2[0].teamId==row.idx ?
                            row2.map((row3,index3)=>(
                                row3.joinStatus =='CJS02'?
                                <div key={index3} style={styles.chip}>
                                     {row3.userName}
                                </div>

                                // <Chip
                                //   key={index3}
                                //   style={styles.chip}
                                // >
                                //  {row3.userName}
                                // </Chip>
                                 :null
                              )) : null
                          ))}
                        </div>
                      </div>
                    </div>
                  </Paper>

                ))}

               
              </div>
              </Paper>
            </section>
          </div>
        </div>
        <TeamPopup
          open={this.state.open}
          courseId={this.props.match.params.COURSEID}      
          member={this.state.editTeams}
          checkIndex={this.state.checkIndex}
          selectedUserId={this.state.selectedUserId}
          selectedTeamName={this.state.selectedTeamName}
          selectedTeamId = {this.state.selectedTeamId}
          handleClose = {(summit,teamId,teamName,selectedUserId)=>this.handleClose(summit,teamId,teamName,selectedUserId)}
        />
        <DeletePopup
          open = {this.state.alertOpen}
          selectedTeamId = {this.state.selectedTeamId}
          courseId={this.props.match.params.COURSEID}
          deleteTeam={(value)=>this.deleteTeam(value)}
          deletehandleClose={()=>this.deletehandleClose()}
        />
      </main>
    );
  }
};

export default withRouter(MainContainer);
