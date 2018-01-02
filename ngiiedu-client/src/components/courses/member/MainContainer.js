import React from 'react';
import { withRouter } from "react-router-dom";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';


import CourseHeader from '../common/CourseHeader.js';//과정 해더
import MenuPanel from '../common/MenuPanel.js';
import CheckUserAuthority from '../common/CheckUserAuthority.js';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const titleStyle ={
  fontSize :'larger',
}

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor : true,
      isOwner : true,
      isMember : false,
      expanded : true,
      CJS01 : [],
      CJS02 : [],
      CJS03 : [],
      CJS04 : [],
      redux : React.PropTypes.object
      

     
       
    }
    this.ajaxCall = this.ajaxCall.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleJoinStatusChange = this.handleJoinStatusChange.bind(this);
  }

  handleJoinStatusChange(userId,status){
    // http://localhost:8080/ngiiedu/api/v1/20/member/1/status.json 
    // /{courseId}/member/{userId}/status
    var courseId = this.props.match.params.COURSEID;
    // @RequestMapping(value="/{courseId}/member/{userId}/status", method=RequestMethod.PUT)
    
    
    ajaxJson(
      ['PUT',apiSvr+'/courses/'+courseId+'/member/'+userId+'/status.json'],
      {
        status:status
      },
      function(res){
        // console.dir(res);
        this.ajaxCall();
      }.bind(this)
    )


    alert(courseId+', '+userId+', '+status);
  }

  handleExpandChange(expand) {
    if(this.state.expanded==expand){
      this.setState({expanded:''});
    }else{
      this.setState({expanded: expand});
    }
  }

  ajaxCall(){
    var courseId = this.props.match.params.COURSEID;
    
    ajaxJson(
      ['GET',apiSvr+'/courses/'+courseId+'/memberInfos.json'],
      null,
      function(res){
        var data = res.response.data;
        // console.dir(data);
        var CJS01=[];
        var CJS02=[];
        var CJS03=[];
        var CJS04=[];
        
    
        for(var i = 0 ; i<data.length; i++){
          if(data[i].joinStatus=="CJS01"){
            CJS01.push(data[i]);
          }else if(data[i].joinStatus=="CJS02"){
            CJS02.push(data[i])
          }else if(data[i].joinStatus=="CJS03"){
            CJS03.push(data[i])
          }else if(data[i].joinStatus=="CJS04"){
            CJS04.push(data[i])
          }else{
          }
        }
    
        this.setState({
          CJS01:CJS01,
          CJS02:CJS02,
          CJS03:CJS03,
          CJS04:CJS04
        });
          
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
    console.dir(this.props)

    //redux owner, member 정보 확인
    let courseId = this.props.match.params.COURSEID;
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
    return (
      <main id="main">
				<div className="inner">
          <CourseHeader/>

          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'MEMBER'}
            />
            <section>
            <Paper style={{minHeight:700,paddingTop:20,paddingBottom:20}}>
            <div style={{display:'flex',paddingLeft:20, paddingRight:20,justifyContent:'space-between'}}>
              <h3 className="edge">멤버</h3>
              <ul className="location">
                <li>홈</li>
                <li>수업</li>
                <li>수업목록</li>
                <li style={{fontWeight:'bold'}}>멤버</li>
              </ul>
            </div>


            <Card
              expanded={this.state.expanded=='CJS02'} onExpandChange={() => this.handleExpandChange('CJS02')}
              style={{margin:20,boxShadow:'none'}}
            >
              <CardHeader
                textStyle={{display:'none'}}
                actAsExpander={true}
                style={{padding:0 }}
              >
                <div  className="mouseOverBlue" style={{display:'flex',alignItems:'center',border:this.state.expanded=='CJS02'?'2px solid #3e81f6':'2px solid rgba(0,0,0,0.2)',padding:16}}>
                  <div style={{marginRight:20,fontSize:18,color:this.state.expanded=='CJS02'?'#3e81f6':null}}>참여자</div>
                  <div style={{color:'#3e81f6'}}>{this.state.CJS02.length}</div> 
                </div>

              </CardHeader>
              <CardText expandable={true}>
                {this.state.CJS02.map(
                  (row,index) => (
                    <div key={row.userId}>
                    <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10}}>
                      <div style={{display:'flex'}}>
                        <div style={{marginRight:20,fontSize:18,width:100}}>{row.userName}</div>
                        {/* <div style={{fontSize:15}}>{row.userEmail}</div> */}
                      </div>
                      <div>
                        {this.state.isAccessor && this.state.isOwner ?
                          <FlatButton label="차단" secondary={true} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'BLOCK')}/>
                        :
                          null
                        }
                      </div>
                    </div>
                    <Divider/>
                    </div>
                      
                  )
                )}
              </CardText>
            </Card>
            {(() => {
              if (this.state.isAccessor && this.state.isOwner) {
                return(
                  <Card
                    expanded={this.state.expanded=='CJS01'} onExpandChange={() => this.handleExpandChange('CJS01')}
                    style={{margin:20,boxShadow:'none'}}
                    
                  >
                    <CardHeader
                      textStyle={{display:'none'}}
                      actAsExpander={true}
                      style={{ border:this.state.expanded=='CJS01'?'2px solid #3e81f6':'2px solid rgba(0,0,0,0.2)'}}
                    >
                      <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{marginRight:20,fontSize:18,color:this.state.expanded=='CJS01'?'#3e81f6':null}}>승인대기</div>
                        <div style={{color:'#3e81f6'}}>{this.state.CJS01.length}</div> 
                      </div>
                    </CardHeader>
                    <CardText expandable={true}>

                  
                    {this.state.CJS01.map(
                        (row,index) => (
                          <div key={row.userId}>
                          <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10}}>
                            <div style={{display:'flex'}}>
                              <div style={{marginRight:20,fontSize:18,width:100}}>{row.userName}</div>
                              {/* <div style={{fontSize:15}}>{row.userEmail}</div> */}
                            </div>
                            <div>
                              <FlatButton label="승인" primary={true}  style={{marginLeft:10}} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'ACTIVE')}/>
                              <FlatButton label="차단" secondary={true} style={{marginLeft:10}} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'BLOCK')}/>                                    
                            </div>
                          </div>
                          <Divider/>
                          </div>
                        )
                      )}

                    </CardText>
                  </Card>
                )
              }
            })()}
            {(() => {
              if (this.state.isAccessor && this.state.isOwner) {
                return(
                  <Card
                    expanded={this.state.expanded=='CJS04'} onExpandChange={() => this.handleExpandChange('CJS04')}
                    style={{margin:20,boxShadow:'none'}}
                    
                  >
                    <CardHeader
                       textStyle={{display:'none'}}
                       actAsExpander={true}
                       style={{ border:this.state.expanded=='CJS04'?'2px solid #3e81f6':'2px solid rgba(0,0,0,0.2)'}}
                    >
                      <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{marginRight:20,fontSize:18,color:this.state.expanded=='CJS04'?'#3e81f6':null}}>차단</div>
                        <div style={{color:'#3e81f6'}}>{this.state.CJS04.length}</div> 
                      </div>
                    </CardHeader>
                    <CardText expandable={true}>
                    {this.state.CJS04.map(
                        (row,index) => (
                          <div key={row.userId}>
                          <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10}}>
                            <div style={{display:'flex'}}>
                              <div style={{marginRight:20,fontSize:18,width:100}}>{row.userName}</div>
                              {/* <div style={{fontSize:15}}>{row.userEmail}</div> */}
                            </div>
                            <div>
                              <FlatButton label="차단해제" primary={true} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'WAITING')}/>
                            </div>
                          </div>
                          <Divider/>
                          </div>
                        )
                      )}
                    </CardText>
                  </Card>
                )
              }
            })()}
            </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};




export default withRouter(MainContainer);
