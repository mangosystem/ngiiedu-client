import React from 'react';

import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
//redux
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import { actionLoginInfo }  from '../../../actions/index';

//수업참여 모달
import CourseJoinModal from '../../courses/join/ModalContainer';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpenJoinCourse: false,
      loginStatus : 'none' ,//student /teacher /none
      mainTitle :'class',
      subTitle:'course' ,// 서브 타이틀 value
    }

    this.onChangeCourseOpen = this.onChangeCourseOpen.bind(this);
    this.handleMainTitle = this.handleMainTitle.bind(this); //메인타이틀 핸들러
    this.handleSubTitle = this.handleSubTitle.bind(this); //서브 타이틀 핸들러
  }

  onChangeCourseOpen(){
    this.setState({
      isOpenJoinCourse: !this.state.isOpenJoinCourse
    });
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

  handleMainTitle(value){
    if(this.state.mainTitle !=value){
      this.setState({
        mainTitle:value
      })
    }
    if(value == 'introduce'){
      window.location.href=contextPath + '/'+value;
    }else if(value == 'gallary'){
      window.location.href=contextPath + '/'+value;
    }else if(value == 'surport'){
      window.location.href=contextPath + '/'+value+'/notice';
    }else if(value == 'class'){
      this.props.history.push(contextPath + '/course');
    }
  }

  handleSubTitle(value){
    if(this.state.subTitle !=value){
      this.setState({
        subTitle:value
      })
    }
    if(value)
    this.props.history.push(contextPath + '/'+value);
  }


  render() {
    return (
        <header className="edu">
          <div id="headerWrap">
            <div className="header">
              <h1 className="edge" onClick={()=>alert("홈으로 가야한다능")}>공간정보융합 활용지원정보</h1>
              {this.props.loginStatus.userDivision==1 ?//교사
               <div className="gnb" >
                <span className="teacher">{this.props.loginStatus.userName}</span>님, 로그인하셨습니다.
                <button type="button" title="로그아웃" onClick={()=>window.location.href=contextPath + "/logout"}>로그아웃</button>
              </div>
              : this.props.loginStatus.userDivision==2 ? //학생
                <div className="gnb">
                  <span className="student">{this.props.loginStatus.userName}</span>님, 로그인하셨습니다.
                  <button type="button" title="로그아웃" onClick={()=>window.location.href=contextPath + "/logout"}>로그아웃</button>
                </div> 
              : this.props.loginStatus.userDivision==3 ? //관리자.
                <div className="gnb">
                  <span className="teacher">{this.props.loginStatus.userName}</span>님, 로그인하셨습니다.
                  <button type="button" title="로그아웃" onClick={()=>window.location.href=contextPath + "/logout"}>로그아웃</button>
                </div> 
              : //로그인 전  
                <ul className="gnb">
                  <li onClick={() => this.props.history.push(contextPath + '/login')}>로그인</li>
                  <li onClick={() => this.props.history.push(contextPath + '/join')}>회원가입</li>
                </ul>
              }
              {/* <div className="gnb" style={{display:'none'}}>
                <span className="student">나학생</span>님, 로그인하셨습니다.
                <button type="button" title="로그아웃">로그아웃</button>
              </div> */}
            </div>
            <div className="lnbWrap">
              <ul className="lnb">
                <li onClick={()=>this.handleMainTitle("introduce")} className={this.state.mainTitle=="introduce" ? 'on' : null}>수업소개</li>
                <li onClick={()=>this.handleMainTitle("gallary")} className={this.state.mainTitle=="gallary" ? 'on' : null}>수업활동갤러리</li>
                <li onClick={()=>this.handleMainTitle("surport")} className={this.state.mainTitle=="surport" ? 'on' : null}>사용지원</li>
                <li onClick={()=>this.handleMainTitle("class")} className={this.state.mainTitle=="class" ? 'on' : null}>나의수업</li>
              </ul>	
            </div>
            <div className="snbWrap navy">
              <div className="snb">
                <h2 className="mainTitle">나의수업</h2>
                <ul>
                  <li className={this.state.subTitle=="course" ? 'on' : null} onClick={() => this.handleSubTitle('course')}>수업목록</li>
                  <li onClick={this.onChangeCourseOpen}>수업참여</li>
                  {this.props.loginStatus.userDivision==1?
                  <li className={this.state.subTitle=="courseCreate" ? 'on' : null} onClick={() => this.handleSubTitle('courseCreate')}>수업생성</li>
                  :
                  null
                  }
                </ul>
              </div>
            </div>
          </div>
          <CourseJoinModal
            isOpen={this.state.isOpenJoinCourse}
            onChangeOpen={this.onChangeCourseOpen}
          />
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
