import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import update from 'react-addons-update';


class PropertiesPanel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      valueZone: null,
      valueLevel: null,
      addButton: null,
      delButton: null,
      properties:{},
      featureId:'',
      rowId:'',
      datasetId:'',
      newProperties:{
        the_geom:'',
        noise_value:'',
        noise_zone:'',
        noise_level:'',
        survey_dn:''
      }
    }
    
    this.editProperties = this.editProperties.bind(this);
    this.saveProperties = this.saveProperties.bind(this);
    // 객체 수정 value 변경
    this.onChangeEditZone = this.onChangeEditZone.bind(this);
    this.onChangeEditLevel = this.onChangeEditLevel.bind(this);
    this.onChangeEditValue = this.onChangeEditValue.bind(this);
    this.onChangeEditDn = this.onChangeEditDn.bind(this);
    //객체 추가 value 변경
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onChangeZone = this.onChangeZone.bind(this);
    this.onChangeDn = this. onChangeDn.bind(this);
  }

  onChangeValue(event, value){
    let noiseValue = this.state.newProperties;
    noiseValue.noise_value = value;
    this.setState({
      newProperties:noiseValue
    });
  }

  onChangeLevel(e, i, v){
    let newProperties = this.state.newProperties;
    newProperties.noise_level = v;
    this.setState({
      newProperties:newProperties
    });
  }

  onChangeZone(e, i, v){
    let newProperties = this.state.newProperties;
    newProperties.noise_zone = v;
    this.setState({
      newProperties:newProperties
    });
  }

  onChangeDn(e, i, v){
    let newProperties = this.state.newProperties;
    newProperties.survey_dn = v;
    this.setState({
      newProperties:newProperties
    });
  }

  onChangeEditValue(event, value){
    let noiseValue = this.state.properties;
    noiseValue.noise_value = value;
    this.setState({
      properties:noiseValue
    });
  }

  onChangeEditZone(e, i, v) {
    let noiseZone = this.state.properties;
    noiseZone.noise_zone = v;
    this.setState({
      properties: noiseZone
    });
  }

  onChangeEditLevel (e, i, v) {
    let noiseLevel = this.state.properties;
    noiseLevel.noise_level = v;
    this.setState({
      properties: noiseLevel
    });
  }

  onChangeEditDn (e, i, v) {
    let surveyDn = this.state.properties;
    surveyDn.survey_dn = v;
    this.setState({
      properties: surveyDn
    });
  }

  //객체 수정
  editProperties(){
    let geometry=this.props.geometry;
    let the_geom = new ol.format.WKT().writeGeometry(geometry.transform('EPSG:3857', 'EPSG:4326'));
    let rowId = this.state.rowId;
    let datasetId = this.state.datasetId;

    let properties = this.state.properties;
    properties.the_geom = the_geom;
    delete this.state.properties.geometry;
    delete this.state.properties.fid;

    this.setState({
      properties:properties
    },function(){

      let contentJson=JSON.stringify(this.state.properties);

      ajaxJson(
        ['PUT',apiSvr+'/coursesWork/dataset/row.json'], // ['PUT',apiSvr+'/pngo/dataset/row.json'],
        {'datasetId':datasetId, 'rowId':rowId, 'contentJson':contentJson}, // {pinogioOutputId':datasetId, 'rowId':rowId, 'contentJson':contentJson},
        function(res){
          for(let i=0; i<this.props.map.getLayers().getArray().length; i++){
            if(this.props.map.getLayers().getArray()[i] instanceof ol.layer.Vector){
              this.props.map.getLayers().getArray()[i].getSource().clear();
            };
          };

          this.props.onChangeEditMode('null');
          this.props.editCancle(false);
          this.props.onChangeButton(false, true);
        }.bind(this),
          function(e){
          alert(e);
        }
      );

    });
  };

  //객체 추가
  saveProperties(){
    let datasetId = this.props.layerName;
    let geometry=this.props.geometry;
    let the_geom = new ol.format.WKT().writeGeometry(geometry.transform('EPSG:3857', 'EPSG:4326'));

    let newProperties = this.state.newProperties;
    newProperties.the_geom = the_geom;

    this.setState({
      newProperties:newProperties
    },function(){

      let contentJson = JSON.stringify(this.state.newProperties)

      ajaxJson(
        ['POST',apiSvr+'/coursesWork/dataset/row.json'], // ['POST',apiSvr+'/pngo/dataset/row.json'],
        {'datasetId':datasetId, 'contentJson':contentJson}, //{'pinogioOutputId':datasetId, 'contentJson':contentJson},
        function(res){
          this.setState({
            newProperties:update(
              this.state.newProperties,{
                the_geom:{$set:''},
                noise_value:{$set:''},
                noise_zone:{$set:''},
                noise_level:{$set:''},
                survey_dn:{$set:''}
              }
            )
          });

          for(let i=0; i<this.props.map.getLayers().getArray().length; i++){
            if(this.props.map.getLayers().getArray()[i] instanceof ol.layer.Vector){
              this.props.map.getLayers().getArray()[i].getSource().clear();
            };
          };

          for(let i=0; i<this.props.map.getInteractions().getArray().length; i++){
            if(this.props.map.getInteractions().getArray()[i] instanceof ol.interaction.Select){
              this.props.map.getInteractions().getArray()[i].setActive(true);
            }else if(this.props.map.getInteractions().getArray()[i] instanceof ol.interaction.Modify){
              this.props.map.getInteractions().getArray()[i].setActive(true);
            };
          };

          this.props.onChangeEditMode('null');
          this.props.onChangeButton(false, true);
        }.bind(this),
        function(e){
          alert(e);
        }
      );
      
    });


  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.propertiesMode == 'edit') {
    //   this.setState({
    //     valueZone: 2,
    //     valueLevel: 4
    //   })
    // }this.setState({
    if(nextProps.properties.id_ != undefined){
      this.setState({
        properties:nextProps.properties.values_,
        featureId:nextProps.properties.id_.replace(/[^0-9]/g,""),
        rowId:nextProps.rowId,
        datasetId:nextProps.datasetId,
        addButton: this.props.addButton,
        delButton: this.props.delButton
      });
    };
  }

  render() {
    return (
      <div style={{padding: 20}}>
        <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 15, borderBottom: '1px solid #eee'}}>
          <h2>Properties</h2>
        </Paper>

        {(() => {
          if (this.props.propertiesMode == 'edit') {
            return (

              <Paper zDepth={0}>
                <TextField
                  fullWidth
                  floatingLabelText="소음측정값"
                  floatingLabelFixed={true}
                  hintText="수음측정값을 입력하세요."
                  type = 'number'
                  value={this.state.properties.noise_value}
                  onChange={this.onChangeEditValue}
                />
                <SelectField
                  fullWidth
                  floatingLabelText="주요소음원"
                  floatingLabelFixed={true}
                  hintText="수음측정값을 입력하세요."
                  value={this.state.properties.noise_zone}
                  onChange={this.onChangeEditZone}
                >
                  <MenuItem value={"도로교통소음"} primaryText="도로교통소음" />
                  <MenuItem value={"공사장소음"} primaryText="공사장소음" />
                  <MenuItem value={"생활소음"} primaryText="생활소음" />
                  <MenuItem value={"철도소음"} primaryText="철도소음" />
                  <MenuItem value={"기타소음"} primaryText="기타소음" />
                </SelectField>
                <SelectField
                  fullWidth
                  floatingLabelText="체감소음도"
                  floatingLabelFixed={true}
                  hintText="체감소음도를 선택하세요."
                  value={this.state.properties.noise_level}
                  onChange={this.onChangeEditLevel}
                >
                  <MenuItem value={1} primaryText="아주 조용함 (1)" />
                  <MenuItem value={2} primaryText="조용함 (2)" />
                  <MenuItem value={3} primaryText="보통 (3)" />
                  <MenuItem value={4} primaryText="시끄러움 (4)" />
                  <MenuItem value={5} primaryText="아주 시끄러움 (5)" />
                </SelectField>
                <SelectField
                  fullWidth
                  floatingLabelText="측정시간"
                  floatingLabelFixed={true}
                  hintText="측정시간을 선택하세요."
                  value={this.state.properties.survey_dn}
                  onChange={this.onChangeEditDn}
                >
                  <MenuItem value={"낮"} primaryText="낮" />
                  <MenuItem value={"밤"} primaryText="밤" />
                </SelectField>
                <RaisedButton 
                  label="수정" 
                  primary={true} 
                  fullWidth={true} 
                  style={{marginTop:10}}
                  onClick={this.editProperties}
                />
              </Paper>

            );
          } else if (this.props.propertiesMode == 'new') {
            return (

              <Paper zDepth={0}>
                <TextField
                  fullWidth
                  floatingLabelText="소음측정값"
                  floatingLabelFixed={true}
                  type = 'number'
                  value={this.state.newProperties.noise_value}
                  hintText="수음측정값을 입력하세요."
                  onChange = {this.onChangeValue}
                />
                <SelectField
                  fullWidth
                  floatingLabelText="주요소음원"
                  floatingLabelFixed={true}
                  hintText="수음측정값을 입력하세요."
                  value={this.state.newProperties.noise_zone}
                  onChange={this.onChangeZone}
                >
                  <MenuItem value={"도로교통소음"} primaryText="도로교통소음" />
                  <MenuItem value={"공사장소음"} primaryText="공사장소음" />
                  <MenuItem value={"생활소음"} primaryText="생활소음" />
                  <MenuItem value={"철도소음"} primaryText="철도소음" />
                  <MenuItem value={"기타소음"} primaryText="기타소음" />
                </SelectField>
                <SelectField
                  fullWidth
                  floatingLabelText="체감소음도"
                  floatingLabelFixed={true}
                  hintText="체감소음도를 선택하세요."
                  value={this.state.newProperties.noise_level}
                  onChange={this.onChangeLevel}
                >
                  <MenuItem value={1} primaryText="아주 조용함 (1)" />
                  <MenuItem value={2} primaryText="조용함 (2)" />
                  <MenuItem value={3} primaryText="보통 (3)" />
                  <MenuItem value={4} primaryText="시끄러움 (4)" />
                  <MenuItem value={5} primaryText="아주 시끄러움 (5)" />
                </SelectField>
                <SelectField
                  fullWidth
                  floatingLabelText="측정시간"
                  floatingLabelFixed={true}
                  hintText="측정시간을 선택하세요."
                  value={this.state.newProperties.survey_dn}
                  onChange={this.onChangeDn}
                >
                  <MenuItem value={"낮"} primaryText="낮" />
                  <MenuItem value={"밤"} primaryText="밤" />
                </SelectField>
                <RaisedButton 
                  label="저장" 
                  primary={true} 
                  fullWidth={true} 
                  style={{marginTop:10}}
                  onClick={this.saveProperties}
                />
              </Paper>
              
            );
          } else if (this.props.propertiesMode == 'wms') {
            return (

              <Paper zDepth={0}>
                <TextField
                  fullWidth
                  floatingLabelText="소음측정값"
                  floatingLabelFixed={true}
                  value={this.state.properties.noise_value}
                  underlineShow={false}
                />
                <TextField
                  fullWidth
                  floatingLabelText="주요소음원"
                  floatingLabelFixed={true}
                  value={this.state.properties.noise_zone}
                  underlineShow={false}
                />
                <TextField
                  fullWidth
                  floatingLabelText="체감소음도"
                  floatingLabelFixed={true}
                  value={this.state.properties.noise_level}
                  underlineShow={false}
                />
                <TextField
                  fullWidth
                  floatingLabelText="소음측정값"
                  floatingLabelFixed={true}
                  value={this.state.properties.survey_dn}
                  underlineShow={false}
                />
              </Paper>

            );
          } else {
            return (
              <div></div>
            );
          }
        })()}

      </div>
    );
  }
};

PropertiesPanel.propTypes = {
  propertiesMode: React.PropTypes.string,
  properties:React.PropTypes.object
};

PropertiesPanel.defaultProps = {
  propertiesMode: '',
  properties:{}
};

export default PropertiesPanel;
