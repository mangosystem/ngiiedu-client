import React from 'react';

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';

import SearchBar from 'material-ui-search-bar';

import Add from 'material-ui/svg-icons/content/add-box';
import Delete from 'material-ui/svg-icons/action/delete';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';

import FontIcon from 'material-ui/FontIcon';
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
            isOpenCourseInfoMaodal: false,
            fixedHeader: true,
            selectable: true,
            search:'',
            searchCategory: ''
        };

        this.onSelectionCourse = this.onSelectionCourse.bind(this);
        this.onSelectionJoinedCourse = this.onSelectionJoinedCourse.bind(this);
        this.isCourseTableSelected = this.isCourseTableSelected.bind(this);
        this.isJoinedCourseTableSelected = this.isJoinedCourseTableSelected.bind(this);

        this.infoModalOpen = this.infoModalOpen.bind(this);
        this.infoModalClose = this.infoModalClose.bind(this);

        this.courseTableRowSelection = this.courseTableRowSelection.bind(this);
        this.joinedCourseTableRowSelection  = this.joinedCourseTableRowSelection.bind(this);

        this.onChangeCourseInfoModalOpen = this.onChangeCourseInfoModalOpen.bind(this);
        this.onClickCourserInfoModal = this.onClickCourserInfoModal.bind(this);
    }

    componentWillMount() {
        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseDetail.json'],
            null,
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
            null,
            function (res) {
                this.setState({
                    joinedCourseTableData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

    }

    isCourseTableSelected(index) {
        return this.state.courseTablSelectedRows.indexOf(index) !== -1;
    }

    isJoinedCourseTableSelected(index) {
        return this.state.joinedCourseTablSelectedRows.indexOf(index) !== -1;
    }

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
        }

        console.log(courseIds);
        //this.props.onSelectedCourses(courseIds);
    }

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
        //this.props.onSelectedCourses(courseIds);
    }

    courseTableRowSelection(selectedRows){
        if(selectedRows.length != 0){
            this.setState({
                courseTablSelectedRows: selectedRows
            });
        }
    };

    joinedCourseTableRowSelection(selectedRows){
        if(selectedRows.length != 0){
            this.setState({
                joinedCourseTablSelectedRows: selectedRows
            });
        }
    };

    infoModalOpen(row){
    };

    infoModalClose(){
        this.setState({infoModal:false});
    };

    showDetail(userid) {
        this.props.updateUserid(userid);
        this.props.controlPopup(true);
    };

    search(){
    };

    categoryChange(event, index, value){
        this.setState({searchCategory:value});
    };

    onClickCourserInfoModal(evt) {
        this.setState({
            isOpenCourseInfoMaodal: true
        });
    };

    onChangeCourseInfoModalOpen(value){
        this.setState({
            isOpenCourseInfoMaodal: value
        });
    };

    render() {
        return (
            <div>
                <div>
                    <SearchBar
                        onChange={(search) => this.setState({search : search})}
                        onRequestSearch={this.search}
                    />
                </div>
                <br/>
                <Card
                    expanded={true}
                >
                    <CardHeader
                        title="개설된 수업(전체수업)"
                        subtitle=""
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{
                            backgroundColor: '#70a8ff'
                        }}
                    />
                    <CardText expandable={true}>
                    <div
                        style={{
                            marginLeft: '20px'
                        }}
                    >
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
                                {this.state.courseTableData.map((row,i) => (
                                    <TableRow
                                        selected={this.isCourseTableSelected(i)}
                                        key={row.idx}
                                        style={{height:'70px'}}
                                    >
                                        <TableRowColumn style={{width:'10%'}}>
                                            <Avatar src={row.moduleMetadata} />
                                        </TableRowColumn>
                                        <TableRowColumn style={{width:'70%'}}>
                                            {row.courseName}
                                        </TableRowColumn>
                                        <TableRowColumn style={{width:'10%'}}>
                                            <Avatar>{row.courseCreateUserId.charAt(0)}</Avatar>
                                        </TableRowColumn>
                                        <TableRowColumn style={{width:'10%'}}>
                                            {row.courseCreateUserId}
                                        </TableRowColumn>
                                        <TableRowColumn style={{width:'10%'}}>
                                            <IconMenu
                                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                                style={{ float:'right'}}
                                            >
                                                <MenuItem
                                                    primaryText="상세정보"
                                                    onClick={(i) => this.showDetail(row.userid)}
                                                />
                                                <MenuItem
                                                    primaryText="이동하기"
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
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{
                            backgroundColor: '#70a8ff'
                        }}
                    />
                    <CardText expandable={true}>
                        <div
                            style={{
                                marginLeft: '20px'
                            }}
                        >
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
                                    {this.state.joinedCourseTableData.map((row,i) => (
                                         <TableRow
                                                selected={this.isJoinedCourseTableSelected(i)}
                                                key={row.idx}
                                                style={{height:'70px'}}
                                            >
                                            <TableRowColumn style={{width:'10%'}}>
                                                <Avatar src={row.moduleMetadata} />
                                            </TableRowColumn>
                                            <TableRowColumn style={{width:'70%'}}>
                                                {row.courseName}
                                            </TableRowColumn>
                                            <TableRowColumn style={{width:'10%'}}>
                                                <Avatar>{row.courseCreateUserId.charAt(0)}</Avatar>
                                            </TableRowColumn>
                                            <TableRowColumn style={{width:'10%'}}>
                                                {row.courseCreateUserId}
                                            </TableRowColumn>
                                            <TableRowColumn style={{width:'10%'}}>
                                                <IconMenu
                                                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                                    style={{ float:'right'}}
                                                >
                                                    <MenuItem primaryText="상세정보" />
                                                    <MenuItem primaryText="이동" />
                                                    <MenuItem primaryText="나가기" />
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

let mapDispatchToProps = (dispatch) => {
    return {
        updateUserid: (userid) => dispatch(actionUserid(userid)),
        controlPopup: (value) => dispatch(actionOpen(value))
    };
}

CourseList = connect(undefined, mapDispatchToProps)(CourseList);

export default CourseList;
