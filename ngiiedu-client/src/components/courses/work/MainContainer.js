import React from 'react';

import Paper from 'material-ui/Paper';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MenuPanel from '../common/MenuPanel.js';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false
    }
  }

  componentWillMount() {
    // alert('생성자, 참여자 구분하여 UI 구성');
  }

  render() {
    return (
      <main id="main">
        <div className="inner">
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'WORK'}
            />
            <section>
              <Paper zDepth={1} style={{padding: 20}}>
                <h3>수업 과정</h3>
                <p>교사가 수업만들기에서 추가한 수업과정이 아래에 나타납니다.</p>
                <br />
                <Divider />
                <br />

                <Paper zDepth={1} style={{ display: 'flex'}}>
                  <Paper zDepth={0} style={{padding: 10, width: '15%', backgroundColor: '#eee', textAlign: 'center'}}>
                    <Avatar size={47} style={{fontSize: 18.5}}>토론</Avatar>
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '75%', margin: 'auto'}}>
                    소음 및 소음지도 개념을 논의하고 우리동네 소음원에 대해 토의
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '10%', backgroundColor: '#eee', margin: 'auto'}}>
                    <IconMenu
                      iconButtonElement={<IconButton><FontIcon><i className="fa fa-ellipsis-v"></i></FontIcon></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="수행하기" />
                    </IconMenu>
                  </Paper>
                </Paper>

                <br />

                <Paper zDepth={1} style={{ display: 'flex'}}>
                  <Paper zDepth={0} style={{padding: 10, width: '15%', backgroundColor: '#eee', textAlign: 'center'}}>
                    <Avatar size={47} style={{fontSize: 18.5}}>현장실습</Avatar>
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '75%', margin: 'auto'}}>
                    모바일 기기를 활용한 우리 지역 소음원 현장 조사
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '10%', backgroundColor: '#eee', margin: 'auto'}}>
                    <IconMenu
                      iconButtonElement={<IconButton><FontIcon><i className="fa fa-ellipsis-v"></i></FontIcon></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="수행하기" />
                    </IconMenu>
                  </Paper>
                </Paper>

                <br />

                <Paper zDepth={1} style={{ display: 'flex'}}>
                  <Paper zDepth={0} style={{padding: 10, width: '15%', backgroundColor: '#eee', textAlign: 'center'}}>
                    <Avatar size={47} style={{fontSize: 18.5}}>전산실습</Avatar>
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '75%', margin: 'auto'}}>
                    컴퓨터를 이용한 주제지도 및 스토리맵 작성하기
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '10%', backgroundColor: '#eee', margin: 'auto'}}>
                    <IconMenu
                      iconButtonElement={<IconButton><FontIcon><i className="fa fa-ellipsis-v"></i></FontIcon></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="수행하기" />
                    </IconMenu>
                  </Paper>
                </Paper>

                <br />

                <Paper zDepth={1} style={{ display: 'flex'}}>
                  <Paper zDepth={0} style={{padding: 10, width: '15%', backgroundColor: '#eee', textAlign: 'center'}}>
                    <Avatar size={47} style={{fontSize: 18.5}}>토론</Avatar>
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '75%', margin: 'auto'}}>
                    팀별 소음지도 및 소음저감대책 등 발표
                  </Paper>
                  <Paper zDepth={0} style={{padding: 10, width: '10%', backgroundColor: '#eee', margin: 'auto'}}>
                    <IconMenu
                      iconButtonElement={<IconButton><FontIcon><i className="fa fa-ellipsis-v"></i></FontIcon></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="수행하기" />
                    </IconMenu>
                  </Paper>
                </Paper>
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default MainContainer;
