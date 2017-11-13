import React from 'react';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { cyan500 } from 'material-ui/styles/colors';


class SelectMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleChange(event, index, value) {
        
        this.props.changeTempType(value);

    }

    addStoryTab() {

        const title = $('#title').val();
        const value = this.props.value;

        if (this.props.mode == 'add') {
            this.props.addStoryTab(title, value);
        } else {
            this.props.editStoryTab(title, value);
        }

        this.props.selectMapHandle();

    }

    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.selectMapHandle}
            />,
            <FlatButton
              label="확인"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.addStoryTab.bind(this)}
            />
        ];
        
        return (

            <div>
                <Dialog
                    title={this.props.mode == 'add' ? "스토리맵 만들기" : "스토리맵 수정하기"}
                    actions={actions}
                    open={this.props.open}
                    autoScrollBodyContent={false}
                    contentStyle={{width: '50%'}}
                >
                    <SelectField
                        fullWidth={true}
                        floatingLabelText="지도 선택"
                        value={this.props.value}
                        onChange={this.handleChange.bind(this)}
                    >
                        { this.props.subjectMap.map((row, index) => {
                            if (index == 0) return;
                            return (
                                <MenuItem key={row.idx} value={row.pinogioOutputId} primaryText={row.outputName} />
                        )})}
                    </SelectField>
                    <br />
                    <TextField
                        id="title"
                        name="title"
                        defaultValue={this.props.title}
                        floatingLabelText="주제명"
                        fullWidth={true}
                        floatingLabelFixed={true}
                        autoFocus
                    />
                </Dialog>
            </div>
        );
    }
}

export default SelectMap;