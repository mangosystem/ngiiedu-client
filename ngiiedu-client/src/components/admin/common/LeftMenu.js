import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';

import IconSchool from 'material-ui/svg-icons/social/school';
import IconSync from 'material-ui/svg-icons/notification/sync';
import IconAccountBox from 'material-ui/svg-icons/action/account-box';
import IconWeb from 'material-ui/svg-icons/av/web';
import IconHome from 'material-ui/svg-icons/action/home';
import IconFolderShared from 'material-ui/svg-icons/file/folder-shared';
import IconHelp from 'material-ui/svg-icons/action/help';
import IconHelpOutLine from 'material-ui/svg-icons/action/help-outline';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconBuild from 'material-ui/svg-icons/action/build';
import IconLock from 'material-ui/svg-icons/action/lock';
import IconContacts from 'material-ui/svg-icons/communication/contacts';

class LeftMenu extends React.Component {

  constructor(props){
    super(props);

  }


  render() {

    return (
      <div>
            <aside>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Subheader>학교관리</Subheader>
                        <Link to={contextPath + "/cm-admin/school"}>
                            <MenuItem
                                primaryText="학교목록"
                                leftIcon={<IconSchool />}
                                className={this.props.activeMenu == 'schoolList' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/cm-admin/schoolSync"}>
                            <MenuItem
                                primaryText="동기화"
                                leftIcon={<IconSync />}
                                className={this.props.activeMenu == 'schoolSync' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Link to={contextPath + "/cm-admin/user"}>
                            <MenuItem
                                primaryText="회원관리"
                                leftIcon={<IconAccountBox />}
                                className={this.props.activeMenu == 'user' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Subheader>정보변경</Subheader>
                        <Link to={contextPath + "/cm-admin/changeId"}>
                            <MenuItem
                                primaryText="아이디"
                                leftIcon={<IconContacts />}
                                className={this.props.activeMenu == 'changeId' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/cm-admin/changePw"}>
                            <MenuItem
                                primaryText="비밀번호"
                                leftIcon={<IconLock />}
                                className={this.props.activeMenu == 'changePw' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
            </aside>
      </div>
    );
  }
};

LeftMenu.defaultProps = {
    activeMenu:'schoolList'
}

export default LeftMenu;
