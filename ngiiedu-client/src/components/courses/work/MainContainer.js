import React from 'react';
import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';

import MenuPanel from '../common/MenuPanel.js';
import Work from './Work.js'

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
    // alert('생성자, 참여자 구분하여 UI 구성');
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
              activeMenu={'WORK'}
            />
            <section>
              <Paper zDepth={1} style={{padding: 20}}>
                <Work
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