import React from 'react';

import './Footer.css';

class Footer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <footer id="footer">
        <div className="wrap">
          <nav>
            <a href="#">이용약관</a>
            <a href="#">위치기반서비스 이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">오픈소스 라이센스</a>
          </nav>
          <address>
            Copyright © <a href="http://www.ngii.go.kr/" target="_blank">NGII.</a>All rights reserved.
          </address>
        </div>
      </footer>
    );
  }
};

export default Footer;
