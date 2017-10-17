import React, { Component } from 'react';

import LeftMenu from '../admin/common/LeftMenu';
import Paper from 'material-ui/Paper';

class MainContainer extends React.Component {
    render() {
        return (
            <main id="main">
                <div className="inner">
                    <div className="flexible">
                        <LeftMenu
                            activeMenu="moduleBuilder"
                        />
                        <section>
                            <Paper>
                                수업모듈 생성도구
                            </Paper>
                        </section>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContainer;