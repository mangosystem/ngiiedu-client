import React from 'react';
import { withRouter } from "react-router-dom";

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class LeaveCourse extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
    this.leaveData = this.leaveData.bind(this);
  }
  //수업 탈퇴
  leaveData(){
    let id = this.props.match.params.COURSEID;
    console.log(id)
    this.props.deleteCourse();
    // ajaxJson(
    //   ['DELETE',apiSvr+'/schools.json'],
    //   null,
    //   function(res){
        
    //   }.bind(this),
    //   function(e){
    //     console.log(e);
    //   }
    // );
  };

  render() {

    //수업 탈퇴 및 취소 버튼
    const leaveButton = [
      <FlatButton
        label="탈퇴"
        primary={true}
        onClick={this.leaveData}
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
          수업에서 탈퇴하시겠습니까?
        </Dialog>
      </div>
    );
  }
}

export default withRouter(LeaveCourse);
