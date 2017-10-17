import React from 'react';

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

import MapsEditorPanel from './MapsEditorPanel';
import PropertiesPanel from './PropertiesPanel';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editMode: ''
    }
    this.onChangeEditMode = this.onChangeEditMode.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  onChangeEditMode(value) {
    this.setState({
      editMode: value
    });
  }

  render() {
    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex'}}>

            <div style={{flex: 1, marginLeft: 10}}>
              <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                <IconArrowBack />
              </IconButton>
            </div>

            <div style={{flex: 1, paddingTop: 18, paddingBottom: 18}}>
              <div style={{fontSize: 20, textAlign:'center'}}>
                모바일 기기를 활용한 우리 지역 소음원 현장 조사
              </div>
            </div>

            <div style={{flex: 1, marginRight: 10}}>
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
                    <MenuItem primaryText="수업목록" />
                </IconMenu>
                <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                  <IconHelpOutline />
                </IconButton>

              </div>
            </div>

          </div>
        </header>
        <main id="main">
          <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 300 }}>
              <List>
                <Subheader>General</Subheader>
                <ListItem
                  primaryText="소음데이터 수집"
                  secondaryText={
                    <p>
                    모바일 기기를 활용한 우리 지역 소음원 현장 조사 지역 소음원 현장 조사 모바일 기기를 활용한 우리
                    모바일 기기를 활용한 우리 지역 소음원 현장 조사 지역 소음원 현장 조사 모바일 기기를 활용한 우리
                    </p>
                  }
                  secondaryTextLines={2}
                />
                <ListItem
                  primaryText="소음데이터 수집"
                  secondaryText={
                    <p>
                    모바일 기기를 활용한 우리 지역 소음원 현장 조사 지역 소음원 현장 조사 모바일 기기를 활용한 우리
                    모바일 기기를 활용한 우리 지역 소음원 현장 조사 지역 소음원 현장 조사 모바일 기기를 활용한 우리
                    </p>
                  }
                  secondaryTextLines={2}
                />
              </List>
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 300, right: 300 }}>
              <MapsEditorPanel
                onChangeEditMode={this.onChangeEditMode}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 300, backgroundColor: '#fff' }}>
              <PropertiesPanel
                propertiesMode={this.state.editMode}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default MainContainer;
