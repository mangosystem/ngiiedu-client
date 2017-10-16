import React, { Component } from 'react';
import LeftMenu from  '../common/LeftMenu';
import SelectSyncWay from './SelectSyncWay';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
//left panal
import MenuPanel from '../common/MenuPanel.js';




class MainContainer extends Component {
    render() {
        return (
            <main id="main">
                <div className="inner"> 

                 {/* <navi>
                    <Paper style={{marginBottom: 20}}>
                    <div style={{paddingTop: 20, paddingBottom: 20, textAlign: 'center', position: 'relative'}}>
                        <h2 style={{margin: '10px auto'}}>
                        수업이름 표시
                        </h2>
                        <div style={{margin: '10px auto 20px'}}>
                        교사가 입력한 간단한 수업내용 표시
                        </div>
                        <div style={{position: 'absolute', right: 10, bottom: 5}}>
                        <IconButton><FontIcon><i className="fa fa-cog"></i></FontIcon></IconButton>
                        </div>
                    </div>
                    </Paper>
                </navi> */}


                <div className="flexible">

                    <MenuPanel
                        isAccessor={true}
                        isOwner={true}
                        isMember={false}
                     />
  

                     <section>
                    <Paper>
                        <SelectSyncWay/>
                    </Paper>

                     </section>
                     </div>

                </div>
            </main>
        );
    }
}

export default MainContainer;