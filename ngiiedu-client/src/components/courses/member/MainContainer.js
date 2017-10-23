import React from 'react';
import { withRouter } from "react-router-dom";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import MenuItem from 'material-ui/MenuItem';


import MenuPanel from '../common/MenuPanel.js';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor: true,
      isOwner: true,
      isMember: false,
      expanded:true

    }
    this.handleExpandChange = this.handleExpandChange.bind(this);
    
  }

  handleExpandChange(expand) {
    this.setState({expanded: expand});
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
              activeMenu={'MEMBER'}
            />
            <section>

            <Card
            expanded={this.state.expanded} onExpandChange={(expand) => this.handleExpandChange(expand)}
            >
              <CardHeader
                title="참여"
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
              <Divider/>
                <div style={{margin:'auto'}}>
                <div style={{display:'flex'}}>
                            <div style={{padding:10,width:'70%'}}>
                              <h3>조근후</h3>
                              <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>klmo214@naver.com</p>
                            </div>
                            <div style={{padding:10,width:'30%',textAlign:'right'}}>
                            <FlatButton label="차단" secondary={true} />
                              
                            </div>
                          </div>
                </div>
                <Divider/>
                <div style={{margin:'auto'}}>
                <div style={{display:'flex'}}>
                            <div style={{padding:10,width:'70%'}}>
                              <h3>조근후</h3>
                              <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>klmo214@naver.com</p>
                            </div>
                            <div style={{padding:10,width:'30%',textAlign:'right'}}>
                            <FlatButton label="차단" secondary={true} />
                             
                            </div>
                          </div>
                </div>
                <Divider/>
                <div style={{margin:'auto'}}>
                <div style={{display:'flex'}}>
                            <div style={{padding:10,width:'70%'}}>
                              <h3>조근후</h3>
                              <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>klmo214@naver.com</p>
                            </div>
                            <div style={{padding:10,width:'30%',textAlign:'right'}}>
                              <FlatButton label="차단" secondary={true} />
                              
                            </div>
                          </div>
                </div>  
                
              <Divider/>

             
              </CardText>
            </Card>

            <Card>
              <CardHeader
                title="승인대기"
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
              <Divider/>
              <div style={{margin:'auto'}}>
              <div style={{display:'flex'}}>
                          <div style={{padding:10,width:'70%'}}>
                            <h3>조근후</h3>
                            <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>klmo214@naver.com</p>
                          </div>
                          <div style={{padding:10,width:'30%',textAlign:'right'}}>
                            <FlatButton label="승인" primary={true}  style={{marginLeft:10}}/>
                            <FlatButton label="차단" secondary={true} style={{marginLeft:10}} />
                          </div>
                        </div>
              </div>  
              
            <Divider/>
              </CardText>
            </Card>
            
            <Card>
              <CardHeader
                title="차단"
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
              <Divider/>
              <div style={{margin:'auto'}}>
              <div style={{display:'flex'}}>
                          <div style={{padding:10,width:'90%'}}>
                            <h3>조근후</h3>
                            <p style={{color:'rgb(158, 158, 158)',marginLeft:10,marginTop:5}}>klmo214@naver.com</p>
                          </div>
                          <div style={{padding:10,width:'30%',textAlign:'right'}}>
                          <FlatButton label="차단해제" primary={true} />
                          </div>
                        </div>
              </div>  
              
            <Divider/>
              </CardText>
            </Card>

            
              
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
