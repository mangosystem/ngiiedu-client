import React, { Component } from 'react';

import LeftMenu from '../../common/LeftMenu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {orange500, cyan500} from 'material-ui/styles/colors';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPwErrorText:'',
      pwdErrorText:'',
      newPwErrorStyle:{},
      pwdErrorStyle:{},
      pwdCheck:false,
      newPw:''
    };
    this.changePw = this.changePw.bind(this);
    this.checkPwd = this.checkPwd.bind(this);
    this.isValidFormPassword = this.isValidFormPassword.bind(this);
  }

  changePw(){
    if(this.state.pwdCheck){
      ajaxJson(
        ['PUT', apiSvr+'/users/'+userId+'/password.json'],
        {
          oldpasswd : $('#oldpasswd').val(),
          newpasswd : $('#password').val()
        }, function(res) {
          if(res.response.data == false){
            alert('현재 비밀번호를 확인해 주세요.');
          }else if(res.response.data == true){
            alert('성공적으로 비밀번호를 변경하였습니다.');
          }
        }.bind(this),
        function(xhr, status, err) {
          alert('Error');
        }.bind(this)
      );
    }
  }

  checkPwd(id) {
    
    const password = $('#password').val();
    const rePassword = $('#rePassword').val();
    const checkPw = this.isValidFormPassword(password)
    if(checkPw){
      this.setState({
        newPwErrorText: "",
        newPwErrorStyle: {color: cyan500}
      });
      if (password == rePassword) {
        this.setState({
          pwdErrorText: "비밀번호가 일치합니다.",
          pwdErrorStyle: {color: cyan500},
          pwdCheck: true
        });
      } else {
        if (this.state.pwdErrorText == '' && id == "password") return;

        this.setState({
          pwdErrorText: "비밀번호가 일치하지 않습니다.",
          pwdErrorStyle: {color: orange500},
          pwdCheck: false
        });
      }
    }else{
      this.setState({
        newPwErrorText: "비밀번호는 8자리 이상, 영문, 숫자, 특수문자가 포함되어야 합니다.",
        newPwErrorStyle: {color: orange500},
        pwdCheck: false
      });
    }
  }

  isValidFormPassword(pw) {
    var check = /^(?=.*[a-zA-Z])(?=.*[~`?/!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!check.test(pw))     {
      return false;
    }
                
    if (pw.length < 8 || pw.length > 20) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <main id="main">
        <div className="inner">
          <div className="flexible">
            <LeftMenu
              activeMenu="changePw"
            />
            <section>
              <Paper style={{padding:20, height:500}}>
                <h3 className="edge">비밀번호 변경</h3>
                <div style={{maxWidth: '60%', textAlign: 'center', margin: 'auto'}}>
                  <TextField
                    id='oldpasswd'
                    hintText="현재 비밀번호 입력"
                    floatingLabelText="현재 비밀번호"
                    type="password"
                    fullWidth={true}
                  />
                  <TextField
                    id='password'
                    hintText="새 비밀번호 입력"
                    floatingLabelText="새 비밀번호"
                    type="password"
                    fullWidth={true}
                    errorText={this.state.newPwErrorText}
                    errorStyle={this.state.newPwErrorStyle}
                    floatingLabelFocusStyle={this.state.newPwErrorStyle}
                    onChange={(e) => this.checkPwd("password")}
                  />
                  <TextField
                    id='rePassword'
                    hintText="새 비밀번호 재확인"
                    floatingLabelText="새 비밀번호 재확인"
                    type="password"
                    fullWidth={true}
                    errorText={this.state.pwdErrorText}
                    errorStyle={this.state.pwdErrorStyle}
                    floatingLabelFocusStyle={this.state.pwdErrorStyle}
                    onChange={(e) => this.checkPwd("rePassword")}
                  />
                </div>
                <br />
                <div style={{textAlign: 'center', maxWidth: '30%', margin: 'auto'}}>
                  <FlatButton
                    label="변경하기"
                    fullWidth={true}
                    disabled={this.state.pwdCheck&&$('#oldpasswd').val()!=''?false:true}
                    backgroundColor={this.state.pwdCheck&&$('#oldpasswd').val()!=''?'#43444c':'#f9f9f9'}
                    style={this.state.pwdCheck&&$('#oldpasswd').val()!=''?{color: '#f9f9f9'}:{color: '#43444c'}}
                    onClick={this.changePw}
                  />
                </div>
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
}

export default MainContainer;