import React from 'react';

import List from './List';
import UserPopup from './UserPopup';
import Search from './Search';

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                <Search />
                <List />
                <UserPopup />
            </div>
        );
    }
}

export default MainContainer;