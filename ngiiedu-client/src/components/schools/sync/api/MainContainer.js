import React from 'react';

import { Link } from 'react-router-dom';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SampleCheckContainer from '../common/SampleCheckContainer';
import CompleteContainer from '../common/CompleteContainer';

import './MainContainer.css';

class MainContainer extends React.Component {
  
  constructor() {
    super();
    this.state={
      finished:false,
      stepIndex:0

    };

    this.handleNextStep = this.handleNextStep.bind(this);
		this.handlePrevStep = this.handlePrevStep.bind(this);
    
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

    render() {
      return (
        <div style={{padding: '10px'}}>
          <Stepper
            activeStep={this.state.stepIndex}
            style={{width: '50%', margin: 'auto'}}
          >
            <Step>
              <StepLabel>항목 확인</StepLabel>
            </Step>
            <Step>
              <StepLabel>완료</StepLabel>
            </Step>
          </Stepper>
  
          <Divider style={{marginTop: '20px', marginBottom: '50px'}} />
  
          {(() => {
            if (this.state.stepIndex == 0) {
              return (
                <div className="StepContainer">
                  <SampleCheckContainer/>
                </div>
              )
            }	else if (this.state.stepIndex == 1) {
                return (
                  <div className="StepContainer">
                  <CompleteContainer/>
                  </div>
                )
            } else {
            }
          })()}
  
          <Divider style={{marginTop: '50px', marginBottom: '20px'}} />
  
          {(() => {
            if (!this.state.finished) {
              return (
                <div style={{textAlign: 'center'}}>
                  <FlatButton
                    label="뒤로"
                    disabled={this.state.stepIndex == 0}
                    onClick={this.handlePrevStep}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={this.state.stepIndex == 0 ? '완료' : '다음'}
                    primary={true}
                    onClick={this.handleNextStep}
                  />
                </div>
              )
            } else {
              return (
                <div style={{textAlign: 'center'}}>
                  <Link to="/schools/sync">
                    <RaisedButton
                      label={'확인'}
                      primary={true}
                    />
                  </Link>
                </div>
              )
            }
          })()}
          </div>
    );
  }
}

export default MainContainer;