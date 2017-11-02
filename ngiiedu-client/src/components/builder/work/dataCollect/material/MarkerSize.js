import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class MarkerSize extends React.Component {

	render() {
		return (
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center'}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					심볼크기
                </Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
				<DropDownMenu value={this.props.value == null ? MarkerSize.defaultProps.value : this.props.value} 
					onChange={this.props.handleChange} 
					style={{width: '100%'}}
					underlineStyle={{display:'none'}}
					labelStyle={{paddingLeft:10}}
					>
					<MenuItem value={5} primaryText={5}/>
					<MenuItem value={10} primaryText={10}/>
					<MenuItem value={15} primaryText={15}/>
					<MenuItem value={20} primaryText={20}/>
                    <MenuItem value={25} primaryText={25}/>
                    <MenuItem value={30} primaryText={30}/>
                    <MenuItem value={35} primaryText={35}/>
                    <MenuItem value={40} primaryText={40}/>
                    <MenuItem value={45} primaryText={45}/>
                    <MenuItem value={50} primaryText={50}/>

				</DropDownMenu>
                </Paper>
            </Paper>

		)
	}

};

MarkerSize.propTypes = {
	value: React.PropTypes.number
};

MarkerSize.defaultProps = {
	value: 15
};


export default MarkerSize;
