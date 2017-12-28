import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class ClassesNum extends React.Component {

	render() {
		return (
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
                    클래스
                </Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
				
				<DropDownMenu value={this.props.value == null ? ClassesNum.defaultProps.value : this.props.value} 
					onChange={this.props.handleChange} 
					style={{width: '100%'}}
					underlineStyle={{display:'none'}}
					labelStyle={{paddingLeft:10}}
				>
					<MenuItem value={3} primaryText='3' />
                    <MenuItem value={4} primaryText='4' />
                    <MenuItem value={5} primaryText='5' />
                    <MenuItem value={6} primaryText='6' />
                    <MenuItem value={7} primaryText='7' />
                    <MenuItem value={8} primaryText='8' />
                    <MenuItem value={9} primaryText='9' />
                    <MenuItem value={10} primaryText='10' />
                    <MenuItem value={11} primaryText='11' />
                    <MenuItem value={12} primaryText='12' />
				</DropDownMenu>
                </Paper>
            </Paper>
         
		)
	}

};


ClassesNum.propTypes = {
	name: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	value: React.PropTypes.number
};

ClassesNum.defaultProps = {
	name: 'classesNumber',
	placeholder: 'Classes',
	value: 5
};

export default ClassesNum;