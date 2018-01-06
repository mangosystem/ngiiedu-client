import React from 'react';
import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';

import MenuPanel from '../common/MenuPanel.js';
import Work from './Work.js'
import CheckUserAuthority from '../common/CheckUserAuthority.js';
import CourseHeader from '../common/CourseHeader.js';//과정 해더


class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false
    }
  }


  componentWillReceiveProps(nextProps){
    
    //redux owner, member 정보 확인
    let courseId = this.props.match.params.COURSEID;
    if(courseId !=null && nextProps.loginStatus !=null){
      
      let authority = CheckUserAuthority(courseId,nextProps.loginStatus.userIdx);
      this.setState({
        isOwner:authority.isOwner,
        isMember:authority.isMember
      })    
    }else{
      this.setState({
        isOwner:false,
        isMember:false
      })
    }
  } 

  
  componentDidMount() {
    
    //redux owner, member 정보 확인
    var courseId = this.props.match.params.COURSEID;
    if(courseId !=null && this.props.loginStatus !=null){
      
      let authority = CheckUserAuthority(courseId,this.props.loginStatus.userIdx);
      this.setState({
        isOwner:authority.isOwner,
        isMember:authority.isMember
      })    
    }else{
      this.setState({
        isOwner:false,
        isMember:false
      })
    }
  
    }

  render() {
    return (
      <main id="main">
        <div className="inner">
          <CourseHeader
            isAccessor={this.state.isAccessor}
            isOwner={this.state.isOwner}
            isMember={this.state.isMember}
          />
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'WORK'}
            />
            <section>
              <Paper style={{minHeight:700,paddingTop:20}}>
                <div style={{display:'flex',paddingLeft:20, paddingRight:20,justifyContent:'space-between'}}>
                  <h3 className="edge">수업 과정</h3>
                  <ul className="location">
                    <li>홈</li>
                    <li>수업</li>
                    <li>수업목록</li>
                    <li style={{fontWeight:'bold'}}>수업 과정</li>
                  </ul>
                </div>
                <Work
                  isAccessor={this.state.isAccessor}
                  isOwner={this.state.isOwner}
                  isMember={this.state.isMember}
                />
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);