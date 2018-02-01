import React from 'react';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { actionCourseTitle } from '../../../actions/index';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Lock from 'material-ui/svg-icons/action/lock';
import TextField from 'material-ui/TextField';

class LeaveCourse extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password:''
    };
    this.leaveCourse = this.leaveCourse.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  //비밀번호 변경
  changePassword(event, value){
    this.setState({
      password:value
    });
  };

  //수업 탈퇴
  leaveCourse(){
    let id = this.props.match.params.COURSEID;
    ajaxJson(
      ['DELETE',apiSvr+'/courses/'+id+'/member.json'],
      {'courseId':id, 'userid':userId, 'password':this.state.password},
      function(res){
        if(res.response.message=="비밀번호 가 다릅니다."){
          alert("비밀번호 가 다릅니다.");
        }else{
          this.props.leaveCourse();//탈퇴 모달 닫기

          this.props.changeSubTitle('course');
          this.props.history.push(contextPath+'/course/'); //수업 리스트로 돌아가기

        }
      }.bind(this),
      function(e){
        console.log(e);
      }
    );
  };

  render() {

    //수업 탈퇴 및 취소 버튼
    const leaveButton = [
      <FlatButton
        label="탈퇴"
        primary={true}
        onClick={this.leaveCourse}
      />,
      <FlatButton
        label="취소"
        primary={true}
        onClick={this.props.leaveCourse}
      />
    ];

    return (
      <div>
        <Dialog
          title="수업 탈퇴"
          actions={leaveButton}
          modal={false}
          open={this.props.leaveOpen}
          onRequestClose={this.props.leaveCourse}
        >
          선택한 수업에서 탈퇴 하시겠습니까?<br/>
          탈퇴시 해당 수업과 관계된 과정 정보, 팀 정보 및 모든 결과물에 접근 할 수 없게 됩니다.<br/><br/>
          <h4>본인 확인을 위해 비밀번호를 입력해 주세요.</h4><br/>
          <Lock color="#757575"/>
          <TextField
            floatingLabelText="비밀번호 입력"
            type="password"
            value={this.state.password}
            style={{width:'80%', paddingLeft:20}}
            onChange={this.changePassword}
          />
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({  
	changeSubTitle: (subTitle) => {
	  dispatch(actionCourseTitle(subTitle));
	}
});


LeaveCourse = connect(undefined, mapDispatchToProps)(LeaveCourse);


export default withRouter(LeaveCourse);
