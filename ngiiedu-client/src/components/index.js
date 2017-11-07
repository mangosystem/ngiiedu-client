
import React, { Component } from 'react';

import Header from './common/layout/Header.js';
import Footer from './common/layout/Footer.js';

import {BrowserRouter, Router, Route, Switch, Redirect} from 'react-router-dom';

// 미인증 사용자
import UserJoinContainer from './users/join/MainContainer';
// import UserLoginContainer from './users/login/MainContainer';

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
import StoryMapPreview from './builder/work/preView/storyMap/MainContainer';
import MapPreview from './builder/work/preView/map/MainContainer';


const contextPath = '/ngiiedu';

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
                        <Redirect exact from={contextPath + "/cm-admin"} to={contextPath + "/cm-admin/school"} />
            			<Route path={contextPath + "/cm-admin/school"}>
            				<div>
            					<Header />
            					<SchoolListMainContainer />
            				</div>
            			</Route>
            			<Route exact path={contextPath + "/cm-admin/schoolSync"}>
            				<div>
            					<Header />
            					<SchoolsSyncContainer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/cm-admin/schoolSync/api"}>
            				<div>
            					<Header />
            					<SchoolsSyncApiContainer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/cm-admin/schoolSync/file"}>
            				<div>
            					<Header />
            					<SchoolsSyncFileContainer />
            				</div>
            			</Route>

            			<Route path={contextPath + "/cm-admin/user"}>
            				<div>
            					<Header />
            					<UsersManageContainer />
            				</div>
            			</Route>

            			<Route path={contextPath + "/cm-admin/course"}>
            				<div>
            					<Header />
            					<CourseContainer />
            				</div>
            			</Route>

            			<Route path={contextPath + "/cm-admin/support"}>
            				<div>
            					<Header />
            					<SupportContainer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/cm-admin/supportPds"}>
            				<div>
            					<Header />
            					<SupportPdsContainer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/cm-admin/supportFaq"}>
            				<div>
            					<Header />
            					<SupportFaqContainer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/cm-admin/supportQna"}>
            				<div>
            					<Header />
            					<SupportQnaContainer />
            				</div>
            			</Route>

            			<Route path={contextPath + "/cm-admin/module"}>
            				<div>
            					<Header />
            					<ModuleContainer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/cm-admin/moduleBuilder"}>
            				<div>
            					<Header />
            					<ModuleBuilderContainer />
            				</div>
            			</Route>

                        <Redirect exact from={contextPath} to={contextPath + "/course"} />
            			<Route path={contextPath + "/courseCreate"}>
            				<div>
            					<Header />
            					<CourseCreateContainer />
            					<Footer />
            				</div>
            			</Route>

                        <Route exact path={contextPath + "/join"}>
            				<div>
            					<Header />
            					<UserJoinContainer />
            					<Footer />
            				</div>
            			</Route>

            			<Route exact path={contextPath + "/course"}>
            				<div>
            					<Header />
            					<CourseListContainer />
            					<Footer />
            				</div>
            			</Route>
            			<Route exact path={contextPath + "/course/:COURSEID"}>
            				<div>
            					<Header />
            					<CourseInfoContainer />
            					<Footer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/data"}>
            				<div>
            					<Header />
            					<CourseDataContainer />
            					<Footer />
            				</div>
            			</Route>
            			<Route exact path={contextPath + "/course/:COURSEID/work"}>
            				<div>
            					<Header />
            					<CourseWorkContainer />
            					<Footer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/member"}>
            				<div>
            					<Header />
            					<CourseMemberContainer />
            					<Footer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/team"}>
            				<div>
            					<Header />
            					<CourseTeamContainer />
            					<Footer />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/setting"}>
            				<div>
            					<Header />
            					<CourseSettingContainer />
            					<Footer />
            				</div>
            			</Route>

            			<Route path={contextPath + "/course/:COURSEID/work/:workId"}>
            				<WorkFrameDataCollect />
            			</Route>

            			<Route path="/ngiiedu/storymap/preview/:storyMapId">
            			  <StoryMapPreview />
            			</Route>

                  <Route path="/ngiiedu/map/preview/:mapId">
            			  <MapPreview />
            			</Route>

            			<Route component={Error404} />
            		</Switch>
            	</div>
            </BrowserRouter>
        );
    }
}

export default App;
