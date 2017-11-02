import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 
import ColorPicker from 'material-ui-color-picker';

class StrokeColor extends React.Component {

	render() {
		return (
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center'}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					외곽선 색상
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

StrokeColor.propTypes = {
	color: React.PropTypes.string,
	opacity: React.PropTypes.number
};

StrokeColor.defaultProps = {
	color: '#3182bd',
	opacity: 1
};

export default StrokeColor;
