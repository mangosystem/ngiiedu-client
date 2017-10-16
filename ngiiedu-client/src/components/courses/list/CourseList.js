import React from 'react';

import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { actionUserid, actionOpen } from '../../../actions/index';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class CourseList extends React.Component {

    constructor() {
        super();
        this.state = {
            courseTableData: [],
            joinedCourseTableData: [],
            courseTablSelectedRows: [],
            joinedCourseTablSelectedRows: [],
            fixedHeader: true,
            selectable: true
        };

        this.onSelectionCourse = this.onSelectionCourse.bind(this);
        this.onSelectionJoinedCourse = this.onSelectionJoinedCourse.bind(this);
        this.isCourseTableSelected = this.isCourseTableSelected.bind(this);
        this.isJoinedCourseTableSelected = this.isJoinedCourseTableSelected.bind(this);
        this.courseTableRowSelection = this.courseTableRowSelection.bind(this);
        this.joinedCourseTableRowSelection = this.joinedCourseTableRowSelection.bind(this);
    }

    componentDidMount() {
        let params = null;
        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseDetail.json'],
            params,
            function (res) {
                this.setState({
                    courseTableData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        ajaxJson( // id 입력..
            ['GET', apiSvr + '/courses/list/' + '1' + '/courseDetail.json'],
            params,
            function (res) {
                this.setState({
                    joinedCourseTableData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
    };

    componentWillReceiveProps(nextProps) {
        let params = ({ 'keyword': '%' + nextProps.keyword + '%' });
        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseDetail.json'],
            params,
            function (res) {
                this.setState({
                    courseTableData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        ajaxJson( // id 입력..
            ['GET', apiSvr + '/courses/list/' + '1' + '/courseDetail.json'],
            params,
            function (res) {
                this.setState({
                    joinedCourseTableData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
    };

    isCourseTableSelected(index) {
        return this.state.courseTablSelectedRows.indexOf(index) !== -1;
    };

    isJoinedCourseTableSelected(index) {
        return this.state.joinedCourseTablSelectedRows.indexOf(index) !== -1;
    };

    onSelectionCourse(courseTablSelectedRows) {
        this.setState({
            courseTablSelectedRows: courseTablSelectedRows
        });

        let courseIds = [];
        for (let n of courseTablSelectedRows) {
            this.state.items.map(function (v, i) {
                if (n == i) {
                    courseIds.push(v.idx);
                    return;
                }
            });
        };

        console.log(courseIds);
    };

    onSelectionJoinedCourse(joinedCourseTablSelectedRows) {
        this.setState({
            joinedCourseTablSelectedRows: joinedCourseTablSelectedRows
        });

        let courseIds = [];
        for (let n of joinedCourseTablSelectedRows) {
            this.state.items.map(function (v, i) {
                if (n == i) {
                    courseIds.push(v.idx);
                    return;
                }
            });
        }

        console.log(courseIds);
    }

    courseTableRowSelection(sr) {
        if (sr.length != 0) {
            this.setState({
                courseTablSelectedRows: sr
            });
        }
    };

    joinedCourseTableRowSelection(sr) {
        if (sr.length != 0) {
            this.setState({
                joinedCourseTablSelectedRows: sr
            });
        }
    };

    render() {
        return (
            <div>
                <Card
                // expanded={true}
                >
                    <CardHeader
                        title="개설된 수업(전체수업)"
                        subtitle=""
                        // actAsExpander={true}
                        // showExpandableButton={true}
                        style={{
                            // backgroundColor: '#70a8ff'
                        }}
                    />
                    <CardText
                    // expandable={true}
                    >
                        <div>
                            <Table
                                onRowSelection={this.courseTableRowSelection}
                                fixedHeader={this.state.fixedHeader}
                                multiSelectable={false}
                                selectable={this.state.selectable}
                                height={'300px'}
                            >
                                <TableHeader displaySelectAll={false}>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.courseTableData.map((row, i) => (
                                        <TableRow
                                            selected={this.isCourseTableSelected(i)}
                                            key={row.idx}
                                            style={{ height: '70px' }}
                                        >
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <Avatar src={row.moduleMetadata} />
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '70%' }}>
                                                {row.courseName}
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <Avatar>{row.courseCreateUserId.charAt(0)}</Avatar>
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '10%' }}>
                                                {row.courseCreateUserId}
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <IconMenu
                                                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    style={{ float: 'right' }}
                                                >
                                                    <MenuItem
                                                        primaryText="이동하기"
                                                        href={"/course/" + row.idx}
                                                    />
                                                </IconMenu>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardText>
                </Card>
                <br />
                <Card>
                    <CardHeader
                        title="참여중인 수업"
                        subtitle=""
                        // actAsExpander={true}
                        // showExpandableButton={true}
                        style={{
                            // backgroundColor: '#70a8ff'
                        }}
                    />
                    <CardText>
                        <div>
                            <Table
                                onRowSelection={this.joinedCourseTableRowSelection}
                                fixedHeader={this.state.fixedHeader}
                                multiSelectable={false}
                                selectable={this.state.selectable}
                                height={'300px'}
                            >
                                <TableHeader displaySelectAll={false}>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                    {this.state.joinedCourseTableData.map((row, i) => (
                                        <TableRow
                                            selected={this.isJoinedCourseTableSelected(i)}
                                            key={row.idx}
                                            style={{ height: '70px' }}
                                        >
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <Avatar src={row.moduleMetadata} />
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '70%' }}>
                                                {row.courseName}
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <Avatar>{row.courseCreateUserId.charAt(0)}</Avatar>
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '10%' }}>
                                                {row.courseCreateUserId}
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <IconMenu
                                                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    style={{ float: 'right' }}
                                                >
                                                    <MenuItem
                                                        primaryText="이동하기"
                                                        href={"/course/" + row.idx}
                                                    />
                                                </IconMenu>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardText>
                </Card>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    keyword: state.user.keyword
});

CourseList = connect(mapStateToProps)(CourseList);

export default CourseList;
