import React, { Component } from 'react';
import SelectSyncWay from './SelectSyncWay';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

//left panal
import LeftMenu from '../../common/LeftMenu.js';




class MainContainer extends Component {
    render() {
        return (
            <main id="main">
                <div className="inner"> 
                    <div className="flexible">
                        <LeftMenu
                            activeMenu="schoolSync"
                        />
                        <section>
                            <Paper>
                                <SelectSyncWay/>
                            </Paper>
                        </section>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContainer;