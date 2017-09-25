import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import SearchBar from 'material-ui-search-bar'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Step1Module from './Step1Module';
import Step2Work from './Step2Work';
import Step3Info from './Step3Info';
import Step4Complete from './Step4Complete';

class MainContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			finished: false,
			stepIndex: 0,

			selectedModule: null,
			selectedWork: null,
			selectedInfo: null
		};

		this.handleNextStep = this.handleNextStep.bind(this);
		this.handlePrevStep = this.handlePrevStep.bind(this);
	}

	handleNextStep() {
		const {stepIndex} = this.state;
		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >= 2
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
						<StepLabel>수업모듈 선택</StepLabel>
					</Step>
					<Step>
						<StepLabel>수업과정 추가</StepLabel>
					</Step>
					<Step>
						<StepLabel>정보입력</StepLabel>
					</Step>
					<Step>
						<StepLabel>완료</StepLabel>
					</Step>
				</Stepper>

				<Divider style={{marginTop: '20px', marginBottom: '50px'}} />

				{(() => {
					if (this.state.stepIndex == 0) {
						return (
							<Step1Module />
						)
					}	else if (this.state.stepIndex == 1) {
							return (
								<Step2Work />
							)
					}	else if (this.state.stepIndex == 2) {
							return (
								<Step3Info />
							)
					}	else if (this.state.stepIndex == 3) {
							return (
								<Step4Complete />
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
									label={this.state.stepIndex == 2 ? '완료' : '다음'}
									primary={true}
									onClick={this.handleNextStep}
								/>
							</div>
						)
					} else {
						return (
							<div style={{textAlign: 'center'}}>
								<RaisedButton
									label={'수업페이지로 이동'}
									primary={true}
								/>
							</div>
						)
					}
				})()}
			</div>
		)
	}
}

export default MainContainer;
