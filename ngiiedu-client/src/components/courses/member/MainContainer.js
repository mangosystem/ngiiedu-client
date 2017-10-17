import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
    return (
      <main id="main">
				<div className="inner">
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'MEMBER'}
            />
            <section>
              <Table
                selectable={false}
                className="Table"
              >
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                >
                  <TableRow>
                    <TableHeaderColumn>
                      이름
                      <i className="fa fa-sort" aria-hidden="true"></i>
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      이메일
                      <i className="fa fa-sort" aria-hidden="true"></i>
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} className="TableBody">
                  <TableRow className="TableRow">
                      <TableRowColumn>조근후</TableRowColumn>
                      <TableRowColumn>khjo@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>최유정</TableRowColumn>
                      <TableRowColumn>yjchoi@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>김현아</TableRowColumn>
                      <TableRowColumn>hakim@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>박성철</TableRowColumn>
                      <TableRowColumn>scpark@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>김현빈</TableRowColumn>
                      <TableRowColumn>hbkim@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>류승현</TableRowColumn>
                      <TableRowColumn>shryuee@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>김민영</TableRowColumn>
                      <TableRowColumn>mykim@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>고기원</TableRowColumn>
                      <TableRowColumn>kwko@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>한주영</TableRowColumn>
                      <TableRowColumn>jyhan@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>황인영</TableRowColumn>
                      <TableRowColumn>iyhwang@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>조현기</TableRowColumn>
                      <TableRowColumn>hgjo@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>홍석권</TableRowColumn>
                      <TableRowColumn>skhong@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>임지영</TableRowColumn>
                      <TableRowColumn>jylim@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>이보경</TableRowColumn>
                      <TableRowColumn>bklee@naver.com</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>반지현</TableRowColumn>
                      <TableRowColumn>hjban@naver.com</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
