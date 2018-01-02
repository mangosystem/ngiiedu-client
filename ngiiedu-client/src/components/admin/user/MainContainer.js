import React from 'react';

import List from './List';
import UserPopup from './UserPopup';
import Search from './Search';
import LeftMenu from '../common/LeftMenu'
import Paper from 'material-ui/Paper';

class MainContainer extends React.Component {
    render() {
        return (            
            <main id="main">
                <div className="inner">
                    <div className="flexible">
                        <LeftMenu
                            activeMenu="user"
                        />
                        <section>
                            <Paper style={{padding:'20px'}}>
                                <h3 className="edge">회원관리</h3>
                                <Search />
                                <List />
                                <UserPopup />
                            </Paper>
                        </section>
                    </div>
                </div>
            </main>            
        );
    }
}

export default MainContainer;