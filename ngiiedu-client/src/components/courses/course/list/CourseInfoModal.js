import React from 'react';
import { connect } from 'react-redux';

import { actionOpen } from '../../../../actions/index';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class CourseInfoModal extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
            detail: {}
        };
    };

	handleClose() {
        this.props.controlPopup(false);
    }

	render() {
		const actions = [
            <FlatButton
              label="확인"
              primary={true}
              onClick={this.handleClose.bind(this)}
            />
		];
		
		return (
			<div>
				<Dialog
					title="수업 상세정보"
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.handleClose.bind(this)}
					autoScrollBodyContent={true}
					>
					<Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>모듈명</TableRowColumn>
                                <TableRowColumn>소음지도 만들기</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>수업명</TableRowColumn>
                                <TableRowColumn>소음지도 만들기</TableRowColumn>
                            </TableRow>
                            
                            <TableRow>
                                <TableRowColumn>선생님</TableRowColumn>
                                <TableRowColumn>김근배 선생님</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
				</Dialog>
			</div>
		)
	}
}

let mapStateToProps = (state) => {
    return {
        userid: state.user.userid,
        open: state.user.open
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        controlPopup: (value) => dispatch(actionOpen(value))
    }
}

CourseInfoModal = connect(mapStateToProps, mapDispatchToProps)(CourseInfoModal);


export default CourseInfoModal;
// export default withRouter(CourseInfoModal);
