import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class SwipeMapView extends React.Component {

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
          zoom: true, 
          rotate: false, 
          attribution: true,
          attributionOptions: {
            collapsible: false
          }
        })
      }),

      layers: {
        raster: null, vector: null
      },

      ctrl: new ol.control.Swipe()
    };

  }

  componentWillMount() {
    let layerId1 = this.props.items[0].pinoLayer;
    let layerId2 = this.props.items[1].pinoLayer;

    let raster1 = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'pinogio:'+layerId1,
          // 'LAYERS': 'pinogio:d=KjCXc4dmy9',
        }
      })
    });

    let raster2 = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'pinogio:'+layerId2,
          // 'LAYERS': 'pinogio:d=KjCXc4dmy9',
        }
      })
    });

    let { map, ctrl } = this.state;

    ajaxJson(
      ['GET',apiSvr+'/coursesWork/layers/'+layerId1+'.json'],
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

    
    map.addLayer(raster1);
    map.addLayer(raster2);
    
    map.addControl(ctrl);

    // Set stamen on left
		ctrl.addLayer(raster1);
		// OSM on right
    ctrl.addLayer(raster2, true);

    if (this.props.typeKind == 'HORIZONTAL') {
      ctrl.set('orientation','horizontal');
    } else if (this.props.typeKind == 'VERTICAL') {
      ctrl.set('orientation','vertical');
    }

    this.setState({ layerId1, layerId2, ctrl });
  }

  componentDidMount() {

    let { map } = this.state;
    map.setTarget('mapView');

  }

  render() {
    return (
      <div 
        id="mapView" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          bottom: 0, 
          left: 0, 
          right: 0 
        }}>
      </div>
    );
  }
}

export default SwipeMapView;