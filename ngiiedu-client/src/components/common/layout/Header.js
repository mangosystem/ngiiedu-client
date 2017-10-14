import React from 'react';

import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header id="header">
        <div className={this.props.wide ? "inner wide" : "inner"}>
          <div className="tb_left">
            <Link to="/">NGII-EDU LOGO</Link>
          </div>
          <div className="tb_right">
          </div>
        </div>
      </header>
    );
  }
};

Header.propTypes = {
	wide: React.PropTypes.bool
};

Header.defaultProps = {
	wide: false
};

export default withRouter(Header);
