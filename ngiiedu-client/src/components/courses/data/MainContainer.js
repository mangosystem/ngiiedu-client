import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

class MainContainer extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false
    };
  }

  componentWillMount() {
    // console.log(this.props.match.params.COURSEID);
  }

  render() {

    const divStyle = {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between'
    };

    return (
      <main id="main">
				<div className="inner">
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'DATA'}
            />
            <section>
              <Paper>
                <div  style={{padding: '5px 20px 20px 20px'}}>
                  <div style={divStyle}>
                  <div style={{fontSize: '20px', lineHeight: '30px'}}>수업 지도안</div>
                    <IconMenu
                      iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="수정" />
                    </IconMenu>
                  </div>
                  <Divider />
                  <br />
                  <ul style={{marginLeft: '10%'}}>
                    <li>우리지역 소음지도 만들기</li>
                  </ul>
                </div>
              </Paper>
              <Paper>
                <div  style={{padding: '5px 20px 20px 20px'}}>
                  <div style={divStyle}>
                    <div style={{fontSize: '20px', lineHeight: '30px'}}>교사용 수업자료</div>
                    <IconMenu
                      iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="수정" />
                    </IconMenu>
                  </div>
                  <Divider />
                  <br />
                  <ul style={{marginLeft: '10%'}}>
                    <li>1차시 - 교사용_소음 및 소음지도 개념</li>
                    <li>2~3차시 - 교사용_구글맵 현장조사 매뉴얼</li>
                    <li>2~3차시 - 콜렉터 현장조사 매뉴얼</li>
                  </ul>
                </div>
              </Paper>
              <Paper>
                <div style={{padding: '5px 20px 20px 20px'}}>
                  <div style={divStyle}>
                    <div style={{fontSize: '20px', lineHeight: '30px'}}>학생 활동지</div>
                      <IconMenu
                        iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      >
                        <MenuItem primaryText="수정" />
                      </IconMenu>
                    </div>
                  <Divider />
                  <br />
                  <ul style={{marginLeft: '10%'}}>
                    <li>2~3차시 - 학생용_구글맵을 이용한 소음지도 만들기</li>
                    <li>4~5차시 - 학생용_구글맵으로 소음지도 분석활동하기</li>
                    <li>4~5차시 - 학생용_스토리맵 만들기 매뉴얼</li>
                    <li>4~5차시 - 학생용_우리 지역 소음지도 해석하기</li>
                  </ul>
                </div>
              </Paper>
              <Paper>
                <div style={{padding: '5px 20px 20px 20px'}}>
                  <div style={divStyle}>
                    <div style={{fontSize: '20px', lineHeight: '30px'}}>교사용 참고자료</div>
                      <IconMenu
                        iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      >
                        <MenuItem primaryText="수정" />
                      </IconMenu>
                    </div>
                  <Divider />
                  <br />
                  <ul style={{marginLeft: '10%'}}>
                    <li>2~3차시 - 참고자료_소음지도 지오데이터베이스 생성 매뉴얼</li>
                  </ul>
                </div>
              </Paper>
              <Paper>
                <div style={{padding: '5px 20px 20px 20px'}}>
                  <div style={divStyle}>
                    <div style={{fontSize: '20px', lineHeight: '30px'}}>활동 매뉴얼</div>
                      <IconMenu
                        iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      >
                        <MenuItem primaryText="수정" />
                      </IconMenu>
                  </div>
                  <Divider />
                  <br />
                  <ul style={{marginLeft: '10%'}}>
                    <li>1차시 - 교사용_소음 및 소음지도 개념</li>
                    <li>2~3차시 - 교사용_구글맵 현장조사 매뉴얼</li>
                    <li>2~3차시 - 콜렉터 현장조사 매뉴얼</li>
                  </ul>
                </div>
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
