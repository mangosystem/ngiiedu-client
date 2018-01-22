import React from 'react';

import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconSwapVert from 'material-ui/svg-icons/action/swap-vert';
import IconPageView from 'material-ui/svg-icons/action/pageview';


import EditToggle from './EditToggle.js'



//component
// import MapEditorPanel from './MapEditorPanel.js';

//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
class MainContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            map: new ol.Map({
                view: new ol.View({
                    center: [14162252.600956, 4353853.130726],
                    zoom: 7,
                    minZoom: 1, maxZoom: 18
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
                }),
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false, doubleClickZoom: true,
                    dragPan: true, pinchRotate: false,
                    pinchZoom: false, keyboard: false,
                    mouseWheelZoom: true, shiftDragZoom: true
                }),

            }),
            interactions: {

            },
            layers: {

            },
            title:'',
            geometryType:'MultiPoint',//geometryType
            rowId: '',
            datasetId: '',
            wmsFeatureInfo: {},//wms getfeatureInfo
            wfsFeatureInfoFinal:{},//vector select feature info(수정불가) selectfield에서사용!!
            wfsFeatureInfo: {},//vector select feature info
            editMode: '', //편집모드
			// overlay: '',
            layerColumns:[],//컬럼들
            featureGeometry:'',//선택한 피쳐 초기 geometry
            selectedGeometry:'',//변환된(db에 올릴) 선택된(수정할)geometry
            infoDisplayNone:false, //닫기 버튼 클릭시 property 창 안보이게 하기
            saveType:'modify', //저장인지 수정인지 modify || save
            toggleOn:'off' ,//토글 상태 on || off
            toggleAddButton:true,
            toggleDelButton:false,
            isRaster:false, //raster인지 아닌지
            rasterInfo:{}
        }

        this.wmsInfo = this.wmsInfo.bind(this);
        this.onChangeEditMode = this.onChangeEditMode.bind(this);
        this.replaceProperties = this.replaceProperties.bind(this);

        this.saveButton = this.saveButton.bind(this);
        this.closeButton = this.closeButton.bind(this);
        this.cancleButton = this.cancleButton.bind(this);
        this.geometryTransform = this.geometryTransform.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
        this.handleSelectField = this.handleSelectField.bind(this);
        // this.popupClose = this.popupClose.bind(this);
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


    componentDidMount() {
        //templayerName
        let layerName = 'd=AnyangDong';
        layerName = this.props.match.params.DATASETID;
        // "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"

		//get columns array
		ajaxJson(
			// http://1.234.82.19:8083/pinogio-web/api/v1/datasets/d%3DAnyangDong/column
			// 
            ['GET', apiSvr + '/coursesWork/dataset/column/list.json'],
			{
				datasetId:layerName
			},
			function (data) {
			  let columns =data.response.data.data
			  this.setState({
				layerColumns:columns
			  })
			}.bind(this),
			function (xhr, status, err) {
			  alert('Error');
			}.bind(this)
		  );

        //bounds , geometry type
        ajaxJson(
            ['GET', apiSvr + '/coursesWork/dataset/' + layerName + '.json'],
            {},
            function (res) {
                let data = res.response.data.data;

                if(data.spatialType=='RASTER'){
                    this.setState({
                        isRaster:true
                    })
                }

                let dataTypeArray =['POINT','LINESTRING','POLYGON','MULTIPOINT','MULTILINESTRING','MULTIPOLYGON','CIRCLE']
                let olTypeArray = ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon' ,'Circle']
                let type = data.geometryType;
                let resultType = olTypeArray[dataTypeArray.indexOf(type)]
                this.setState({
                    geometryType : resultType,
                    title : data.title
                },function(){
                    this.init.bind(this)();
                    this.state.map.setTarget('mapView');
                    if(data.bounds != null){
                        let wkt = data.bounds;
                        
                        if(wkt != null){
                            let format = new ol.format.WKT();
                            let feature = format.readFeature(wkt, {
                                dataProjection: 'EPSG:4326',
                                featureProjection: 'EPSG:3857'
                            });
                            this.state.map.getView().fit(
                                feature.getGeometry().getExtent(),
                                this.state.map.getSize()
                            );
                        }
                    }else{
                        var w = JSON.parse(data.metadata).wgs84Bounds;
                        var extent = [w.minX,w.minY,w.maxX,w.maxY];
                        var extent3857 = ol.proj.getTransform( 'EPSG:4326','EPSG:3857')(extent);
                        
                        this.state.map.getView().fit(
                          extent3857,
                          this.state.map.getSize()
                        );
                    }
                    // if(data.spatialType=='RASTER'){
                    //     var w = JSON.parse(data.metadata).wgs84Bounds;
                    //     var extent = [w.minX,w.minY,w.maxX,w.maxY];
                    //     var extent3857 = ol.proj.getTransform( 'EPSG:4326','EPSG:3857')(extent);
                        
                    //     this.state.map.getView().fit(
                    //       extent3857,
                    //       this.state.map.getSize()
                    //     );
                    // }else{
                    //     let wkt = data.bounds;
    
                    //     if(wkt != null){
                    //         let format = new ol.format.WKT();
                    //         let feature = format.readFeature(wkt, {
                    //             dataProjection: 'EPSG:4326',
                    //             featureProjection: 'EPSG:3857'
                    //         });
                    //         this.state.map.getView().fit(
                    //             feature.getGeometry().getExtent(),
                    //             this.state.map.getSize()
                    //         );
                    //     }
                    // }
                })
            }.bind(this),
            function (e) {
                alert(e);
            }
		)
	
 
    }

    init(){
        var layerName = this.props.match.params.DATASETID;
        let raster = new ol.layer.Image({
            source: new ol.source.ImageWMS({
                ratio: 1,
                url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.3.0',
                    'STYLES': '',
                    'LAYERS': 'pinogio:' + layerName,
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
                loader: function (extent, resolution, projection) {

                    let url = 'http://1.234.82.19:8083/geoserver/pinogio/wfs?request=GetFeature' +
                        '&version=1.0.0' +
                        // '&typeName=pinogio:d=KjCXc4dmy9' +
                        '&typeName=pinogio:' + layerName +
                        '&srsName=EPSG:3857' +
                        '&bbox=' + extent.join(',') + ',' + 'urn:ogc:def:crs:EPSG:3857' +
                        '&outputFormat=text/javascript' +
                        '&format_options=callback:loadFeatures';

                    $.ajax({
                        url: url,
                        method: 'GET',
                        jsonpCallback: 'loadFeatures',
                        dataType: 'jsonp',
                        success: function (response) {
                            let feature = new ol.format.GeoJSON().readFeatures(response);
                            vector.getSource().addFeatures(feature);
                        }
                    });
                }.bind(this),
                strategy: ol.loadingstrategy.bbox
            })
        });

        let select = new ol.interaction.Select({
            layers: [vector],
            toggleCondition: ol.events.condition.never
        });

        let modify = new ol.interaction.Modify({
            features: select.getFeatures()
        });

        let draw = new ol.interaction.Draw({
            source: vector.getSource(),
            // snapTolerance: 20,
            type: this.state.geometryType
        });

        let snap = new ol.interaction.Snap({
            source: vector.getSource(),
            pixelTolerance: 10
        });


       


        this.setState({
            layers: {
                raster: raster,
                vector: vector,
            },
            interactions: {
                select: select, draw: draw, modify: modify, snap: snap
            },

        }, function () {
            //초기 map 지정 인터렉션 추가 
            let { map } = this.state;
            let { interactions } = this.state;
            var onChangeEditMode = this.onChangeEditMode

            // map.setTarget('mapView');
            //배경지도 추가
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


            map.addLayer(this.state.layers.raster);
            map.addLayer(this.state.layers.vector);


            map.addInteraction(interactions.snap);
            interactions.snap.setActive(true);

            map.addInteraction(interactions.select);
            interactions.select.setActive(true);
            //객체선택
            interactions.select.getFeatures().on('add', (e) => {
                // if(this.state.saveType=='firstClick'){this.setState({saveType:'save'});return;}
                // this.state.overlay.setPosition(e.element.values_.geometry.flatCoordinates);
                this.setState({
                    infoDisplayNone:false,
                })
                
                // let popupClose = this.popupClose;

                // $('#popupClose').click(function () {
                //     popupClose();
                // })


                let properties = e.element.getProperties();
                if (e.element.id_) {
                    this.setState({
                        rowId: e.element.id_.split('.')[1],
                        // datasetId: e.element.id_.split('.')[0],
                        datasetId: layerName,
                        toggleDelButton:true,
                        toggleAddButton:false,
                    });
				    // 선택된 rowid를 가지고 feature 정보 획득
                    ajaxJson(
                        ['GET', apiSvr + '/coursesWork/dataset/row.json'],
                        {
                            datasetId : layerName,
                            rowId : e.element.id_.split('.')[1]
                        },
                        function (res) {
                            if (!interactions.draw.getActive()) {
                                this.onChangeEditMode('edit', res.response.data.data);
                            };
                            this.setState({
                                selectedGeometry : e.element.getGeometry()
                            })
    
                        }.bind(this),
                        function (e) {
                            alert(e);
                        }
                    );
                }else{
                    this.setState({
                        toggleDelButton:false,
                        toggleAddButton:true
                    })
                };
                //   this.props.onChangeButton(true, false);

                //   this.props.getFeatureInfo(this.state.rowId, this.state.datasetId, e.element.getGeometry());

				// 선택된 rowid를 가지고 feature 정보 획득
				// http://1.234.82.19:8083/pinogio-web/api/v1/datasets/d%3DAnyangDong/column
                

            });

            //객체선택 해제
            interactions.select.getFeatures().on('remove', (e) => {
                this.onChangeEditMode('null', {});

                if (this.props.editingFeature == true) {
                    this.state.layers.vector.getSource().clear();
                };
                this.setState({
                    toggleDelButton:false,
                    toggleAddButton:true
                })

                if(this.state.saveType=='save'){
                    this.setState({
                        wfsFeatureInfo:{},
                        saveType:'modify'
                    })
                    interactions.draw.setActive(false);
                    interactions.select.getFeatures().clear();
                    this.state.layers.vector.getSource().clear();
                }

                //   this.props.editCancle(false);
                //   this.props.onChangeButton(false, true);

            });

            map.addInteraction(interactions.modify);
            interactions.modify.setActive(false);
            //객체수정 시작
            interactions.modify.on('modifystart', (e) => {
                // this.setState({
                //     wfsFeatureInfo: e.features.getArray()[0].values_
                // });
            });

            //객체수정 완료
            interactions.modify.on('modifyend',this.replaceProperties);

            map.addInteraction(draw);
            interactions.draw.setActive(false);

            //객체추가 그리기 시작
            interactions.draw.on('drawstart', (e) => {
                interactions.select.setActive(false);
            });

            //객체추가 그리기 완료
            interactions.draw.on('drawend', (e) => {
                interactions.draw.setActive(false);
                this.setState({
                    featureGeometry : e.feature.getGeometry(),
                    wfsFeatureInfo : {a:'a'},
                    // saveType :'firstClick'
                }
                // ,function(){
                //     interactions.select.setActive(true);
                // }
                )
            });

            //클릭시 정보보기
            map.on('singleclick', this.wmsInfo);

        });
    }

    wmsInfo(e) {
        this.setState({
            infoDisplayNone:false
        })
        let { map } = this.state;
        let { layers } = this.state;
        let props = this.props;
        let setFeatureInfo = this.setFeatureInfo.bind(this);

        let url = layers.raster.getSource().getGetFeatureInfoUrl(
            e.coordinate, map.getView().getResolution(), map.getView().getProjection(),
            { 'INFO_FORMAT': 'application/json' }) + '&info_format=text/javascript' + '&format_options=callback:loadFeatures';
        $.ajax({
            url: url,
            method: 'GET',
            jsonpCallback: 'loadFeatures',
            dataType: 'jsonp',
            success: function (response) {
                let feature = new ol.format.GeoJSON().readFeatures(response);

                if (feature.length == 0) {
                    setFeatureInfo([])
                } else {
                    
                    setFeatureInfo(feature[0].values_)
                    // props.onChangeEditMode('wms', feature[0]);
                };
            }
        });
    }
    // wmsinfo ajax 내부 featureInfo //현재 선택된 데이터를 보여줍니다.
    setFeatureInfo(value) {
        this.setState({
            wmsFeatureInfo: value
        })
    }

    //toggleEdit
    toggleEdit(checked) {

        let { map } = this.state;

        if (checked) {
            this.state.layers.raster.setVisible(false);
            this.state.layers.vector.setVisible(true);
            this.state.interactions.modify.setActive(true);
            this.state.interactions.draw.setActive(false);
            map.un('singleclick', this.wmsInfo);
            this.onChangeEditMode('null', {});
            this.setState({
                wmsFeatureInfo: {},
                toggleOn :'on',
                toggleAddButton:true,
                toggleDelButton:false
            })


        } else {
            this.state.layers.raster.setVisible(true);
            this.state.layers.vector.setVisible(false);
            this.state.interactions.modify.setActive(false);
            this.state.interactions.draw.setActive(false);

            this.state.interactions.select.getFeatures().clear();
            this.state.layers.vector.getSource().clear();
            this.state.layers.raster.getSource().updateParams({ _: Date.now() });
            map.on('singleclick', this.wmsInfo);

            this.setState({
                toggleOn :'off'
            })

        };

        this.setState({
            editButtons: checked,
            wfsFeatureInfo: {},
            infoDisplayNone:false,
            saveType : 'modify'
        })
    }

    //vector 선택한 객체 state에 저장
    onChangeEditMode(value, properties) {
        this.setState({
            editMode: value,
            wfsFeatureInfo: properties
        });
    }

    //객체 수정 listner 함수 (위치정보)
    replaceProperties(e){
        // var selectedGeometry = e.features.getArray()[0].getGeometry();
        var sourceCRS = 'EPSG:3857';
        var transformCRS = 'EPSG:3857';
        // var the_geom = this.geometryTransform(e.features.getArray()[0].getGeometry(),sourceCRS,transformCRS)
        this.setState({
            selectedGeometry:e.features.getArray()[0].getGeometry()
        }
        )
    }

    //수정 || 저장
    saveButton(){
        var layerColumns = this.state.layerColumns;
        let layerName = this.props.match.params.DATASETID;
        let type = this.state.saveType;
        var properties = {}
       
        
        

        if(type=='modify'){
            let rowId = this.state.rowId;
            var sourceCRS = 'EPSG:3857';
            var transformCRS = 'EPSG:4326';

            for(const column of layerColumns ){
                // row.name == 'the_geom' || row.name =='pino_id'
                var value = '';
                if(column.name == 'pino_id'|| column.name=="pino_photo"){
                    value = this.state.wfsFeatureInfo[column.name];
                }else if(column.name=='the_geom'){
                    var geometry = this.state.selectedGeometry;
                    value = this.geometryTransform(geometry,sourceCRS,transformCRS)
                }else{
                    if(column.valueType=='ALLOWED_VALUES'||column.valueType=='RANGE_VALUES'){
                        value=this.refs[column.name].props.value;
                    }else{
                        value=this.refs[column.name].getValue();//field value
                    }
                }
                
                if(column.dataType=='INTEGER'){
                    value=Number(value);
                }
                properties[column.name]=value;
    
            }
            
            let contentJson = JSON.stringify(properties);
            ajaxJson(
                ['PUT',apiSvr +'/coursesWork/dataset/row.json'],
                {
                    datasetId: layerName,
                    rowId: this.state.rowId,
                    contentJson : contentJson
                },
                function(res){
                    this.geometryTransform(geometry,transformCRS,sourceCRS);
                    this.setState({
                        wfsFeatureInfo:{}
                    })
                    this.state.interactions.select.getFeatures().clear();
                    
                }.bind(this),
                function(e){
                    alert(e);
                }
            )
        }else if(type =='save'){
            var sourceCRS = 'EPSG:3857';
            var transformCRS = 'EPSG:4326';
            for(const column of layerColumns ){
                var value = null;
                if(column.name=='the_geom'){
                    var geometry = this.state.featureGeometry;
                    var the_geom = this.geometryTransform(geometry,sourceCRS,transformCRS)
                    value = the_geom;
                    properties[column.name]=value;
                }else if(column.name=="pino_id"||column.name == 'pino_photo'){
                }else{
                    if(column.valueType=='ALLOWED_VALUES'||column.valueType=='RANGE_VALUES'){
                        value=this.refs[column.name].props.value;
                    }else{
                        value=this.refs[column.name].getValue();//field value
                    }
                }

                if(column.dataType=='INTEGER'){
                    value=Number(value);
                }

                properties[column.name]=value;
            }

            
            let contentJson = JSON.stringify(properties);
            ajaxJson(
                ['POST',apiSvr+'/coursesWork/dataset/row.json'], // ['POST',apiSvr+'/pngo/dataset/row.json'],
                {'datasetId':layerName, 'contentJson':contentJson}, //{'pinogioOutputId':datasetId, 'contentJson':contentJson},
                function(res){
                  for(let i=0; i<this.state.map.getLayers().getArray().length; i++){
                    if(this.state.map.getLayers().getArray()[i] instanceof ol.layer.Vector){
                      this.state.map.getLayers().getArray()[i].getSource().clear();
                    };
                  };
        
                  for(let i=0; i<this.state.map.getInteractions().getArray().length; i++){
                    if(this.state.map.getInteractions().getArray()[i] instanceof ol.interaction.Select){
                      this.state.map.getInteractions().getArray()[i].setActive(true);
                    }else if(this.state.map.getInteractions().getArray()[i] instanceof ol.interaction.Modify){
                      this.state.map.getInteractions().getArray()[i].setActive(true);
                    };
                  };
                    this.state.interactions.select.getFeatures().clear();
                  
                 this.geometryTransform(geometry,transformCRS,sourceCRS)
                  
                 this.setState({
                    saveType : 'modify',
                    toggleAddButton:true,
                    toggleDelButton:false,
                    wfsFeatureInfo:{}
                 })
                 
                //   this.state.onChangeEditMode('null');
                //   this.state.onChangeButton(false, true);
                }.bind(this),
                function(e){
                  alert(e);
                }
              );
        }

        this.state.interactions.select.setActive(true);

    }

    closeButton(){
        this.setState({
            infoDisplayNone:true
        })
        let interactions = this.state.interactions;
        interactions.select.setActive(true);
        interactions.draw.setActive(false);
        interactions.modify.setActive(true);
    }

    cancleButton(){
        this.setState({
            wfsFeatureInfo:{},
            saveType : 'modify',
            toggleAddButton:true,
            toggleDelButton:false
        })
        let interactions = this.state.interactions;
        // interactions.select.getFeatures().clear();
        interactions.draw.setActive(false);
        interactions.modify.setActive(true);
        interactions.select.setActive(true);
        // interactions.draw.removeLastPoint();
        this.state.layers.vector.getSource().clear();
    }
    
    //좌표변환
    geometryTransform(geometry,before,after){
        geometry = geometry.transform(before, after)
        var result = new ol.format.WKT().writeGeometry(geometry);
        return result;
    }
    
   

    //객체 추가 버튼 클릭 시
    onClickAdd(){
        var interactions = this.state.interactions;
        this.state.interactions.draw.setActive(true);
        this.state.interactions.modify.setActive(false);
        this.setState({
            // wfsFeatureInfo:{a:'a'},
            saveType:'save',
            toggleAddButton:false,
            toggleDelButton:false
        })
    }

    //객체 삭제 버튼 클릭 시 
    onClickDelete(){
        var interactions = this.state.interactions;
        interactions.select.getFeatures().clear();
        this.state.interactions.draw.setActive(false);
        let rowId = this.state.rowId;
        let layerName = this.props.match.params.DATASETID;
        
        
        ajaxJson(
          ['DELETE',apiSvr+'/coursesWork/dataset/row.json'], //['DELETE',apiSvr+'/pngo/dataset/row.json'],
          {'datasetId':layerName, 'rowId':rowId}, //{'pinogioOutputId':datasetId, 'rowId':rowId},
          function(res){
    
            for(let i=0; i<this.state.layers.vector.getSource().getFeatures().length; i++){
              if(this.state.rowId == this.state.layers.vector.getSource().getFeatures()[i].id_.split('.')[1]){
                this.state.layers.vector.getSource().clear();
              };
            };

            this.setState({
                toggleAddButton:true,
                toggleDelButton:false
            })
    
          }.bind(this),
          function(e){
          }
        );
    
    }

    //작업 초기화 버튼 클릭 시
    onClickClear(){
        var interactions = this.state.interactions
        interactions.select.getFeatures().clear();
        interactions.draw.setActive(false);
        interactions.modify.setActive(true);
        interactions.select.setActive(true);
        this.state.layers.vector.getSource().clear();
        this.setState({
            wfsFeatureInfo:{},
            toggleAddButton:true,
            toggleDelButton:false
        })
        // this.props.onChangeButton(false, true);
        // this.props.onChangeEditMode('null');
    }

    //select field 변경 함수
    handleSelectField(e,v,column){
        var wfsFeatureInfo = this.state.wfsFeatureInfo
        wfsFeatureInfo[column]=v
        this.setState({
            wfsFeatureInfo:wfsFeatureInfo
        })
    }
    
    
    //좌표변환
    // new ol.format.WKT().writeGeometry(e.features.getArray()[0].values_.geometry.transform('EPSG:3857', 'EPSG:4326'));

    render() {
        var listStyle={ width: 200, display: 'flex', height: 50, alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 15 }

        //wms info
        let wmsPopupInfo = Object.keys(this.state.wmsFeatureInfo).length != 0 ?
            <Paper style={{ marginTop: 10, width: '100%',  backgroundColor: 'white', paddingTop: 20, paddingBottom: 10 }}>
                    <h2 style={{paddingLeft:10}}>속성정보</h2>
                <div style={{maxHeight:500,overflow:'auto',width:'90%',paddingLeft:10,paddingBottom:40}}>
                    {this.state.isRaster ? 
                        Object.keys(this.state.wmsFeatureInfo).map((row,idx)=>{
                            if(row=='geometry'){
                                return null;
                            } else {
                                return(
                                    <div key={idx} style={listStyle}>
                                        <TextField
                                            floatingLabelStyle={{ fontSize: 15 }}
                                            inputStyle={{ fontSize: 15 }}
                                            value={this.state.wmsFeatureInfo[row]}
                                            floatingLabelText={row}
                                        />
                                    </div>
                                )
                            }
                        })
                        :
                        this.state.layerColumns.map((row,idx)=>{
                            if (row.name == 'the_geom' || row.name =='pino_id') {
                                return null;
                            } else if (row.name =='pino_photo'){
                                if(this.state.wmsFeatureInfo[row.name]==null ||this.state.wmsFeatureInfo[row.name]==''||this.state.wmsFeatureInfo[row.name]==undefined){
                                    return null;
                                }else{
                                    return(
                                        <div key={idx}>
                                            <br/>
                                            <label style={{marginLeft:10,marginTop:15,fontSize:15,marginBottom:5,color:'rgba(0,0,0,0.3)'}}>사진</label>
                                            <div key={idx} style={{ width: 200, display: 'flex', height: 200, alignItems: 'center', marginLeft: 10, marginRight: 10 ,
                                                background:'url(http://1.234.82.19:8083/pinogio-web/data/photo/'+this.state.wmsFeatureInfo[row.name]+')',
                                                backgroundSize:'cover'
                                            }}
                                                onClick={()=>window.open('http://1.234.82.19:8083/pinogio-web/data/photo/'+this.state.wmsFeatureInfo[row.name])}
                                            >
                                            </div>
                                        </div>
                                    )
                                    
                                }
                            } else {
                                return(
                                    <div key={idx} style={listStyle}>
                                        <TextField
                                            floatingLabelStyle={{ fontSize: 15 }}
                                            inputStyle={{ fontSize: 15 }}
                                            value={this.state.wmsFeatureInfo[row.name]}
                                            floatingLabelText={row.alias==null ?  row.name : row.alias}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                    <div style={{ textAlign: 'right', paddingRight:20 ,paddingTop:10}}>
                        <FlatButton style={{backgroundColor:'#43444c',color:'#fff'}} label="닫기" id="popupClose" onClick={this.closeButton}/>
                    </div>
            </Paper>
            : null

        //wfs info
        let wfsPopupInfo = Object.keys(this.state.wfsFeatureInfo).length != 0 ?
            <Paper style={{ marginTop: 10, width: '100%', backgroundColor: 'white', paddingTop: 20, paddingBottom: 10 }}>
                    <h2 style={{paddingLeft:10}}>속성정보</h2>
                <div style={{maxHeight:500,overflow:'auto',width:'90%',paddingLeft:10,paddingBottom:40}}>
                    {this.state.layerColumns.map((row, idx) => {
                        if (row.name == 'the_geom' || row.name =='pino_id') {
                            return null;
                        } else if (row.name =='pino_photo'){
                            if(this.state.wfsFeatureInfo[row.name]!=null ){
                                return(
                                    <div>
                                        <br/>
                                        <label style={{marginLeft:10,marginTop:15,fontSize:15,marginBottom:5,color:'rgba(0,0,0,0.3)'}}>사진</label>
                                        <div key={idx} style={{ width: 200, display: 'flex', height: 200, alignItems: 'center', marginLeft: 10, marginRight: 10 ,
                                            background:'url(http://1.234.82.19:8083/pinogio-web/data/photo/'+this.state.wfsFeatureInfo[row.name]+')',
                                            backgroundSize:'cover'
                                        }}
                                            onClick={()=>window.open('http://1.234.82.19:8083/pinogio-web/data/photo/'+this.state.wfsFeatureInfo[row.name])}
                                        >
                                        </div>
                                    </div>
                                )
                            }else{
                                return null;
                            }
                        } else {
                        if(row.valueType=='ALLOWED_VALUES'){
                                var
                                items = row.valueBase.split('|')//가|나|다
                                return(
                                    <div key={idx} style={listStyle}>
                                        <SelectField
                                            floatingLabelText={row.alias==null ?  row.name : row.alias}
                                            value={this.state.wfsFeatureInfo[row.name]}
                                            onChange={(e,k,v)=>this.handleSelectField(e,v,row.name)}
                                            ref={row.name}
                                            floatingLabelStyle={{ fontSize: 15 }}
                                        >
                                        {items.map((row2,idx)=>(
                                            <MenuItem key={idx} value={row2} primaryText={row2} />
                                        ))}
                                        </SelectField>
                                    </div>
                                )
                            }else if(row.valueType=='RANGE_VALUES'){
                                var items = row.valueBase.split('|')
                                var item1 = Number(items[0]);
                                var item2 = Number(items[1]);
                                var item3 = Number(items[2]);
                                var rangeArray =[item1];
                                while(item1 <item2){
                                    item1 = item1+item3;
                                    rangeArray.push(item1);
                                }
                                rangeArray[rangeArray.length-1]=item2;

                                return(
                                    <div key={idx} style={listStyle}>
                                        <SelectField
                                            floatingLabelText={row.alias==null ?  row.name : row.alias}
                                            value={this.state.wfsFeatureInfo[row.name]}
                                            onChange={(e,k,v)=>this.handleSelectField(e,v,row.name)}
                                            ref={row.name}
                                            floatingLabelStyle={{ fontSize: 15 }}
                                        >
                                        {rangeArray.map((row2,idx)=>(
                                            <MenuItem key={idx} value={Number(row2)} primaryText={Number(row2)} />
                                        ))}
                                        </SelectField>
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={idx} style={listStyle}>
                                        <TextField
                                            floatingLabelStyle={{ fontSize: 15 }}
                                            inputStyle={{ fontSize: 15 }}
                                            defaultValue={this.state.wfsFeatureInfo[row.name]}
                                            floatingLabelText={row.alias==null ?  row.name : row.alias}
                                            ref={row.name}
                                        />
                                    </div>
                                )
                            }
                            
                            
                        }
                    })}
                </div>
				<div style={{ textAlign: 'right', paddingRight:20,paddingTop:10 }}>
					<FlatButton style={{backgroundColor:'#fff',color:'#43444c',border:'1px solid #43444c'}} label="저장" className="popupEdit" onClick={this.saveButton}/>
                    {this.state.saveType == 'save' ? 
                    <FlatButton style={{backgroundColor:'#43444c',color:'#fff'}} label="취소" id="popupClose" onClick={this.cancleButton}/>                    
                    :
                    <FlatButton style={{backgroundColor:'#43444c',color:'#fff'}} label="닫기" id="popupClose" onClick={this.closeButton}/>
                    }
				</div>
            </Paper>
            : null



        let styles = {
            thumbOff: {
                backgroundColor: '#EAEAEA'
            },
            trackOff: {
                backgroundColor: '#BDBDBD'
            },
            thumbSwitched: {
                backgroundColor: '#3e81f6'
            },
            trackSwitched: {
                backgroundColor: '#BDBDBD'
            }
        };

        return (
            <div>
                <header id="header">
                    <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#43444c', color: 'white',height:60}}>
                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
                        <IconMenu
                            iconButtonElement={<IconButton><IconNavigationMenu color='white'/></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem primaryText="수업 홈" onClick={()=>this.props.history.push("/ngiiedu/course/" +this.props.match.params.COURSEID)}/>
                            <MenuItem primaryText="이전 목록" onClick={()=>this.props.history.goBack()}/>
                        </IconMenu>
                        <div 
                            style={{fontSize: 20, textAlign:'left'}}>
                            {this.state.title}
                        </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                            {/* <IconButton 
                            style={{width: 50, height: 50}}
                            onClick={this.settingHandle.bind(this)}
                            tooltip="설정"
                            >
                            <IconSettings 
                                color='white'
                            />
                            </IconButton> */}
                            <IconButton 
                            style={{width: 50, height: 50}}
                            tooltip="미리보기"
                            onClick={() => this.props.history.push('/ngiiedu/course/dataset/preview/'+this.props.match.params.DATASETID)}
                            >
                            
                                <IconPageView
                                    color='white'
                                />
                            </IconButton>
                        </div>
                    </div>
                </header>
                
                <main>

                    <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>

                        <div id="mapView" style={{ height: '100%' }}></div>
                        
                        <div style={{ position: 'absolute', right: 100, top: 50, width: 350, zIndex: 1 }}>
                        {this.state.isRaster?null :
                            <div >
                                <EditToggle 
                                    toggleEdit={this.toggleEdit.bind(this)} 
                                    toggleOn={this.state.toggleOn}
                                    addButton={this.state.toggleAddButton}
                                    delButton={this.state.toggleDelButton}
                                    onClickAdd={this.onClickAdd}
                                    onClickClear={this.onClickClear}
                                    onClickDelete={this.onClickDelete}
                                />
                            </div>
                        }
                            {this.state.infoDisplayNone ? 
                            null
                            :
                            <div>
                                {wmsPopupInfo}
                                {wfsPopupInfo}
                            </div>
                            }
                            

                        </div>
                    </div>
                    
                </main>
            </div>
        );
    }
};

export default withRouter(MainContainer);
