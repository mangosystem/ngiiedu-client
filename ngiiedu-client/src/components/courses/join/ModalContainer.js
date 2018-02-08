import React from 'react';

import Dialog from 'material-ui/Dialog';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class ModalContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			// 수업코드 앞자리, 뒷자리
			frontKey: '', 
			backKey: '',
			courseList:[
			]
		}

		this.onClickClose = this.onClickClose.bind(this);
		this.onChangeFrontKey = this.onChangeFrontKey.bind(this);
		this.onChangeBackKey = this.onChangeBackKey.bind(this);
		this.onClickKeyValid = this.onClickKeyValid.bind(this);
	}

	componentDidMount(){
		ajaxJson(
			['GET', apiSvr+'/courses//list/publicCourse.json'],
			null,
			function(res) {
				this.setState({
					courseList:res.response.data
				})
			}.bind(this),
			function(err) {
				console.log(err);
			}
		);
	}

	onClickClose() {

		this.setState({
			frontKey: '',
			backKey: ''
		});

		this.props.onChangeOpen();
	}

	onChangeFrontKey(evt, value) {
		if (value.length < 4) {
			this.setState({frontKey: value.toUpperCase()});
		}
	}

	onChangeBackKey(evt, value) {
		if (value.length < 4) {
			this.setState({backKey: value.toUpperCase()});
		}
	}

	onClickKeyValid() {

		let key = this.state.frontKey + this.state.backKey;

		ajaxJson(
			['POST', apiSvr+'/courses/' + key + '/member.json'],
			null,
			function(res) {
				if (res.response.code == 200) {
					if(res.response.data.joinStatus == 'CJS01') {
						alert('수업참여 신청을 완료하였습니다. 승인 후 사용할 수 있습니다.');
					}
					this.onClickClose();
					window.location.reload();
				} else {
					alert(res.response.message);
				}
			}.bind(this),
			function(err) {
				console.log(err);
			}
		);
	}

	render() {

		return (
			<div>
			<Dialog
				open={this.props.isOpen}
				title="수업 코드 입력"
				titleStyle={{fontSize:20,textAlign:'center'}}
				modal={true}
				bodyStyle={{textAlign: 'center'}}
				contentStyle={{width: 600}}
				onRequestClose={this.onClickClose}
				actions = {[
					<FlatButton
					  label="닫기"
					  primary={true}
					  onClick={this.onClickClose}
					/>
				]}
			>
				{/* <p>수업코드 여섯자리를 입력하세요.</p> */}
				<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>


				<TextField
					value={this.state.frontKey}
					onChange={this.onChangeFrontKey}
					hintText="앞자리"
					inputStyle={{paddingLeft:10,fontSize:60,textAlign:'center'}}
					style={{width:200,border:'2px solid #3e81f6' ,display:'flex',alignItems: 'center',height:100}}
					underlineShow={false}
					hintStyle={{marginLeft:10,width:'90%', textAlign:'center',fontSize:50,bottom:40}}
					/>
				<span style={{fontSize:50,margin:20}}> - </span>
				<TextField
					value={this.state.backKey}
					onChange={this.onChangeBackKey}
					hintText="뒷자리"
					inputStyle={{paddingLeft:10,fontSize:60,textAlign:'center'}}
					style={{width:200,border:'2px solid #3e81f6' ,display:'flex',alignItems: 'center',height:100}}
					underlineShow={false}
					hintStyle={{marginLeft:10,width:'90%', textAlign:'center',fontSize:50,bottom:40}}
				/>
				{/* <TextField
					hintText="뒷자리"
					hintStyle={{paddingLeft: 18}}
					inputStyle={{textAlign: 'center'}}
					style={{width: 100, fontSize: 20, textAlign:'center'}}
					value={this.state.backKey}
					onChange={this.onChangeBackKey}
				/> */}
				</div>
				<br/>
				<br/>
				<RaisedButton
					primary
					disabled={this.state.frontKey.length > 2 && this.state.backKey.length > 2 ? false : true }
					label="수업코드 확인"
					style={{width: '60%'}}
					onClick={this.onClickKeyValid}
				/>
				<br/>
				<br/>
				<Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={{verticalAlign:'middle', textAlign:'center'}}>수업명</TableHeaderColumn>
              <TableHeaderColumn style={{verticalAlign:'middle', textAlign:'center'}}>체험 참여코드</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
						displayRowCheckbox={false}
          >
						<TableRow>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}>우리지역 소음지도</TableRowColumn>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}><b>
								{this.state.courseList.PUBLIC_COURSE_CODE_NSM!=undefined?
									this.state.courseList.PUBLIC_COURSE_CODE_NSM.slice(0,3)+'-'+this.state.courseList.PUBLIC_COURSE_CODE_NSM.slice(3,6)
								:null}
							</b></TableRowColumn>
						</TableRow>

						<TableRow>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}>GPS 활용 위치학습</TableRowColumn>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}><b>
								{this.state.courseList.PUBLIC_COURSE_CODE_GPS!=undefined?
									this.state.courseList.PUBLIC_COURSE_CODE_GPS.slice(0,3)+'-'+this.state.courseList.PUBLIC_COURSE_CODE_GPS.slice(3,6)
								:null}
							</b></TableRowColumn>
						</TableRow>

						<TableRow>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}>우리지역 인구지도</TableRowColumn>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}><b>
								{this.state.courseList.PUBLIC_COURSE_CODE_POP!=undefined?
									this.state.courseList.PUBLIC_COURSE_CODE_POP.slice(0,3)+'-'+this.state.courseList.PUBLIC_COURSE_CODE_POP.slice(3,6)
								:null}
							</b></TableRowColumn>
						</TableRow>

						<TableRow>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}>통합적 영토교육</TableRowColumn>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}><b>
								{this.state.courseList.PUBLIC_COURSE_CODE_TER!=undefined?
									this.state.courseList.PUBLIC_COURSE_CODE_TER.slice(0,3)+'-'+this.state.courseList.PUBLIC_COURSE_CODE_TER.slice(3,6)
								:null}
							</b></TableRowColumn>
						</TableRow>

						<TableRow>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}>우리학교 운동장 생태지도</TableRowColumn>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}><b>
								{this.state.courseList.PUBLIC_COURSE_CODE_ECO!=undefined?
									this.state.courseList.PUBLIC_COURSE_CODE_ECO.slice(0,3)+'-'+this.state.courseList.PUBLIC_COURSE_CODE_ECO.slice(3,6)
								:null}
							</b></TableRowColumn>
						</TableRow>

						<TableRow>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}>지도 정확성</TableRowColumn>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}><b>
								{this.state.courseList.PUBLIC_COURSE_CODE_ARC!=undefined?
									this.state.courseList.PUBLIC_COURSE_CODE_ARC.slice(0,3)+'-'+this.state.courseList.PUBLIC_COURSE_CODE_ARC.slice(3,6)
								:null}
							</b></TableRowColumn>
						</TableRow>

						<TableRow>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}>독도의 중요성</TableRowColumn>
							<TableRowColumn style={{verticalAlign:'middle', textAlign:'center'}}><b>
								{this.state.courseList.PUBLIC_COURSE_CODE_DOK!=undefined?
									this.state.courseList.PUBLIC_COURSE_CODE_DOK.slice(0,3)+'-'+this.state.courseList.PUBLIC_COURSE_CODE_DOK.slice(3,6)
								:null}
							</b></TableRowColumn>
						</TableRow>
						
          </TableBody>
        </Table>
			</Dialog>
			</div>
		)
	}
}

ModalContainer.propTypes = {
	isOpen: React.PropTypes.bool
};

ModalContainer.defaultProps = {
	isOpen: false
};

export default ModalContainer;
