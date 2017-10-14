import React, { Component } from 'react';
import CourseList from  './CourseList';
import SearchCourse from  './SearchCourse';
import CourseInfoModal from  './CourseInfoModal';


class MainContainer extends React.Component {
    render() {
        return (
            <div>
                {/* <SearchCourse/><br/> */}
                <CourseList/>
                <CourseInfoModal/>
            </div>
        );
    }
}

export default MainContainer;