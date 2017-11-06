import React from 'react';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { cyan500 } from 'material-ui/styles/colors';


class NewMapAlert extends React.Component {

    constructor(props) {
        super(props);
    }

    addMapTitle() {
        const title = $('#mapTitle').val();

        if (this.props.mode == 'add') {
            this.props.addMap(title);
        } else {
            this.props.editTitle(title);
        }

        this.props.newMapHandle();
    }

    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.newMapHandle}
            />,
            <FlatButton
              label="확인"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.addMapTitle.bind(this)}
            />
        ];


        return (
            <div>
                <Dialog
                    title={this.props.mode == 'add' ? "주제지도 만들기" : "이름 변경"}
                    actions={actions}
                    open={this.props.open}
                    autoScrollBodyContent={false}
                    contentStyle={{width: '50%'}}
                >
                    <TextField
                        id="mapTitle"
                        name="title"
                        defaultValue={this.props.title}
                        floatingLabelText="제목"
                        fullWidth={true}
                        floatingLabelFixed={true}
                        autoFocus
                    />
                </Dialog>
            </div>
        );
    }
}

export default NewMapAlert;