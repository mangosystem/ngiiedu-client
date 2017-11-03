import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';

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
                    <MenuItem
                        primaryText="학교목록"
                        href="/ngiiedu/cm-admin/school"
                        leftIcon={<IconSchool />}
                        className={this.props.activeMenu == 'schoolList' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                        primaryText="동기화"
                        href="/ngiiedu/cm-admin/schoolSync"
                        leftIcon={<IconSync />}
                        className={this.props.activeMenu == 'schoolSync' ? 'aml' : 'uml'}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <MenuItem
                        primaryText="회원관리"
                        href="/ngiiedu/cm-admin/user"
                        leftIcon={<IconAccountBox />}
                        className={this.props.activeMenu == 'user' ? 'aml' : 'uml'}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <MenuItem
                        primaryText="수업관리"
                        href="/ngiiedu/cm-admin/course"
                        leftIcon={<IconWeb />}
                        className={this.props.activeMenu == 'course' ? 'aml' : 'uml'}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <Subheader>사용자지원</Subheader>
                    <MenuItem
                        primaryText="메인"
                        href="/ngiiedu/cm-admin/support"
                        leftIcon={<IconHome />}
                        className={this.props.activeMenu == 'support' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                        primaryText="자료실 관리"
                        href="/ngiiedu/cm-admin/supportPds"
                        leftIcon={<IconFolderShared />}
                        className={this.props.activeMenu == 'supportPds' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                        primaryText="FAQ 관리"
                        href="/ngiiedu/cm-admin/supportFaq"
                        leftIcon={<IconHelp />}
                        className={this.props.activeMenu == 'supportFaq' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                        primaryText="Q&A 관리"
                        href="/ngiiedu/cm-admin/supportQna"
                        leftIcon={<IconHelpOutLine />}
                        className={this.props.activeMenu == 'supportQna' ? 'aml' : 'uml'}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <Subheader>수업모듈</Subheader>
                    <MenuItem
                        primaryText="수업모듈 관리"
                        href="/ngiiedu/cm-admin/module"
                        leftIcon={<IconSettings />}
                        className={this.props.activeMenu == 'module' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                        primaryText="수업모듈 생성도구"
                        href="/ngiiedu/cm-admin/moduleBuilder"
                        leftIcon={<IconBuild />}
                        className={this.props.activeMenu == 'moduleBuilder' ? 'aml' : 'uml'}
                    />
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
