import React, { Component } from 'react';

import LeftMenu from '../../common/LeftMenu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class MainContainer extends React.Component {
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
                    hintText="현재 비밀번호 입력"
                    floatingLabelText="현재 비밀번호"
                    type="password"
                    fullWidth={true}
                  />
                  <TextField
                    hintText="새 비밀번호 입력"
                    floatingLabelText="새 비밀번호"
                    type="password"
                    fullWidth={true}
                  />
                  <TextField
                    hintText="새 비밀번호 재확인"
                    floatingLabelText="새 비밀번호 재확인"
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