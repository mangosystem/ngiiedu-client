import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class ColorMapType extends React.Component {


  render() {
    return (
      <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
          컬러맵 이름
        </Paper>
        <Paper zDepth={0} style={{width:'50%'}}>
          <DropDownMenu value={this.props.value == null ? ColorMapType.defaultProps.value : this.props.value} 
            onChange={this.props.handleChange} 
            style={{width: '100%'}}
            underlineStyle={{display:'none'}}
            labelStyle={{paddingLeft:10}}
          >
            <MenuItem value={'RAMP'} primaryText="Ramp" />
            <MenuItem value={'INTERVALS'} primaryText="Intervals" />
          </DropDownMenu>
        </Paper>
      </Paper>

    )
  }

};

ColorMapType.propTypes = {
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string
};

ColorMapType.defaultProps = {
  name: 'colorMapType',
  placeholder: 'ColorMapType',
  value: 'RAMP'
};

export default ColorMapType;
