import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class MapEditorPanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {

      isEditMode: false,
      map: null,
      layers: {
        raster: null, vector: null
      },

      rowId:'',
      datasetId:'',
      selectFeature:{}
    };

    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.wmsInfo = this.wmsInfo.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    
    if(this.props.layerId !=nextProps.layerId){

      let { map } = this.state;
      for(let i=0; i<map.getLayers().getArray().length; i++){
        if(map.getLayers().getArray()[i] instanceof ol.layer.Vector){
          map.removeLayer(map.getLayers().getArray()[i])
        }else if(map.getLayers().getArray()[i] instanceof ol.layer.Image){
          map.removeLayer(map.getLayers().getArray()[i])
        };
      };

      map.addLayer(nextProps.layers.raster);
      map.addLayer(nextProps.layers.vector);
      this.setState({
        layerId:nextProps.layerId,
        layers:nextProps.layers,
        interactions:nextProps.interactions,
        //  map:nextProps.map
      },function(){
        let { interactions } = this.state;
  
        // map.on('singleclick', this.wmsInfo);
    
        map.addInteraction(interactions.snap);
        interactions.snap.setActive(true);
    
        map.addInteraction(interactions.select);
        interactions.select.setActive(true);
        //객체선택
        interactions.select.getFeatures().on('add', (e) => {
          let properties = e.element.getProperties();
    
          if(e.element.id_){
            this.setState({
              rowId:e.element.id_.split('.')[1],
              datasetId:e.element.id_.split('.')[0]
            });
          };
          this.props.onChangeButton(true, false);
    
          this.props.getFeatureInfo(this.state.rowId, this.state.datasetId, e.element.getGeometry());
    
          if(!interactions.draw.getActive()) {
            this.props.onChangeEditMode('edit', e.element);
          };
        });
    
        //객체선택 해제
        interactions.select.getFeatures().on('remove', (e) => {
          this.props.onChangeEditMode('null');
          
          if(this.props.editingFeature ==true){
            this.state.layers.vector.getSource().clear();
          };
    
          this.props.editCancle(false);
          this.props.onChangeButton(false, true);
        });
    
        map.addInteraction(interactions.modify);
        interactions.modify.setActive(false);
        //객체수정 시작
        interactions.modify.on('modifystart', (e) => {
          this.setState({
            selectFeature:e.features.getArray()[0].values_
          });
        });
    
        //객체수정 완료
        interactions.modify.on('modifyend', (e) => {
          this.props.getFeatureInfo(this.state.rowId, this.state.datasetId, e.features.getArray()[0].values_.geometry);
          this.props.editCancle(true);
        });
    
        map.addInteraction(interactions.draw);
        interactions.draw.setActive(false);
        
        //객체추가 그리기 시작
        interactions.draw.on('drawstart', (e) => {
          interactions.select.setActive(false);
        });
    
        //객체추가 그리기 완료
        interactions.draw.on('drawend', (e) => {
          interactions.draw.setActive(false);
          this.props.onChangeButton(true, true);
          this.props.getFeatureInfo('','',e.feature.getGeometry());
          this.props.onChangeEditMode('new');
        });
        this.onToggleEdit(null, false);
      });
    }
  }

  componentWillMount() {
    this.setState({
      map: this.props.map,layers:this.props.layers
    },function(){
      this.state.map.setTarget('mapView');
      this.state.map.on('singleclick', this.wmsInfo);
    });
  }

  //wms feature 정보 확인
  wmsInfo(e){
    let { map } = this.state;
    let { layers } = this.state;
    let props = this.props;
    let url = layers.raster.getSource().getGetFeatureInfoUrl(
      e.coordinate, map.getView().getResolution(), map.getView().getProjection(),
      {'INFO_FORMAT':'application/json'}) + '&info_format=text/javascript' + '&format_options=callback:loadFeatures';
    $.ajax({
      url: url,
      method: 'GET',
      jsonpCallback: 'loadFeatures',
      dataType: 'jsonp',
      success: function(response) {
        let feature = new ol.format.GeoJSON().readFeatures(response);
        if(feature.length ==0){
          props.onChangeEditMode('null');
        }else{
          props.onChangeEditMode('wms', feature[0]);
        };
      }
    });
  }

  componentDidMount() {
    //초기 map 지정
    let { map } = this.state;
    
    map.setTarget('mapView');
    
  }

  onToggleEdit(e, checked) {
    let { map } = this.state;

    if (checked) {
      this.state.layers.raster.setVisible(false);
      this.state.layers.vector.setVisible(true);
      this.state.interactions.modify.setActive(true);
      this.state.interactions.draw.setActive(false);
      map.un('singleclick', this.wmsInfo);
      this.props.onChangeEditMode('null');
    } else {
      this.state.layers.raster.setVisible(true);
      this.state.layers.vector.setVisible(false);
      this.state.interactions.modify.setActive(false);
      this.state.interactions.draw.setActive(false);

      this.state.interactions.select.getFeatures().clear();
      this.state.layers.vector.getSource().clear();
      this.state.layers.raster.getSource().updateParams({_: Date.now()});
      map.on('singleclick', this.wmsInfo);
    };

    this.setState({
      isEditMode: checked
    });
  }

  //객체 추가 버튼 클릭
  onClickAdd(e) {
    this.props.onChangeButton(true, true);
    let { interactions } = this.state;
    this.state.interactions.draw.setActive(true);
    this.state.interactions.modify.setActive(false);
  }

  //객체 삭제 버튼 클릭
  onClickDelete(e){
    let { interactions } = this.state;
    interactions.select.getFeatures().clear();
    this.state.interactions.draw.setActive(false);
    let rowId = this.state.rowId;
    let datasetId = this.state.datasetId;

    ajaxJson(
      ['DELETE',apiSvr+'/pngo/dataset/row.json'],
      {'pinogioOutputId':datasetId, 'rowId':rowId},
      function(res){

        for(let i=0; i<this.state.layers.vector.getSource().getFeatures().length; i++){
          if(this.state.rowId == this.state.layers.vector.getSource().getFeatures()[i].id_.split('.')[1]){
            this.state.layers.vector.getSource().clear();
          };
        };

      }.bind(this),
      function(e){
        console.log(e);
      }
    );

  }

  //작업 초기화
  onClickReset(e) {
    let { interactions } = this.state;
    interactions.select.getFeatures().clear();
    interactions.draw.setActive(false);
    interactions.modify.setActive(true);
    interactions.select.setActive(true);
    this.state.layers.vector.getSource().clear();
    
    this.props.onChangeButton(false, true);
    this.props.onChangeEditMode('null');
  }

  render() {
    return (
      <div id="mapView" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div style={{ position: 'absolute', top: 10, right: 10, padding: 10, backgroundColor: '#eee', textAlign: 'right', zIndex:9, borderRadius: 10 }}>
          <div style={{padding: '5px 10px 0px', textAlign:'right'}}>
            <Toggle
              label="편집모드 전환"
              toggled={this.state.isEditMode}
              onToggle={this.onToggleEdit}
            />
          </div>
        {(() => {
          if (this.state.isEditMode) {
            return(
              <div style={{paddingTop: 10}}>
                <RaisedButton
                  secondary={true}
                  label="객체 추가"
                  style={{marginRight: 10}}
                  disabled = {this.props.addButton}
                  onClick={this.onClickAdd}
                />
                <RaisedButton
                  secondary={true}
                  label="객체 삭제"
                  style={{marginRight: 10}}
                  disabled = {this.props.delButton}
                  onClick={this.onClickDelete}
                />
                <RaisedButton
                  secondary={true}
                  label="작업 초기화"
                  style={{marginRight: 10}}
                  onClick={this.onClickReset}
                />
              </div>
            );
          }
        })()}
        </div>
      </div>
    );
  }
};

export default MapEditorPanel;
