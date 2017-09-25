import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import SearchBar from 'material-ui-search-bar'

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const tilesData = [
  {
    img: './img/a.jpg',
    title: '우리지역 소음지도'
  }, {
		img: './img/a.jpg',
    title: '우리동네 안전지도'
  }, {
		img: './img/a.jpg',
    title: 'GPS 활용 위치학습'
  }, {
		img: './img/a.jpg',
    title: '우리지역 인구지도'
  }, {
		img: './img/a.jpg',
    title: '통합적 영토교육'
  }, {
		img: './img/a.jpg',
    title: '우리학교 운동장 생태지도'
  }, {
		img: './img/a.jpg',
    title: '지도 정확성'
  }, {
		img: './img/a.jpg',
    title: '독도의 중요성'
  }
];


class MainContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			finished: false,
			stepIndex: 0
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

				<Divider style={{marginTop: '20px'}} />

				<SearchBar
					style={{marginTop: '20px'}}
					onChange={() => console.log('onChange')}
	      	onRequestSearch={() => console.log('onRequestSearch')}
				/>

				<Divider style={{marginTop: '20px'}} />

				<GridList
					cols={3}
					cellHeight={150}
				>
					{tilesData.map((tile, i) => (
						<GridTile
							key={i}
							title={tile.title}
						>
							<img src={tile.img} />
							</GridTile>
					))}
				</GridList>
				{
					this.state.finished ? (
						<div style={{marginTop: '50px', textAlign: 'center'}}>
							<RaisedButton
								label={'수업페이지로 이동'}
								primary={true}
							/>
						</div>
					) : (
						<div style={{marginTop: '50px', textAlign: 'center'}}>
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
				}
			</div>
		)
	}
}

export default MainContainer;
