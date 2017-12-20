import React from 'react';

import { withRouter } from "react-router-dom";

class LoginModal extends React.Component {
  
  componentDidMount(){
    let closeModal = this.props.closeModal;
    $('.layerWrap').click(function(e){
      if($(e.target).hasClass("layerWrap")){
        closeModal();
      }
    })
  }

  render() {
    return (
        // <div className="layerWrap">
          <form className="loginWrap" action="/ngiiedu/login_process" method="POST">
          <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            <h4>로그인</h4>
            <ul>
              <li><input type="text" id="userid" name="username" placeholder="아이디"/></li>
              <li><input type="password" id="password" name="password" placeholder="비밀번호"/></li>
              <li>
                <button type="submit" className="point2"
                  // onClick={this.loginButton.bind(this)}
                >로그인</button>
              </li>
              <li>
                <a href="#">아이디 찾기</a>
                <a href="#">비밀번호 찾기</a>
              </li>
              <li>
                <button type="button" className="default2" onClick={() => this.props.history.push(contextPath + '/join')}>회원가입</button>
              </li>
            </ul>
          </form>
        // </div>
    );
  }
};


export default withRouter(LoginModal);
