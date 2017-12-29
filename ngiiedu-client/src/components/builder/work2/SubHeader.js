import React from 'react';

import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

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
        {/* sub header */}
        <div className='workMainSubHeader'>
          {this.props.data.length >1? //type의 갯수가 2개 이상
            <div style={{display:'flex'}}>
              {this.props.data.map((row,index)=>(
                <div className='iconButtonContainer' key={row.idx}>
                  <div>
                    <FlatButton label={row.moduleWorkSubName} onClick={()=>this.changeWorkType(row.outputType)}/>
                    {/* <Paper className={this.props.workType != row.outputType?'iconButtonUnSelected':'iconButtonSelected'}
                      onClick={()=>this.changeWorkType(row.outputType)}
                    >
                      <img 
                        src="/ngiiedu/assets/images/TAB.png" 
                        className="buttonImg"
                      />
                      <div className="buttonText" >
                        {row.moduleWorkSubName}
                      </div>
                    </Paper> */}

                  </div>
                </div>
              ))}
            </div>
            :this.props.data.length <= 1?
              <div style={{display:'flex'}}></div>//type의 갯수가 1개
            :null
          }
          <div>
            <h1 className='subHeaderTitle'>{this.state.subTitle}</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(SubHeader);
