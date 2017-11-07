import React from 'react';

import Dialog from 'material-ui/Dialog';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';

class ModalContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			// 수업코드 앞자리, 뒷자리
			frontKey: '', 
			backKey: ''
		}

		this.onClickClose = this.onClickClose.bind(this);
		this.onChangeFrontKey = this.onChangeFrontKey.bind(this);
		this.onChangeBackKey = this.onChangeBackKey.bind(this);
		this.onClickKeyValid = this.onClickKeyValid.bind(this);
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

	onClickKeyValid(evt) {

		let key = this.state.frontKey + this.state.backKey;

		ajaxJson(
	      	['POST', apiSvr+'/courses/' + key + '/member.json'],
	      	function(res) {
				if (res.response.code == 200) {
					if(res.response.data.status == 'CJS01') {
						alert('수업참여 신청을 완료하였습니다. 승인 후 사용할 수 있습니다.');
					}
					this.onClickClose();
				} else {
					alert(res.response.message);
				}
	      	}.bind(this), null
		);
	}

	render() {
		return (
			<div>
			<Dialog
				open={this.props.isOpen}
				title="수업참여하기"
				modal={true}
				bodyStyle={{textAlign: 'center'}}
				contentStyle={{width: 400}}
				onRequestClose={this.onClickClose}
				actions = {[
					<FlatButton
					  label="닫기"
					  primary={true}
					  onClick={this.onClickClose}
					/>
				]}
			>
				<p>수업코드 여섯자리를 입력하세요.</p>
				<TextField
					hintText="앞자리"
					hintStyle={{paddingLeft: 18}}
					inputStyle={{textAlign: 'center'}}
					style={{width: 100, fontSize: 20, textAlign:'center'}}
					value={this.state.frontKey}
					onChange={this.onChangeFrontKey}
				/>
				<span> - </span>
				<TextField
					hintText="뒷자리"
					hintStyle={{paddingLeft: 18}}
					inputStyle={{textAlign: 'center'}}
					style={{width: 100, fontSize: 20, textAlign:'center'}}
					value={this.state.backKey}
					onChange={this.onChangeBackKey}
				/>
				<br/>
				<br/>
				<RaisedButton
					primary
					disabled={this.state.frontKey.length > 2 && this.state.backKey.length > 2 ? false : true }
					label="수업코드 확인"
					style={{width: '60%'}}
					onClick={this.onClickKeyValid}
				/>
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
