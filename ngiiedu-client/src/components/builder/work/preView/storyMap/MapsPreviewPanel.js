import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class MapsEditorPanel extends React.Component {

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
          mouseWheelZoom: false, shiftDragZoom: true
        })
      }),

      layers: {
        raster: null, vector: null
      }
    };

  }

  componentWillMount() {

    let raster = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        // url: 'http://localhost:8080/geoserver/mnd/wms',
        url: 'http://1.234.82.19:8083/geoserver/ngiiedu/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'mnd:kob_pa_emd',
        }
      })
    });

    let vector = new ol.layer.Vector({
      visible: false,
      style: new ol.style.Style({
				fill: new ol.style.Fill({ color: '#333' }),
				stroke: new ol.style.Stroke({ color: 'rgba(255, 122, 74, 1)', width: 5 }),
				image: new ol.style.Circle({
          fill: new ol.style.Fill({ color: '#888' }),
          stroke: new ol.style.Stroke({ color: '#555', width: 5 }),
          radius: 10
        })
			}),
      source: new ol.source.Vector({
	      format: new ol.format.GeoJSON(),
				loader: function(extent, resolution, projection) {
          // let url = 'http://localhost:8080/geoserver/mnd/wms?request=GetFeature' +
					let url = 'http://1.234.82.19:8083/geoserver/ngiiedu/wfs?request=GetFeature' +
						'&version=1.0.0' +
						'&typeName=ngiiedu:dataset_test1' +
						'&srsName=EPSG:3857' +
						'&bbox=' + extent.join(',') + ',' + 'urn:ogc:def:crs:EPSG:3857' +
						'&outputFormat=text/javascript' +
						'&format_options=callback:loadFeatures';

					$.ajax({
						url: url,
						method: 'GET',
						jsonpCallback: 'loadFeatures',
						dataType: 'jsonp',
						success: function(response) {
              let feature = new ol.format.GeoJSON().readFeatures(response);

              console.log(feature);

              vector.getSource().addFeatures(feature);
            }
					});
				}.bind(this),
	      strategy: ol.loadingstrategy.bbox
	    })
    });

    

    this.setState({
      layers: {
        raster: raster,
        vector: vector
      }
    });

  }

  componentDidMount() {
    let { map } = this.state;
    let { layers } = this.state;

    map.setTarget('mapView');

    map.addLayer(layers.raster);
    map.addLayer(layers.vector);

  }


  render() {
    return (
      <div id="mapView" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div style={{position:'absolute',right:200,bottom:200,zIndex:1}}>
          <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&FORMAT=image/png&LAYER=mnd:kob_pa_emd"/>
        </div>
      </div>
    );
  }
};

export default MapsEditorPanel;
