import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class RangeSize extends React.Component {

	render() {
		return (
			
			<Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center'}}>
				<Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
                    크기
                </Paper>
				<Paper zDepth={0} style={{width:'50%', display:'flex',alignItems: 'center',justifyContent:'center'}}>
				
				<DropDownMenu value={this.props.minSize == null ? RangeSize.defaultProps.minSize : this.props.minSize} 
					onChange={this.props.handleChangeMin} 
					underlineStyle={{display:'none'}}
					labelStyle={{paddingLeft:10}}
				>
					<MenuItem value={0} primaryText="0" disabled={this.props.maxSize<=0} />
					<MenuItem value={5} primaryText="5" disabled={this.props.maxSize<=5} />
					<MenuItem value={10} primaryText="10" disabled={this.props.maxSize<=10} />
					<MenuItem value={15} primaryText="15" disabled={this.props.maxSize<=15} />
                    <MenuItem value={20} primaryText="20" disabled={this.props.maxSize<=20} />
                    <MenuItem value={25} primaryText="25" disabled={this.props.maxSize<=25} />
                    <MenuItem value={30} primaryText="30" disabled={this.props.maxSize<=30} />
                    <MenuItem value={35} primaryText="35" disabled={this.props.maxSize<=35} />
                    <MenuItem value={40} primaryText="40" disabled={this.props.maxSize<=40} />
                    <MenuItem value={45} primaryText="45" disabled={this.props.maxSize<=45} />
                    <MenuItem value={50} primaryText="50" disabled={this.props.maxSize<=50} />
				</DropDownMenu>
                <div style={{width:'10%',marginLeft:'-20%'}}>
                    ~
                </div>
                <DropDownMenu value={this.props.maxSize == null ? RangeSize.defaultProps.maxSize : this.props.maxSize} 
					onChange={this.props.handleChangeMax} 
					underlineStyle={{display:'none'}}
					labelStyle={{paddingLeft:10}}
				>
                    <MenuItem value={0} primaryText="0" disabled={this.props.minSize>=0} />
                    <MenuItem value={5} primaryText="5" disabled={this.props.minSize>=5} />
                    <MenuItem value={10} primaryText="10" disabled={this.props.minSize>=10} />
                    <MenuItem value={15} primaryText="15" disabled={this.props.minSize>=15} />
                    <MenuItem value={20} primaryText="20" disabled={this.props.minSize>=20} />
                    <MenuItem value={25} primaryText="25" disabled={this.props.minSize>=25} />
                    <MenuItem value={30} primaryText="30" disabled={this.props.minSize>=30} />
                    <MenuItem value={35} primaryText="35" disabled={this.props.minSize>=35} />
                    <MenuItem value={40} primaryText="40" disabled={this.props.minSize>=40} />
                    <MenuItem value={45} primaryText="45" disabled={this.props.minSize>=45} />
                    <MenuItem value={50} primaryText="50" disabled={this.props.minSize>=50} />
				</DropDownMenu>
                </Paper>
            </Paper>
         
		)
	}

};

RangeSize.propTypes = {
	minSize: React.PropTypes.number,
	maxSize: React.PropTypes.number
};

RangeSize.defaultProps = {
	minSize: 5,
	maxSize: 20
};

export default RangeSize;
