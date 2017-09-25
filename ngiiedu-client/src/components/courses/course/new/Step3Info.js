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
			schoolType: '',
			eduOffice: ''
		};

		this.handleNewRequest = this.handleNewRequest.bind(this);
		this.handleSchoolType = this.handleSchoolType.bind(this);
		this.handleEduOffice = this.handleEduOffice.bind(this);
	}

	handleNewRequest() {
		this.setState({
			searchText: '',
		});
	}

	handleSchoolType(e, i, v) {
		this.setState({
			schoolType: v
		});
	}

	handleEduOffice(e, i, v) {
		this.setState({
			eduOffice: v
		});
	}

	render() {
		return (
      <div>
        Step3Info
				<br />
					<TextField
						floatingLabelText="수업이름"
						hintText="수업이름을 입력하세요."
						floatingLabelFixed={true}
						fullWidth={true}
					/>
					<br />
					<TextField
						floatingLabelText="수업내용"
						hintText="수업내용을 입력하세요. (선택사항)"
						floatingLabelFixed={true}
						fullWidth={true}
					/>
					<br />

					<SelectField
						floatingLabelText="학교급구분"
						hintText="학교구분을 선택하세요. (선택사항)"
						floatingLabelFixed={true}
						value={this.state.schoolType}
						onChange={this.handleSchoolType}
					>
						{stItems}
					</SelectField>
					<br />
					<SelectField
						floatingLabelText="시도교육청명"
						hintText="시도교육청을 선택하세요. (선택사항)"
						floatingLabelFixed={true}
						value={this.state.eduOffice}
						onChange={this.handleEduOffice}
					>
						{eoItems}
					</SelectField>
					<br />
					<AutoComplete
						floatingLabelText="학교명"
						hintText="학교를 검색하세요. (선택사항)"
						floatingLabelFixed={true}
						searchText={this.state.searchText}
						onNewRequest={this.handleNewRequest}
						dataSource={[]}
						openOnFocus={true}
					/>
					<br />
					<TextField
						floatingLabelText="학년 (선택사항)"
						floatingLabelFixed={true}
					/>
					 -
					<TextField
						floatingLabelText="반 (선택사항)"
						floatingLabelFixed={true}
					/>
			</div>
		)
	}
}

export default Step3Info;
