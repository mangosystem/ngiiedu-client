import React from 'react';
import { withRouter } from "react-router-dom";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import MenuItem from 'material-ui/MenuItem';

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
      temp :['박영민','강소희','김근배','박영민','강소희','김근배','박영민','강소희','김근배']
      
     
      

     
       
    }


    this.handleExpandChange = this.handleExpandChange.bind(this);//카드 열닫 함수
    //여기부터 새로만든 함수
    this.activityView = this.activityView.bind(this);
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


  render() {
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
              
            {this.state.temp.map((row,index)=>(
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
                    <div style={{marginRight:20,fontSize:18,color:this.state.expanded==index ?'#3e81f6':null}}>{row}</div>
                  </div>
                </CardHeader>
                <CardText expandable={true}>


                {/* 하드코딩 리스트 */}
                  <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10}}>
                    <div style={{marginRight:20,fontSize:18}}>{row+'의 결과물 '+index}</div>
                  </div>
                  <Divider/>

                  <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10}}>
                    <div style={{marginRight:20,fontSize:18}}>{row+'의 결과물 '+index}</div>
                   
                  </div>
                  <Divider/>

                  <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10}}>
                    <div style={{marginRight:20,fontSize:18}}>{row+'의 결과물 '+index}</div>
                  </div>
                  <Divider/>
                  {/* 리스트끝 */}


                </CardText>
              </Card>
            ))}

            






           
            
              </Paper>
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
