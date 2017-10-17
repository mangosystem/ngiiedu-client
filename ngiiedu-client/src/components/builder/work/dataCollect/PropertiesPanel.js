import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class PropertiesPanel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      valueZone: null,
      valueLevel: null
    }

    this.onChangeZone = this.onChangeZone.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
  }

  onChangeZone(e, i, v) {
    this.setState({
      valueZone: v
    });
  }

  onChangeLevel (e, i, v) {
    this.setState({
      valueLevel: v
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.propertiesMode == 'edit') {
  //     this.setState({
  //       valueZone: 2,
  //       valueLevel: 4
  //     })
  //   }
  // }

  render() {
    return (
      <div style={{padding: 20}}>
        <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 15, borderBottom: '1px solid #eee'}}>
          <h2>Properties</h2>
        </Paper>

        {(() => {
          if (this.props.propertiesMode == 'edit') {
            return (

              <Paper zDepth={0}>
                <TextField
                  fullWidth
                  floatingLabelText="소음측정값"
                  floatingLabelFixed={true}
                  hintText="수음측정값을 입력하세요."
                  defaultValue="3"
                />
                <SelectField
                  fullWidth
                  floatingLabelText="주요소음원"
                  floatingLabelFixed={true}
                  hintText="수음측정값을 입력하세요."
                  value={this.state.valueZone}
                  onChange={this.onChangeZone}
                >
                  <MenuItem value={1} primaryText="도로교통소음" />
                  <MenuItem value={2} primaryText="공사장소음" />
                  <MenuItem value={3} primaryText="생활소음" />
                  <MenuItem value={4} primaryText="철도소음" />
                  <MenuItem value={5} primaryText="기타소음" />
                </SelectField>
                <SelectField
                  fullWidth
                  floatingLabelText="체감소음도"
                  floatingLabelFixed={true}
                  hintText="체감소음도를 선택하세요."
                  value={this.state.valueLevel}
                  onChange={this.onChangeLevel}
                >
                  <MenuItem value={1} primaryText="아주 조용함 (1)" />
                  <MenuItem value={2} primaryText="조용함 (2)" />
                  <MenuItem value={3} primaryText="보통 (3)" />
                  <MenuItem value={4} primaryText="시끄러움 (4)" />
                  <MenuItem value={5} primaryText="아주 시끄러움 (5)" />
                </SelectField>
                <TextField
                  fullWidth
                  floatingLabelText="기타"
                  floatingLabelFixed={true}
                  hintText="기타 특이사항"
                />
              </Paper>

            );
          } else if (this.props.propertiesMode == 'new') {
            return (

              <Paper zDepth={0}>
                <TextField
                  fullWidth
                  floatingLabelText="소음측정값"
                  floatingLabelFixed={true}
                  hintText="수음측정값을 입력하세요."
                />
                <SelectField
                  fullWidth
                  floatingLabelText="주요소음원"
                  floatingLabelFixed={true}
                  hintText="수음측정값을 입력하세요."
                  value={this.state.valueZone}
                  onChange={this.onChangeZone}
                >
                  <MenuItem value={1} primaryText="도로교통소음" />
                  <MenuItem value={2} primaryText="공사장소음" />
                  <MenuItem value={3} primaryText="생활소음" />
                  <MenuItem value={4} primaryText="철도소음" />
                  <MenuItem value={5} primaryText="기타소음" />
                </SelectField>
                <SelectField
                  fullWidth
                  floatingLabelText="체감소음도"
                  floatingLabelFixed={true}
                  hintText="체감소음도를 선택하세요."
                  value={this.state.valueLevel}
                  onChange={this.onChangeLevel}
                >
                  <MenuItem value={1} primaryText="아주 조용함 (1)" />
                  <MenuItem value={2} primaryText="조용함 (2)" />
                  <MenuItem value={3} primaryText="보통 (3)" />
                  <MenuItem value={4} primaryText="시끄러움 (4)" />
                  <MenuItem value={5} primaryText="아주 시끄러움 (5)" />
                </SelectField>
                <TextField
                  fullWidth
                  floatingLabelText="기타"
                  floatingLabelFixed={true}
                  hintText="기타 특이사항"
                />
              </Paper>

            );
          } else {
            return (
              <div></div>
            );
          }
        })()}
      </div>
    );
  }
};

PropertiesPanel.propTypes = {
	propertiesMode: React.PropTypes.string
};

PropertiesPanel.defaultProps = {
	propertiesMode: ''
};

export default PropertiesPanel;
