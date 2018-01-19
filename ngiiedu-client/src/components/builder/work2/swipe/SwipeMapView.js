import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class SwipeMapView extends React.Component {

    constructor(props){
        super(props);

    }

    componentDidMount() {

        // define epsg:5179 projection
        proj4.defs("EPSG:5179","+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        let proj5179 = ol.proj.get('EPSG:5179');
        proj5179.setExtent([90112, 1192896, 2187264, 2765760]);
        
        // define epsg:5181 projection
        proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        let proj5181 = ol.proj.get('EPSG:5181');
        proj5181.setExtent([-30000, -60000, 494288, 988576]);

        let osm = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        
        let resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
        let extent      = [90112, 1192896, 2187264, 2765760];  // 4 * 3

        let naver = new ol.layer.Tile({
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

        let layers1 = {};
        layers1['naver'] = naver;
        layers1['daum'] = daum;
        layers1['osm'] = osm;
        layers1['vworldBase'] = vworldBase;
        layers1['vworldSatelite'] = vworldSatelite;
        layers1['vworldHybrid'] = vworldHybrid;
        layers1['ngii'] = ngiiStreet;

        let layers2 = {};
        layers2['naver'] = naver;
        layers2['daum'] = daum;
        layers2['osm'] = osm;
        layers2['vworldBase'] = vworldBase;
        layers2['vworldSatelite'] = vworldSatelite;
        layers2['vworldHybrid'] = vworldHybrid;
        layers2['ngii'] = ngiiStreet;

        let map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Group({
                    title : 'Base Maps',
                    layers : [
                        layers2[this.props.map2Value],
                        layers1[this.props.map1Value]
                    ]
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
        });

        let swipe = new ol.control.Swipe();
        swipe.addLayer(layers1[this.props.map1Value]);
        swipe.addLayer(layers2[this.props.map2Value], true);

        map.addControl(swipe);

        this.updateViewProjection(map, 'EPSG:5179');

        this.setState({
            map, swipe, layers1, layers2
        });

    }

    componentWillReceiveProps(nextProps){

        let { map, swipe, layers1, layers2 } = this.state;

        if (nextProps.typeKind != this.props.typeKind) {
            swipe.set('orientation', nextProps.typeKind);
        }

        if (nextProps.map1Value != this.props.map1Value) {

            swipe.removeLayer(layers1[this.props.map1Value]);
              
            for (let i = 0; i < map.getLayers().getArray().length; i++) {
                if (map.getLayers().getArray()[i] instanceof ol.layer.Group) {
                    map.removeLayer(map.getLayers().getArray()[i]);
                }
            }

            let newLayerGroup = new ol.layer.Group({
                title : 'Base Maps',
                layers : [
                    layers2[nextProps.map2Value],
                    layers1[nextProps.map1Value]
                ]
            });

            map.addLayer(newLayerGroup);
            swipe.addLayer(layers1[nextProps.map1Value]);

        } else if (nextProps.map2Value != this.props.map2Value) {
            
            swipe.removeLayer(layers2[this.props.map2Value]);
              
            for (let i = 0; i < map.getLayers().getArray().length; i++) {
                if (map.getLayers().getArray()[i] instanceof ol.layer.Group) {
                    map.removeLayer(map.getLayers().getArray()[i]);
                }
            }

            let newLayerGroup = new ol.layer.Group({
                title : 'Base Maps',
                layers : [
                    layers2[nextProps.map2Value],
                    layers1[nextProps.map1Value]
                ]
            });

            map.addLayer(newLayerGroup);
            swipe.addLayer(layers2[nextProps.map2Value], true);
        }

    }

    componentDidUpdate() {
        let { map } = this.state;
        map.renderSync();
    }

    updateViewProjection(map, projection) {
        var newProj = ol.proj.get(projection);
        var newProjExtent = newProj.getExtent();
        var newView = new ol.View({
            projection: newProj,
            center: [952832.00, 1949760.00],
            zoom: 7,
            extent: newProjExtent || undefined
        });
        map.setView(newView);

    }


    render() {
        return (
            <div 
                id="map" 
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