import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';

import Paper from 'material-ui/Paper';

import FlatButton from 'material-ui/FlatButton';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

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
        console.log(res.response.data);
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

          <div style={{padding: 20}}>
            <h1>수업 설정</h1>
          </div>
          
          <div style={{paddingTop: 20, paddingLeft: 40, paddingBottom:20}}>
            <h3>수업 활성화</h3><br/>
            <div style={{paddingRight:'20px'}}>
              <Checkbox
                checkedIcon={<Visibility />}
                uncheckedIcon={<VisibilityOff />}
                checked = {this.state.courseData.status}
                label="수업을 활성화 / 비활성화 상태로 변경합니다."
                labelPosition="left"
                onCheck={this.courseChecked}
              />
            </div>
          </div>

          <div style={{paddingTop: 20, paddingLeft: 40}}>
            <h3>수업 삭제</h3><br/>
            <div style={{textColor:'gray'}}>
              수업을 삭제합니다.
              <FlatButton 
                label="삭제" 
                secondary={true} 
                style={{float:'right', marginRight:10}}
                onClick={this.deleteCourse}
              />
            </div>
          </div>

          <DeleteCourse 
            deleteOpen={this.state.deleteOpen} 
            deleteCourse={this.deleteCourse}
          />

        </div>
      );
    } else if (this.props.isAccessor && this.props.isMember) {
      return(
        <div>

          <div style={{padding: 20}}>
            <h1>수업 설정</h1>
          </div>

          <div style={{paddingTop: 20, paddingLeft: 40}}>
            <h3>수업 탈퇴</h3><br/>
            수업에서 탈퇴합니다.
            <FlatButton 
              label="탈퇴" 
              secondary={true} 
              style={{float:'right', marginRight:10}}
              onClick={this.leaveCourse}
            />
          </div>

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
