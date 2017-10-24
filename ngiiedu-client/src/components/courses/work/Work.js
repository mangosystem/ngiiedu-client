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

class Work extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      workList:[
        {id:1, name:'토론', place:'교실 내 수업', content:'소음 및 소음지도 개념을 논의하고 우리동네 소음원에 대해 토의', checked:false},
        {id:2, name:'현장실습', place:'야외수업', content:'모바일 기기를 활용한 우리 지역 소음원 현장 조사', checked:true},
        {id:3, name:'전산실습', place:'컴퓨터실 수업', content:'컴퓨터를 이용한 주제지도 및 스토리맵 작성하기', checked:false},
        {id:4, name:'토론', place:'교실 내 수업', content:'팀별 소음지도 및 소음저감대책 등 발표', checked:true}
      ],
    }
    this.enterWork = this.enterWork.bind(this);
    this.courseChecked = this.courseChecked.bind(this);
  }
  //수업 활성화 비활성화
  courseChecked(work){
    console.log(work.id)
    let checked = !work.checked
    console.log(checked)
    // ajaxJson(
    //   ['PUT',apiSvr+'/schools/'+work.id+'.json'],
    //   work.checked,
    //   function(res){
          
    //   }.bind(this),
    //   function(e){
    //     alert(e);
    //   }
    // );
  };

  enterWork(id){
    console.log(id);
  };

  componentWillMount() {
    // alert('생성자, 참여자 구분하여 UI 구성');
    // console.log(this.props.match.params.COURSEID);
  };

  render() {
    return (
      <div>
        <h3>수업 과정</h3>
        <p>교사가 수업만들기에서 추가한 수업과정이 아래에 나타납니다.</p>
        <br />
        <Divider />
        <br />
        {this.state.workList.map((work,i) => (
          <div key={work.id}>
          {this.props.isMember&&this.props.isAccessor&&work.checked ? 
              <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                
                <CardHeader
                  actAsExpander={true}
                  showExpandableButton={true}
                >
                <Paper zDepth={0} style={{textAlign: 'left'}}>
                  <Avatar size={60} style={{fontSize: 20}}>
                    <div style={{textAlign:'center', width:'70%', whiteSpace:'normal'}}>
                      {work.name}
                    </div>
                  </Avatar>
                  <div style={{width:'90%', float:'right'}}><br/>
                    {work.place}
                  </div>
                </Paper>
                </CardHeader>

                <CardActions style={{textAlign: 'right' }}>
                  <FlatButton label="수행하기" primary={true} onClick={(i)=>this.enterWork(work.id)}/>
                </CardActions>

                <CardText expandable={true}>
                  {work.content}
                </CardText>
              </Card>
            : this.props.isOwner&&this.props.isAccessor ?
              <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                
                <CardHeader
                  actAsExpander={true}
                  showExpandableButton={true}
                >
                <Paper zDepth={0} style={{textAlign: 'left'}}>
                  <Avatar size={60} style={{fontSize: 20}}>
                    <div style={{textAlign:'center', width:'70%', whiteSpace:'normal'}}>
                      {work.name}
                    </div>
                  </Avatar>
                  <div style={{width:'90%', float:'right'}}><br/>
                    {work.place}
                  </div>
                </Paper>
                </CardHeader>

                <CardActions style={{textAlign: 'right' }}>
                  <FlatButton label="수행하기" primary={true} onClick={(i)=>this.enterWork(work.id)}/>
                </CardActions>

                <CardText expandable={true}>
                    <Checkbox 
                      checkedIcon={<Visibility />} 
                      uncheckedIcon={<VisibilityOff />} 
                      checked = {work.checked}
                      label={work.content} 
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