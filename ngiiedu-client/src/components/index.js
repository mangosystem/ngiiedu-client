import React, { Component } from 'react';

import Header from './main/Header.js';
import Footer from './main/Footer.js';

import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';
// import history from './utils/history';

import MainContainer  from './main/MainContainer';

import CoursesListContainer from './courses/course/list/MainContainer';
import CoursesNewContainer from './courses/course/new/MainContainer';

//학교 목록 관리
import SchoolListMainContainer from './schools/list/MainContainer';


//학교 동기화
import SchoolsSyncContainer from './schools/sync/MainContainer';
import SchoolsSyncFileContainer from './schools/sync/file/MainContainer';
import SchoolsSyncApiContainer from './schools/sync/api/MainContainer';

//사용자 관리
import UsersManageContainer from './users/manage/MainContainer';

//회원가입
import UserJoinContainer from './users/join/MainContainer';

//로그인
import UserLoginContainer from './users/login/MainContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
  			<div id="wrap">
  				<Header />
  				<div id="content">
            <div style={{minHeight:'100%', height: '100%'}}>
              <Route exact path="/" component={MainContainer}/>
              <Switch>
                <Route path="/schools/list" component={SchoolListMainContainer}/>
                
                <Route path="/courses/list" component={CoursesListContainer}/>
                <Route path="/courses/new" component={CoursesNewContainer}/>

                //학교 동기화
                <Route path="/schools/sync/file" component={SchoolsSyncFileContainer}/>
                <Route path="/schools/sync/api" component={SchoolsSyncApiContainer}/>
                <Route path="/schools/sync" component={SchoolsSyncContainer}/>

                <Route path="/users/manage" component={UsersManageContainer}/>
                <Route path="/users/join" component={UserJoinContainer}/>
                <Route path="/users/login" component={UserLoginContainer}/>                  
              </Switch>
            </div>
  				</div>
  				<Footer />
  			</div>
      </BrowserRouter>
    );
  }
}

export default App;
