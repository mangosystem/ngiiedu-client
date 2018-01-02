import React, { Component } from 'react';
import SchoolList from  './SchoolList';
import CategorySearch from './CategorySearch';
import InfoPopup from './popup/InfoPopup';
import EditPopup from './popup/EditPopup';
import AddPopup from './popup/AddPopup';
import DeletePopup from './popup/DeletePopup'

import LeftMenu from '../../common/LeftMenu';
import Paper from 'material-ui/Paper';

class MainContainer extends React.Component {
    render() {
        return (
            <main id="main">
                <div className="inner">
                    <div className="flexible">
                        <LeftMenu
                            activeMenu="schoolList"
                        />
                        <section>
                            <Paper style={{padding:'20px'}}>
                                <h3 className="edge">학교목록</h3>
                                <CategorySearch/>
                                <br />
                                <SchoolList/>
                                <InfoPopup/>
                                <EditPopup/>
                                <AddPopup/>
                                <DeletePopup/>
                            </Paper>
                        </section>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContainer;