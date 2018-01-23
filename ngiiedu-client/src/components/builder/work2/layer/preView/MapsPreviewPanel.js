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
          zoom: 7,
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
            zoom: true, 
            rotate: false, 
            attribution: true,
            attributionOptions: {
              collapsible: false
            }
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

    this.addBaseLayer = this.addBaseLayer.bind(this);
    this.addBaseLayer = this.addBaseLayer.bind(this);

  }

  componentWillReceiveProps(nextProps){
    this.setState({
        layers: {
            raster: nextProps.raster,
        }
    });
    // if(nextProps.bounds!=null){
    //     let {map} = this.state;
    //     let wkt = nextProps.bounds;
    //     let format = new ol.format.WKT();
    //     let feature = format.readFeature(wkt, {
    //         dataProjection: 'EPSG:4326',
    //         featureProjection: 'EPSG:3857'
    //     });
    //     map.getView().fit(
    //         feature.getGeometry().getExtent(),
    //         map.getSize()
    //     );
    // }else if(nextProps.extent!=null){
    //     let wgs84Bounds=nextProps.extent.wgs84Bounds;
    //     let extent=[wgs84Bounds.minX, wgs84Bounds.minY, wgs84Bounds.maxX, wgs84Bounds.maxY];
    //     let transformExtent = ol.proj.transformExtent(extent,'EPSG:4326', 'EPSG:3857');
    //     this.state.map.getView().fit(transformExtent, this.state.map.getSize());
    // }

    if(nextProps.extent!=null){
        let wgs84Bounds=nextProps.extent.wgs84Bounds;
        let extent=[wgs84Bounds.minX, wgs84Bounds.minY, wgs84Bounds.maxX, wgs84Bounds.maxY];
        let transformExtent = ol.proj.transformExtent(extent,'EPSG:4326', 'EPSG:3857');
        this.state.map.getView().fit(transformExtent, this.state.map.getSize());
    }
  }


  
  componentDidMount() {
    // map.addLayer(layers.vector);
    let { map } = this.state;
    let layers = this.state.layers;
    let { interactions } = this.state;

    let layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);

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
    map.addLayer(this.props.raster);
    

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
        visible : false,
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
            url: 'http://xdworld.vworld.kr:8080/2d/Base/201512/{z}/{x}/{y}.png',
            attributions: [
              new ol.Attribution({ 
                  html: '© <a href="http://map.vworld.kr/map/maps.do">vworld.kr</a>'
              })
            ]
        })
    });
    
    let vworldSatelite = new ol.layer.Tile({
        title : 'Vworld satelite',
        visible : false,
        type : 'base',
        source:new ol.source.XYZ({
            url: 'http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg',
            attributions: [
              new ol.Attribution({ 
                  html: '© <a href="http://map.vworld.kr/map/maps.do">vworld.kr</a>'
              })
            ]
        })
    });
    
    let vworldHybrid = new ol.layer.Tile({
        title : 'Vworld hybrid',
        visible : false,
        type : 'base',
        source:new ol.source.XYZ({
            url: 'http://xdworld.vworld.kr:8080/2d/Hybrid/201310/{z}/{x}/{y}.png',
            attributions: [
              new ol.Attribution({ 
                  html: '© <a href="http://map.vworld.kr/map/maps.do">vworld.kr</a>'
              })
            ]
        })
    });

    resolutions = [1954.597389, 977.2986945, 488.64934725, 244.324673625, 122.1623368125, 61.08116840625, 30.540584203125, 15.2702921015625, 7.63514605078125, 3.817573025390625, 1.9087865126953125, 0.9543932563476563, 0.4771966281738281, 0.2385983140869141];
    extent     = [-200000.00, -28024123.62, 31824123.62, 4000000.00];  // 4 * 3

    //배경지도로 활용할 지원 위성지도 URL
    var ngiiURL     = apiSvr + '/utils/ngiiemapProxy?ngiiproxy=http://map.ngii.go.kr/proxys//proxy/proxyTile.jsp?apikey=04trYP9_xwLAfALjwZ-B8g&URL=http://210.117.198.62:8081/2015_map/korean_map_tile/L16/2374/61250.png';


    let ngiiStreet = new ol.layer.Tile({
        title : 'Ngii Street Map',
        visible : true,
        type : 'base',
        source : new ol.source.XYZ({
            projection: 'EPSG:5179',
            tileSize: [256, 256],
            minZoom: 0,
            maxZoom: resolutions.length - 1,
            tileGrid: new ol.tilegrid.TileGrid({
                extent: extent,
                origin: [extent[0], extent[1]],
                resolutions: resolutions
            }),
            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                if (tileCoord == null) return undefined;

                var z = ('00'+ (tileCoord[0] + 6)).slice(-2);
                var x = tileCoord[1];
                var y = tileCoord[2];
                return 'http://mango.iptime.org:28086/postdata/tileMap?tileType=ngii_base&zxyUrl='+'/L' + z + '/' + x + '/' + y + '.png';
            },
            attributions: [
                new ol.Attribution({ 
                    html: ['<a href="http://ngii.go.kr/"><img src="http://map.ngii.go.kr/img/process/ms/map/common/img_btoLogo.png"></a>']
                })
            ]
        })
    });

    let layers = [];
    layers.push($.extend(true, {}, vworldHybrid));
    layers.push($.extend(true, {}, vworldSatelite));
    layers.push($.extend(true, {}, vworldBase));
    layers.push($.extend(true, {}, osm));
    layers.push($.extend(true, {}, daum));
    layers.push($.extend(true, {}, naver));
    layers.push($.extend(true, {}, ngiiStreet));

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
            url: pinoSvr+gisSvr+'/pinogio/wms',
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
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} >
        <div id="mapView" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        
            <div style={{position:'absolute',right:100,bottom:100,zIndex:1}}>
                <img src={pinoSvr+gisSvr+"/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&FORMAT=image/png&LAYER=pinogio:"+this.props.layerName}/>
            </div>
        </div>
    </div>

    );
  }
};

export default MapsPreviewPanel;
