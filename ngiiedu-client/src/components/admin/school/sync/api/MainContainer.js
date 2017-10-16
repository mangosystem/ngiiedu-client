import React from 'react';

import { Link } from 'react-router-dom';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import SampleCheckContainer from '../common/SampleCheckContainer';
import CompleteContainer from '../common/CompleteContainer';


//left panal
import LeftMenu from '../../common/LeftMenu.js';


//redux
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import * as actions from '../../../../../actions/index';

class MainContainer extends React.Component {

  constructor() {
    super();
    this.state={
      finished:false,
      stepIndex:0,
      newRow:'업로드중...',
      overlapRow:'업로드중...',
    };

    this.handleNextStep = this.handleNextStep.bind(this);
		this.handlePrevStep = this.handlePrevStep.bind(this);
    this.handleFinalStep = this.handleFinalStep.bind(this);
  }

	handleNextStep() {
		const {stepIndex} = this.state;

		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >=0
		})

	}

	handlePrevStep() {
		const {stepIndex} = this.state;
		if (stepIndex > 0) {
			this.setState({
				stepIndex: stepIndex - 1
			})
		}
  }

  handleFinalStep(){
    var editColumn = this.props.editColumn
    // alert("마지막단계")
    console.dir(editColumn);

    for(var i=0;i<editColumn.length;i++){

        if(editColumn[i]==""){
            if(i<5){
                alert(this.props.dbColumn[i]+"는 필수 데이터입니다.");
            return;}
            // editColumn.push("");
        }
    }

    ajaxJson(
      ['POST',apiSvr+'/schools/sync/apiupload.json'],
      {
          editColumn:editColumn
      },
      function(res){
          console.dir(res);
          // alert("신규데이터 : " +res.response.data.newRow +" 중복데이터 : " +res.response.data.overlapRow);
          this.setState({
            newRow:res.response.data.newRow,
            overlapRow:res.response.data.overlapRow,
          })
      }.bind(this)
    )

    const {stepIndex} = this.state;

        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >=0
    })
  }

    render() {
      return (
        <main id="main">
          <div className="inner"> 
           <div className="flexible">
            <LeftMenu/>
           

                <section>
                 <Paper>

                  {/* <Divider style={{ marginBottom: '50px'}} /> */}

                  {(() => {
                    if (this.state.stepIndex == 0) {
                      return (
                        <div >
                          <SampleCheckContainer/>
                        </div>
                      )
                    }	else if (this.state.stepIndex == 1) {
                        return (
                          <div >
                          <CompleteContainer newRow={this.state.newRow} overlapRow={this.state.overlapRow}/>
                          </div>
                        )
                    } else {
                    }
                  })()}

                  <Divider style={{marginTop: '50px', marginBottom: '20px'}} />

                  {(() => {
                    if (!this.state.finished) {
                      return (
                        <div style={{textAlign: 'center',padding:20}}>
                          
                          <RaisedButton
                            label={this.state.stepIndex == 0 ? '완료' : '다음'}
                            primary={true}
                            onClick={this.state.stepIndex == 0 ? this.handleFinalStep:this.handleNextStep}
                          />
                        </div>
                      )
                    } else {
                      return (
                        <div style={{textAlign: 'center',padding:20}}>
                          <Link to="/cm-admin/schoolSync">
                            <RaisedButton
                              label={'확인'}
                              primary={true}
                            />
                          </Link>
                        </div>
                      )
                    }
                  })()}
                </Paper>

              </section>
            </div>
          </div>
        </main>
    );
  }
}

const mapStateToProps = (state) => ({
  editColumn: state.schoolsSync.editColumn
});

// const mapDispatchToProps = (dispatch) => ({
//   onChangeColor: () => {
//       const color = getRandomColor();
//       dispatch(actions.actionSample2(color));
//   }
// });

MainContainer = connect(
  mapStateToProps
)(MainContainer);

MainContainer.defaultProps = {
  dbColumn : [
      "학교ID",
      "학교명",
      "학교급구분",
      "운영상태",
      "교육지원청명",
      "교육지원청코드",
      "시도교육청명",
      "시도교육청코드",
      "소재지지번주소",
      "설립일자",
      "설립형태",
      "위도",
      "경도",
      "본교분교구분",
      "소재지도로명주소",
      "데이터기준일자",
      "생성일자",
      "변경일자"
  ]
};

export default MainContainer;
