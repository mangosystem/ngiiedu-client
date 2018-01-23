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
          <div style={{position:"absolute", top:40}}>
            <img src={contextPath+"/assets/images/ft_logo.png"}/>
          </div>
          <ul>
            <li>이용약관</li>
            <li>오픈소스라이센스</li>
          </ul>
        </div>
      </footer>
    );
  }
};


export default Footer2;
