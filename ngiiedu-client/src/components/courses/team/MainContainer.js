import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
    }
  }

  componentWillMount() {
     // console.log(this.props.match.params.COURSEID);
  }

  render() {

    const style = {
      width: '32%',
      height: '250px',
      marginBottom: '1%',
      marginRight: '1%'
    };

    const divStyle = {
      width: '100%', 
      height: '30%', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between'
    };

    const pStyle = {
      marginLeft: '10%', 
      fontWeight: 'bold'
    };

    const ulStyle = {
      marginLeft: '15%'
    };

    return (
      <main id="main">
        <div className="inner">
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'TEAM'}
            />
            <section>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                <Paper style={style}>
                  <div style={divStyle}>
                    <p style={pStyle}>A팀</p>
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
                  <ul style={ulStyle}>
                    <li>조근후</li>
                    <li>최유정</li>
                    <li>김현아</li>
                    <li>박성철</li>
                  </ul>
                </Paper>
                <Paper style={style}>
                  <div style={divStyle}>
                    <p style={pStyle}>B팀</p>
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
                  <ul style={ulStyle}>
                    <li>김현빈</li>
                    <li>이상규</li>
                    <li>류승현</li>
                    <li>김민영</li>
                  </ul>
                </Paper>
                <Paper style={style}>
                  <div style={divStyle}>
                    <p style={pStyle}>C팀</p>
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
                  <ul style={ulStyle}>
                    <li>고기원</li>
                    <li>한주영</li>
                    <li>황인영</li>
                    <li>조현기</li>
                  </ul>
                </Paper>
                <Paper style={style}>
                  <div style={divStyle}>
                    <p style={pStyle}>D팀</p>
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
                  <ul style={ulStyle}>
                    <li>홍석권</li>
                    <li>임지영</li>
                    <li>이보경</li>
                    <li>반지현</li>
                  </ul>
                </Paper>
                <Paper style={style}>
                  <div style={divStyle}>
                    <p style={pStyle}>E팀</p>
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
                  <ul style={ulStyle}>
                    <li>김효정</li>
                    <li>손자영</li>
                    <li>류정현</li>
                    <li>이창현</li>
                  </ul>
                </Paper>
                <FloatingActionButton zDepth={0} style={{margin: '0 auto'}}>
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
