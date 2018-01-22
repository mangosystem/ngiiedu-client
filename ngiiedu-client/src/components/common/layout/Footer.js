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
        <div className={this.props.wide ? "inner wide" : "inner"}>
          <div style={{position:"absolute", top:40}}>
            <img src="/ngiiedu/assets/images/ft_logo.png"/>
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

Footer.propTypes = {
	wide: React.PropTypes.bool
};

Footer.defaultProps = {
	wide: false
};

export default Footer;
