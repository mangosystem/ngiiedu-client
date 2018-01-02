import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class MapsView extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      map: new ol.Map({
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

    if (this.props.maps.mapsType != 'SERIES') {
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
    }


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
        visible: true,
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

    let layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);

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

    
    let boundaryLayer1 = this.addBoundaryLayer('tl_scco_ctprvn', '행정경계: 시도');
    let boundaryLayer2 = this.addBoundaryLayer('tl_scco_sig', '행정경계: 시군구');
    let boundaryLayer3 = this.addBoundaryLayer('tl_scco_emd', '행정경계: 읍면동');
    let boundaryLayer4 = this.addBoundaryLayer('tl_scco_li', '행정경계: 리');
    
    let layerGroup2 = new ol.layer.Group({
      title: 'Boundary Map',
      layers: [
        boundaryLayer1,
        boundaryLayer2,
        boundaryLayer3,
        boundaryLayer4
      ]
    });
    
    this.addBaseLayer(map);
    map.addLayer(layerGroup2);
    map.addLayer(raster);

    map.setTarget('mapView');

  }

  addBaseLayer(map) {

    // define epsg:5179 projection
    proj4.defs("EPSG:5179","+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    let proj5179 = ol.proj.get('EPSG:5179');
    proj5179.setExtent([90112, 1192896, 2187264, 2765760]);
    
    // define epsg:5181 projection
    proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    let proj5181 = ol.proj.get('EPSG:5181');
    proj5181.setExtent([-30000, -60000, 494288, 988576]);


    let osm = new ol.layer.Tile({
        title : 'OSM',
        visible : false,
        type : 'base',
        source: new ol.source.OSM()
    });
    
    let resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
    let extent      = [90112, 1192896, 2187264, 2765760];  // 4 * 3

    let naver = new ol.layer.Tile({
        title : 'Naver Street Map',
        visible : true,
        type : 'base',
        source : new ol.source.XYZ({
            projection: 'EPSG:5179',
            tileSize: 256,
            minZoom: 0,
            maxZoom: resolutions.length - 1,
            tileGrid: new ol.tilegrid.TileGrid({
                extent: extent,
                origin: [extent[0], extent[1]],
                resolutions: resolutions
            }),
            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                if (tileCoord == null) return undefined;

                var s = Math.floor(Math.random() * 3) + 1;  // 1 ~ 4
                var z = tileCoord[0] + 1;
                var x = tileCoord[1];
                var y = tileCoord[2];

                return 'http://onetile' + s + '.map.naver.net/get/149/0/0/' + z + '/' + x + '/' + y + '/bl_vc_bg/ol_vc_an';
            },
            attributions: [
                new ol.Attribution({ 
                    html: ['<a href="http://map.naver.com"><img src="http://static.naver.net/maps2/logo_naver_s.png"></a>']
                })
            ]
        })
    });

    extent = [-30000, -60000, 494288, 988576];
    
    let daum = new ol.layer.Tile({
        title : 'Daum Street Map',
        visible : false,
        type : 'base',
        source : new ol.source.XYZ({
            projection: 'EPSG:5181',
            tileSize: 256,
            minZoom: 0,
            maxZoom: resolutions.length - 1,
            tileGrid: new ol.tilegrid.TileGrid({
                origin: [extent[0], extent[1]],
                resolutions: resolutions
            }),
            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                if (tileCoord == null) return undefined;

                var s = Math.floor(Math.random() * 4);  // 0 ~ 3
                var z = resolutions.length - tileCoord[0];
                var x = tileCoord[1];
                var y = tileCoord[2];

                return 'http://map' + s + '.daumcdn.net/map_2d/2fso49/L' + z + '/' + y + '/' + x + '.png';
            },
            attributions: [
                new ol.Attribution({ 
                    html: ['<a href="http://map.daum.net"><img src="http://i1.daumcdn.net/localimg/localimages/07/mapjsapi/m_bi.png"></a>']
                })
            ]
        })
    });
    
    let vworldBase = new ol.layer.Tile({
        title : 'Vworld base',
        visible : false,
        type : 'base',
        source:new ol.source.XYZ({
            url: 'http://xdworld.vworld.kr:8080/2d/Base/201512/{z}/{x}/{y}.png'
        })
    });
    
    let vworldSatelite = new ol.layer.Tile({
        title : 'Vworld satelite',
        visible : false,
        type : 'base',
        source:new ol.source.XYZ({
            url: 'http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg'
        })
    });
    
    let vworldHybrid = new ol.layer.Tile({
        title : 'Vworld hybrid',
        visible : false,
        type : 'base',
        source:new ol.source.XYZ({
            url: 'http://xdworld.vworld.kr:8080/2d/Hybrid/201310/{z}/{x}/{y}.png'
        })
    });

    let layers = [];
    layers.push($.extend(true, {}, vworldHybrid));
    layers.push($.extend(true, {}, vworldSatelite));
    layers.push($.extend(true, {}, vworldBase));
    layers.push($.extend(true, {}, osm));
    layers.push($.extend(true, {}, daum));
    layers.push($.extend(true, {}, naver));

    let layerGroup = new ol.layer.Group({
      title : 'Base Maps',
      layers : layers
    });

    map.addLayer(layerGroup);

  }

  addBoundaryLayer(layer, title) {
    let boundaryLayer = new ol.layer.Image({
      title: title,
      visible: false,
      opacity: 0.6,
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'pinogio:'+layer,
          // 'LAYERS': 'pinogio:d=KjCXc4dmy9',
        }
      })
    });

    return boundaryLayer;
  }

  render() {
    return (
      <div id="mapView" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      </div>
    );
  }
}

export default MapsView;