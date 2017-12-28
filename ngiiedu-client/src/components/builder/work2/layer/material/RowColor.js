import React from 'react';

import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ColorPicker from '../../../../../../webapps/assets/cdn/material-color-picker/index.js';

class RowColor extends React.Component {

  constructor() {
    super();
    this.state = {
      selStyleType:0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIcon = this.handleChangeIcon.bind(this);
  }
  componentDidMount(){
  }

  handleChange(event,index,value){
    this.setState({
      selStyleType:index,
      selIcon:null
    })
  }

  handleChangeIcon(event, index, value){
    this.setState({
      selIcon:value
    })
  }

  render() {
    return (
      <div>
        <RadioButtonGroup name="selectStyle" defaultSelected={this.state.selStyleType} onChange={this.handleChange} style={{display:'flex', marginTop:20, marginBottom:20}}>
          <RadioButton
            value={0}
            label="색상"
            style={{width:'50%', paddingLeft:60}}
          />
          <RadioButton
            value={1}
            label="아이콘"
            style={{width:'50%'}}
          />
        </RadioButtonGroup>
        <Paper zDepth={1} style={{justifyContent:'center', maxHeight:200, marginTop:10, overflow:'auto'}}>
          <Divider style={{marginTop:1}}/>
          <table style={{width:'100%'}}>
            <tbody>
              {this.props.rowInfo.map((row,index)=>(
                  <tr key={index}>
                    <td style={{textAlign:'center', width:'40%', verticalAlign:'middle'}}>
                      {row.label}
                    </td>
                    <td style={{textAlign:'center', width:'60%'}}>
                      {this.state.selStyleType==0?
                        <ColorPicker
                          name="colorPicker"
                          defaultValue={row.color}
                          onChange={(color)=>this.props.handleChangeRowColor(color,row)}
                        />
                      :this.state.selStyleType==1?
                      <DropDownMenu 
                        value={this.state.selIcon}
                        style={{width: '100%'}}
                        underlineStyle={{display:'none'}}
                        labelStyle={{paddingLeft:10}}
                        onChange={this.handleChangeIcon}
                      >
                        {this.props.rowInfo.map((row,index)=>(
                          <MenuItem key={index} value={row.value}>
                            <img src='/ngiiedu/assets/images/categories.png' style={{width:32,height:32,marginRight:10}} alt="CATEGORY"></img>
                            {row.label}
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
