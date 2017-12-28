import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class RadiusType extends React.Component {


  render() {
    return (
      <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
          RadiusType
        </Paper>
        <Paper zDepth={0} style={{width:'50%'}}>
          <DropDownMenu value={this.props.value == null ? RadiusType.defaultProps.value : this.props.value} 
            onChange={this.props.handleChange} 
            style={{width: '100%'}}
            underlineStyle={{display:'none'}}
            labelStyle={{paddingLeft:10}}
          >
            <MenuItem value={'Variable'} primaryText="Variable" />
            <MenuItem value={'Fixed'} primaryText="Fixed" />
          </DropDownMenu>
        </Paper>
      </Paper>

    )
  }

};

RadiusType.propTypes = {
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string
};

RadiusType.defaultProps = {
  name: 'radiusType',
  placeholder: 'RadiusType',
  value: 'Variable'
};

export default RadiusType;
