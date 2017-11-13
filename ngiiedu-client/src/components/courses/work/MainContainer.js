import React from 'react';
import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';

import MenuPanel from '../common/MenuPanel.js';
import Work from './Work.js'
import CheckUserAuthority from '../common/CheckUserAuthority.js';


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
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'WORK'}
            />
            <section>
              <Paper zDepth={1} style={{padding: 20}}>
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