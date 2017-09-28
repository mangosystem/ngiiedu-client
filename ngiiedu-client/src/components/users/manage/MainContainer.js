import React from 'react';

import Header from '../../common/Header';

import List from './List';

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <List />
            </div>
        );
    }
}

export default MainContainer;