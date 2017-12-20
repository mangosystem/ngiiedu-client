import React from 'react';

class Footer2 extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <footer id="footerWrap">
        <div className="footer">
          <ul>
            <li>이용약관</li>
            <li>위치기반서비스이용약관</li>
            <li>개인정보처리방침</li>
            <li>오픈소스라이센스</li>
          </ul>
          <p className="copyright">
            &copy; NGII. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
};


export default Footer2;
