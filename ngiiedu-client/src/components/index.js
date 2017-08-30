import React, { Component } from 'react';
import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';
// import history from './utils/history';


import MainContainer  from './mainSample/MainContainer';
import SchoolListMainContainer from './schoolList/MainContainer';
import TeacherListMainContainer from './teacherList/MainContainer';


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
                        </Switch>
                    </div>
                </BrowserRouter>    
        );
    }
}

export default App;