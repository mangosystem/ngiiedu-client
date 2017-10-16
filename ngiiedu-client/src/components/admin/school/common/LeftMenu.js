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
                        href="/cm-admin/school"
                        leftIcon={<IconSchool />}
                    />
                    <MenuItem
                        primaryText="동기화"
                        href="/cm-admin/schoolSync"
                        leftIcon={<IconSync />}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <MenuItem
                        primaryText="회원관리"
                        href="/cm-admin/user"
                        leftIcon={<IconAccountBox />}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <MenuItem
                        primaryText="수업관리"
                        leftIcon={<IconWeb />}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <Subheader>사용자지원</Subheader>
                    <MenuItem
                        primaryText="메인"
                        leftIcon={<IconHome />}
                    />
                    <MenuItem
                        primaryText="자료실 관리"
                        leftIcon={<IconFolderShared />}
                    />
                    <MenuItem
                        primaryText="FAQ 관리"
                        leftIcon={<IconHelp />}
                    />
                    <MenuItem
                        primaryText="Q&A 관리"
                        leftIcon={<IconHelpOutLine />}
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <Subheader>수업모듈</Subheader>
                    <MenuItem
                        primaryText="수업모듈 관리"
                        leftIcon={<IconSettings />}
                    />
                    <MenuItem
                        primaryText="수업모듈 생성도구"
                        leftIcon={<IconBuild />}
                    />
                    </Menu>
                </Paper>
            </aside>
      </div>
    );
  }
};

export default LeftMenu;