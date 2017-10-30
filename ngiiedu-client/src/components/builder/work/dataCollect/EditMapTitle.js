import React from 'react';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { cyan500 } from 'material-ui/styles/colors';


class EditMapTitle extends React.Component {

    constructor(props) {
        super(props);
    }

    edit() {
        const title = $('#mapTitle').val();

        this.props.editTitle(title);
        this.props.editMapHandle();
    }

    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.editMapHandle}
            />,
            <FlatButton
              label="변경"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.edit.bind(this)}
            />
        ];


        return (
            <div>
                <Dialog
                    title="이름 변경"
                    actions={actions}
                    open={this.props.open}
                    autoScrollBodyContent={false}
                    contentStyle={{width: '20%'}}
                >
                    <TextField
                        id="mapTitle"
                        name="title"
                        floatingLabelText="제목"
                        fullWidth={true}
                        floatingLabelFixed={true}
                        defaultValue={this.props.title}
                    />
                </Dialog>
            </div>
        );
    }
}

export default EditMapTitle;