import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';

import Paper from 'material-ui/Paper';

import FlatButton from 'material-ui/FlatButton';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconButton from 'material-ui/IconButton';

import DeleteCourse from './DeleteCourse.js';
import LeaveCourse from './LeaveCourse.js';

class Setting extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      checked: false,
      deleteOpen:false,
      leaveOpen:false,
      courseData:{}
    }
    this.courseChecked = this.courseChecked.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.leaveCourse = this.leaveCourse.bind(this);
  }
  //수업 활성화 비활성화
  courseChecked(){
    let id = this.props.match.params.COURSEID;
    ajaxJson(
      ['PUT',apiSvr+'/courses/'+id+'/status.json'],
      {'status':!this.state.courseData.status},
      function(res){
        this.setState({
          courseData:res.response.data
        });
      }.bind(this),
      function(e){
        alert(e);
      }
    );
  };
  //수업 삭제 모달
  deleteCourse(){
    this.setState({
      deleteOpen: !this.state.deleteOpen
    });
  };
  //수업 탈퇴 모달
  leaveCourse(){
    this.setState({
      leaveOpen: !this.state.leaveOpen
    });
  };

  componentWillMount() {
    let courseId = this.props.match.params.COURSEID;
    ajaxJson(
      ['GET',apiSvr+'/courses/'+courseId+'.json'],
      null,
      function(res){
        this.setState({
          courseData:res.response.data
        });
      }.bind(this)
    );
  }

  render() {
    if (this.props.isAccessor && this.props.isOwner) {
      return (
        <div>

          <Paper style={{display:'grid',gridTemplateColumns:'85% 15%',marginBottom:20, marginRight:20, marginLeft:20}} className="mouseOverBlue">
            <div style={{padding:'50px 20px',fontSize:20,overflow:'hidden',textOverflow:'ellipsis',fontWeight:'bold'}}>
              <div style={{paddingBottom:20,height:22,fontSize:15}}>
                    <p>수업 활성화</p>
              </div>
              <div>
                수업을 활성화 / 비활성화 상태로 변경합니다.
              </div>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            {this.state.courseData.status ?
                <IconButton onClick={this.courseChecked}>
                  <Visibility color='#3e81f6'/>
                </IconButton>
            :
                <IconButton onClick={this.courseChecked}>
                  <VisibilityOff />
                </IconButton>
            }
            </div>
          </Paper>

          <Paper style={{display:'grid',gridTemplateColumns:'85% 15%',marginBottom:20, marginRight:20, marginLeft:20}} className="mouseOverBlue">
            <div style={{padding:'50px 20px',fontSize:20,overflow:'hidden',textOverflow:'ellipsis',fontWeight:'bold'}}>
              <div style={{paddingBottom:20,height:22,fontSize:15}}>
                    <p>수업 삭제</p>
              </div>
              <div>
                수업을 삭제합니다.
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
              <FlatButton 
                label="삭제" 
                secondary={true} 
                style={{float:'right', marginRight:10}}
                onClick={this.deleteCourse}
              />
            </div>
          </Paper>

          <DeleteCourse 
            deleteOpen={this.state.deleteOpen} 
            deleteCourse={this.deleteCourse}
          />

        </div>
      );
    } else if (this.props.isAccessor && this.props.isMember) {
      return(
        <div>
          <Paper style={{display:'grid',gridTemplateColumns:'85% 15%',marginBottom:20}} className="mouseOverBlue">
            <div style={{padding:'50px 20px',fontSize:20,overflow:'hidden',textOverflow:'ellipsis',fontWeight:'bold'}}>
              <div style={{paddingBottom:20,height:22,fontSize:15}}>
                    <p>수업 탈퇴</p>
              </div>
              <div>
                수업에서 탈퇴합니다.
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
              <FlatButton 
                label="탈퇴" 
                secondary={true} 
                style={{float:'right', marginRight:10}}
                onClick={this.leaveCourse}
              />
            </div>
          </Paper>

          <LeaveCourse 
            leaveOpen={this.state.leaveOpen}
            leaveCourse={this.leaveCourse}
          />

        </div>
      )
    } else {
      console.log('접근권한없음');
    }
  }
};

export default withRouter(Setting);
