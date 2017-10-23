import React from 'react';
import { withRouter } from "react-router-dom";

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class DeleteCourse extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
    this.deleteData = this.deleteData.bind(this);
  }
  //수업 삭제
  deleteData(){
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

    //수업 삭제 및 취소 버튼
    const deleteButton = [
      <FlatButton
        label="삭제"
        primary={true}
        onClick={this.deleteData}
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
          수업을 삭제 하시겠습니까?
        </Dialog>
      </div>
    );
  }
}

export default withRouter(DeleteCourse);
