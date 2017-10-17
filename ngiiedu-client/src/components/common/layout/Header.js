import React from 'react';

import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';

import IconNotifications from 'material-ui/svg-icons/social/notifications';
import IconChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconHelpOutline from 'material-ui/svg-icons/action/help-outline';

import Avatar from 'material-ui/Avatar';


import './Header.css';

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header id="header">
        <div className={this.props.wide ? "inner wide" : "inner"} style={{display: 'flex'}}>

          <div style={{flex: 1, marginLeft: 0, paddingTop: 20, paddingBottom: 20}}>
            <Link to="/course"><h3>NGII-EDU LOGO</h3></Link>
          </div>

          <div style={{flex: 4}}>
          </div>


          <div style={{flex: 1, marginRight: 0}}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Badge
                badgeContent={10}
                secondary={true}
                badgeStyle={{top: 15, right: 12}}
                style={{padding: '12px 12px 0 0', margin: 'auto 10px'}}
              >
                <IconButton style={{paddingTop: '10px'}}>
                  <IconNotifications  />
                </IconButton>
              </Badge>

              {/* stevie, veronika, jenny */}
              <Avatar
                src="https://semantic-ui.com/images/avatar/large/stevie.jpg"
                size={30}
                style={{margin: '15px 10px', cursor: 'pointer'}}
              />
              <IconMenu
                  iconButtonElement={
                      <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                        <IconMoreVert />
                      </IconButton>
                  }
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="회원정보" />
                  <MenuItem primaryText="수업목록" href="/course" />
              </IconMenu>
              <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                <IconHelpOutline />
              </IconButton>

            </div>
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
