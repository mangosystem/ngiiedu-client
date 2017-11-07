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
                        <Link to={contextPath + "/cm-admin/course"}>
                            <MenuItem
                                primaryText="수업관리"
                                leftIcon={<IconWeb />}
                                className={this.props.activeMenu == 'course' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Subheader>사용자지원</Subheader>
                        <Link to={contextPath + "/cm-admin/support"}>
                            <MenuItem
                                primaryText="메인"
                                leftIcon={<IconHome />}
                                className={this.props.activeMenu == 'support' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/cm-admin/supportPds"}>
                            <MenuItem
                                primaryText="자료실 관리"
                                leftIcon={<IconFolderShared />}
                                className={this.props.activeMenu == 'supportPds' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/cm-admin/supportFaq"}>
                            <MenuItem
                                primaryText="FAQ 관리"
                                leftIcon={<IconHelp />}
                                className={this.props.activeMenu == 'supportFaq' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/cm-admin/supportQna"}>
                            <MenuItem
                                primaryText="Q&A 관리"
                                leftIcon={<IconHelpOutLine />}
                                className={this.props.activeMenu == 'supportQna' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Subheader>수업모듈</Subheader>
                        <Link to={contextPath + "/cm-admin/module"}>
                            <MenuItem
                                primaryText="수업모듈 관리"
                                leftIcon={<IconSettings />}
                                className={this.props.activeMenu == 'module' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/cm-admin/moduleBuilder"}>
                            <MenuItem
                                primaryText="수업모듈 생성도구"
                                leftIcon={<IconBuild />}
                                className={this.props.activeMenu == 'moduleBuilder' ? 'aml' : 'uml'}
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
