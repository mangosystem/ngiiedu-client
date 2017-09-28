import React, { Component } from 'react';
import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';
// import history from './utils/history';


import MainContainer  from './mainSample/MainContainer';
import SchoolListMainContainer from './schoolList/MainContainer';
import TeacherListMainContainer from './teacherList/MainContainer';

// import CoursesListContainer from './courses/course/list/MainContainer';
import CoursesNewContainer from './courses/course/new/MainContainer';

//학교 동기화
import SchoolsSyncContainer from './schools/sync/MainContainer';
import SchoolsSyncFileContainer from './schools/sync/file/MainContainer';
import SchoolsSyncApiContainer from './schools/sync/api/MainContainer';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
              <Route exact path="/" component={MainContainer}/>
              <Switch>
                  <Route path="/school/:name" component={SchoolListMainContainer}/>
                  <Route path="/school" component={SchoolListMainContainer}/>
                  <Route path="/teacher" component={TeacherListMainContainer}/>

                  <Route path="/courses/new" component={CoursesNewContainer}/>


                  //학교 동기화
                  <Route path="/schools/sync/file" component={SchoolsSyncFileContainer}/>
                  <Route path="/schools/sync/api" component={SchoolsSyncApiContainer}/>
                  <Route path="/schools/sync" component={SchoolsSyncContainer}/>

                  
                  
                  
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
