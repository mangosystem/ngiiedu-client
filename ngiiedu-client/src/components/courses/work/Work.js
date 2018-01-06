import React from 'react';
import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import MenuPanel from '../common/MenuPanel.js';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import update from 'react-addons-update';

class Work extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      workList:[
      ],
    }
    this.enterWork = this.enterWork.bind(this);
    this.courseChecked = this.courseChecked.bind(this);
  }
  //수업 과정 활성화 비활성화
  courseChecked(work){
    let courseId = this.props.match.params.COURSEID;
    ajaxJson(
      ['PUT',apiSvr+'/courses/'+courseId+'/work.json'],
      {'idx':work.idx, 'status':!work.status},
      function(res){
        for(let i=0; i<this.state.workList.length; i++){
          if(this.state.workList[i].idx == work.idx){
            this.setState({
              workList:update(
                this.state.workList,
                {
                  [i]:{
                    status:{$set:res.response.data.status}
                  }
                }
              )
            });
          };
        }
      }.bind(this),
      function(e){
        alert(e);
      }
    );
  };

  //수업 과정 들어가기
  enterWork(id){

    let courseId = this.props.match.params.COURSEID;    

    ajaxJson(
      ['GET', apiSvr + '/courses/' + id + '/workSubData.json'],
      null,
      function (data) {
          if(data.response.data.length!=0 && data.response.data!=null){
            if (data.response.data[0].outputType == 'split') {
              this.props.history.push("/ngiiedu/split");
            } else if (data.response.data[0].outputType == 'swipe') {
              this.props.history.push("/ngiiedu/swipe");
            } else if (data.response.data[0].outputType == 'population') {
              
            } else {
              //alert('수업 과정 아이디 : '+id+', 수업 과정 들어가기');
              this.props.history.push("/ngiiedu/course/" + courseId + "/work2/" + id, data.response.data[0].outputType);
            }
          }
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );
    
  };

  componentWillMount() {
    let courseId = this.props.match.params.COURSEID;
    ajaxJson(
      ['GET',apiSvr+'/courses/'+courseId+'/work.json'],
      null,
      function(res){
        this.setState({
          workList:res.response.data
        });
      }.bind(this)
    );
  };

  render() {
    return (
      <div style={{padding:20}}>
        
        {this.state.workList.map((work,i) => (

          // <div style={{marginTop:50,display:'grid',gridTemplateColumns:'0% 75% 25% 0%',
          
          <div key={work.idx}>

          {this.props.isMember&&this.props.isAccessor&&!this.props.isOwner&&work.status ? 
          //학생 로그인
          <Paper style={{display:'grid',gridTemplateColumns:'90% 10%',marginBottom:20}} className="mouseOverBlue">
            <div style={{padding:'50px 20px',fontSize:20,overflow:'hidden',textOverflow:'ellipsis',fontWeight:'bold'}}>
                {work.moduleWorkName}
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="수행하기" onClick={(i)=>this.enterWork(work.idx)}/>
              </IconMenu>
            </div>
          </Paper>

            : this.props.isOwner&&this.props.isAccessor ?
            //교사 로그인
              <Paper style={{display:'grid',gridTemplateColumns:'90% 10%',marginBottom:20}} className="mouseOverBlue">
                <div style={{padding:'50px 20px',fontSize:20,overflow:'hidden',textOverflow:'ellipsis',fontWeight:'bold'}}>
                  {work.status ?
                  // <div style={{paddingLeft:40,height:22,background:'url(/ngiiedu/assets/images/ico.png) no-repeat left -50px',fontSize:15}}>
                    <LockOpen color={'#3e81f6'} />
                  // </div>
                  :
                  // <div style={{paddingLeft:40,height:22,background:'url(/ngiiedu/assets/images/ico.png) no-repeat left -50px',fontSize:15}}>
                     <LockOutline color={'#ff5d00'} />
                  // </div>
                  }
                  <div>
                    {work.moduleWorkName}
                  </div>
                </div>               
                <div style={{display:'flex',alignItems:'center'}}>
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  >
                    <MenuItem primaryText="수행하기" onClick={(i)=>this.enterWork(work.idx)}/>
                    {work.status ?
                      <MenuItem primaryText="비활성화" onClick={(i)=>this.courseChecked(work)}/>
                    :
                      <MenuItem primaryText="활성화" onClick={(i)=>this.courseChecked(work)}/>
                    }
                  </IconMenu>
                </div>
              </Paper>
             
            :''}
          </div>
        ))}
      </div>
    );
  }
};

export default withRouter(Work);