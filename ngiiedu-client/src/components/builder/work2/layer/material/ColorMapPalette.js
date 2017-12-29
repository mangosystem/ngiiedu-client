import React from 'react';

import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import ColorPalette from './common/ColorPalette.js';

class ColorMapPalette extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
          색상표
        </Paper>
        <Paper zDepth={0} style={{width:'50%', display:'flex',alignItems: 'center'}}>
          <ColorPalette
            handleChange={this.props.handleChange}
            value={this.props.colorMapPalette == null ? ColorMapPalette.defaultProps.colorMapPalette : this.props.colorMapPalette}
          />
          <DropDownMenu value={this.props.colorMapOpacity == null ? ColorMapPalette.defaultProps.colorMapOpacity : this.props.colorMapOpacity} 
            onChange={this.props.handleChangeColorMapOpacity} 
            underlineStyle={{display:'none'}}
            style={{marginLeft:10}}
          >
            <MenuItem value={0} primaryText="0" />
            <MenuItem value={0.05} primaryText="5" />
            <MenuItem value={0.1} primaryText="10"  />
            <MenuItem value={0.15} primaryText="15"  />
            <MenuItem value={0.2} primaryText="20"  />
            <MenuItem value={0.25} primaryText="25"  />
            <MenuItem value={0.3} primaryText="30"  />
            <MenuItem value={0.35} primaryText="35"  />
            <MenuItem value={0.4} primaryText="40"  />
            <MenuItem value={0.45} primaryText="45"  />
            <MenuItem value={0.5} primaryText="50"  />
            <MenuItem value={0.55} primaryText="55"  />
            <MenuItem value={0.6} primaryText="60"  />
            <MenuItem value={0.65} primaryText="65"  />
            <MenuItem value={0.7} primaryText="70"  />
            <MenuItem value={0.75} primaryText="75"  />
            <MenuItem value={0.8} primaryText="80"  />
            <MenuItem value={0.85} primaryText="85"  />
            <MenuItem value={0.9} primaryText="90"  />
            <MenuItem value={0.95} primaryText="95"  />
            <MenuItem value={1} primaryText="100"  />
          </DropDownMenu>
        </Paper>
      </Paper>
    )
  }

};

ColorMapPalette.propTypes = {
  colorMapPalette: React.PropTypes.string,
  colorMapOpacity: React.PropTypes.number
};

ColorMapPalette.defaultProps = {
  colorMapPalette: 'Blues',
  colorMapOpacity: 1
};

export default ColorMapPalette;
