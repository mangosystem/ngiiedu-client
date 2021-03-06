import React from 'react';
import { connect } from 'react-redux';

import { actionCourseTitle } from '../../../actions/index';


import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import SearchBar from 'material-ui-search-bar'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import Step1Module from './Step1Module';
import Step2Work from './Step2Work';
import Step3Info from './Step3Info';
import Step4Complete from './Step4Complete';

import { withRouter } from "react-router-dom";

import NewWarnModal from './NewWarnModal';


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

			courseId: '',
			datasetData:'',//데이터셋 생성
			warnModalOpen:false, // 데이터셋 생성 모달 오픈
			loading:false //완료 클릭시 loading

		};

		this.handleNextStep = this.handleNextStep.bind(this);
		this.handlePrevStep = this.handlePrevStep.bind(this);

		this.onSelectedModule = this.onSelectedModule.bind(this);
		this.onSelectedWorks = this.onSelectedWorks.bind(this);

		this.onChangedCourseName = this.onChangedCourseName.bind(this);
		this.onChangedCourseMetadata = this.onChangedCourseMetadata.bind(this);

		this.onCourseCreate = this.onCourseCreate.bind(this);
		this.onClickCoursePage = this.onClickCoursePage.bind(this);

		this.onChangedDataset = this.onChangedDataset.bind(this);

		//모달
		this.warnModalHandler = this.warnModalHandler.bind(this);
		this.agreeModalHandle = this.agreeModalHandle.bind(this);

	}

	componentDidMount(){

		let datasetModuleCourseIds=[];
		ajaxJson(
      ['GET', apiSvr+'/modules/moduleWork.json'],
      null,
      function(res) {
				let data = res.response.data;
				for(var i = 0 ; i <data.length; i++){
						let tempData = data[i]
					if(tempData.moduleWorkCourseType=="현장실습"){
						datasetModuleCourseIds.push(tempData.idx);
					}
				}

				this.setState({
					datasetIds:datasetModuleCourseIds
				})

      }.bind(this),
      function(xhr, status, err) {
        alert('Error');
      }.bind(this)
    );
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
		if (stepIndex == 1){//현장실습 데이터셋 경고창 오픈

			const {state} = this;
	
			let selectedWorks = state.selectedWorks;
			let datasetData = false;
			for(var i =0;i<selectedWorks.length;i++){
				if(state.datasetIds.indexOf(selectedWorks[i])!=-1){
					datasetData = true;
					this.setState({
						warnModalOpen:!this.state.warnModalOpen
					})
					if(this.state.warnModalOpen==false){
						return;
					}
				}
			}


			
		}

		if (stepIndex == 2) {
			this.setState({
				loading:true,
				courseName:''
			})
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
			selectedModule: itemId,
			datasetData:''
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
		// let a = 	{
		// 	moduleId: state.selectedModule,	//모듈 id	
		// 	moduleWorkIds: state.selectedWorks,	//선택한 코스 id 배열
		// 	courseName: state.courseName,	//코스 이름
		// 	courseMetadata: JSON.stringify(state.courseMetadata), //수업내용
		// 	emptyTemplate:JSON.stringify(state.datasetData)	//데이터셋 데이터
		// }

		let selectedWorks = state.selectedWorks;
		let datasetData = false;
		for(var i =0;i<selectedWorks.length;i++){
			if(state.datasetIds.indexOf(selectedWorks[i])!=-1){
				datasetData = true;
			}
		}
		var columns = state.datasetData.columns;
		
		
		var emptyTemplate;
		if(datasetData){
			for(var i =0;i<columns.length;i++){
				if(columns[i].value_type=='STRING'||columns[i].value_type=='INTEGER'){
					columns[i].value_type='ANY_VALUE';
				}
			}
			
			emptyTemplate = state.datasetData;
			emptyTemplate.columns = columns;
			emptyTemplate = JSON.stringify(emptyTemplate);
		} else{
			emptyTemplate = null;
		}

		ajaxJson(
			['POST', apiSvr+'/courses.json'],
			{
				moduleId: state.selectedModule,
				moduleWorkIds: state.selectedWorks,
				courseName: state.courseName,
				courseMetadata: JSON.stringify(state.courseMetadata),
				emptyTemplate:emptyTemplate
			},
			function(res) {

				const courseData = JSON.parse(JSON.stringify(res)).response.data;
				if(courseData==null){
					alert('수업 생성에 실패하였습니다. 현장실습 데이터 생성을 확인하세요.')
					return;
				}
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
		this.props.changeSubTitle('course');
		// browserHistory.push('/course/' + courseId);
		const courseId = this.state.courseId;
		this.props.history.push(contextPath+"/course/" + courseId);


	}

	onChangedDataset(value){
		this.setState({
			datasetData:value
		})
	}

	//모달
	warnModalHandler(){
		this.setState({
			warnModalOpen : !this.state.warnModalOpen
		})
	}

	agreeModalHandle(){
		this.handleNextStep();
	}

	render() {
		return (
			<main id="main" style={{paddingTop:0}}>
				<div className="inner" style={{paddingTop:0}}>
				<div id="contentsWrap" style={{margin:'10px auto 0'}}>
						<ul className="location">
								<li>홈</li>
								<li>메뉴</li>
								<li>수업생성</li>
						</ul>
				</div>
				<Paper style={{minHeight:700,paddingTop:20,paddingBottom:20}}>
					<div style={{display:'flex',paddingLeft:20, paddingRight:20,justifyContent:'space-between'}}>
						<h3 className="edge">수업생성</h3>
					</div>
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

					{/* <Divider style={{marginTop: '20px', marginBottom: '30px'}} /> */}

					<div style={{marginTop: '20px', marginBottom: '30px'}}>
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
									onChangedDataset={this.onChangedDataset}
									datasetData={this.state.datasetData}
								/>
							)
						}	else if (this.state.stepIndex == 2) {
							return (
								<Step3Info
									onChangedCourseName={this.onChangedCourseName}
									onChangedCourseMetadata={this.onChangedCourseMetadata}
									loading={this.state.loading}
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
											//this.state.stepIndex == 1 && this.state.selectedWorks.length < 1 ||
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
					</Paper>
				</div>
				<NewWarnModal
						open={this.state.warnModalOpen}
						cancle={this.warnModalHandler}
						agree={this.agreeModalHandle}
				/>
			</main>
		)
	}
}


const mapDispatchToProps = (dispatch) => ({  
	changeSubTitle: (subTitle) => {
	  dispatch(actionCourseTitle(subTitle));
	}
});


MainContainer = connect(undefined, mapDispatchToProps)(MainContainer);


export default withRouter(MainContainer);
