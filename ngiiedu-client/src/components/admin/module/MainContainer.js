import React, { Component } from 'react';

import LeftMenu from '../common/LeftMenu';
import Paper from 'material-ui/Paper';

class MainContainer extends React.Component {
    render() {
        return (
            <main id="main">
                <div className="inner">
                    <div className="flexible">
                        <LeftMenu
                            activeMenu="module"
                        />
                        <section>
                            <Paper>
                                모듈관리
                            </Paper>
                        </section>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContainer;