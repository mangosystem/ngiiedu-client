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

class Work extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      workList:[
        {id:1, name:'토론', place:'교실 내 수업', content:'소음 및 소음지도 개념을 논의하고 우리동네 소음원에 대해 토의'},
        {id:2, name:'현장실습', place:'야외수업', content:'모바일 기기를 활용한 우리 지역 소음원 현장 조사'},
        {id:3, name:'전산실습', place:'컴퓨터실 수업', content:'컴퓨터를 이용한 주제지도 및 스토리맵 작성하기'},
        {id:4, name:'토론', place:'교실 내 수업', content:'팀별 소음지도 및 소음저감대책 등 발표'}
      ]
    }
    this.editWork = this.editWork.bind(this);
    this.enterWork = this.enterWork.bind(this);
  }

  editWork(id){
    console.log(id);
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
          <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}  key={work.id}>
            
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
              {this.props.isOwner ? <FlatButton label="수정하기" onClick={(i)=>this.editWork(work.id)}/>:''}
              <FlatButton label="수행하기" primary={true} onClick={(i)=>this.enterWork(work.id)}/>
            </CardActions>

            <CardText expandable={true}>
              {work.content}
            </CardText>
          </Card>
        ))}
      </div>
    );
  }
};

export default withRouter(Work);