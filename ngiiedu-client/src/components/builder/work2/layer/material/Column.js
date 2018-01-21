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

	componentDidMount(){
		let column = [];
		if(this.props.type!='CATEGORIES'){
			this.props.column.map((value) => {
				if (value.name!='pino_id' && value.dataType == 'INTEGER' || value.dataType == 'DOUBLE' || value.dataType == 'LONG') {
					column.push({
						text: value.alias,
						value: value.name,
						dataType: value.dataType,
						description: value.description
					});
				}
			});
		}else if(this.props.type=='CATEGORIES'){
			this.props.column.map((value) => {
				if (value.name != 'pino_id'&&value.name != 'the_geom') {
					column.push({
						text: value.alias,
						value: value.name,
						dataType: value.dataType,
						description: value.description
					});
				}
			});
		}
		
		this.setState({ 
			column: column,
		});
	}
	componentWillReceiveProps (nextProps) {
		let column = [];
		if(nextProps.type!='CATEGORIES'){
			nextProps.column.map((value) => {
				if (value.name!='pino_id' && value.dataType == 'INTEGER' || value.dataType == 'DOUBLE' || value.dataType == 'LONG') {
					column.push({
						text: value.alias,
						value: value.name,
						dataType: value.dataType,
						description: value.description
					});
				}
			});
		}else if(nextProps.type=='CATEGORIES'){
			nextProps.column.map((value) => {
					column.push({
						text: value.alias,
						value: value.name,
						dataType: value.dataType,
						description: value.description
					});
			});
		}
		
		this.setState({ 
			column: column,
		});
	}

	render() {
		return (
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
					컬럼이름
				</Paper>
				<Paper zDepth={0} style={{width:'50%'}}>
				
					<DropDownMenu 
						value={this.props.value == null ? 
							(this.state.column.length==0 ? 
							null 
							: 
							Column.defaultProps.value) 
						: this.props.value} 
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
	value:null
};

export default Column;