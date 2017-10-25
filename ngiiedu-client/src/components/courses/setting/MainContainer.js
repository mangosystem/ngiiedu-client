import React from 'react';
import { withRouter } from "react-router-dom";

import Setting from './Setting.js'
import MenuPanel from '../common/MenuPanel.js';

import Paper from 'material-ui/Paper';

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
              <Paper style={{height:500}}>
                <Setting
                  isAccessor={this.state.isAccessor}
                  isOwner={this.state.isOwner}
                  isMember={this.state.isMember}
                />
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);