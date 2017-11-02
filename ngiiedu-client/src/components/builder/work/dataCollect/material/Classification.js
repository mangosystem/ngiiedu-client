import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class Classification extends React.Component {


	render() {
		return (
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center'}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					단계 구분법
                </Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
				
				<DropDownMenu value={this.props.value == null ? Classification.defaultProps.value : this.props.value} 
					onChange={this.props.handleChange} 
					style={{width: '100%'}}
					underlineStyle={{display:'none'}}
					labelStyle={{paddingLeft:10}}
				>
					<MenuItem value={'NA'} primaryText="Naturial Breaks" />
					<MenuItem value={'EQ'} primaryText="Equal Interval" />
					<MenuItem value={'QU'} primaryText="Quantile" />
					<MenuItem value={'ST'} primaryText="Standard Deviation" />
                    <MenuItem value={'UN'} primaryText="Unique Interval" />
				</DropDownMenu>
                </Paper>
            </Paper>
         
		)
	}

};

Classification.propTypes = {
	name: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	value: React.PropTypes.string
};

Classification.defaultProps = {
	name: 'classification',
	placeholder: 'Classification',
	value: 'NA'
};

export default Classification;
