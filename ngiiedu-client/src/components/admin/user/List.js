import React from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { actionUserid, actionOpen } from '../../../actions/index';


import $ from 'jquery';

//검색창
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


//아이콘
import Assignment from 'material-ui/svg-icons/action/assignment';
import { blue400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';

import FlatButton from 'material-ui/FlatButton';

import './List.css';

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [{}],
            value: '',
            isAscById: false,
            isAscByName: true,
            isAscByDivision: false,
            isAscByState: true,
            offset:0,
            count:0
        };
        this.movePage = this.movePage.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: apiSvr + '/users.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                const users = JSON.parse(JSON.stringify(data)).response.data.list;
                this.setState({
                    users: users,
                    offset:data.response.data.offset,
                    count:data.response.data.count
                });

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });


    }

    componentWillReceiveProps(nextProps) {
        
        let offset = 0;
        const keyword = '%'+nextProps.keyword+'%';

        $.ajax({
            url: apiSvr + '/users.json',
            dataType: 'json',
            cache: false,
            data: {
                offset:offset,
                keyword: keyword
            },
            success: function(data) {

                const users = JSON.parse(JSON.stringify(data)).response.data.list;

                this.setState({
                    users: users,
                    offset:data.response.data.offset,
                    count:data.response.data.count
                });

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });

    }

    movePage(value){
        let offset;
        if(value=="prop"){
            offset = this.state.offset-20;
        }else if(value=="next"){
            offset = this.state.offset+20;
        }
        let keyword = '%'+this.props.keyword+'%';

        ajaxJson(
            ['GET',apiSvr+'/users.json'],
            {'offset':offset, 'keyword':keyword},
            function(data){
                const users = JSON.parse(JSON.stringify(data)).response.data.list;
                
                this.setState({
                    users: users,
                    offset:data.response.data.offset
                });
            }.bind(this)
        );
    }

    changeToggle(event, value, contact) {

        let index = 0;

        for (let i=0; i<Object.keys(this.state.users).length; i++) {
            if (this.state.users[i].idx == contact.idx) index = i;
        }

        ajaxJson(
			['PUT', apiSvr +'/users/' + contact.userid + '/state.json'],
			{
				"userState": value
			},
			function(data) {
                const users = JSON.parse(JSON.stringify(data));

                this.setState({
                    users: update(
                              this.state.users,
                              {
                                  [index]: {
                                      userState: { $set: users.response.data.userState }
                                  }
                              }
                        )
                });

			}.bind(this),
			function(xhr, status, err) {
				alert('Error');
			}.bind(this)
		);
    }

    handleClose() {
        this.setState({open: false});
    }

    showDetail(userid) {

        this.props.updateUserid(userid);
        this.props.controlPopup(true);

    }

    sortJson(name) {

        if (name == 'userid') {
            this.state.isAscById ? this.setState({
                users: this.state.users.sort(this.sortJsonAsc(name)),
                isAscById: !this.state.isAscById
            }) : this.setState({
                users: this.state.users.sort(this.sortJsonDesc(name)),
                isAscById: !this.state.isAscById
            });
        } else if (name == 'userName') {
            this.state.isAscByName ? this.setState({
                users: this.state.users.sort(this.sortJsonAsc(name)),
                isAscByName: !this.state.isAscByName
            }) : this.setState({
                users: this.state.users.sort(this.sortJsonDesc(name)),
                isAscByName: !this.state.isAscByName
            });
        } else if (name == 'userDivision') {
            this.state.isAscByDivision ? this.setState({
                users: this.state.users.sort(this.sortJsonAsc(name)),
                isAscByDivision: !this.state.isAscByDivision
            }) : this.setState({
                users: this.state.users.sort(this.sortJsonDesc(name)),
                isAscByDivision: !this.state.isAscByDivision
            });
        } else if (name == 'userState') {
            this.state.isAscByState ? this.setState({
                users: this.state.users.sort(this.sortJsonAsc(name)),
                isAscByState: !this.state.isAscByState
            }) : this.setState({
                users: this.state.users.sort(this.sortJsonDesc(name)),
                isAscByState: !this.state.isAscByState
            });
        }
    }

    sortJsonAsc (name) {

        return function(o, p) {

            var a, b;

            if (typeof o === 'object' && typeof p === 'object' && o && p) {

                a = o[name];
                b = p[name];

                if (a === b) {
                    return 0;
                }

                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;

                }
                return typeof a < typeof b ? -1 : 1;

            } else {

                throw {
                    name : 'Error',
                    message : 'Expected an object when sorting by ' + name
                };
            }
        };

    }

    sortJsonDesc (name) {

        return function(o, p) {

            var a, b;

            if (typeof o === 'object' && typeof p === 'object' && o && p) {

                a = o[name];
                b = p[name];

                if (a === b) {
                    return 0;
                }

                if (typeof a === typeof b) {
                    return a < b ? 1 : -1;

                }
                return typeof a < typeof b ? 1 : -1;

            } else {

                throw {
                    name : 'Error',
                    message : 'Expected an object when sorting by ' + name
                };
            }
        };

    }

    render() {

        const tableStyle = {
            textAlign: 'center'
        };

        return (
            <div className="boardList">
                <Table
                   selectable={false}
                   className="admin-table"
                   height={'500px'}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        className="admin-thead"
                    >
                        <TableRow className="admin-tr">
                            <TableHeaderColumn className="admin-th">
                                아이디
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userid")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn className="admin-th">
                                별명
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userName")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn className="admin-th">
                                회원구분
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userDivision")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn className="admin-th">
                                상태
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userState")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn className="admin-th">
                                상세정보
                            </TableHeaderColumn>
                            </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} className="admin-tbody">
                        {this.state.users.map((contact, i) => {
                            return (
                                <TableRow key={i} className="admin-tr">
                                    <TableRowColumn className="admin-td">{contact.userid}</TableRowColumn>
                                    <TableRowColumn className="admin-td">{contact.userName}</TableRowColumn>
                                    <TableRowColumn className="admin-td">{contact.userDivision==1? '교사': contact.userDivision==2? '학생' : '관리자'}</TableRowColumn>
                                    <TableRowColumn className="admin-td">
                                    <Toggle
                                        toggled={contact.userState}
                                        style={{maxWidth: '20%', margin: 'auto'}}
                                        onToggle={(event, value, i) => this.changeToggle(event, value, contact)}
                                    />
                                    </TableRowColumn>
                                    <TableRowColumn className="admin-td">
                                        <IconButton onClick={(i) => this.showDetail(contact.userid)}>
                                            <Assignment color={blue400}/>
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <br/>
                <div style={{textAlign: 'center', maxWidth: '30%', margin: 'auto', height:40}}>
                    <FlatButton
                        label="이전"
                        backgroundColor={this.state.offset ==0?'#f9f9f9':'#43444c'}
                        style={this.state.offset ==0?{color: '#43444c', float:'left'}:{color: '#f9f9f9', float:'left'}}
                        disabled={this.state.offset ==0?true:false}
                        onClick={()=>this.movePage('prop')}
                    />
                    <FlatButton
                        label="다음"
                        backgroundColor={this.state.offset+20>this.state.count?'#f9f9f9':'#43444c'}
                        style={this.state.offset+20>this.state.count?{color: '#43444c', float:'right'}:{color: '#f9f9f9', float:'right'}}
                        disabled={this.state.offset+20>this.state.count?true:false}
                        onClick={()=>this.movePage('next')}
                    />
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    keyword: state.user.keyword
});

let mapDispatchToProps = (dispatch) => {
    return {
        updateUserid: (userid) => dispatch(actionUserid(userid)),
        controlPopup: (value) => dispatch(actionOpen(value))
    };
}

List = connect(mapStateToProps, mapDispatchToProps)(List);

export default List;
