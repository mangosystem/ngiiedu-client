import React from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';


class Reverse extends React.Component {

	render() {
		return (
			
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center'}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					반전
                </Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
				
				<Toggle
                    onToggle={this.props.handleChange}
                />
                </Paper>
            </Paper>
         
		)
	}

};

Reverse.propTypes = {
	value: React.PropTypes.bool
};

Reverse.defaultProps = {
	value: false
};

export default Reverse;
