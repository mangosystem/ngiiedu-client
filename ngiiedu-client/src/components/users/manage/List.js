import React from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { actionUserid, actionOpen } from '../../../actions/index';


import $ from 'jquery';

//검색창
import SearchBar from 'material-ui-search-bar';
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
            category: 'userid',
            isAscById: false,
            isAscByName: true,
            isAscByEmail: true,
            isAscByDivision: true,
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

    search() {
        
        let keyword = this.state.value;
        let category = this.state.category;

        $.ajax({
            url: 'http://localhost:8080/ngiiedu/api/v1/users.json',
            dataType: 'json',
            cache: false,
            data: { 
                category: category, 
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

    handleChange(event, index, value) {
        this.setState({
            category: value
        })
    }

    changeToggle(event, value, contact) {

        let index = 0;
        
        for (let i=0; i<Object.keys(this.state.users).length; i++) {
            if (this.state.users[i].idx == contact.idx) index = i;
        }
        
        ajaxJson(
			['PUT', 'http://localhost:8080/ngiiedu/api/v1/users/' + contact.userid + '.json'],
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

        return (
            <div>
                <div 
                    style={{
                        margin: '20px auto',
                        maxWidth: '60%'
                    }}
                >
                    <SelectField
                        floatingLabelText="카테고리"
                        value={this.state.category}
                        onChange={this.handleChange.bind(this)}
                        style={{
                            maxWidth: '20%'
                        }}
                    >
                        <MenuItem value="userid" primaryText="아이디" />
                        <MenuItem value="userName" primaryText="이름" />
                        <MenuItem value="userEmail" primaryText="이메일" />
                    </SelectField>

                    <SearchBar
                        onChange={(value) => this.setState({value: value})}
                        onRequestSearch={this.search.bind(this)}
                        style={{
                            maxWidth: '75%'
                        }}
                    />
                </div>
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
                                아이디
                                <i 
                                    className="fa fa-sort" 
                                    aria-hidden="true" 
                                    onMouseUp={() => this.sortJson("userid")}>
                                </i>                
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                이름
                                <i 
                                    className="fa fa-sort"
                                    aria-hidden="true" 
                                    onMouseUp={() => this.sortJson("userName")}>
                                </i> 
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                이메일
                                <i 
                                    className="fa fa-sort"
                                    aria-hidden="true" 
                                    onMouseUp={() => this.sortJson("userEmail")}>
                                </i> 
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                사용자구분
                                <i 
                                    className="fa fa-sort"
                                    aria-hidden="true" 
                                    onMouseUp={() => this.sortJson("userDivision")}>
                                </i> 
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                상태
                                <i 
                                    className="fa fa-sort"
                                    aria-hidden="true" 
                                    onMouseUp={() => this.sortJson("userState")}>
                                </i>
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                상세정보
                            </TableHeaderColumn>
                            </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} className="TableBody">
                            {this.state.users.map((contact, i) => {
                                return (
                                    <TableRow key={i} className="TableRow">
                                        <TableRowColumn>{contact.userid}</TableRowColumn>
                                        <TableRowColumn>{contact.userName}</TableRowColumn>
                                        <TableRowColumn>{contact.userEmail}</TableRowColumn>
                                        <TableRowColumn>{contact.userDivision==1? '교사':'학생'}</TableRowColumn>
                                        <TableRowColumn>
                                        <Toggle                                         
                                            toggled={contact.userState}
                                            onToggle={(event, value, i) => this.changeToggle(event, value, contact)}
                                        />
                                        </TableRowColumn>
                                        <TableRowColumn>
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

let mapDispatchToProps = (dispatch) => {
    return {
        updateUserid: (userid) => dispatch(actionUserid(userid)),
        controlPopup: (value) => dispatch(actionOpen(value))
    };
}

List = connect(undefined, mapDispatchToProps)(List);

export default List;