import React from 'react';

import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import CourseJoinModal from '../courses/course/join/ModalContainer';

import './Header.css';

class Header extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isOpenJoinCourse: false
    };

    this.onClickJoinCourse = this.onClickJoinCourse.bind(this);
    this.onChangeCourseOpen = this.onChangeCourseOpen.bind(this);

    this.onClickCreateCourse = this.onClickCreateCourse.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickJoinCourse(evt) {
    this.setState({
      isOpenJoinCourse: true
    });
  }

  onChangeCourseOpen(value){
    this.setState({
      isOpenJoinCourse: value
    });
  }

  onClickCreateCourse(evt) {
    this.props.history.push("/courses/new");
  }

  onClickLogin(evt) {
    this.props.history.push("/users/login");
  }

  render() {
    return (
      <header id="header">
        <div className="header_inner">
          <div className="ai_left">
            <Link to="/">NGII-EDU LOGO</Link>
          </div>
            <div className="ai_right">

              <ul className="widget">
                <li>
                  <FlatButton
                    label="수업참여하기"
                    default={true}
                    onClick={this.onClickJoinCourse}
                  />
                  <CourseJoinModal
                    isOpen={this.state.isOpenJoinCourse}
                    onChangeOpen={this.onChangeCourseOpen}
                  />
                </li>
                <li>|</li>
                <li>
                  <FlatButton
                    label="수업만들기"
                    default={true}
                    onClick={this.onClickCreateCourse}
                  />
                </li>
                <li>|</li>
                <li>
                  <Badge
                    badgeContent={10}
                    secondary={true}
                    badgeStyle={{top: 15, right: 12}}
                    style={{padding: '12px 12px 0 0'}}
                  >
                    <IconButton style={{paddingTop: '10px'}}>
                      <NotificationsIcon  />
                    </IconButton>
                  </Badge>
                </li>
                <li>|</li>
                <li>
                  <FlatButton
                    label="로그인"
                    default={true}
                    style={{}}
                    onClick={this.onClickLogin}
                  />
                </li>
                <li style={{paddingTop: '4px'}}>
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="회원정보" />
                    <MenuItem primaryText="수업목록" />
                  </IconMenu>
                </li>
              </ul>
            </div>
        </div>
      </header>
    );
  }
};

// Header.propTypes = {
// 	isOpen: React.PropTypes.bool
// };
//
// Header.defaultProps = {
// 	isOpen: false
// };

export default withRouter(Header);
