import React from 'react';

import Header from '../../common/Header';
import List from './List';
import UserPopup from './UserPopup';

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <List />
                <UserPopup />
            </div>
        );
    }
}

export default MainContainer;