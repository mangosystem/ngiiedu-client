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
