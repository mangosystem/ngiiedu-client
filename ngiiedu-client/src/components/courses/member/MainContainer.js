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
                      <TableRowColumn>이름</TableRowColumn>
                      <TableRowColumn>이메일</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>이름1</TableRowColumn>
                      <TableRowColumn>이메일1</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>이름2</TableRowColumn>
                      <TableRowColumn>이메일2</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>이름3</TableRowColumn>
                      <TableRowColumn>이메일3</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>이름4</TableRowColumn>
                      <TableRowColumn>이메일4</TableRowColumn>
                  </TableRow>
                  <TableRow className="TableRow">
                      <TableRowColumn>이름5</TableRowColumn>
                      <TableRowColumn>이메일5</TableRowColumn>
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
