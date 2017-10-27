import React from 'react';

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
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(summit) {
        if(summit){
            this.props.deleteTeam(this.props.selectedTeamId)
        }else{
            this.props.deletehandleClose();
        }
    };


    render() {

        const deleteButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={(summit)=>this.handleClose(true)}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={(summit)=>this.handleClose(false)}
            />
        ];

        return (
            <div>
                <Dialog
                    title="팀 삭제"
                    actions={deleteButton}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={(summit)=>this.handleClose(false)}

                >
                    데이터를 삭제하시겠습니까?
                </Dialog>
            </div>
        );
    }
}


export default DeletePopup;
