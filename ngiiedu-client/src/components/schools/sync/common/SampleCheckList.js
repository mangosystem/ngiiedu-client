import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

class SampleCheckList extends Component {

    render() {

        return (
            <div >
            <Table  
                headerStyle={{
                    width:2000,
                    height:50
                }}
                bodyStyle={{
                    width:2000,
                    height:450
                }}
                fixedHeader={true}
                fixedFooter={true}
                selectable={false}
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                <TableRow>
                    <TableHeaderColumn>학교ID</TableHeaderColumn>
                    <TableHeaderColumn>학교명</TableHeaderColumn>
                    <TableHeaderColumn>학교급구분</TableHeaderColumn>
                    <TableHeaderColumn>운영상태</TableHeaderColumn>
                    <TableHeaderColumn>교육지원청명</TableHeaderColumn>
                    <TableHeaderColumn>교육지원청코드</TableHeaderColumn>
                    <TableHeaderColumn>시도교육청명</TableHeaderColumn>
                    <TableHeaderColumn>시도교육청코드</TableHeaderColumn>
                    <TableHeaderColumn>소재지지번주소</TableHeaderColumn>
                    <TableHeaderColumn>소재지도로명주소</TableHeaderColumn>
                    <TableHeaderColumn>설립일자</TableHeaderColumn>
                    <TableHeaderColumn>설립형태</TableHeaderColumn>
                    <TableHeaderColumn>위도</TableHeaderColumn>
                    <TableHeaderColumn>경도</TableHeaderColumn>
                    <TableHeaderColumn>본교분교구분</TableHeaderColumn>
                    <TableHeaderColumn>데이터기준일자</TableHeaderColumn>
                    <TableHeaderColumn>생성일자</TableHeaderColumn>
                    <TableHeaderColumn>변경일자</TableHeaderColumn>
                    
                </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
               
               
                {this.props.tableData.map( (row, index) => (
                    <TableRow key={index}>
                        <TableRowColumn>{row.학교ID}</TableRowColumn>
                        <TableRowColumn>{row.학교명}</TableRowColumn>
                        <TableRowColumn>{row.학교급구분}</TableRowColumn>
                        <TableRowColumn>{row.운영상태}</TableRowColumn>
                        <TableRowColumn>{row.교육지원청명}</TableRowColumn>
                        <TableRowColumn>{row.교육지원청코드}</TableRowColumn>
                        <TableRowColumn>{row.시도교육청명}</TableRowColumn>
                        <TableRowColumn>{row.시도교육청코드}</TableRowColumn>
                        <TableRowColumn>{row.소재지지번주소}</TableRowColumn>
                        <TableRowColumn>{row.소재지도로명주소}</TableRowColumn>
                        <TableRowColumn>{row.설립일자}</TableRowColumn>
                        <TableRowColumn>{row.설립형태}</TableRowColumn>
                        <TableRowColumn>{row.위도}</TableRowColumn>
                        <TableRowColumn>{row.경도}</TableRowColumn>
                        <TableRowColumn>{row.본교분교구분}</TableRowColumn>
                        <TableRowColumn>{row.데이터기준일자}</TableRowColumn>
                        <TableRowColumn>{row.생성일자}</TableRowColumn>
                        <TableRowColumn>{row.변경일자}</TableRowColumn>
                    </TableRow>
                ))}
              
                </TableBody>
            </Table>
           
            
            </div>
        );
    }
}

export default SampleCheckList;