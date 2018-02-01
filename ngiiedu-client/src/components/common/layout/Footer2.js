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
          <div style={{position:'absolute', top:40, marginLeft:100}}>
            <img src={contextPath+"/assets/images/ft_logo.png"}/>
          </div>
          <div style={{position:'absolute', top:40, marginLeft:950}}>
            <img src={contextPath+"/assets/images/logo_sub.png"}/>
          </div>
          <ul>
            <li>
              <a href={contextPath+"/rule/copyrightPolicy"}>저작권정책</a>
            </li>
            <li>
              <a href={contextPath+"/rule/publicInformation"}>공공데이터 이용정책</a>
            </li>
            <li>
              <a href={contextPath+"/rule/emailNonCollection"}>이메일무단수집거부</a>
            </li>
            <li>
              <a href={contextPath+"/rule/openSourceLicense"}>오픈소스 라이센스</a>
            </li>
          </ul>
          <p style={{marginLeft:360}}>
            경기도 수원시 영통구 월드컵로 92 (원천동)  팩스 : 031-210-2644
          </p>
          <p style={{marginLeft:360}} className="ft-copyright">Copyright (c) 2015 NGII ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    );
  }
};


export default Footer2;
