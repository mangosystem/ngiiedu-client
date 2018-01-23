import React from 'react';

import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import './workStyle.css';

class SubHeader extends React.Component {

  constructor(){
    super();

    this.state={
      type:'',
      subTitle:''
    }

    this.changeWorkType = this.changeWorkType.bind(this);
  }

  componentDidMount(){
    // 활동(수업 내 과목) 제목
    ajaxJson(
      ['GET', apiSvr + '/coursesWork/' + this.props.workId + '/getTitle.json'],
      null,
      function (data) {
        const title = JSON.parse(JSON.stringify(data)).response.data;
        this.setState({ subTitle: title });
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );
  }

  changeWorkType(type){
    this.props.handleWorkType(type);
  }

  render() {
    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor:'#43444c', height:80}}>

            <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
              {/* 뒤로가기 */}
              <IconMenu
                iconButtonElement={<IconButton><IconNavigationMenu color='white' /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <MenuItem primaryText="수업 목록" onClick={() => this.props.history.push(contextPath+'/course/')}/>
                <MenuItem primaryText="이전 목록" onClick={()=>this.props.history.goBack()}/>
              </IconMenu>
              {/* 활동 제목 */}
              <div style={{fontSize: 20, textAlign:'left',color:'white'}}>
                  {this.state.subTitle}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
              {this.props.data.length >1? //type의 갯수가 2개 이상
                this.props.data.map((row,index)=>(
                  <div className='iconButtonContainer' key={row.idx}>
                    <FlatButton 
                      label={row.moduleWorkSubName} 
                      labelStyle={this.props.workType != row.outputType?{color: '#f9f9f9'}:{color:'#fee900'}}
                      onClick={()=>this.changeWorkType(row.outputType)}
                    />
                  </div>
                  ))
                :this.props.data.length <= 1?
                  <div style={{display:'flex'}}></div>//type의 갯수가 1개
                :null
              }
            </div>
          </div>
        </header>
      </div>
    );
  }
};

export default withRouter(SubHeader);
