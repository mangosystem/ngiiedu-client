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
      courseName: '',
      courseMetadata: '',
      authkey: '',
      courseid: this.props.match.params.COURSEID
    };
  }

  componentWillMount() {
    // alert('생성자, 참여자 구분하여 UI 구성');

  }

  componentDidMount() {

    ajaxJson(
			['GET', 'http://localhost:8080/ngiiedu/api/v1/courses/' + this.state.courseid + '.json'],
			null,
			function(data) {
        const courseInfo = JSON.parse(JSON.stringify(data)).response.data;
        this.setState({
          courseName: courseInfo.courseName,
          courseMetadata: JSON.parse(courseInfo.courseMetadata)
        });
			}.bind(this),
			function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
    );

    ajaxJson(
			['GET', 'http://localhost:8080/ngiiedu/api/v1/courses/' + this.state.courseid + '/authkey.json'],
			null,
			function(data) {
        let authkey = JSON.parse(JSON.stringify(data)).response.data;
        this.setState({ authkey: authkey.substring(0,3) + '-' + authkey.substring(3,6) });

			}.bind(this),
			function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
    );

    
  }

  modifyCourseInfo() {
    const courseName = $('#courseName').val();
    const courseDesc = $('#courseDesc').val();

    let courseMetadata = this.state.courseMetadata;
    courseMetadata.courseDesc = courseDesc;
    
    this.setState({
      courseName: courseName,
      courseMetadata: courseMetadata,
      isEdit: false
    });
    
    const data = {
      idx: this.state.courseid,
      courseName: courseName,
      courseMetadata: JSON.stringify(courseMetadata)
    };
    

    ajaxJson(
      ['PUT', 'http://localhost:8080/ngiiedu/api/v1/courses/' + this.state.courseid + '.json'],
			data,
			function(data) {
        console.log("수정됨");
			}.bind(this),
			function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
    );

  }

  modifyAuthkey() {

    ajaxJson(
			['GET', 'http://localhost:8080/ngiiedu/api/v1/courses/' + this.state.courseid + '/authkey/modify.json'],
			null,
			function(data) {
        let authkey = JSON.parse(JSON.stringify(data)).response.data;        
        this.setState({ authkey: authkey.substring(0,3) + '-' + authkey.substring(3,6) });

			}.bind(this),
			function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
    );
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
                            fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', padding: '0 20px',
                            alignItems: 'center', justifyContent: 'space-between' 
                          }}>
                            <div style={{ lineHeight: '2rem' }}>{this.state.courseName}</div>
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
                        <div style={{ padding: '0 20px 20px 20px', marginBottom: 20 }}>
                          <div style={{ fontSize: '1rem', fontWeight: 200 }}>
                            {this.state.courseMetadata.courseDesc}
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
                              id="courseName"
                              inputStyle={{fontSize: '1.4rem', fontWeight: 'bold'}}
                              defaultValue={this.state.courseName}
                              fullWidth={true}
                            />
                          </div>
                        </div>
                        <div style={{ padding: '0 20px 20px 20px', marginBottom: 20 }}>
                          <TextField
                            id="courseDesc"
                            defaultValue={this.state.courseMetadata.courseDesc}
                            multiLine={true}
                            fullWidth={true}
                          />                          
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <FlatButton label="취소" style={{margin: '5px'}}
                            onClick={() => this.setState({isEdit: false})}/>
                          <FlatButton label="저장" primary={true}  style={{margin: '5px'}}
                            onClick={this.modifyCourseInfo.bind(this)}
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
                            수업코드 : {this.state.authkey}
                          </div>
                          <div>
                            <IconMenu
                              iconButtonElement={<IconButton><IconMoreHoriz /></IconButton>}
                              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            >
                              <MenuItem primaryText="코드 변경" onClick={this.modifyAuthkey.bind(this)}/>
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
