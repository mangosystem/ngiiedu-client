
import React, { Component } from 'react';

import Header from './common/layout/Header.js';
import Footer from './common/layout/Footer.js';
import Header2 from './common/layout/Header2.js';
import Footer2 from './common/layout/Footer2.js';
import JoinHeader from './common/layout/JoinHeader.js';


import {BrowserRouter, Router, Route, Switch, Redirect} from 'react-router-dom';

//redux
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import { actionLoginInfo }  from '../actions/index';

// 미인증 사용자
import UserJoinContainer from './users/join/MainContainer';

//로그인 창
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

// 수업
import CourseListContainer from './courses/list/MainContainer';
import CourseCreateContainer from './courses/create/MainContainer';
import CourseInfoContainer from './courses/info/MainContainer';
import CourseDataContainer from './courses/data/MainContainer';
import CourseWorkContainer from './courses/work/MainContainer';
import CourseMemberContainer from './courses/member/MainContainer';
import CourseTeamContainer from './courses/team/MainContainer';
import CourseSettingContainer from './courses/setting/MainContainer';
import CourseActivityContainer from './courses/activity/MainContainer';

import WorkFrameDataCollect from './builder/work/dataCollect/MainContainer';
import StoryMapPreview from './builder/work/preView/storyMap/MainContainer';
import MapPreview from './builder/work/preView/map/MainContainer';

import WorkFrameSplit from './builder/work2/split/MainContainer';
import WorkFrameSWipe from './builder/work2/swipe/MainContainer';

//work ui 변경중 
import WorkFrameContainer from './builder/work2/MainContainer';
import WorkFrameEditDataset from './builder/work2/dataset/edit/MainContainer';
import WorkFrameMaps from './builder/work2/maps/setting/MainContainer';
import WorkFrameEditLayer from './builder/work2/layer/setting/MainContainer';
import DatasetPreview from './builder/work2/dataset/view/MainContainer';
import LayerPreview from './builder/work2/layer/preView/MainContainer';

import WorkFramePreviewMaps from './builder/work2/maps/preview/MainContainer';


const contextPath = '/ngiiedu';

import Error404 from './common/message/Error404';

