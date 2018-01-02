import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

//redux
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import * as actions from '../../../../../actions/index';
import Paper from 'material-ui/Paper';
class SampleCheckList extends Component {

    render() {

        return (
            <div>
                <Table
                    headerStyle={{
                        width:3000
                    }}
                    bodyStyle={{
                        width:3000,
                        height:300
                    }}
                    selectable={false}
                    className="admin-table"
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        className="admin-thead"
                    >
                        <TableRow className="admin-tr">
                            {this.props.apiColumn.map( (row, index) => (
                                <TableHeaderColumn key={index} className="admin-th">{row}</TableHeaderColumn>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        className="admin-tbody"
                    >
                    {this.props.tableData.map( (row, index) => (
                        <TableRow key={row.학교ID} className="admin-tr">
                            {this.props.apiColumn.map( (row2,index2 ) => (
                            <TableRowColumn 
                                key={index+'-'+index2}
                                className="admin-td"
                            >
                                {eval("row."+row2)}
                            </TableRowColumn>
                            ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

SampleCheckList.defaultProps = {
    apiColumn:[]
};



export default SampleCheckList;
