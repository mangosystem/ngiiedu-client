import React from 'react';
import { withRouter } from "react-router-dom";

import MenuPanel from '../common/MenuPanel.js';

import Paper from 'material-ui/Paper';

import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false
    }
  }

  componentWillMount() {
  // console.log(this.props.match.params.COURSEID);
  }

  render() {
    return (
      <main id="main">
				<div className="inner">
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'SETTING'}
            />
            <section>
              <Paper>
                <div style={{paddingTop: 10, paddingBottom: 10}}>
                  <div style={{ padding: '0 20px'}}>
                    <div style={{lineHeight: '30px', margin: '0 auto'}}>
                      수업 비활성화
                      <br/>
                      수업을 비활성화 상태로 변경합니다.
                        <div
                          style={{float: 'right', padding: '0px 25px'}}
                        >
                          <Toggle
                            thumbStyle={{backgroundColor: '#ffcccc'}}
                            trackStyle={{backgroundColor: '#ff9d9d'}}
                            thumbSwitchedStyle={{backgroundColor: 'red'}}
                            trackSwitchedStyle={{backgroundColor: '#ff9d9d'}}
                            labelStyle={{color: 'red'}}
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
              <Paper>
                <div style={{paddingTop: 10, paddingBottom: 10}}>
                  <div style={{padding: '0 20px'}}>
                    <div style={{lineHeight: '30px', margin: '0 auto'}}>
                      수업 삭제
                      <br/>
                      수업을 삭제합니다.
                        <div
                          style={{float: 'right', padding: '0px 0px'}}
                        >
                          <FlatButton  label="삭제" secondary={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