class App extends Component {
	constructor(){
		super();
		this.state={
			loginStatus:null
		}
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({
			loginStatus : nextProps.loginStatus
		})
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
								<SchoolListMainContainer loginStatus={this.state.loginStatus}/>
								<Footer2 />
            				</div>
            			</Route>
            			{/* <Route exact path={contextPath + "/cm-admin/schoolSync"}>
            				<div>
            					<Header />
								<SchoolsSyncContainer loginStatus={this.state.loginStatus}/>
								<Footer2 />
            				</div>
            			</Route> */}
            			<Route path={contextPath + "/cm-admin/schoolSync"}>
            				<div>
            					<Header />
								<SchoolsSyncApiContainer loginStatus={this.state.loginStatus}/>
								<Footer2 />
            				</div>
            			</Route>
            			{/* <Route path={contextPath + "/cm-admin/schoolSync/file"}>
            				<div>
            					<Header />
								<SchoolsSyncFileContainer loginStatus={this.state.loginStatus}/>
								<Footer2 />
            				</div>
            			</Route> */}

            			<Route path={contextPath + "/cm-admin/user"}>
            				<div>
            					<Header />
								<UsersManageContainer loginStatus={this.state.loginStatus}/>
								<Footer2 />
            				</div>
            			</Route>

									<Redirect exact from={contextPath} to={contextPath + "/course"} />
            			<Route path={contextPath + "/courseCreate"}>
            				<div>
            					<Header2 />
            					<CourseCreateContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>

                        <Route exact path={contextPath + "/join"}>
            				<div>
            					<JoinHeader />
            					<UserJoinContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>

            			<Route exact path={contextPath + "/course"}>
            				<div>
            					<Header2 />
            					<CourseListContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>
            			<Route exact path={contextPath + "/course/:COURSEID"}>
            				<div>
            					<Header2 />
            					<CourseInfoContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/data"}>
            				<div>
            					<Header2 />
            					<CourseDataContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>
            			<Route exact path={contextPath + "/course/:COURSEID/work"}>
            				<div>
            					<Header2 />
            					<CourseWorkContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/member"}>
            				<div>
            					<Header2 />
            					<CourseMemberContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/team"}>
            				<div>
            					<Header2 />
            					<CourseTeamContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>
            			<Route path={contextPath + "/course/:COURSEID/setting"}>
            				<div>
            					<Header2 />
            					<CourseSettingContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>

						<Route path={contextPath + "/course/:COURSEID/activity/:ACTIVITYID/:SUBWORKID"}>
            				<div>
            					<Header2 />
            					<CourseActivityContainer loginStatus={this.state.loginStatus}/>
            					<Footer />
            				</div>
            			</Route>
									
						<Route path={contextPath + "/course/:COURSEID/activity/:ACTIVITYID"}>
            				<div>
            					<Header2 />
            					<CourseActivityContainer loginStatus={this.state.loginStatus}/>
            					<Footer2 />
            				</div>
            			</Route>

						<Route path={contextPath + "/split"}>
            				<div>
            					<WorkFrameSplit loginStatus={this.state.loginStatus}/>
            				</div>
            			</Route>

						<Route path={contextPath + "/swipe"}>
            				<div>
            					<WorkFrameSWipe loginStatus={this.state.loginStatus}/>
            				</div>
            			</Route>

            			<Route path={contextPath + "/course/:COURSEID/work/:workId"}>
            				<WorkFrameDataCollect loginStatus={this.state.loginStatus}/>
            			</Route>

            			<Route path={contextPath +"/storymap/preview/:LAYERID"}>
										<div>
											<Header slim={true} />
											<StoryMapPreview loginStatus={this.state.loginStatus}/>
										</div>
            			</Route>

                  		<Route path={contextPath +"/map/preview/:LAYERID"}>
            			  <MapPreview loginStatus={this.state.loginStatus}/>
            			</Route>


						{/* dataset */}
						<Route path={contextPath +"/course/:COURSEID/work2/dataset/edit/:DATASETID"}>
							<div>
								<Header slim={true} />
								<WorkFrameEditDataset />
								<Footer />
							</div>
						</Route>
						{/* dataset preview */}
						<Route path={contextPath +"/dataset/preview/:DATASETID"}>
							<div>
								<Header slim={true} />
								<DatasetPreview />
								<Footer />
							</div>
						</Route>

						{/* layer */}
						<Route path={contextPath +"/course/:COURSEID/work2/:WORKID/layer/:LAYERID"}>
							<div>
								<Header slim={true} />
								<WorkFrameEditLayer />
								<Footer />
							</div>
						</Route>

						<Route path={contextPath +"/layer/preview/:LAYERID"}>
							<LayerPreview loginStatus={this.state.loginStatus}/>
						</Route>

						{/* main */}
						<Route exact path={contextPath +"/course/:COURSEID/work2/:WORKID"}>
							<div>
								<WorkFrameContainer />
								<Footer />
							</div>
						</Route>

						{/* maps */}
						<Route exact path={contextPath +"/course/:COURSEID/work2/:WORKID/:MAPSID"}>
							<div>
								<WorkFrameMaps />
							</div>
						</Route>

						{/* login */}
						<Route path={contextPath +"/login"}>
							<div>
								{/* <Header2/> */}
								<UserLoginContainer />
								{/* <Footer2/> */}
							</div>
						</Route>
						
						{/* maps preview */}
						<Route path={contextPath +"/course/:COURSEID/work2/:WORKID/:MAPSID/preview"}>
							<div>
								<WorkFramePreviewMaps />
							</div>
						</Route>

            			<Route component={Error404} />
            		</Switch>
            	</div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) => {
	return {
		loginStatus: state.loginInfo.loginStatus,
	};
}

App = connect(
	mapStateToProps	  
)(App);

export default App;