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

class DeleteCourse extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password:''
    };

    this.deleteCourse = this.deleteCourse.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  //비밀번호 변경
  changePassword(event, value){
    this.setState({
      password:value
    });
  };

  //수업 삭제
  deleteCourse(){
    let courseId = parseInt(this.props.match.params.COURSEID);
    ajaxJson(
      ['DELETE',apiSvr+'/courses/'+courseId+'.json'],
      {'courseId':courseId, 'userid':userId, 'password':this.state.password},
      function(res){
        if(res.response.message=="비밀번호 가 다릅니다."){
          alert("비밀번호 가 다릅니다.");
        }else{
          this.props.deleteCourse();//삭제 모달 닫기
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

    //수업 삭제 및 취소 버튼
    const deleteButton = [
      <FlatButton
        label="삭제"
        primary={true}
        onClick={this.deleteCourse}
      />,
      <FlatButton
        label="취소"
        primary={true}
        onClick={this.props.deleteCourse}
      />
    ];

    return (
      <div>
        <Dialog
          title="수업 삭제"
          actions={deleteButton}
          modal={false}
          open={this.props.deleteOpen}
          onRequestClose={this.props.deleteCourse}
        >
          선택한 수업을 삭제 하시겠습니까?<br/>
          삭제시 해당 수업과 관계된 과정 정보, 팀 정보 및 모든 결과물에 접근 할 수 없게 됩니다.<br/><br/>
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


DeleteCourse = connect(undefined, mapDispatchToProps)(DeleteCourse);


export default withRouter(DeleteCourse);
