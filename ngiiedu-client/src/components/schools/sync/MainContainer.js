import React, { Component } from 'react';
import LeftMenu from  '../common/LeftMenu';
import SelectSyncWay from './SelectSyncWay';


class MainContainer extends Component {
    render() {
        return (
            <div>
                <SelectSyncWay/>
            </div>
        );
    }
}

export default MainContainer;