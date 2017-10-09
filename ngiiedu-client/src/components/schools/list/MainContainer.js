import React, { Component } from 'react';
import SchoolList from  './SchoolList';
import SearchSchool from  './SearchSchool';

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                {/* <SearchSchool/><br/> */}
                <SchoolList/>
            </div>
        );
    }
}

export default MainContainer;