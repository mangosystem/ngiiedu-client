import React from 'react';


class MapsView extends React.Component {

    constructor(props){
        super(props);


    }


    componentDidUpdate(prevProps, prevState) {
        
        let { map1, map2, map3, map4 } = this.state;

        if (this.props.typekind == 'quadruple') {
            map3.setTarget('map3');
            map4.setTarget('map4');

            map3.setView(map1.getView());
            map4.setView(map1.getView());
            
            map3.updateSize();
            map4.updateSize();
        }

        map1.updateSize();
        map2.updateSize();        

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

        resolutions = [1954.597389, 977.2986945, 488.64934725, 244.324673625, 122.1623368125, 61.08116840625, 30.540584203125, 15.2702921015625, 7.63514605078125, 3.817573025390625, 1.9087865126953125, 0.9543932563476563, 0.4771966281738281, 0.2385983140869141];
        extent     = [-200000.00, -28024123.62, 31824123.62, 4000000.00];  // 4 * 3
    
        //배경지도로 활용할 지원 위성지도 URL
        var ngiiURL     = 'http://emap.ngii.go.kr/proxy/proxyTile.jsp?URL=http://210.117.198.62:8081/2015_map/korean_map_tile';
    
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
                        html: ['<a href="http://emap.ngii.go.kr">NGII</a>']
                    })
                ]
            })
        });

        let layers1 = [];
        layers1.push($.extend(true, {}, vworldHybrid));
        layers1.push($.extend(true, {}, vworldSatelite));
        layers1.push($.extend(true, {}, vworldBase));
        layers1.push($.extend(true, {}, osm));
        layers1.push($.extend(true, {}, daum));
        layers1.push($.extend(true, {}, naver));
        layers1.push($.extend(true, {}, ngiiStreet));

        let layers2 = [];
        layers2.push($.extend(true, {}, vworldHybrid));
        layers2.push($.extend(true, {}, vworldSatelite));
        layers2.push($.extend(true, {}, vworldBase));
        layers2.push($.extend(true, {}, osm));
        layers2.push($.extend(true, {}, daum));
        layers2.push($.extend(true, {}, naver));
        layers2.push($.extend(true, {}, ngiiStreet));

        let layers3 = [];
        layers3.push($.extend(true, {}, vworldHybrid));
        layers3.push($.extend(true, {}, vworldSatelite));
        layers3.push($.extend(true, {}, vworldBase));
        layers3.push($.extend(true, {}, osm));
        layers3.push($.extend(true, {}, daum));
        layers3.push($.extend(true, {}, naver));
        layers3.push($.extend(true, {}, ngiiStreet));

        let layers4 = [];
        layers4.push($.extend(true, {}, vworldHybrid));
        layers4.push($.extend(true, {}, vworldSatelite));
        layers4.push($.extend(true, {}, vworldBase));
        layers4.push($.extend(true, {}, osm));
        layers4.push($.extend(true, {}, daum));
        layers4.push($.extend(true, {}, naver));
        layers4.push($.extend(true, {}, ngiiStreet));

        let map1 = new ol.Map({
            controls: [
                new ol.control.LayerSwitcher()
            ],
            target: 'map1',
            layers: [
                new ol.layer.Group({
                    title : 'Base Maps',
                    layers : layers1
                })
            ]
        });

        let map2 = new ol.Map({
            controls: [
                new ol.control.LayerSwitcher()
            ],
            target: 'map2',
            layers: [
                new ol.layer.Group({
                    title : 'Base Maps',
                    layers : layers2
                })
            ]
        });

        let map3 = new ol.Map({
            controls: [
                new ol.control.LayerSwitcher()
            ],
            layers: [
                new ol.layer.Group({
                    title : 'Base Maps',
                    layers : layers3
                })
            ]
        });

        let map4 = new ol.Map({
            controls: [
                new ol.control.LayerSwitcher()
            ],
            layers: [
                new ol.layer.Group({
                    title : 'Base Maps',
                    layers : layers4
                })
            ]
        });

        this.updateViewProjection(map1, map2, 'EPSG:5179');
        this.setState({
            map3,
            map4
        });

    }

    updateViewProjection(map1, map2, projection, map3, map4) {
        var newProj = ol.proj.get(projection);
        var newProjExtent = newProj.getExtent();
        var newView = new ol.View({
            projection: newProj,
            center: [952832.00, 1949760.00],
            zoom: 7,
            extent: newProjExtent || undefined
        });
        map1.setView(newView);
        map2.setView(newView);


        this.setState({
            map1,
            map2
        });

    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
            {(() => {
                if (this.props.typekind == 'double1') {
                    return (
                        <div style={{height: '100%', width: '100%', overflowY: 'hidden', backgroundColor: 'white'}}>
                            <div 
                                id="map1" 
                                style={{ 
                                    height: 'calc(50% - 2.5px)',
                                    marginBottom: '5px'
                                }}>
                            </div>
                            <div 
                                id="map2" 
                                style={{ 
                                    height: 'calc(50% - 2.5px)'
                                }}>
                            </div>
                            <div 
                                id="map3" 
                                style={{ 
                                    height: '0'
                                }}>
                            </div>
                            <div 
                                id="map4" 
                                style={{ 
                                    height: '0'
                                }}>
                            </div>
                        </div>
                    );
                } else if (this.props.typekind == 'double2') {
                    return (
                        <div style={{width: '100%', height: '100%', display: 'flex', backgroundColor: 'white'}}>
                            <div 
                                id="map1" 
                                style={{ 
                                    width: 'calc(50% - 2.5px)',
                                    marginRight: '5px'
                                }}>
                            </div>
                            <div 
                                id="map2" 
                                style={{ 
                                    width: 'calc(50% - 2.5px)'
                                }}>
                            </div>
                            <div 
                                id="map3" 
                                style={{ 
                                    width: '0'
                                }}>
                            </div>
                            <div 
                                id="map4" 
                                style={{ 
                                    width: '0'
                                }}>
                            </div>                            
                        </div>
                    );
                } else if (this.props.typekind == 'quadruple') {
                    return (
                        <div style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', overflowY: 'hidden', backgroundColor: 'white'}}>
                            <div 
                                id="map1" 
                                style={{ 
                                    width: 'calc(50% - 2.5px)',
                                    marginRight: '5px',
                                    height: 'calc(50% - 2.5px)',
                                    marginBottom: '5px'
                                }}>
                            </div>
                            <div 
                                id="map2" 
                                style={{ 
                                    width: 'calc(50% - 2.5px)',
                                    height: 'calc(50% - 2.5px)',
                                    marginBottom: '5px'
                                }}>
                            </div>
                            <div 
                                id="map3" 
                                style={{ 
                                    width: 'calc(50% - 2.5px)',
                                    marginRight: '5px',
                                    height: 'calc(50% - 2.5px)'
                                }}>
                            </div>
                            <div 
                                id="map4" 
                                style={{ 
                                    width: 'calc(50% - 2.5px)',
                                    height: 'calc(50% - 2.5px)'
                                }}>
                            </div>
                        </div>
                    );
                }
            })()}
            </div>
        );
    }
}


export default MapsView;
