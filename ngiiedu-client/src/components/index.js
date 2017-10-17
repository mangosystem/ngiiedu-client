import React, { Component } from 'react';

import Header from './common/layout/Header.js';
import Footer from './common/layout/Footer.js';

import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';


// 미인증 사용자
import UserJoinContainer from './users/join/MainContainer';
import UserLoginContainer from './users/login/MainContainer';

// 인증 사용자
//import UserProfileContainer from './users/profile/MainContainer';

// 관리자 - 학교
import SchoolListMainContainer from './admin/school/list/MainContainer';
import SchoolsSyncContainer from './admin/school/sync/MainContainer';
import SchoolsSyncFileContainer from './admin/school/sync/file/MainContainer';
import SchoolsSyncApiContainer from './admin/school/sync/api/MainContainer';

// 관리자 - 사용자
import UsersManageContainer from './admin/user/MainContainer';

// 관리자 - 수업관리
import CourseContainer from './admin/course/MainContainer';

// 관리자 - 사용자지원
import SupportContainer from './admin/support/MainContainer';
import SupportPdsContainer from './admin/support/pds/MainContainer';
import SupportFaqContainer from './admin/support/faq/MainContainer';
import SupportQnaContainer from './admin/support/qna/MainContainer';

// 관리자 - 수업모듈
import ModuleContainer from './admin/module/MainContainer';
import ModuleBuilderContainer from './builder/MainContainer';

// 수업
import CourseListContainer from './courses/list/MainContainer';
import CourseCreateContainer from './courses/create/MainContainer';
import CourseInfoContainer from './courses/info/MainContainer';
import CourseDataContainer from './courses/data/MainContainer';
import CourseWorkContainer from './courses/work/MainContainer';
import CourseMemberContainer from './courses/member/MainContainer';
import CourseTeamContainer from './courses/team/MainContainer';
import CourseSettingContainer from './courses/setting/MainContainer';

import WorkFrameDataCollect from './builder/work/dataCollect/MainContainer';

import Error404 from './common/message/Error404';

class App extends Component {

  componentWillMount() {
    console.log(this);
  }

  render() {

    return (
      <BrowserRouter>
        <div id="wrap">

          <Switch>

            <Route path="/join">
              <div>
                <Header wide />
                <UserJoinContainer />
              </div>
            </Route>
            <Route path="/login">
              <div>
                <Header wide />
                <UserLoginContainer />
              </div>
            </Route>
            {/* <Route path="/profile">
              <div>
                <Header wide />
                <UserProfileContainer />
              </div>
            </Route> */}

            <Route path="/cm-admin/school">
              <div>
                <Header />
                <SchoolListMainContainer />
              </div>
            </Route>
            <Route exact path="/cm-admin/schoolSync">
              <div>
                <Header  />
                <SchoolsSyncContainer />
              </div>
            </Route>
            <Route path="/cm-admin/schoolSync/api">
              <div>
                <Header  />
                <SchoolsSyncApiContainer />
              </div>
            </Route>
            <Route path="/cm-admin/schoolSync/file">
              <div>
                <Header  />
                <SchoolsSyncFileContainer />
              </div>
            </Route>

            <Route path="/cm-admin/user">
              <div>
                <Header wide />
                <UsersManageContainer />
              </div>
            </Route>

            <Route path="/cm-admin/course">
              <div>
                <Header wide />
                <CourseContainer />
              </div>
            </Route>

            <Route path="/cm-admin/support">
              <div>
                <Header wide />
                <SupportContainer />
              </div>
            </Route>
            <Route path="/cm-admin/supportPds">
              <div>
                <Header wide />
                <SupportPdsContainer />
              </div>
            </Route>
            <Route path="/cm-admin/supportFaq">
              <div>
                <Header wide />
                <SupportFaqContainer />
              </div>
            </Route>
            <Route path="/cm-admin/supportQna">
              <div>
                <Header wide />
                <SupportQnaContainer />
              </div>
            </Route>

            <Route path="/cm-admin/module">
              <div>
                <Header wide />
                <ModuleContainer />
              </div>
            </Route>
            <Route path="/cm-admin/moduleBuilder">
              <div>
                <Header wide />
                <ModuleBuilderContainer />
              </div>
            </Route>

            <Route path="/courseCreate">
              <div>
                <Header />
                <CourseCreateContainer />
                <Footer />
              </div>
            </Route>
            <Route exact path="/course">
              <div>
                <Header />
                <CourseListContainer />
                <Footer />
              </div>
            </Route>
            <Route exact path="/course/:COURSEID">
              <div>
                <Header />
                <CourseInfoContainer />
                <Footer />
              </div>
            </Route>
            <Route path="/course/:COURSEID/data">
              <div>
                <Header />
                <CourseDataContainer />
                <Footer />
              </div>
            </Route>

            <Route exact path="/course/:COURSEID/work">
              <div>
                <Header />
                <CourseWorkContainer />
                <Footer />
              </div>
            </Route>
            <Route path="/course/:COURSEID/member">
              <div>
                <Header />
                <CourseMemberContainer />
                <Footer />
              </div>
            </Route>
            <Route path="/course/:COURSEID/team">
              <div>
                <Header />
                <CourseTeamContainer />
                <Footer />
              </div>
            </Route>
            <Route path="/course/:COURSEID/setting">
              <div>
                <Header />
                <CourseSettingContainer />
                <Footer />
              </div>
            </Route>

            <Route path="/course/:COURSEID/work/:workId">
              <WorkFrameDataCollect />
            </Route>

            <Route component={Error404}/>

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
