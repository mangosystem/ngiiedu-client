import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class Marker extends React.Component {

	render() {
		return (
			
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center'}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					심볼
                </Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
				
				<DropDownMenu value={this.props.value == null ? Marker.defaultProps.value : this.props.value} 
					onChange={this.props.handleChange} 
					style={{width: '100%'}}
					underlineStyle={{display:'none'}}
					labelStyle={{paddingLeft:10}}
				>
					<MenuItem value={'circle'} primaryText="● : 원형" />
					<MenuItem value={'rectangle'} primaryText="■ : 사각형" />
					<MenuItem value={'triangle'} primaryText="▲ : 삼각형" />
					<MenuItem value={'star'} primaryText="★ : 별" />
				</DropDownMenu>
                </Paper>
            </Paper>
         
		)
	}

};

Marker.propTypes = {
	value: React.PropTypes.string
};

Marker.defaultProps = {
	value: 'circle'
};

export default Marker;
