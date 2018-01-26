import React from 'react';

import { withRouter } from "react-router-dom";
class JoinHeader extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
    return (
        <header className="edu">
          <div id="headerWrap">
            <div className="header">
            <h1 className="edge" onClick={()=>window.location.href=contextPath+'/'}>공간정보융합 활용지원정보</h1>
            <ul className="gnb">
                <li onClick={() => this.props.history.push(contextPath + '/login')}>로그인</li>
                <li onClick={() => this.props.history.push(contextPath + '/join')}>회원가입</li>
              </ul>
            </div>
          </div>
        </header>

    );
  }
};


export default withRouter(JoinHeader);
