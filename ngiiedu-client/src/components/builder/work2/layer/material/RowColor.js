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
      iconColor:[
          '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c',
          '#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'
      ]
    }
    this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount(){
  }

  handleChange(index, value){
    this.props.handleChangeRowColor(value,index)
  }

  render() {

    const menuItem=[
      
    ]
    
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
                          onChange={(color)=>this.props.handleChangeRowColor(color,index)}
                        />
                      :this.props.categoryType==1?
                        <DropDownMenu 
                          value={row.color}
                          style={{width: '100%'}}
                          underlineStyle={{display:'none'}}
                          labelStyle={{paddingLeft:10}}
                          onChange={(e,k,v)=>this.handleChange(index, v)}
                        >
                          {this.state.iconColor.map((value, i)=>(
                            <MenuItem key={i} value={value} primaryText={<i className="fa fa-tree" aria-hidden="true" style={{verticalAlign:'middle',color:value, fontSize:20}}/>}>
                            </MenuItem>
                          ))}
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
