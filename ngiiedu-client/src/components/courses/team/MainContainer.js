import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';
import TeamPopup from './TeamPopup.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import Chip from 'material-ui/Chip';
// import List from 'material-ui/svg-icons/action/list';
import IconList from 'material-ui/svg-icons/action/list';


class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false,

      teamPopupOpen:false
    }

    this.teamPopup = this.teamPopup.bind(this);
  }

  teamPopup(value){
    alert(value);
    this.setState =({
      teamPopupOpen : true
    })
  }

  render() {

    const style = {
      width: '32%',
      height: '250px',
      marginBottom: '1%',
      marginLeft: '1%'
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


    const bDivStyle = {
      width: '32%',
      height: '250px',
      marginBottom: '1%',
      marginLeft: '1%', 
      display: 'flex', 
      alignItems: 'center'
    }

    const cDivStyle = {
      widht:'100%',
      height:'60%'
    }


    const styles = {
      chip: {
        marginLeft: '4%',
        marginTop: '2%'
      },
      wrapper: {
        paddingTop:10,
        display: 'flex', 
        flexWrap: 'wrap',
        overflow:'auto',
        maxHeight:'100%'
      },
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
              <Paper style={{padding:'2%'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                <Paper style={style}>
                  <div style={divStyle}>
                    <p style={pStyle}>A팀</p>
                    <IconMenu
                      iconButtonElement={<IconButton><IconList /></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="수정" />
                      <MenuItem primaryText="삭제" />
                    </IconMenu>
                  </div>
                  <Divider />
                  <div style={cDivStyle}>
                    <div style={styles.wrapper}>
                      <Chip
                        style={styles.chip}
                      >
                        조근후
                      </Chip>
                      
                    </div>
                  </div>
                </Paper>

                <Paper style={style}>
                <div style={divStyle}>
                  <p style={pStyle}>A팀</p>
                  <IconMenu
                    iconButtonElement={<IconButton><IconList /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="수정" />
                    <MenuItem primaryText="삭제" />
                  </IconMenu>
                </div>
                <Divider />
                <div style={cDivStyle}>
                  <div style={styles.wrapper}>
                    <Chip
                      style={styles.chip}
                    >
                      조근후
                    </Chip>
                    
                  </div>
                </div>
              </Paper>

              <Paper style={style}>
                <div style={divStyle}>
                  <p style={pStyle}>A팀</p>
                  <IconMenu
                    iconButtonElement={<IconButton><IconList /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="수정" />
                    <MenuItem primaryText="삭제" />

                  </IconMenu>
                </div>
                <Divider />
                <div style={cDivStyle}>
                  <div style={styles.wrapper}>
                    <Chip
                      style={styles.chip}
                    >
                      조근후
                    </Chip>
                  </div>
                </div>
              </Paper>
                <TeamPopup/>
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
