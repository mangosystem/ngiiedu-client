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
            <Paper >
            <Table
                headerStyle={{
                    width:3000,
                    height:50
                }}
                bodyStyle={{
                    width:3000,
                    height:232
                }}
                selectable={false}
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                <TableRow>
                {this.props.apiColumn.map( (row, index) => (
                    <TableHeaderColumn key={index}>{row}</TableHeaderColumn>
                ))}

                </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >


                {this.props.tableData.map( (row, index) => (
                    <TableRow key={row.학교ID}>
                        {this.props.apiColumn.map( (row2,index2 ) => (
                        <TableRowColumn key={index+'-'+index2}>{eval("row."+row2)}</TableRowColumn>
                        ))}

                    </TableRow>
                ))}

                </TableBody>
            </Table>


            </Paper>
        );
    }
}

SampleCheckList.defaultProps = {
    apiColumn:[]
};



export default SampleCheckList;
