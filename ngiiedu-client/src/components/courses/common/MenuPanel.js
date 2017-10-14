import React from 'react';

import Paper from 'material-ui/Paper';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import IconInfoOutline from 'material-ui/svg-icons/action/info-outline';
import IconPerson from 'material-ui/svg-icons/social/person';
import IconGroup from 'material-ui/svg-icons/social/group';
import IconFileDownload from 'material-ui/svg-icons/file/file-download';
import IconImportantDevices from 'material-ui/svg-icons/action/important-devices';
import IconWeb from 'material-ui/svg-icons/av/web';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';

class MenuPanel extends React.Component {

  constructor(props){
    super(props);
  }

  render() {


    return (
      <div>
        {(() => {
          const {props} = this;

          if (props.isAccessor && props.isOwner) {
            return (
              <aside>
                <Paper className="mui-paper">
                  <Menu desktop className="aside-menu">
                    <Subheader>수업</Subheader>
                    <MenuItem
                      primaryText="수업 정보"
                      leftIcon={<IconInfoOutline />}
                      className={this.props.activeMenu == 'INFO' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                      primaryText="관련 데이터"
                      leftIcon={<IconFileDownload />}
                      className={this.props.activeMenu == 'DATA' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                      primaryText="수업 과정"
                      leftIcon={<IconWeb />}
                      className={this.props.activeMenu == 'WORK' ? 'aml' : 'uml'}
                    />
                  </Menu>
                </Paper>
                <Paper className="mui-paper">
                  <Menu desktop className="aside-menu">
                    <Subheader>참여자</Subheader>
                    <MenuItem
                      primaryText="멤버"
                      leftIcon={<IconPerson />}
                      className={this.props.activeMenu == 'MEMBER' ? 'aml' : 'uml'}
                    />
                    <MenuItem
                      primaryText="팀"
                      leftIcon={<IconGroup />}
                      className={this.props.activeMenu == 'TEAM' ? 'aml' : 'uml'}
                    />
                  </Menu>
                </Paper>
                <Paper className="mui-paper">
                  <Menu desktop className="aside-menu">
                    <MenuItem
                      primaryText="수업 설정"
                      leftIcon={<IconSettings />}
                      className={this.props.activeMenu == 'SETTING' ? 'aml' : 'uml'}
                    />
                  </Menu>
                </Paper>
                <Paper className="mui-paper">
                  <Menu desktop className="aside-menu">
                    <Subheader>활동</Subheader>
                    <MenuItem primaryText="과정1" />
                    <MenuItem primaryText="과정2" />
                    <MenuItem primaryText="과정3" />
                    <MenuItem primaryText="..." />
                  </Menu>
                </Paper>
              </aside>
            );
          } else if (props.isAccessor && props.isMember) {
            return (
              <aside>
                <Paper className="mui-paper">
                  <Menu desktop className="mui-menu">
                    <Subheader>수업</Subheader>
                    <MenuItem primaryText="수업 정보" leftIcon={<IconInfoOutline />}/>
                    <MenuItem primaryText="관련 데이터" leftIcon={<IconFileDownload />} />
                    <MenuItem primaryText="수업 과정" leftIcon={<IconWeb />}/>
                  </Menu>
                </Paper>
                <Paper className="mui-paper">
                  <Menu desktop className="mui-menu">
                    <Subheader>참여자</Subheader>
                    <MenuItem primaryText="멤버" leftIcon={<IconPerson />} />
                    <MenuItem primaryText="팀" leftIcon={<IconGroup />} />
                  </Menu>
                </Paper>
                <Paper className="mui-paper">
                  <Menu desktop className="mui-menu">
                    <MenuItem primaryText="수업 설정" leftIcon={<IconSettings />} />
                  </Menu>
                </Paper>
              </aside>
            );
          } else {
            console.log('접근권한없음');
          }
        })()}
      </div>
    );
  }
};

MenuPanel.propTypes = {
  isAccessor: React.PropTypes.bool,
  isOwner: React.PropTypes.bool,
  isMember: React.PropTypes.bool,
  activeMenu: React.PropTypes.string
};

MenuPanel.defaultProps = {
  isAccessor: false,
  isOwner: false,
  isMember: false,
  activeMenu: 'INFO'
};

export default MenuPanel;
