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
    constructor(props) {
        super(props);
        this.state = {
            courseInfoListOwnData: [],
            courseInfoListJoinData: [],
            fixedHeader: true,
            selectable: true,
            isAccessor: true,
            isOwner: true,
            isMember: false,
            userid: '1'
        };
    }

    componentDidMount() {
        let params = null;
        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseInfoListJoin.json'],
            params,
            function (res) {
                this.setState({
                    courseInfoListJoinData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        );

        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseInfoListOwn.json'],
            params,
            function (res) {
                this.setState({
                    courseInfoListOwnData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        );
    };

    componentWillReceiveProps(nextProps) {
        // 검색
        let params = ({ 'keyword': '%' + nextProps.keyword + '%' });
        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseInfoListJoin.json'],
            params,
            function (res) {
                this.setState({
                    courseInfoListJoinData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        );

        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseInfoListOwn.json'],
            params,
            function (res) {
                this.setState({
                    courseInfoListOwnData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        );
    };

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title="내가 참여한 수업"
                        style={{
                            // backgroundColor: '#70a8ff'
                        }}
                    />
                    <CardText>
                        <div>
                            <Table
                                height={'200px'}
                            >
                                <TableHeader displaySelectAll={false}>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.courseInfoListJoinData.map((row, i) => (
                                        <TableRow
                                            key={row.idx}
                                            style={{ height: '70px' }}
                                        >
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <Avatar src={row.moduleMetadata} />
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '55%' }}>
                                                {row.courseName}
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <Avatar>{row.courseCreateUserId.charAt(0)}</Avatar>
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '15%' }}>
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
                                                        href={contextPath + "/course/" + row.idx}
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
                        title="내가 개설한 수업"
                    />
                    <CardText>
                        <div>
                            <Table
                                height={'200px'}
                            >
                                <TableHeader displaySelectAll={false}>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                    {this.state.courseInfoListOwnData.map((row, i) => (
                                        <TableRow
                                            key={row.idx}
                                            style={{ height: '70px' }}
                                        >
                                            <TableRowColumn style={{ width: '10%' }}>
                                                <Avatar src={row.moduleMetadata} />
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '55%' }}>
                                                {row.courseName}
                                            </TableRowColumn>
                                            <TableRowColumn style={{ width: '15%' }}>
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
                                                        href={contextPath + "/course/" + row.idx}
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
    keyword: state.courseList.keyword
});

CourseList = connect(mapStateToProps)(CourseList);

export default CourseList;
