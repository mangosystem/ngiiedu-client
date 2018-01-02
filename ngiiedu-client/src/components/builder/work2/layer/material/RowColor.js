import React from 'react';

import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ColorPicker from '../../../../../../webapps/assets/cdn/material-color-picker/index.js';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class RowColor extends React.Component {

  constructor() {
    super();
    this.state = {
    }
    this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount(){
  }

  handleChange(index, value){
    this.props.handleChangeRowColor(value,index)
  }

  render() {
    return (
      <div>
        <Paper zDepth={1} style={{justifyContent:'center', maxHeight:200, marginTop:10, overflow:'auto'}}>
          <table style={{width:'100%'}}>
            <tbody>
              {this.props.rowInfo.map((row,index)=>(
                  <tr key={index}>
                    <td style={{textAlign:'center', width:'40%', height:56, verticalAlign:'middle'}}>
                      {row.label}
                    </td>
                    <td style={{textAlign:'center', width:'60%', height:56}}>
                      {this.props.categoryType==0?
                        <ColorPicker
                          name="colorPicker"
                          defaultValue={row.color}
                          onChange={(color)=>this.props.handleChangeRowColor(color,row)}
                        />
                      :this.props.categoryType==1?
                        <DropDownMenu 
                          value='#a6cee3'
                          style={{width: '100%'}}
                          underlineStyle={{display:'none'}}
                          labelStyle={{paddingLeft:10}}
                          onChange={(e,k,v)=>this.handleChange(index, v)}
                        >
                          <MenuItem value='#a6cee3' primaryText={<MoreVertIcon color={'#a6cee3'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#b2df8a' primaryText={<MoreVertIcon color={'#b2df8a'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#33a02c' primaryText={<MoreVertIcon color={'#33a02c'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#fb9a99' primaryText={<MoreVertIcon color={'#fb9a99'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#e31a1c' primaryText={<MoreVertIcon color={'#e31a1c'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#fdbf6f' primaryText={<MoreVertIcon color={'#fdbf6f'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#ff7f00' primaryText={<MoreVertIcon color={'#ff7f00'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#cab2d6' primaryText={<MoreVertIcon color={'#cab2d6'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#6a3d9a' primaryText={<MoreVertIcon color={'#6a3d9a'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#ffff99' primaryText={<MoreVertIcon color={'#ffff99'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                          <MenuItem value='#b15928' primaryText={<MoreVertIcon color={'#b15928'} style={{verticalAlign:'middle'}}/>}>
                          </MenuItem>
                        </DropDownMenu>
                      :null}
                    </td>
                  </tr>
                
              ))}
              <tr>
                <td style={{textAlign:'center', width:'40%', verticalAlign:'middle'}}>
                  기본색상
                </td>
                <td style={{textAlign:'center', width:'60%'}}>
                  {this.props.type=='FILL'?
                  <ColorPicker
                    name="colorPicker"
                    defaultValue={'#'+Math.random().toString(16).substr(-6)}
                    onChange={(color)=>this.props.handleChangeFillColor(color)}
                  />
                  :this.props.type=='STROKE'?
                  <ColorPicker
                    name="colorPicker"
                    defaultValue={'#'+Math.random().toString(16).substr(-6)}
                    onChange={(color)=>this.props.handleChangeStrokeColor(color)}
                  />
                  :null}
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </div>
    )
  }

};

RowColor.propTypes = {
  RowColor: React.PropTypes.string,
};

RowColor.defaultProps = {
  RowColor: '#008fff'
};

export default RowColor;
