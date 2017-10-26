import React from 'react';
import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import MenuPanel from '../common/MenuPanel.js';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import update from 'react-addons-update';

class Work extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      workList:[
      ],
    }
    this.enterWork = this.enterWork.bind(this);
    this.courseChecked = this.courseChecked.bind(this);
  }
  //수업 활성화 비활성화
  courseChecked(work){
    let courseId = this.props.match.params.COURSEID;
    ajaxJson(
      ['PUT',apiSvr+'/courses/'+courseId+'/work.json'],
      {'idx':work.idx, 'status':!work.status},
      function(res){
        for(let i=0; i<this.state.workList.length; i++){
          if(this.state.workList[i].idx == work.idx){
            this.setState({
              workList:update(
                this.state.workList,
                {
                  [i]:{
                    status:{$set:res.response.data.status}
                  }
                }
              )
            });
          };
        }
      }.bind(this),
      function(e){
        alert(e);
      }
    );
  };

  enterWork(id){
    console.log(id);
  };

  componentWillMount() {
    let courseId = this.props.match.params.COURSEID;
    ajaxJson(
      ['GET',apiSvr+'/courses/'+courseId+'/work.json'],
      null,
      function(res){
        console.log(res.response.data);
        this.setState({
          workList:res.response.data
        },function(){
          console.log(this.state.workList)
        });
      }.bind(this)
    );
  };

  render() {
    return (
      <div>
        {this.props.isAccessor?
          <div>
            <h3>수업 과정</h3>
            <p>교사가 수업만들기에서 추가한 수업과정이 아래에 나타납니다.</p>
            <br />
            <Divider />
            <br />
          </div>
        :''}
        {this.state.workList.map((work,i) => (
          <div key={work.idx}>
          {this.props.isMember&&this.props.isAccessor&&work.status ? 
          //학생 로그인
              <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                
                <CardHeader
                  actAsExpander={true}
                  showExpandableButton={true}
                >
                <Paper zDepth={0} style={{textAlign: 'left'}}>
                  <Avatar size={60} style={{fontSize: 20}}>
                    <div style={{textAlign:'center', width:'70%', whiteSpace:'normal'}}>
                      {work.moduleWorkCourseType}
                    </div>
                  </Avatar>
                  <div style={{width:'90%', float:'right'}}><br/>
                    {work.moduleWorkName}
                  </div>
                </Paper>
                </CardHeader>

                <CardActions style={{textAlign: 'right' }}>
                  <FlatButton label="수행하기" primary={true} onClick={(i)=>this.enterWork(work.idx)}/>
                </CardActions>

                <CardText expandable={true}>
                  {work.moduleWorkName}
                </CardText>
              </Card>

            : this.props.isOwner&&this.props.isAccessor ?
            //교사 로그인
              <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                
                <CardHeader
                  actAsExpander={true}
                  showExpandableButton={true}
                >
                <Paper zDepth={0} style={{textAlign: 'left'}}>
                  <Avatar size={60} style={{fontSize: 20}}>
                    <div style={{textAlign:'center', width:'70%', whiteSpace:'normal'}}>
                      {work.moduleWorkCourseType}
                    </div>
                  </Avatar>
                  <div style={{width:'90%', float:'right'}}><br/>
                    {work.moduleWorkName}
                  </div>
                </Paper>
                </CardHeader>

                <CardActions style={{textAlign: 'right' }}>
                  <FlatButton label="수행하기" primary={true} onClick={(i)=>this.enterWork(work.idx)}/>
                </CardActions>

                <CardText expandable={true}>
                    <Checkbox 
                      checkedIcon={<Visibility />} 
                      uncheckedIcon={<VisibilityOff />} 
                      checked = {work.status}
                      label={work.moduleWorkName} 
                      labelPosition="left"
                      onCheck={(i)=>this.courseChecked(work)}
                    />
                </CardText>
              </Card>
            :''}
          </div>
        ))}
      </div>
    );
  }
};

export default withRouter(Work);