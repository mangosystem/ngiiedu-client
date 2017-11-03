import React from 'react';
import $ from 'jquery';
import { withRouter } from "react-router-dom";

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class MainContainer extends React.Component {

    login() {
        const userid = $('#userid').val();
        const password = $('#password').val();

        $.ajax({
            url: '/ngiiedu/login_process',
            dataType: 'json',
            type: 'POST',
            cache: false,
            data: {
                username: userid,
                password: password
            },
            success: function(data) {

                const result = JSON.parse(JSON.stringify(data)).response.data;

                if (result.check == "fail") {
                    alert(result.msg);
                    return;
                }

                this.props.history.push("/");

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    enterKey(e) {
        if (e.keyCode == 13) this.login();
    }

    render() {
        return (
            <div>
                <Paper
                    style={{
                        padding: '20px',
                        maxWidth: '40%',
                        margin: '10% auto'
                    }}
                >
                    <form action="/ngiiedu/login_process" method="POST">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                        <TextField
                            id="userid"
                            floatingLabelText="아이디"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            style={{
                                margin: 'auto'
                            }}
                        />
                        <TextField
                            id="password"
                            floatingLabelText="비밀번호"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            type="password"
                            onKeyDown={(event) => this.enterKey(event)}
                            style={{
                                margin: 'auto'
                            }}
                        />
                        <br /><br />
                        <RaisedButton
                            label="로그인"
                            primary={true}
                            fullWidth={true}
                            onClick={this.login.bind(this)}
                        />
                    </form>
                    <br /><br />
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px'}}>
                        <a href="/ngiiedu/join">회원가입</a>
                        <div>
                            <a href="/ngiiedu/find/id">아이디 찾기</a>
                            <span> | </span>
                            <a href="/ngiiedu/find/password">비밀번호 찾기</a>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withRouter(MainContainer);
