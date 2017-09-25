import React, { Component } from 'react';
import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';
// import history from './utils/history';


import MainContainer  from './mainSample/MainContainer';
import SchoolListMainContainer from './schoolList/MainContainer';
import TeacherListMainContainer from './teacherList/MainContainer';

// import CoursesListContainer from './courses/course/list/MainContainer';
import CoursesNewContainer from './courses/course/new/MainContainer';

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

              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
