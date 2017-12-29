import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const stItems = [
	<MenuItem key={0} value={null} primaryText="" />,
	<MenuItem key={1} value={'초등학교'} primaryText="초등학교" />,
	<MenuItem key={2} value={'중학교'} primaryText="중학교" />,
	<MenuItem key={3} value={'고등학교'} primaryText="고등학교" />
];

const eoItems = [
	<MenuItem key={0} value={null} primaryText="" />,
	<MenuItem key={1} value={'서울특별시교육청'} primaryText="서울특별시교육청" />,
	<MenuItem key={2} value={'경기도교육청'} primaryText="경기도교육청" />,
	<MenuItem key={3} value={'부산광역시교육청'} primaryText="부산광역시교육청" />
];


class Step3Info extends React.Component {

	constructor() {
		super();
		this.state = {
			courseName: null,
			courseDesc: null,
			schoolLevel: null,
			schoolOffice: null,
			schoolName: null,
			studentGrade: null,
			studentClass: null
		};

		this.onChangeCourseName = this.onChangeCourseName.bind(this);
		this.onChangeCourseDesc = this.onChangeCourseDesc.bind(this);
		this.onChangeSchoolLevel = this.onChangeSchoolLevel.bind(this);
		this.onChangeSchoolOffice = this.onChangeSchoolOffice.bind(this);
		this.onChangeSchoolName = this.onChangeSchoolName.bind(this);
		this.onChangeStudentGrade = this.onChangeStudentGrade.bind(this);
		this.onChangeStudentClass = this.onChangeStudentClass.bind(this);

		this.onChangedCourseMetadata = this.onChangedCourseMetadata.bind(this);
	}

	onChangeCourseName(e, v) {
		this.setState({
			courseName: v
		});
		this.props.onChangedCourseName(v);
	}

	onChangeCourseDesc(e, v) {
		this.setState({
			courseDesc: v
		});
		this.onChangedCourseMetadata(v);
	}

	onChangeSchoolLevel(e, i, v) {
		this.setState({
			schoolLevel: v
		});
		this.onChangedCourseMetadata();
	}

	onChangeSchoolOffice(e, i, v) {
		this.setState({
			schoolOffice: v
		});
		this.onChangedCourseMetadata();
	}

	onChangeSchoolName(e, i, v) {
		this.setState({
			schoolName: v
		});
		this.onChangedCourseMetadata();
	}

	onChangeStudentGrade(e, v) {
		this.setState({
			studentGrade: v
		});
		this.onChangedCourseMetadata();
	}

	onChangeStudentClass(e, v) {
		this.setState({
			studentClass: v
		});
		this.onChangedCourseMetadata();
	}

	onChangedCourseMetadata() {
		const {state} = this;
		let metadata = {
			courseDesc: state.courseDesc,
			schoolLevel: state.schoolLevel,
			schoolOffice: state.schoolOffice,
			schoolName: state.schoolName,
			studentGrade: state.studentGrade,
			studentClass: state.studentClass
		}

		this.props.onChangedCourseMetadata(metadata);
	}

	render() {
		return (
      <div>
				<div style={{width:'50%',marginLeft:'25%' }}>
				<h2 style={{textAlign:'left',margin:10}}> * 정보입력</h2>
					<TextField
						floatingLabelText="수업이름"
						hintText="수업이름을 입력하세요. (필수입력)"
						floatingLabelFixed={true}
						fullWidth={true}
						errorText=""
						onChange={this.onChangeCourseName}
					/>
					<br />
					<TextField
						floatingLabelText="수업내용"
						floatingLabelFixed={false}
						fullWidth={true}
						onChange={this.onChangeCourseDesc}
					/>
					<br />

					<SelectField
						floatingLabelText="학교급구분"
						floatingLabelFixed={false}
						value={this.state.schoolLevel}
						onChange={this.onChangeSchoolLevel}
					>
						{stItems}
					</SelectField>
					<br />
					<SelectField
						floatingLabelText="시도교육청명"
						floatingLabelFixed={false}
						value={this.state.schoolOffice}
						onChange={this.onChangeSchoolOffice}
					>
						{eoItems}
					</SelectField>
					<br />
					<AutoComplete
						floatingLabelText="학교명"
						floatingLabelFixed={false}
						searchText={this.state.searchText}
						onUpdateInput={this.onChangeSchoolName}
						dataSource={[]}
						openOnFocus={true}
					/>
					<br />
					<TextField
						floatingLabelText="학년"
						floatingLabelFixed={false}
						inputStyle={{textAlign: 'center'}}
						onChange={this.onChangeStudentGrade}
						style={{width: '100px'}}
					/>
					-
					<TextField
						floatingLabelText="반"
						floatingLabelFixed={false}
						inputStyle={{textAlign: 'center'}}
						onChange={this.onChangeStudentClass}
						style={{width: '100px'}}
					/>
				</div>	
			</div>
		)
	}
}

export default Step3Info;
