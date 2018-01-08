import React from 'react';

import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
//redux
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import { actionLoginInfo }  from '../../../actions/index';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpenJoinCourse: false
    }

    this.onChangeCourseOpen = this.onChangeCourseOpen.bind(this);
  }

  onChangeCourseOpen(){
    this.setState({
      isOpenJoinCourse: !this.state.isOpenJoinCourse
    });
  }

  componentDidMount(){

    this.props.loginRedux({
      userId:userId,
      userName:userName,
      userDivision:userDivision,
      userIdx:userIdx
    });

  }
 

  render() {
    return (
      <header className="adminHeader">
        <div id="headerWrap">
          <div className="header">
            <h1 className="edge" onClick={()=>window.location.href=contextPath + '/main'}>공간정보융합 활용지원정보</h1>
            {this.props.loginStatus.userDivision==3 ? //관리자. = 3
              <div className="gnb">
                <span className="admin">{this.props.loginStatus.userName}</span>님, 로그인하셨습니다.
                <button type="button" title="로그아웃" onClick={()=>window.location.href=contextPath + "/logout"}>로그아웃</button>
              </div> 
            : null}
          </div>
        </div>
      </header>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  
  loginRedux: (loginStatus,) => {
    dispatch(actionLoginInfo(loginStatus));
  }
});


let mapStateToProps = (state) => {
  return {
    loginStatus: state.loginInfo.loginStatus,
  };
}
  

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


Header.propTypes = {
	wide: React.PropTypes.bool
};

Header.defaultProps = {
	wide: false
};

export default withRouter(Header);
