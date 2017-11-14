import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

//left panal
import LeftMenu from '../../common/LeftMenu.js';

const styles={
    SelectSyncWay:{
        textAlign : 'center',
        padding:100
    },
    button:{
        width:'40%'
    }

}




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
                                <div style={styles.SelectSyncWay}>
                                    <Link to={contextPath + "/cm-admin/schoolSync/file"}>
                                        <RaisedButton
                                            label="파일 동기화"
                                            primary={true}
                                            style={styles.button}
                                        />
                                    </Link>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Link to={contextPath + "/cm-admin/schoolSync/api"}>
                                        <RaisedButton
                                            label="API 동기화"
                                            primary={true}
                                            style={styles.button}
                                        />
                                    </Link>
                                </div>                            
                            </Paper>
                        </section>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContainer;