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

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [{}],
            value: '',
            isAscById: false,
            isAscByName: true,
            isAscByEmail: true,
            isAscByDivision: false,
            isAscByState: true
        };
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8080/ngiiedu/api/v1/users.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                const users = JSON.parse(JSON.stringify(data)).response.data;
                this.setState({users: users});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });


    }

    componentWillReceiveProps(nextProps) {

        const keyword = '%'+nextProps.keyword+'%';

        $.ajax({
            url: 'http://localhost:8080/ngiiedu/api/v1/users.json',
            dataType: 'json',
            cache: false,
            data: {
                keyword: keyword
            },
            success: function(data) {

                const users = JSON.parse(JSON.stringify(data)).response.data;

                this.setState({
                    users: users
                });

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });

    }

    changeToggle(event, value, contact) {

        let index = 0;

        for (let i=0; i<Object.keys(this.state.users).length; i++) {
            if (this.state.users[i].idx == contact.idx) index = i;
        }

        ajaxJson(
			['PUT', 'http://localhost:8080/ngiiedu/api/v1/users/' + contact.userid + '/state.json'],
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
        } else if (name == 'userEmail') {
            this.state.isAscByEmail ? this.setState({
                users: this.state.users.sort(this.sortJsonAsc(name)),
                isAscByEmail: !this.state.isAscByEmail
            }) : this.setState({
                users: this.state.users.sort(this.sortJsonDesc(name)),
                isAscByEmail: !this.state.isAscByEmail
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
            <div>
                <Table
                   selectable={false}
                   className="Table"
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn style={tableStyle}>
                                아이디
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userid")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle}>
                                이름
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userName")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle}>
                                이메일
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userEmail")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle}>
                                사용자구분
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userDivision")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle}>
                                상태
                                <i
                                    className="fa fa-sort"
                                    aria-hidden="true"
                                    onMouseUp={() => this.sortJson("userState")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle}>
                                상세정보
                            </TableHeaderColumn>
                            </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} className="TableBody">
                            {this.state.users.map((contact, i) => {
                                return (
                                    <TableRow key={i} className="TableRow">
                                        <TableRowColumn style={tableStyle}>{contact.userid}</TableRowColumn>
                                        <TableRowColumn style={tableStyle}>{contact.userName}</TableRowColumn>
                                        <TableRowColumn style={tableStyle}>{contact.userEmail}</TableRowColumn>
                                        <TableRowColumn style={tableStyle}>{contact.userDivision==1? '교사':'학생'}</TableRowColumn>
                                        <TableRowColumn>
                                        <Toggle
                                            toggled={contact.userState}
                                            style={{maxWidth: '20%', margin: 'auto'}}
                                            onToggle={(event, value, i) => this.changeToggle(event, value, contact)}
                                        />
                                        </TableRowColumn>
                                        <TableRowColumn style={tableStyle}>
                                            <IconButton onClick={(i) => this.showDetail(contact.userid)}>
                                                <Assignment color={blue400}/>
                                            </IconButton>
                                        </TableRowColumn>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
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
