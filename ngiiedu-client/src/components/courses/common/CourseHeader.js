import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';


class CourseHeader extends Component {
  constructor(){
    super();
    this.state={
      courseData:'',
      moduleMetadata:''
    }
 
  }

  componentDidMount(){    
    const courseId = this.props.match.params.COURSEID;
    
    ajaxJson(
			['GET', apiSvr + '/courses/' + courseId + '.json'],
			null,
			function(data) {
        const courseData = data.response.data;
        this.setState({
          courseData: courseData
        });
        
        ajaxJson(
          ['GET', apiSvr + '/modules/' + courseData.moduleId + '.json'],
          null,
          function(data){
            this.setState({
              moduleMetadata : data.response.data.moduleMetadata
            })

          }.bind(this),
          function(xhr, status, err) {
            console.error(status, err.toString());
          }.bind(this)
        )


			}.bind(this),
			function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
    );
  }

  render() {
    return (
      <Paper style={{display:'flex',height:100,alignItems:'center',paddingLeft:30,marginBottom:20}}>
        <div>
          <Avatar style={{width:50,height:50,marginRight:20}} src={'/ngiiedu/assets/images/'+this.state.moduleMetadata+'.png'} />
        </div>
        <div>
          <div style={{paddingLeft:40,height:22,background:'url(/ngiiedu/assets/images/ico.png) no-repeat left -50px'}}>
            이미지변경요
          </div>
          <div style={{fontSize:22,fontWeight:'bold'}}>
            {this.state.courseData.courseName}
          </div>
        </div>
      </Paper>
    );
  }
}
export default withRouter(CourseHeader);