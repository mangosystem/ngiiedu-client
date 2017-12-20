import React, { Component } from 'react';
import CourseList from  './CourseList';
import SearchCourse from  './SearchCourse';
import CourseInfoModal from  './CourseInfoModal';


class MainContainer extends React.Component {
    render() {
        return (
            <main>
				<div className="inner">
                    {
                    // <SearchCourse/>
                    }
                    <CourseList/>
                    <CourseInfoModal/>
                </div>
            </main>
        );
    }
}

export default MainContainer;
