import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class CellSize extends React.Component {

  render() {
    return (
      <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
          CellSize
        </Paper>
        <Paper zDepth={0} style={{width:'50%'}}>
          <TextField
            hintText="숫자를 입력해주세요"
            value={this.props.cellSize!=null?this.props.cellSize:null}
            onChange={this.props.handleChangeCellSize}
            type='number'
            style={{width:200}}
          />
        </Paper>
      </Paper>

    )
  }

};

export default CellSize;
