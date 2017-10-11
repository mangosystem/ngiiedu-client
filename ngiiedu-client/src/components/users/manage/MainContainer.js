import React from 'react';

import Header from '../../common/Header';
import List from './List';
import UserPopup from './UserPopup';
import Search from './Search';

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Search />
                <List />
                <UserPopup />
            </div>
        );
    }
}

export default MainContainer;