import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'; 

class KernelType extends React.Component {


  render() {
    return (
      <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
          커널 타입
        </Paper>
        <Paper zDepth={0} style={{width:'50%'}}>
          <DropDownMenu value={this.props.value == null ? KernelType.defaultProps.value : this.props.value} 
            onChange={this.props.handleChange} 
            style={{width: '100%'}}
            underlineStyle={{display:'none'}}
            labelStyle={{paddingLeft:10}}
          >
            <MenuItem value={'Binary'} primaryText="Binary" />
            <MenuItem value={'Cosine'} primaryText="Cosine" />
            <MenuItem value={'Distance'} primaryText="Distance" />
            <MenuItem value={'Epanechnikov'} primaryText="Epanechnikov" />
            <MenuItem value={'Gaussian'} primaryText="Gaussian" />
            <MenuItem value={'InverseDistance'} primaryText="InverseDistance" />
            <MenuItem value={'Quadratic'} primaryText="Quadratic" />
            <MenuItem value={'Quartic'} primaryText="Quartic" />
            <MenuItem value={'Triangular'} primaryText="Triangular" />
            <MenuItem value={'Triweight'} primaryText="Triweight" />
            <MenuItem value={'Tricube'} primaryText="Tricube" />
          </DropDownMenu>
        </Paper>
      </Paper>

    )
  }

};

KernelType.propTypes = {
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string
};

KernelType.defaultProps = {
  name: 'kernelType',
  placeholder: 'KernelType',
  value: 'Binary'
};

export default KernelType;
