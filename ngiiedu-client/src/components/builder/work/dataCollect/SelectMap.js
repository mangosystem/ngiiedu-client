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
            value: null
        };
    }

    handleChange(event, index, value) {
        this.setState({
            value
        });
    }

    addStoryTab() {

        const title = $('#title').val();

        this.props.selectMapHandle();
        this.props.addStoryTab(title);

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
                    title="스토리맵 만들기"
                    actions={actions}
                    open={this.props.open}
                    autoScrollBodyContent={false}
                    contentStyle={{width: '50%'}}
                >
                    <TextField
                        id="title"
                        name="title"
                        floatingLabelText="주제명"
                        fullWidth={true}
                        floatingLabelFixed={true}
                    />
                    <br />
                    <SelectField
                        floatingLabelText="지도 선택"
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    >
                        <MenuItem value={null} primaryText="" />
                        { this.props.subjectMap.map((row, index) => (
                            <MenuItem key={row.index} value={row.index} primaryText={row.title} />
                        ))}
                    </SelectField>
                </Dialog>
            </div>
        );
    }
}

export default SelectMap;