import React from 'react';
import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconEdit from 'material-ui/svg-icons/image/edit';

import { List, ListItem } from 'material-ui/List';

import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

import MenuPanel from '../common/MenuPanel.js';

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false,
      isEdit: false,
      courseInfo: {}
    };
  }

  componentWillMount() {
    // alert('생성자, 참여자 구분하여 UI 구성');

  }

  componentDidMount() {

    const courseid = this.props.match.params.COURSEID;

    $.ajax({
        url: 'http://localhost:8080/ngiiedu/api/v1/courses/' + courseid + '.json',
        dataType: 'json',
        cache: false,
        success: function(data) {
            const courseInfo = JSON.parse(JSON.stringify(data)).response.data;

            console.log(courseInfo);
            this.setState({courseInfo: courseInfo});

        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this)
    });

    $.ajax({
        url: 'http://localhost:8080/ngiiedu/api/v1/courses/' + courseid + '/authkey.json',
        dataType: 'json',
        cache: false,
        success: function(data) {
            let authkey = JSON.parse(JSON.stringify(data)).response.data;
            console.log(authkey);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this)
    });
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
            />
            <section>
              <Paper>
                {(() => {
                  if (!this.state.isEdit)
                    return (
                      <div>
                        <div style={{ paddingTop: 15, paddingBottom: 10 }}>
                          <div style={{ 
                            fontSize: '1.4rem', fontWeight: 200, display: 'flex', padding: '0 20px',
                            alignItems: 'center', justifyContent: 'space-between' 
                          }}>
                            <div style={{ lineHeight: '2rem' }}>{this.state.courseInfo.courseName}</div>
                            {(() => {
                              if (this.state.isAccessor && this.state.isOwner) 
                                return (
                                  <div>
                                    <IconButton>
                                      <FontIcon onClick={() => this.setState({isEdit: true})}><IconEdit /></FontIcon>
                                    </IconButton>
                                  </div>
                                );
                            })()}
                          </div>
                        </div>
                        <div style={{ padding: 20, marginBottom: 20 }}>
                          <div style={{ fontSize: '1rem', fontWeight: 200 }}>
                            {this.state.courseInfo.courseMetadata}
                            우리지역 소음지도 만들기 소음은 우리의 일상생활에 일어나는 현상이지만 지나치게 큰 소음은 생활환경을 불편하게 하는 요소가 될 수 있다. 평소에 무심코 지나칠 수 있는 소음을 스마트폰 측정앱을 이용하여 측정해보고, 소음의 원인, 불편함을 느끼는 정도를 확인하고, 저감할 수 있는 대책은 무엇인지를 생각해보는 활동을 수행한다.
                          </div>
                        </div>
                      </div>
                    );
                  else 
                    return (
                      <div>
                        <div style={{ paddingTop: 15, paddingBottom: 10 }}>
                          <div style={{ display: 'flex', padding: '0 20px' }}>
                            <TextField
                              id="title"
                              inputStyle={{fontSize: '1.4rem', fontWeight: 200}}
                              defaultValue={this.state.courseInfo.courseName}
                              fullWidth={true}
                            />
                          </div>
                        </div>
                        <div style={{ padding: 20, marginBottom: 20 }}>
                          <TextField
                            id="detail"
                            defaultValue="우리지역 소음지도 만들기 소음은 우리의 일상생활에 일어나는 현상이지만 지나치게 큰 소음은 생활환경을 불편하게 하는 요소가 될 수 있다. 평소에 무심코 지나칠 수 있는 소음을 스마트폰 측정앱을 이용하여 측정해보고, 소음의 원인, 불편함을 느끼는 정도를 확인하고, 저감할 수 있는 대책은 무엇인지를 생각해보는 활동을 수행한다."
                            multiLine={true}
                            fullWidth={true}
                          />                          
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <FlatButton label="취소" style={{margin: '5px'}}
                            onClick={() => this.setState({isEdit: false})}/>
                          <FlatButton label="저장" primary={true}  style={{margin: '5px'}}
                            onClick={() => this.setState({isEdit: false})}
                            icon={<i className="fa fa-check" aria-hidden="true"></i>}/>
                        </div>
                        <br />
                      </div>
                    );
                })()}
              </Paper>
              {(() => {
                if (this.state.isAccessor && this.state.isOwner)
                  return (
                    <Paper>
                      <div style={{ paddingTop: 15, paddingBottom: 10 }}>
                        <div style={{ fontSize: '1.5rem', display: 'flex', padding: '0 20px' }}>
                          <div style={{ lineHeight: '48px', margin: '0 auto' }}>
                            수업코드 : CAP TOZ
                          </div>
                          <div>
                            <IconMenu
                              iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
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
