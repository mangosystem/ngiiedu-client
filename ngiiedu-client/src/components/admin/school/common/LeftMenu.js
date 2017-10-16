import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';

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
                    />
                    <MenuItem
                        primaryText="동기화"
                        href="/cm-admin/schoolSync"
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <MenuItem
                        primaryText="회원관리"
                        href="/cm-admin/user"
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <MenuItem
                        primaryText="수업관리"
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <Subheader>사용자지원</Subheader>
                    <MenuItem
                        primaryText="메인"
                    />
                    <MenuItem
                        primaryText="자료실 관리"
                    />
                    <MenuItem
                        primaryText="FAQ관리"
                    />
                    <MenuItem
                        primaryText="Q&A관리"
                    />
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                    <Subheader>수업모듈</Subheader>
                    <MenuItem
                        primaryText="수업모듈 관리"
                    />
                    <MenuItem
                        primaryText="수업모듈 생성도구"
                    />
                    </Menu>
                </Paper>
            </aside>
      </div>
    );
  }
};

export default LeftMenu;