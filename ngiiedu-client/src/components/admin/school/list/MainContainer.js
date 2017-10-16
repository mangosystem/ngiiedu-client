import React, { Component } from 'react';
import SchoolList from  './SchoolList';
import Search from './Search';
import InfoPopup from './popup/InfoPopup';
import EditPopup from './popup/EditPopup';
import AddPopup from './popup/AddPopup';
import DeletePopup from './popup/DeletePopup'

import LeftMenu from '../common/LeftMenu';
import Paper from 'material-ui/Paper';

class MainContainer extends React.Component {
    render() {
        return (
            <main id="main">
                <div className="inner">
                    <div className="flexible">
                        <LeftMenu/>
                        <section>
                            <Paper>
                                <Search/>
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