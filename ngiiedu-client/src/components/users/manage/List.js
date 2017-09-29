import React from 'react';
import update from 'react-addons-update';

import $ from 'jquery';

//검색창
import SearchBar from 'material-ui-search-bar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


//아이콘
import Assignment from 'material-ui/svg-icons/action/assignment';
import Sort from 'material-ui/svg-icons/action/swap-vert';
import { blue400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';


//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

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
            open: false,
            detail: {}
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
        this.setState({open: true});

        $.ajax({
            url: 'http://localhost:8080/ngiiedu/api/v1/users/' + userid + '.json',
            dataType: 'json',
            cache: false,
            success: function(data) {

                const users = JSON.parse(JSON.stringify(data)).response.data;

                this.setState({
                    detail: users
                });


            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });

    }

    sortJson (name) {
        
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
        

    render() {

        const actions = [
            <FlatButton
              label="확인"
              primary={true}
              onClick={this.handleClose.bind(this)}
            />
          ];


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
                                <IconButton>
                                    <Sort
                                        color={blue400}
                                        onMouseUp={() => {this.setState({ users: this.state.users.sort(this.sortJson("userid")) })}}
                                    />
                                </IconButton>
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                이름
                                <IconButton>
                                <Sort
                                    color={blue400}
                                    onMouseUp={() => {this.setState({ users: this.state.users.sort(this.sortJson("userName")) })}}
                                />
                            </IconButton>
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                이메일
                                <IconButton>
                                <Sort
                                    color={blue400}
                                    onMouseUp={() => {this.setState({ users: this.state.users.sort(this.sortJson("userEmail")) })}}
                                />
                            </IconButton>
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                사용자구분
                                <IconButton>
                                <Sort
                                    color={blue400}
                                    onMouseUp={() => {this.setState({ users: this.state.users.sort(this.sortJson("userDivision")) })}}
                                />
                            </IconButton>
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                상태
                                <IconButton>
                                <Sort
                                    color={blue400}
                                    onMouseUp={() => {this.setState({ users: this.state.users.sort(this.sortJson("userState")) })}}
                                />
                            </IconButton>
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

                <div>
                    <Dialog 
                        title="사용자 상세정보"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose.bind(this)}
                        autoScrollBodyContent={false}
                    >
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn>아이디</TableRowColumn>
                                    <TableRowColumn>{this.state.detail.userid}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>이름</TableRowColumn>
                                    <TableRowColumn>{this.state.detail.userName}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>이메일</TableRowColumn>
                                    <TableRowColumn>{this.state.detail.userEmail}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>사용자구분</TableRowColumn>
                                    <TableRowColumn>{this.state.detail.userDivision==1? '교사' : '학생'}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>활성화여부</TableRowColumn>
                                    <TableRowColumn>{this.state.detail.userState? '활성화' : '비활성화'}</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Dialog>
                </div>
            </div>
        );
    }
}


export default List;