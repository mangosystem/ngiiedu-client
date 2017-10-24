import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconDownload from 'material-ui/svg-icons/file/file-download';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

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
      data: [{
        
      }]
    };
  }

  componentWillMount() {
    console.log(this.props.match.params.COURSEID);

    ajaxJson(
      ['GET', apiSvr + '/courses/' + this.props.match.params.COURSEID + '/workData.json'],
      null,
      function (res) {
          console.log('datas : ' + res.response.data);
      }.bind(this),
      function (xhr, status, err) {
          alert('Error');
      }.bind(this)
    );
  }

  render() {

    const divStyle = {
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between'
    };

    const style = {
      textAlign: 'right'
    };

    const titleStyle = {
      fontSize: '20px', 
      lineHeight: '20px', 
      fontWeight: 'bold'
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
                <div  style={{padding: '20px'}}>
                  <div style={divStyle}>
                  <div style={titleStyle}>수업 지도안</div>
                  </div>
                  <br />
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>
                              <Checkbox
                                checkedIcon={<Visibility />}
                                uncheckedIcon={<VisibilityOff />}
                                label="시끄러워도 우리동네!"
                              />
                            </TableRowColumn>
                            <TableRowColumn colSpan="2">우리지역 소음지도 만들기</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                        <TableRowColumn colSpan="2">우리지역 소음지도 만들기</TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn style={style}>                              
                          <FlatButton 
                            label="download"
                            labelPosition="before"
                            icon={<IconDownload />} />
                            <Checkbox
                              checkedIcon={<Visibility />}
                              uncheckedIcon={<VisibilityOff />}
                            />
                        </TableRowColumn>
                        </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Paper>
              <Paper>
                <div  style={{padding: '20px'}}>
                  <div style={divStyle}>
                    <div style={titleStyle}>교사용 수업자료</div>
                  </div>
                  <br />
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>1차시 - 교사용_소음 및 소음지도 개념</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>2~3차시 - 교사용_구글맵 현장조사 매뉴얼</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                            </TableRow>
                        <TableRow>
                            <TableRowColumn>2~3차시 - 콜렉터 현장조사 매뉴얼</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Paper>
              <Paper>
                <div style={{padding: '20px'}}>
                  <div style={divStyle}>
                    <div style={titleStyle}>학생 활동지</div>
                  </div>
                  <br />
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>2~3차시 - 학생용_구글맵을 이용한 소음지도 만들기</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>4~5차시 - 학생용_구글맵으로 소음지도 분석활동하기</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>4~5차시 - 학생용_스토리맵 만들기 매뉴얼</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>4~5차시 - 학생용_우리 지역 소음지도 해석하기</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Paper>
              <Paper>
                <div style={{padding: '20px'}}>
                  <div style={divStyle}>
                    <div style={titleStyle}>교사용 참고자료</div>
                  </div>
                  <br />
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn colSpan="2">2~3차시 - 참고자료_소음지도 지오데이터베이스 생성 매뉴얼</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Paper>
              <Paper>
                <div style={{padding: '20px'}}>
                  <div style={divStyle}>
                    <div style={titleStyle}>활동 매뉴얼</div>
                  </div>
                  <br />
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>1차시 - 교사용_소음 및 소음지도 개념</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>2~3차시 - 교사용_구글맵 현장조사 매뉴얼</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>2~3차시 - 콜렉터 현장조사 매뉴얼</TableRowColumn>
                            <TableRowColumn style={style}>                              
                              <FlatButton 
                                label="download"
                                labelPosition="before"
                                icon={<IconDownload />} />                            
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                  </Table>
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
