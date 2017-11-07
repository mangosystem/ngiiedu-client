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

import { withRouter } from "react-router-dom";


class MainContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			finished: false,
			stepIndex: 0,

			processing: false,

			selectedModule: null,
			selectedWorks: [],

			courseName: '',
			courseMetadata: {
				courseDesc: '',
				schoolLevel: '',
				schoolOffice: '',
				schoolName: '',
				studentGrade: '',
				studentClass: ''
			},

			courseId: ''
		};

		this.handleNextStep = this.handleNextStep.bind(this);
		this.handlePrevStep = this.handlePrevStep.bind(this);

		this.onSelectedModule = this.onSelectedModule.bind(this);
		this.onSelectedWorks = this.onSelectedWorks.bind(this);

		this.onChangedCourseName = this.onChangedCourseName.bind(this);
		this.onChangedCourseMetadata = this.onChangedCourseMetadata.bind(this);

		this.onCourseCreate = this.onCourseCreate.bind(this);
		this.onClickCoursePage = this.onClickCoursePage.bind(this);
	}

	handlePrevStep() {
		const {stepIndex} = this.state;
		if (stepIndex > 0) {
			this.setState({
				stepIndex: stepIndex - 1
			})
		}

		if (stepIndex == 1) {
			this.setState({
				selectedModule: null,
				selectedWorks: []
			});
		}
	}

	handleNextStep() {
		const {stepIndex} = this.state;

		if (stepIndex == 2) {
			this.onCourseCreate();

		} else {
			this.setState({
				stepIndex: stepIndex + 1,
				finished: stepIndex >= 2
			});
		}

	}

	onSelectedModule(itemId) {
		this.setState({
			selectedModule: itemId
		});
	}

	onSelectedWorks(itemIds) {
		this.setState({
			selectedWorks: itemIds
		});
	}

	onChangedCourseName(name) {
		this.setState({
			courseName: name
		});
	}

	onChangedCourseMetadata(metaObject) {
		this.setState({
			courseMetadata: metaObject
		});
	}

	onCourseCreate() {
		const {state} = this;

		ajaxJson(
			['POST', apiSvr+'/courses.json'],
			{
				moduleId: state.selectedModule,
				moduleWorkIds: state.selectedWorks,
				courseName: state.courseName,
				courseMetadata: JSON.stringify(state.courseMetadata)
			},
			function(res) {

				const courseData = JSON.parse(JSON.stringify(res)).response.data;

				this.setState({
					stepIndex: 3,
					finished: true,
					courseId: courseData.idx
				});

			}.bind(this),
			function(xhr, status, err) {
				alert('Error');
			}.bind(this)
		);
	}

	onClickCoursePage() {
		// browserHistory.push('/course/' + courseId);
		const courseId = this.state.courseId;
		this.props.history.push("/ngiiedu/course/" + courseId);
	}

	render() {
		return (
			<main id="main">
				<div className="inner">
					<Stepper
						activeStep={this.state.stepIndex}
						style={{margin: '0 auto', width: 500}}
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

					<Divider style={{marginTop: '20px', marginBottom: '30px'}} />

					<div>
					{(() => {
						if (this.state.stepIndex == 0) {
							return (
								<Step1Module
									selectedItem={this.state.selectedModule}
									onSelectedModule={this.onSelectedModule}
								/>
							)
						}	else if (this.state.stepIndex == 1) {
							return (
								<Step2Work
									selectedModule={this.state.selectedModule}
									selectedItems={this.state.selectedWorks}
									onSelectedWorks={this.onSelectedWorks}
								/>
							)
						}	else if (this.state.stepIndex == 2) {
							return (
								<Step3Info
									onChangedCourseName={this.onChangedCourseName}
									onChangedCourseMetadata={this.onChangedCourseMetadata}
								/>
							)
						}	else if (this.state.stepIndex == 3) {
							return (
								<Step4Complete />
							)
						} else {
						}
					})()}
					</div>

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
										disabled={
											this.state.processing ||
											this.state.stepIndex == 0 && this.state.selectedModule == null ||
											this.state.stepIndex == 1 && this.state.selectedWorks.length < 1 ||
											this.state.stepIndex == 2 && this.state.courseName == ''
											? true : false
										}
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
										onClick={this.onClickCoursePage}
									/>
								</div>
							)
						}
					})()}
				</div>
			</main>
		)
	}
}

export default withRouter(MainContainer);
