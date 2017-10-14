import React from 'react';

import MenuPanel from '../common/MenuPanel.js';

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
              activeMenu={'TEAM'}
            />
            <section>
              수업 - 팀
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default MainContainer;
