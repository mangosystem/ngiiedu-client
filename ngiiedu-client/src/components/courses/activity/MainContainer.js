import React from 'react';
import { withRouter } from "react-router-dom";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import SearchIcon from 'material-ui/svg-icons/action/search';


import CourseHeader from '../common/CourseHeader.js';//과정 해더
import MenuPanel from '../common/MenuPanel.js';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';



const titleStyle ={
  fontSize :'larger',
}

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAccessor : true,
      isOwner : true,
      isMember : false,
      expanded : -1,
      data :[],
      temp :['박영민','강소희','김근배','박영민','강소희','김근배','박영민','강소희','김근배'],
      workList:[] //과정활동 리스트
    }

    this.workList = this.workList.bind(this);// 과정활동 리스트에서 활동결과를 가져옴

    this.handleExpandChange = this.handleExpandChange.bind(this);//카드 열닫 함수
    //여기부터 새로만든 함수
    this.activityView = this.activityView.bind(this);
    
    this.movePreview = this.movePreview.bind(this);
  }

  workList(data){
    console.log('workList');
    console.dir(data)
    // var workList = {workId-courseworkSubId:};
    var a = {
      "workId-CourseworkSubId": {
        name : [
          {
            outputName:'소음원단계구분도',
            id:'a'
          },
          {
            outputName:'소음원단계구분도',
            id:'b'
          },
        ]
       }
    };
    
    var courseWorkSubInfos ;
    var workList={};
    // var workListItem=[];
    for(var i =0;i<data.length;i++){
      courseWorkSubInfos = data[i].courseWorkSubInfos;
      for(var j = 0 ; j <courseWorkSubInfos.length;j++){
        
        if(courseWorkSubInfos.length==1){
          workList[courseWorkSubInfos[j].courseWorkId+''] = courseWorkSubInfos[j].workOutputList
        }else{
          workList[courseWorkSubInfos[j].courseWorkId+'-'+courseWorkSubInfos[j].idx] = [];
          workList[courseWorkSubInfos[j].courseWorkId+'-'+courseWorkSubInfos[j].idx] = courseWorkSubInfos[j].workOutputList
        }
      }
    }

    this.setState({
      workList:workList
    })

    console.dir(workList)

  }


  componentDidMount(){
    ajaxJson(
			['GET', apiSvr+'/modules.json'],
			null,
			function(res) {
        if (res.response.code == 200) {

          if (res.response.data!=null) {
            this.setState({
              items: res.response.data
            });
          }
        } else {
          alert(res.response.message);
        }
			}.bind(this),
      null
    );
    

    
  }
  

  
  activityView(type,id){
    if(type=='story'){//스토리맵 일때
      window.location.href='/ngiiedu/storymap/preview/'+id
      
    }
    if(type=='motify'){
      window.location.href='/ngiiedu/map/preview/'+id
    }


  }

  handleExpandChange(expanded) {
    console.log(expanded +','+ this.state.expanded)
    if(this.state.expanded==expanded){
      this.setState({expanded:-1});
    }else{
      this.setState({expanded: expanded});
    }
  }

  movePreview(type,id){
    if(type=='dataset'){
      this.props.history.push('/ngiiedu/course/dataset/preview/'+id)
    }else if(type=='layer'){
      this.props.history.push('/ngiiedu/layer/preview/'+id)
    }else if(type=='maps')
      this.props.history.push('/ngiiedu/maps/preview/'+id)
    }

  render() {
    
    let item=[];
    let name =[];
    let datasetId =[];
    if(this.state.workList!=[]){
      if(this.props.match.params.SUBWORKID==undefined){
        item = this.state.workList[this.props.match.params.ACTIVITYID];
      }else{
        item = this.state.workList[this.props.match.params.ACTIVITYID+"-"+this.props.match.params.SUBWORKID];
      }
    }else{
      item = [];
    }


    if(item==undefined){
      item=[]
    }
    var outputList ={};
    var tempA=[];
    for(var i =0;i<item.length;i++){
      if(outputList[item[i].outputUserid]==undefined){
        tempA=[]
      }else{
        tempA=outputList[item[i].outputUserid]
      }
      tempA.push(item[i]);
      outputList[item[i].outputUserid]=tempA
    }

    let items = Object.keys(outputList).map((row,index)=>(
      <Card
        key={index}
        expanded={this.state.expanded==index} onExpandChange={() => this.handleExpandChange(index)}
        style={{margin:20,boxShadow:'none'}}
        
        >
        <CardHeader
          textStyle={{display:'none'}}
          actAsExpander={true}
          style={{ border:this.state.expanded==index ?'2px solid #3e81f6':'2px solid rgba(0,0,0,0.2)'}}
        >
          <div style={{display:'flex',alignItems:'center'}}>
            <div style={{marginRight:20,fontSize:18,color:this.state.expanded==index ?'#3e81f6':null}}>{outputList[row][0].outputUserName}</div>
          </div>
        </CardHeader>
        <CardText expandable={true}>


        {outputList[row].map((row2,index2)=>(
          <div key={index2}>
            <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 10px'}}>
              <div style={{marginRight:20,fontSize:18}}>{row2.outputName}</div>
              <SearchIcon style={{backgroundColor:'#3e81f6',marginRight:20,width:30,height:30,borderRadius:10}} color={'#fff'}
                onClick={()=>this.movePreview(row2.outputType,row2.pinogioOutputId)}
              />
            </div>
            <Divider/>
          </div>
        ))}
        </CardText>
      </Card>

    ))


    return (
      <main id="main">
				<div className="inner">
        <CourseHeader/>
          <div className="flexible">
            <MenuPanel
              isAccessor={this.state.isAccessor}
              isOwner={this.state.isOwner}
              isMember={this.state.isMember}
              activeMenu={'ACTIVITY'}
              subWorkList={this.workList}
            />
            <section>
            <Paper style={{minHeight:700,paddingTop:20,paddingBottom:20}}>
              <div style={{display:'flex',paddingLeft:20, paddingRight:20,justifyContent:'space-between'}}>
                <h3 className="edge">활동</h3>
                <ul className="location">
                  <li>홈</li>
                  <li>수업</li>
                  <li>수업목록</li>
                  <li style={{fontWeight:'bold'}}>활동</li>
                </ul>
              </div>  
                {items}
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
