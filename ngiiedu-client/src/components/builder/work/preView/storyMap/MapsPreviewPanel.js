import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class MapsPreviewPanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {

      isEditMode: false,
      bounds:'',
      map: new ol.Map({
        view: new ol.View({
          center: [14143701.095047, 4477593.930960],
          zoom: 15,
          minZoom: 1,	maxZoom: 18
        }),
        layers: [
          new ol.layer.Tile({
            source: new ol.source.XYZ({
              url: 'http://mango.iptime.org:8995/v.1.0.0/{z}/{x}/{y}.png?gray=false'
            })
          })
        ],
        controls: ol.control.defaults({
          zoom: true, rotate: false, attribution: true
        }),
        interactions: ol.interaction.defaults({
          altShiftDragRotate: false, doubleClickZoom: true,
          dragPan: true, pinchRotate: false,
          pinchZoom: false, keyboard: false,
          mouseWheelZoom: false, shiftDragZoom: true
        })
      }),

      layers: {
        raster: null
      }
    };

  }

  componentDidMount() {
    //초기 맵 지정
    let { map } = this.state;
    let { layers } = this.state;
    map.setTarget('mapView');
  }

  componentWillReceiveProps(nextProps){

    //새로받은 레이어를 비교
    if(this.props.raster != nextProps.raster){
      let { map } = this.state;
      //기존 레이어를 삭제
      map.removeLayer(this.props.raster);
      //새로운 레이어를 추가
      map.addLayer(nextProps.raster);

      // nextProps.layerID
      ajaxJson(
        ['GET',apiSvr+'/coursesWork/layers/'+nextProps.layerId+'.json'],
        null,
        function(res){
            this.setState({
                bounds:res.response.data.data.bounds
            },function(){
              if(this.state.bounds !=null){
                let wkt = this.state.bounds;
                let format = new ol.format.WKT();
                let feature = format.readFeature(wkt, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                });
                map.getView().fit(
                    feature.getGeometry().getExtent(),
                    map.getSize()
                );  
              }
            });
        }.bind(this),
        function(e){
            alert(e);
        }
      );
    }
}

  render() {
    return (
      
      <div id="mapView" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div style={{position:'absolute',right:100,bottom:100,zIndex:1}} >
          <img src={"http://1.234.82.19:8083/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&FORMAT=image/png&LAYER=pinogio:"+this.props.layerId}/>
        </div>
      </div>
    );
  }
};

export default MapsPreviewPanel;
