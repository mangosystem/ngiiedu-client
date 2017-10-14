import React from 'react';
import { connect } from 'react-redux';

import { actionDelSchoolOpen, actionUpdateSchool } from '../../../../../actions/index';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class DeletePopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectTableData: {},
            tableData:[]
        };
        this.deleteData = this.deleteData.bind(this);
    }

    deleteData(){
        ajaxJson(
            ['DELETE',apiSvr+'/schools/'+this.props.schoolId+'.json'],
            null,
            function(res){
                ajaxJson(
                    ['GET',apiSvr+'/schools.json'],
                    null,
                    function(res){
                        this.setState({
                            tableData:res.response.data
                        }, function(){
                            this.props.updateSchool(this.state.tableData);
                            this.props.controlDelPopup(false);
                        })
                    }.bind(this)
                )
            }.bind(this),
            function(e){
                console.log(e);
            }
        );
    };

    handleClose() {
        this.props.controlDelPopup(false);
    };

    render() {

        //데이터 단일 삭제 확인 및 취소 버튼
        const deleteButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.deleteData}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={this.handleClose.bind(this)}
            />
        ];

        return (
            <div>
                {/* 데이터 단일 삭제 모달 */}
                <Dialog
                    title="학교정보 삭제"
                    actions={deleteButton}
                    modal={false}
                    open={this.props.deleteOpen}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    데이터를 삭제하시겠습니까?
                </Dialog>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        schoolId: state.schoolList.schoolId,
        deleteOpen: state.schoolList.deleteOpen
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        controlDelPopup: (value) => dispatch(actionDelSchoolOpen(value)),
        updateSchool: (tableData) => dispatch(actionUpdateSchool(tableData))
    };
};

DeletePopup = connect(mapStateToProps, mapDispatchToProps)(DeletePopup);

export default DeletePopup;
