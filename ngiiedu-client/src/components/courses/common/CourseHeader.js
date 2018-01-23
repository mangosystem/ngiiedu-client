import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';

import CheckUserAuthority from './CheckUserAuthority.js';


class CourseHeader extends Component {
  constructor(){
    super();
    this.state={
      courseData:'',
      moduleMetadata:'',
      isAccessor: true,
      isOwner: true,
      isMember: false
    }
 
  }
 
 
  componentDidMount(){    
    let courseId = this.props.match.params.COURSEID;
    ajaxJson(
			['GET', apiSvr + '/courses/' + courseId + '.json'],
			null,
			function(data) {
        const courseData = data.response.data;
        this.setState({
          courseData: courseData
        },function(){
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
        });
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
          {this.state.moduleMetadata =='' ? null :
            <Avatar style={{width:50,height:50,marginRight:20}} src={contextPath+'/assets/images/'+this.state.moduleMetadata+'.png'} />
          }
        </div>
        <div>
          {this.props.isOwner ?
            this.state.courseData.status == true?
            <LockOpen color={'#3e81f6'} />
                :
            <LockOutline color={'#ff5d00'} />
          :
            null
          }
           
          <div style={{fontSize:22,fontWeight:'bold'}}>
            {this.state.courseData.courseName}
          </div>
        </div>
      </Paper>
    );
  }
}
export default withRouter(CourseHeader);