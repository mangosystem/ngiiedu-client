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

      data :[],
      temp :['박영민','강소희','김근배','박영민','강소희','김근배','박영민','강소희','김근배']
      
     
      

     
       
    }



    //여기부터 새로만든 함수
    this.activityView = this.activityView.bind(this);
  }



  
  activityView(type,id){
    if(type=='story'){//스토리맵 일때
      window.location.href='/ngiiedu/storymap/preview/'+id
      
    }
    if(type=='motif'){
      window.location.href='/ngiiedu/map/preview/'+id
    }


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
              activeMenu={'ACTIVITY'}
            />
            <section>

            {this.state.temp.map((row,index)=>(
              <Card
              key ={index}
            >
              <CardHeader
                title={row}
                titleStyle={titleStyle}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
              <Divider/>
              <Card
            >
              <CardHeader
                title="주제지도 만들기"
                titleStyle={titleStyle}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>

                <div style={{display:'flex',padding:10}}>
                  <div style={{paddingLeft:10,paddingTop:10,width:'70%'}}>
                    <h3 >주제도명1</h3>
                  </div>
                  <div style={{paddingLeft:10,width:'25%',textAlign:'right'}}>
                    <FlatButton label="미리보기" secondary={true} 
                    onClick={(type,id)=>this.activityView('motif',1)}/>
                  </div>
                </div>
              <Divider/>

                <div style={{display:'flex',padding:10}}>
                  <div style={{paddingLeft:10,paddingTop:10,width:'70%'}}>
                    <h3 >주제도명2</h3>
                  </div>
                  <div style={{paddingLeft:10,width:'25%',textAlign:'right'}}>
                    <FlatButton label="미리보기" secondary={true} 
                    onClick={(type,id)=>this.activityView('motif',2)}/>
                  </div>
                </div>
                <Divider/>

                <div style={{display:'flex',padding:10}}>
                <div style={{paddingLeft:10,paddingTop:10,width:'70%'}}>
                    <h3 >주제도명3</h3>
                  </div>
                  <div style={{paddingLeft:10,width:'25%',textAlign:'right'}}>
                    <FlatButton label="미리보기" secondary={true} 
                    onClick={(type,id)=>this.activityView('motif',3)}/>
                  </div>
                </div>
                
            </CardText>
            </Card>
            <Card
            >
              <CardHeader
                title="스토리맵"
                titleStyle={titleStyle}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>

                <div style={{display:'flex',padding:10}}>
                  <div style={{paddingLeft:10,paddingTop:10,width:'70%'}}>
                    <h3 >스토리맵 1</h3>
                  </div>
                  <div style={{paddingLeft:10,width:'25%',textAlign:'right'}}>
                    <FlatButton label="미리보기" secondary={true} 
                    onClick={(type,id)=>this.activityView('story',1)}/>
                  </div>
                </div>

                <div style={{display:'flex',padding:10}}>
                  <div style={{paddingLeft:10,paddingTop:10,width:'70%'}}>
                    <h3 >스토리맵 2</h3>
                  </div>
                  <div style={{paddingLeft:10,width:'25%',textAlign:'right'}}>
                    <FlatButton label="미리보기" secondary={true} 
                    onClick={(type,id)=>this.activityView('story',2)}/>
                  </div>
                </div>

                <div style={{display:'flex',padding:10}}>
                  <div style={{paddingLeft:10,paddingTop:10,width:'70%'}}>
                    <h3 >스토리맵 3</h3>
                  </div>
                  <div style={{paddingLeft:10,width:'25%',textAlign:'right'}}>
                    <FlatButton label="미리보기" secondary={true} 
                    onClick={(type,id)=>this.activityView('story',3)}/>
                  </div>
                </div>

              </CardText>
            </Card>
              <Divider/>
              </CardText>
            </Card>
            ))}

            






           
            
           
            </section>
          </div>
        </div>
      </main>
    );
  }
};

export default withRouter(MainContainer);
