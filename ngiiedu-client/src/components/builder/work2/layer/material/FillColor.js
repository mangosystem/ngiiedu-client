import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 
import ColorPicker from '../../../../../../webapps/assets/cdn/material-color-picker/index.js';

class FillColor extends React.Component {

	render() {
		return (
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					채우기 색상
                </Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
                <ColorPicker
                    name="colorPicker"
                    defaultValue={this.props.defaultColor}
                    onChange={(color)=>this.props.handleChange(color)}
                />
                
                </Paper>
            </Paper>
		)
	}

};

FillColor.propTypes = {
	color: React.PropTypes.string
};

FillColor.defaultProps = {
	color: '#008fff'
};

export default FillColor;
