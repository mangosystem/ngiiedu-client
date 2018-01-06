import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';
import CheckUserAuthority from '../common/CheckUserAuthority.js';
import CourseHeader from '../common/CourseHeader.js';//과정 해더


import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconDownload from 'material-ui/svg-icons/file/file-download';
import Checkbox from 'material-ui/Checkbox';

import FlatButton from 'material-ui/FlatButton';

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class MainContainer extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false,
      groupedByDivision: []
    };
  }

  groupByDivision(courseData) {

    var groupedByDivision = {};

    for (var key in courseData) {
      var Division = courseData[key].moduleWorkDataDivision;

      if (!groupedByDivision[Division]) {
        groupedByDivision[Division] = [];
      }
      groupedByDivision[Division].push(courseData[key]);
    }

    var Divisions = Object.keys(groupedByDivision);
    let temp =[];

    for (let i = 0; i < Divisions.length; i++) {
      var entries = groupedByDivision[Divisions[i]];
      temp.push(entries);
    }
    this.setState({ groupedByDivision: temp });
  }

  modifyCourseWorkData(event, status, idx) {

    ajaxJson(
      ['PUT', apiSvr + '/courses/' + idx + '/workData.json'],
      { status: status },
      function (data) {
      }.bind(this),
      function (xhr, status, err) {
          alert('Error');
      }.bind(this)
    );

    let tempStatus;
    if (status) tempStatus = 't'; else tempStatus = 'f';

    for (let i in this.state.groupedByDivision) {
      for (let j in this.state.groupedByDivision[i]) {
        if (this.state.groupedByDivision[i][j].idx == idx) {
          let newData = this.state.groupedByDivision;
          newData[i][j].status = tempStatus;
          this.setState({
            groupedByDivision: newData
          });
        }
      }
    }

  }

  componentWillReceiveProps(nextProps){
    
    //redux owner, member 정보 확인
    let courseId = this.props.match.params.COURSEID;
    if(courseId !=null && nextProps.loginStatus !=null){
      
      let authority = CheckUserAuthority(courseId,nextProps.loginStatus.userIdx);
      this.setState({
        isOwner:authority.isOwner,
        isMember:authority.isMember
      })    
    }else{
      this.setState({
        isOwner:false,
        isMember:false
      })
    }
  } 

  componentDidMount() {
    ajaxJson(
      ['GET', apiSvr + '/courses/' + this.props.match.params.COURSEID + '/workData.json'],
      null,
      function (data) {
        const courseData = JSON.parse(JSON.stringify(data)).response.data;
        this.groupByDivision(courseData);
      }.bind(this),
      function (xhr, status, err) {
          alert('Error');
      }.bind(this)
    );

  
    //redux owner, member 정보 확인
    var courseId = this.props.match.params.COURSEID;
    if(courseId !=null && this.props.loginStatus !=null){
      
      let authority = CheckUserAuthority(courseId,this.props.loginStatus.userIdx);
      this.setState({
        isOwner:authority.isOwner,
        isMember:authority.isMember
      })    
    }else{
      this.setState({
        isOwner:false,
        isMember:false
      })
    }
  
  



  }

  render() {

    const divStyle = {
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between',
      height:40,
      borderBottom:'2px solid #3e81f6',
      paddingLeft:10
    };

    const style = {
      textAlign: 'right'
    };

    const titleStyle = {
      fontSize: '20px', 
      lineHeight: '20px', 
      fontWeight: 'bold'
    };

    const subStyle = {
      color: 'grey'
    };

    return (
      <main id="main">

				<div className="inner">
        <CourseHeader
          isAccessor={this.state.isAccessor}
          isOwner={this.state.isOwner}
          isMember={this.state.isMember}
        />
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'DATA'}
            />
            <section>
            <Paper style={{minHeight:700,paddingTop:20}}>
                <div style={{display:'flex',paddingLeft:20, paddingRight:20,justifyContent:'space-between'}}>
                  <h3 className="edge">관련 데이터</h3>
                  <ul className="location">
                    <li>홈</li>
                    <li>수업</li>
                    <li>수업목록</li>
                    <li style={{fontWeight:'bold'}}>관련 데이터</li>
                  </ul>
                </div>
              {this.state.groupedByDivision.map((data,i) => (
                  <div key={i} style={{padding: '20px'}}>
                    <div style={divStyle}>
                    <div style={titleStyle}>{data[0].moduleWorkDataDivisionText}</div>
                    </div>
                    <br />
                    <Table selectable={false}>
                      <TableBody displayRowCheckbox={false}>
                      {(() => {
                        if (this.state.isAccessor && this.state.isOwner) {
                          return (
                            data.map((row, index) => (
                                <TableRow key={index}>
                                  <TableRowColumn colSpan="3">
                                    <div  style={{display: 'flex', alignItems: 'center'}}>
                                      <Checkbox
                                        style={{maxWidth: '5%'}}
                                        checked={row.status == 't' ? true : false}
                                        onCheck={(event, status, index) => this.modifyCourseWorkData(event, status, row.idx)}
                                      />
                                      <div>
                                        <p style={subStyle}>{row.moduleWorkSeq} - </p>
                                        <p style={{fontSize: '1.3em'}}>{row.moduleWorkDataName}</p>
                                      </div>
                                    </div>
                                  </TableRowColumn>
                                  <TableRowColumn style={style}>                              
                                    <FlatButton 
                                      label="download"
                                      labelPosition="before"
                                      icon={<IconDownload />}
                                      onClick={() => window.open(row.moduleWorkDataPath, '_blank')}
                                    />                            
                                  </TableRowColumn>
                                </TableRow>
                            ))
                        );}
                        else if (this.state.isAccessor && this.state.isMember) {
                          let filterData = data.filter(val => (val.status == 't'));

                          if (filterData.length == 0)
                            return (
                              <TableRow colSpan="4">
                                <TableRowColumn style={{fontSize: '1.05em'}}>
                                  다운로드 가능한 데이터가 없습니다.
                                </TableRowColumn>
                              </TableRow>
                            );
                          else 
                          return (
                            filterData.map((row, index) => (
                              <TableRow key={index}>
                                <TableRowColumn colSpan="3">
                                  <p style={subStyle}>{row.moduleWorkSeq} - </p>
                                  <p style={{fontSize: '1.3em'}}>{row.moduleWorkDataName}</p>
                                </TableRowColumn>
                                <TableRowColumn style={style}>
                                  <FlatButton 
                                    label="download"
                                    labelPosition="before"
                                    icon={<IconDownload />}
                                    onClick={() => window.open(row.moduleWorkDataPath, '_blank')}
                                  />                            
                                </TableRowColumn>
                              </TableRow>
                            ))
                          );
                        }
                      })()}
                      </TableBody>
                    </Table>
                  </div>
              ))}
              {(() => {
                if (this.state.groupedByDivision.length == 0) {
                  return(
                      <div  style={{padding: '20px'}}>
                        <div style={divStyle}>
                          <div style={titleStyle}>관련 데이터</div>
                        </div>
                        <br />
                        <Table selectable={false}>
                          <TableBody displayRowCheckbox={false}>
                            <TableRow colSpan="4">
                              <TableRowColumn style={{fontSize: '1.05em'}}>
                                다운로드 가능한 데이터가 없습니다.
                              </TableRowColumn>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                  );
                }
              })()}
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};



export default withRouter(MainContainer);
