import React from 'react';
import { connect } from 'react-redux';

import { actionOpen } from '../../../actions/index';

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

class UserPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: {}
        };
    }


    componentWillReceiveProps(nextProps) {

        const userid = nextProps.userid;

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

    handleClose() {
        this.props.controlPopup(false);
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
                <Dialog 
                title="사용자 상세정보"
                actions={actions}
                modal={false}
                open={this.props.open}
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
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userid: state.user.userid,
        open: state.user.open
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        controlPopup: (value) => dispatch(actionOpen(value))
    }
}

UserPopup = connect(mapStateToProps, mapDispatchToProps)(UserPopup);

export default UserPopup;