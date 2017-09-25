import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Step2Work extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}
	
	render() {
		return (
      <div>
				<Table
					selectable
					multiSelectable
					showCheckboxes
				>
					<TableBody
						displayRowCheckbox
						deselectOnClickaway={false}
					>
						<TableRow>
							<TableRowColumn>1차시 (교실내수업)</TableRowColumn>
							<TableRowColumn>소음 및 소음지도 개념을 논의하고 우리동네 소음원에 대해 토의</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>2~3차시 (야외수업)</TableRowColumn>
							<TableRowColumn>모바일 기기를 활용한 우리 지역 소음원 현장 조사</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>4~5차시 (컴퓨터실)</TableRowColumn>
							<TableRowColumn>컴퓨터를 이용한 주제지도 및 스토리맵 작성하기</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>6차시 (교실 내 수업)</TableRowColumn>
							<TableRowColumn>팀별 소음지도 및 소음저감대책 등 발표</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default Step2Work;
