import React from 'react';
import { withRouter } from "react-router-dom";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import MenuItem from 'material-ui/MenuItem';


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
    this.setState({expanded: expand});
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

  componentDidMount() {
    this.ajaxCall();

    // import CheckUserAuthority from '../common/CheckUserAuthority.js';
    //권한확인 코드
    var courseId = this.props.match.params.COURSEID;
    let authority = CheckUserAuthority(courseId);
    this.setState({
      isOwner:authority.isOwner,
      isMember:authority.isMember
    })

  }

  

  render() {
    return (
      <main id="main">
				<div className="inner">
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'MEMBER'}
            />
            <section>
            <Card
            expanded={this.state.expanded} onExpandChange={(expand) => this.handleExpandChange(expand)}
            >
              <CardHeader
                title="참여자"
                titleStyle={titleStyle}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
              <Divider/>
                {this.state.CJS02.map(
                  (row,index) => (
                    <div key={row.userId}>
                      <div style={{margin:'auto'}}>
                        <div style={{display:'flex'}}>
                                    <div style={{padding:10,width:'70%'}}>
                                      <h3>{row.userName}</h3>
                                      <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>{row.userEmail}</p>
                                    </div>
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
                      <Divider/>
                    </div>
                  )
                )}
              </CardText>
            </Card>
            {(() => {
              if (this.state.isAccessor && this.state.isOwner) {
                return(
                  <Card>
                    <CardHeader
                      title="승인대기"
                      titleStyle={titleStyle}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                    <Divider/>

                  
                    {this.state.CJS01.map(
                        (row,index) => (
                          <div key={row.userId}>
                            <div style={{margin:'auto'}}>
                              <div style={{display:'flex'}}>
                                <div style={{padding:10,width:'70%'}}>
                                  <h3>{row.userName}</h3>
                                  <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>{row.userEmail}</p>
                                </div>
                              
                                      <div style={{padding:10,width:'30%',textAlign:'right'}}>
                                        <FlatButton label="승인" primary={true}  style={{marginLeft:10}} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'ACTIVE')}/>
                                        <FlatButton label="차단" secondary={true} style={{marginLeft:10}} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'BLOCK')}/>                                    
                                      </div>
                                  
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
                  <Card>
                    <CardHeader
                      title="차단"
                      titleStyle = {titleStyle}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                    <Divider/>
                    {this.state.CJS04.map(
                        (row,index) => (
                          <div key={row.userId}>
                            <div style={{margin:'auto'}}>
                              <div style={{display:'flex'}}>
                                          <div style={{padding:10,width:'70%'}}>
                                            <h3>{row.userName}</h3>
                                            <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>{row.userEmail}</p>
                                          </div>
                                        
                                                <div style={{padding:10,width:'30%',textAlign:'right'}}>
                                                <FlatButton label="차단해제" primary={true} onClick={(userId,status) => this.handleJoinStatusChange(row.userId,'WAITING')}/>
                                                </div>
                                            
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
            </section>
          </div>
        </div>
      </main>
    );
  }
};




export default withRouter(MainContainer);
