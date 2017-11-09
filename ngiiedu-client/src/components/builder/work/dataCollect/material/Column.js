import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class Column extends React.Component {

	constructor() {
		super();
		this.state = {
            column: [],
		}
    }

	componentWillMount() {
		console.log('column componentWillMount');
        let column = [];
        console.dir(this.props.column)
		this.props.column.map((value) => {
			if (value.datatype == 'INTEGER' || value.datatype == 'DOUBLE') {
				column.push({
					text: value.name,
					value: value.name,
					datatype: value.datatype,
					description: value.description
				});
			}
        });

		this.setState({ 
            column: column,
        });
	}



	render() {
		return (
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center'}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					컬럼이름
                </Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
				
				<DropDownMenu value={this.props.value == null ? (this.state.column.length==0 ? null : this.state.column[0].value) : this.props.value} 
					onChange={this.props.handleChange} 
					style={{width: '100%'}}
					underlineStyle={{display:'none'}}
					labelStyle={{paddingLeft:10}}
				>
						{this.state.column.map((row,index)=>(
                        <MenuItem key={index} value={row.value} primaryText={row.text}/>
						))}
				</DropDownMenu>
                </Paper>
            </Paper>

         
		)
	}

};

Column.propTypes = {
	name: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	value: React.PropTypes.string,
	column: React.PropTypes.array
};

Column.defaultProps = {
	name: 'columnName',
	placeholder: 'Column',
	column: [
        {
            name: '컬럼이름A',
            value: '컬럼이름A',
            datatype: 'INTEGER',
            description: ""
        },
        {
            name: '컬럼이름B',
            value: '컬럼이름B',
            datatype: 'INTEGER',
            description: ""
        }
	],
	value:'noise_value'
};

export default Column;