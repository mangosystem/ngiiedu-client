import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class MapsPreviewPanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {

      isEditMode: false,

      map: new ol.Map({
        view: new ol.View({
          center: [14143701.095047, 4477593.930960],
          zoom: 15,
          minZoom: 1,	maxZoom: 18
        }),
        layers: [
          new ol.layer.Tile({
            // source: new ol.source.OSM()
            // source:new ol.source.Stamen({layer:"toner"})
            // source:new ol.source.Stamen({layer:"watercolor"})
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
          mouseWheelZoom: true, shiftDragZoom: true
        })
      }),

      layers: {
        raster: null, vector: null
      }
    };

  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps : ')
    console.dir(nextProps.raster)
    this.setState({
      layers: {
        raster: nextProps.raster,
      }
    });
    if(nextProps.bounds!=null){
      let {map} = this.state;
      let wkt = nextProps.bounds;
      let format = new ol.format.WKT();
      let feature = format.readFeature(wkt, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
      });
      map.getView().fit(
          feature.getGeometry().getExtent(),
          map.getSize()
      );
    }else if(nextProps.extent!=null){
      let wgs84Bounds=nextProps.extent.wgs84Bounds;
      let extent=[wgs84Bounds.minX, wgs84Bounds.minY, wgs84Bounds.maxX, wgs84Bounds.maxY];
      let transformExtent = ol.proj.transformExtent(extent,'EPSG:4326', 'EPSG:3857');
      this.state.map.getView().fit(transformExtent, this.state.map.getSize());
    }
  }


  
  componentDidMount() {
    console.log('componentDidMount')
    // map.addLayer(layers.vector);
    let { map } = this.state;
    let layers = this.state.layers;
    let { interactions } = this.state;
    
  
    map.setTarget('mapView');
  
    map.addLayer(this.props.raster);


  }


  render() {
    return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} >
        <div id="mapView" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        
        <div style={{position:'absolute',right:100,bottom:100,zIndex:1}}>
        <img src={"http://1.234.82.19:8083/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&FORMAT=image/png&LAYER=pinogio:"+this.props.layerName}/>
        </div>
        </div>
    </div>

    );
  }
};

export default MapsPreviewPanel;
