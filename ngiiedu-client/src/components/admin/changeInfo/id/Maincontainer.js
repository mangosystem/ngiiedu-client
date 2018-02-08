import React, { Component } from 'react';

import LeftMenu from '../../common/LeftMenu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.changeId = this.changeId.bind(this);
  }
  changeId(){
    let newId=$('#newUserid').val();
    let passwd=$('#passwd').val();
    if(newId==userId){
      alert('입력하신 아이디는 기존의 아이디와 같습니다.');
      return;
    }else if(passwd ==''){
      alert('비밀번호를 입력해주세요')
    }else{
      ajaxJson(
        ['PUT', apiSvr+'/users/'+userId+'/userid.json'],
        {
          newUserid : newId,
          passwd : passwd
        }, function(res) {
          if(res.response.data == false){
            alert('아이디 또는 비밀번호를 확인해 주세요.');
          }else if(res.response.data == true){
            alert('성공적으로 아이디를 변경하였습니다. 다시 로그인 해주세요.');
            location.replace(contextPath + "/logout");
          }
        }.bind(this),
        function(xhr, status, err) {
          alert('Error');
        }.bind(this)
      );
    }
  }
  render() {
    return (
      <main id="main">
        <div className="inner">
          <div className="flexible">
            <LeftMenu
              activeMenu="changeId"
            />
            <section>
              <Paper style={{padding:20, height:500}}>
                <h3 className="edge">아이디 변경</h3>
                <div style={{maxWidth: '60%', textAlign: 'center', margin: 'auto'}}>
                  <TextField
                    id="newUserid"
                    hintText="아이디 입력"
                    floatingLabelText="아이디"
                    fullWidth={true}
                    defaultValue={userId}
                  />
                  <TextField
                    id='passwd'
                    hintText="비밀번호 입력"
                    floatingLabelText="비밀번호"
                    type="password"
                    fullWidth={true}
                  />
                </div>
                <br />
                <div style={{textAlign: 'center', maxWidth: '30%', margin: 'auto'}}>
                  <FlatButton
                    label="변경하기"
                    fullWidth={true}
                    backgroundColor={'#43444c'}
                    style={{color: 'white'}}
                    onClick={this.changeId}
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