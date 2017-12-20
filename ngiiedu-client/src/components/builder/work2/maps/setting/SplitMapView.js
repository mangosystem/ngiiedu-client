import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class SplitMapView extends React.Component {

  constructor(props){
      super(props);
      
    this.state = {
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
        })
      }),

      layers: {
        raster: null, vector: null
      }
    };

  }

  changeLayer(props, isChange) {

    console.log("changeLayer()");

    let layerId = props.items[0].pinoLayer;

    if (props.itemIndex) {
      layerId = props.items[props.itemIndex].pinoLayer;
    }

    this.setState({ layerId });

    let raster = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'pinogio:'+layerId,
          // 'LAYERS': 'pinogio:d=KjCXc4dmy9',
        }
      })
    });

    let { map } = this.state;

    for (var i = 0; i < map.getLayers().getArray().length; i++) {
      if (map.getLayers().getArray()[i] instanceof ol.layer.Image) {
        map.removeLayer(map.getLayers().getArray()[i]);
      }
    }

    ajaxJson(
      ['GET',apiSvr+'/coursesWork/layers/'+layerId+'.json'],
      null,
      function(res){

        let data = res.response.data.data;

        if(data.bounds){
          let wkt = data.bounds;
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

        
      }.bind(this),
      function(e){
        alert(e);
      }
    );      
    map.addLayer(raster);
    
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.items.length >= 2) {
      if (this.state.layerId != nextProps.items[nextProps.itemIndex].pinoLayer) {
        this.changeLayer(nextProps);
      }
    } else {
      if (this.props.items[0].pinoLayer != nextProps.items[0].pinoLayer)
        this.changeLayer(nextProps);
    }

  }

  componentDidMount() {

    let layerId = this.props.items[0].pinoLayer;

    if (this.props.itemIndex) {
      layerId = this.props.items[this.props.itemIndex].pinoLayer;
    }

    this.setState({ layerId });

    let raster = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'pinogio:'+layerId,
          // 'LAYERS': 'pinogio:d=KjCXc4dmy9',
        }
      })
    });

    let { map } = this.state;
    let oldLayer = map.getLayers();
    map.removeLayer(oldLayer);

    ajaxJson(
      ['GET',apiSvr+'/coursesWork/layers/'+layerId+'.json'],
      null,
      function(res){

        let data = res.response.data.data;

        if(data.bounds){
          let wkt = data.bounds;
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

        
      }.bind(this),
      function(e){
        alert(e);
      }
    );
    
    map.setTarget('mapView');
    map.addLayer(raster);

  }

  render() {
    return (
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <div id="map1">
            </div>
            <div id="map2">
            </div>
        </div>
    );
  }
}

export default SplitMapView;