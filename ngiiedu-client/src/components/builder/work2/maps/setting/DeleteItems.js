import React from 'react';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { red500 } from 'material-ui/styles/colors';


class DeleteItems extends React.Component {

    constructor(props) {
        super(props);
    }

    delete() {

        this.props.deleteItem();
        this.props.deleteItemHandle();
    }

    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.deleteItemHandle}
            />,
            <FlatButton
              label="삭제"
              backgroundColor={red500}
              style={{color: 'white'}}
              onClick={this.delete.bind(this)}
            />
        ];


        return (
            <div>
                <Dialog
                    title="삭제하기"
                    actions={actions}
                    open={this.props.open}
                    autoScrollBodyContent={false}
                    contentStyle={{width: '50%'}}
                >
                    <b>{this.props.title}</b> 지도가 삭제됩니다.
                    <br />
                    이 지도가 다른 곳에 사용되고 있을 경우 삭제되지 않을 수 있습니다.
                    <br />
                    계속 진행하시겠습니까?
                </Dialog>
            </div>
        );
    }
}

export default DeleteItems;