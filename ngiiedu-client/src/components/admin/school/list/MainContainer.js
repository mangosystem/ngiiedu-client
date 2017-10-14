import React, { Component } from 'react';
import SchoolList from  './SchoolList';
import Search from './Search';
import InfoPopup from './popup/InfoPopup';
import EditPopup from './popup/EditPopup';
import AddPopup from './popup/AddPopup';
import DeletePopup from './popup/DeletePopup'

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                <Search/>
                <SchoolList/>
                <InfoPopup/>
                <EditPopup/>
                <AddPopup/>
                <DeletePopup/>
            </div>
        );
    }
}

export default MainContainer;