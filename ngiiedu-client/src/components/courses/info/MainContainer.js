import React from 'react';
import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import {List, ListItem} from 'material-ui/List';

import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

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
    console.log(this.props.match.params.COURSEID);
  }

  render() {
    return (
      <main id="main">

        <div className="inner">
          <navi>
            <Paper style={{marginBottom: 20}}>
              <div style={{paddingTop: 20, paddingBottom: 20, textAlign: 'center', position: 'relative'}}>
                <h2 style={{margin: '10px auto'}}>
                  수업이름 표시
                </h2>
                <div style={{margin: '10px auto 20px'}}>
                  교사가 입력한 간단한 수업내용 표시
                </div>
                <div style={{position: 'absolute', right: 10, bottom: 5}}>
                  <IconButton><FontIcon><i className="fa fa-cog"></i></FontIcon></IconButton>
                </div>
              </div>
            </Paper>
          </navi>

          <div className="flexible">

            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
            />

            <section>
              <Paper>
                <div style={{paddingTop: 15, paddingBottom: 10}}>
                  <div style={{fontSize: '2rem', fontWeight: 200, display: 'flex', padding: '0 20px'}}>
                    <div style={{lineHeight: '48px', margin: '0 auto'}}>우리지역 소음지도 만들기</div>
                    <div>
                      <IconMenu
                        iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      >
                        <MenuItem primaryText="수정" />
                      </IconMenu>
                    </div>
                  </div>
                </div>
                <Divider />
                <div style={{padding: 20, marginBottom: 20}}>
                  <div style={{fontSize: '1.5rem', fontWeight: 200}}>
                    우리지역 소음지도 만들기 소음은 우리의 일상생활에 일어나는 현상이지만 지나치게 큰 소음은 생활환경을 불편하게 하는 요소가 될 수 있다. 평소에 무심코 지나칠 수 있는 소음을 스마트폰 측정앱을 이용하여 측정해보고, 소음의 원인, 불편함을 느끼는 정도를 확인하고, 저감할 수 있는 대책은 무엇인지를 생각해보는 활동을 수행한다.
                  </div>
                </div>
              </Paper>

              {(() => {
                if (this.state.isAccessor && this.state.isOwner)
                  return(
                    <Paper>
                      <div style={{paddingTop: 15, paddingBottom: 10}}>
                        <div style={{fontSize: '1.5rem', display: 'flex', padding: '0 20px'}}>
                          <div style={{lineHeight: '48px', margin: '0 auto'}}>
                            수업코드 : CAP TOZ
                          </div>
                          <div>
                            <IconMenu
                              iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                              targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                              <MenuItem primaryText="코드 변경" />
                            </IconMenu>
                          </div>
                        </div>
                      </div>
                    </Paper>
                  );
              })()}

            </section>

          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
