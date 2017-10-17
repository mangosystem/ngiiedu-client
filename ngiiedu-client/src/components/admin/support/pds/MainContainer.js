import React, { Component } from 'react';

import LeftMenu from '../../common/LeftMenu';
import Paper from 'material-ui/Paper';

class MainContainer extends React.Component {
    render() {
        return (
            <main id="main">
                <div className="inner">
                    <div className="flexible">
                        <LeftMenu
                            activeMenu="supportPds"
                        />
                        <section>
                            <Paper>
                                사용자지원 자료실 관리
                            </Paper>
                        </section>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContainer;