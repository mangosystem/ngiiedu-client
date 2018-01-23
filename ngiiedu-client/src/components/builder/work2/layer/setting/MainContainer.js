import React from 'react';

import { withRouter } from "react-router-dom";

import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconPageView from 'material-ui/svg-icons/action/pageview';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';

import PointSymbolizer from './PointSymbolizer.js';
import LineSymbolizer from './LineSymbolizer.js';
import PolygonSymbolizer from './PolygonSymbolizer.js';
import ColorMapSymbolizer from'./ColorMapSymbolizer.js';

class MainContainer extends React.Component {

    constructor(){
        super();

        this.state = {
            map: new ol.Map({
                view: new ol.View({
                  center: [14162252.600956, 4353853.130726],
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
            layers:{

            },
            valueSingle:1,
            stylePanelColumn:[],
            stylePanelOptions:{},
            layerId:null,
            datasetId:null,
            title:null,
            type:null,
            settingModal:false,
            changeTitle:null,
            rowUniqueInfo:[],
            process:null,
            selCategoryType:0,
            iconColor:[
                '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c',
                '#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'
            ],
            spatialType:null,
            metadata:''

        }

        this.handleChangeSingle = this.handleChangeSingle.bind(this);
        this.handleChangeSetting = this.handleChangeSetting.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.getRowUniqueInfo = this.getRowUniqueInfo.bind(this);
        this.handleChangeRowColor = this.handleChangeRowColor.bind(this);

        this.addBaseLayer = this.addBaseLayer.bind(this);
        this.addBaseLayer = this.addBaseLayer.bind(this);
        this.handleChangeCategory=this.handleChangeCategory.bind(this);
        this.handleChangeSpatialType = this.handleChangeSpatialType.bind(this);
    }

    componentDidMount(){
        let layerId=this.props.match.params.LAYERID;
        ajaxJson(
            ['GET', apiSvr + '/coursesWork/layers/' + layerId + '.json'],
            {},
            function(res){
                if(res.response.data.data.bounds!=null){
                    let wkt = res.response.data.data.bounds;
                    let format = new ol.format.WKT();
                    let feature = format.readFeature(wkt, {
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857'
                    });
                    this.state.map.getView().fit(
                        feature.getGeometry().getExtent(),
                        this.state.map.getSize()
                    );
                }else if(res.response.data.data.bounds==null&&res.response.data.data.metadata!=null){
                    let wgs84Bounds=JSON.parse(res.response.data.data.metadata).wgs84Bounds;
                    let extent=[wgs84Bounds.minX, wgs84Bounds.minY, wgs84Bounds.maxX, wgs84Bounds.maxY];
                    let transformExtent = ol.proj.transformExtent(extent,'EPSG:4326', 'EPSG:3857');
                    this.state.map.getView().fit(transformExtent, this.state.map.getSize());

                    let spatialType = JSON.parse(res.response.data.data.metadata).spatialType;
                    this.setState({
                        spatialType:spatialType
                    })
                }
                this.setState({
                    layerId:this.props.match.params.LAYERID,
                    datasetId:JSON.parse(res.response.data.data.sources).inputDataset.datasetId,
                    stylePanelOptions:JSON.parse(res.response.data.data.styling),
                    title:res.response.data.data.title,
                    changeTitle:res.response.data.data.title,
                    type:res.response.data.data.geometryType,
                    process:res.response.data.data.process!=undefined&&res.response.data.data.process!=null ? JSON.parse(res.response.data.data.process):null,
                    metadata: res.response.data.data.metadata

                });

                if(JSON.parse(res.response.data.data.styling)!=null && JSON.parse(res.response.data.data.styling).symbolizerType=='CATEGORIES'){
                    this.setState({
                        rowUniqueInfo:JSON.parse(res.response.data.data.styling).classes,
                        selCategoryType:JSON.parse(res.response.data.data.styling).classes[0].iconName!=undefined?1:0
                    });
                }

                let datasetId = JSON.parse(res.response.data.data.sources).inputDataset.datasetId
                ajaxJson(
                    // ['GET', apiSvr + '/pngo/dataset/column/list.json?pinogioOutputId='+layerId],
                    ['GET', apiSvr + '/coursesWork/dataset/column/list.json'],
                    {datasetId:datasetId},
                    function (data) {
                        let column =[];
                        for(var i=0;i<data.response.data.data.length;i++){
                            if(data.response.data.data[i].name!='pino_id'&&data.response.data.data[i].name!='the_geom'&&data.response.data.data[i].name!='pino_photo'){
                                column.push(data.response.data.data[i])
                            }
                        }
                        this.setState({
                            stylePanelColumn:column
                        })
                    }.bind(this),
                    function (xhr, status, err) {
                      alert('Error');
                    }.bind(this)
                );
            }.bind(this),
            function(e){
            alert(e);
            }
        );

        let raster = new ol.layer.Image({
            source: new ol.source.ImageWMS({
            ratio: 1,
            visible: true,
            url:pinoSvr+gisSvr+'/pinogio/wms',
            params: {
                'FORMAT': 'image/png',
                'VERSION': '1.3.0',
                'STYLES': '',
                'LAYERS': 'pinogio:'+layerId,
            }
            })
        });

        this.setState({
            layers: {
                raster: raster
            }
        });
        //초기 map 지정 
        let { map } = this.state;

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
        let extent = [90112, 1192896, 2187264, 2765760];  // 4 * 3
    
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

    getRowUniqueInfo(value){
        if(value !=null){
            let datasetId = this.state.datasetId;
            ajaxJson(
                // ['GET', apiSvr + '/pngo/dataset/column/list.json?pinogioOutputId='+layerId],
                ['GET', apiSvr + '/coursesWork/dataset/'+datasetId+'/rowUnique.json'],
                {datasetId:datasetId, columnName:value},
                function (data) {
                    let rowUniqueInfo=[];
                    for(let i=0; i<data.response.data.data.length;i++){
                        if (i < 10) { 
                            rowUniqueInfo.push({
                                value: data.response.data.data[i],
                                color: '#'+Math.random().toString(16).substr(-6),
                                opacity: 1,
                                label: data.response.data.data[i]
                            });
                        }
                    }

                    this.setState({
                        rowUniqueInfo: rowUniqueInfo
                    });
                }.bind(this),
                function (xhr, status, err) {
                alert('Error');
                }.bind(this)
            );
        }else{
            this.setState({
                rowUniqueInfo:[]
            })
        }
    }

    //RowColor
    handleChangeRowColor(color, row){
        var opacity = 1;

        if(color.length>7){
            // 컬러값과 쉼표만 남기고 삭제. 
            var rgb = color.replace( /[^%,.\d]/g, "" ); 
        
            // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
            rgb = rgb.split( "," ); 
    
            // 컬러값이 "%"일 경우, 변환하기. 
            for ( var x = 0; x < 4; x++ ) { 
                if ( rgb[ x ].indexOf( "%" ) > -1 ) rgb[ x ] = Math.round( parseFloat( rgb[ x ] ) * 2.55 ); 
            } 
    
            // 16진수 문자로 변환. 
            var toHex = function( string ){ 
                string = parseInt( string, 10 ).toString( 16 ); 
                string = ( string.length === 1 ) ? "0" + string : string; 

                return string; 
            }; 
    
            var r = toHex( rgb[ 0 ] ); 
            var g = toHex( rgb[ 1 ] ); 
            var b = toHex( rgb[ 2 ] ); 
            
            color = "#" + r + g + b; 
            opacity = rgb[ 3 ];
        }

        for(let i=0;i<this.state.rowUniqueInfo.length;i++){
            if(i==row){
                let rowUniqueInfo = this.state.rowUniqueInfo;
                rowUniqueInfo[i].color = color;
                rowUniqueInfo[i].opacity = opacity;
                this.setState({
                    rowUniqueInfo:rowUniqueInfo
                })
            }
        }
    }

    handleChangeSingle (event, value) {
        this.setState({
            valueSingle: value
        })
    };

    handleChangeSetting(){
        this.setState({
            settingModal:!this.state.settingModal
        })
    }

    //제목입력
    handleChangeTitle(e, v){
        this.setState({
            changeTitle: v
        });
    }

    //주제지도 변경 버튼
    editLayer(){
        let title=this.state.changeTitle
        ajaxJson(
        ['PUT', apiSvr + '/coursesWork/layers/' + this.state.layerId + '/metadata.json'],
        {
            title:this.state.changeTitle,
            metadata:this.state.metadata
        },
        function (data) {
            this.setState({
                title:title,
                settingModal:!this.state.settingModal
            })
        }.bind(this),
        function (xhr, status, err) {
            alert('Error');
        }.bind(this)
        );
    }

    handleChangeCategory(event,index,value){
        this.setState({
          selCategoryType:index
        },function(){
            if(index==0){
                let rowUniqueInfo = this.state.rowUniqueInfo;
                for(var i=0; i<this.state.rowUniqueInfo.length;i++){
                    rowUniqueInfo[i].iconName=null;
                }
                this.setState({
                    rowUniqueInfo:rowUniqueInfo
                })
            }else if(index==1){
                let rowUniqueInfo = this.state.rowUniqueInfo;
                for(var i=0; i<this.state.rowUniqueInfo.length;i++){
                    rowUniqueInfo[i].iconName='FA_tree';
                    rowUniqueInfo[i].color=this.state.iconColor[i];
                }
                this.setState({
                    rowUniqueInfo:rowUniqueInfo
                })
            }
        })
    }

    handleChangeSpatialType(type){
        this.setState({
            spatialType:type,
            type:'COLORMAP'
        });
    }

    render() {

        //주제지도 삭제 확인 및 취소 버튼
        const settingButton = [
            <FlatButton
                hoverColor="#FAFAFA"
                label="취소"
                onClick={this.handleChangeSetting}
            />,
            <FlatButton
                backgroundColor="#00BCD4"
                hoverColor="#B2EBF2"
                label="편집"
                onClick={()=>this.editLayer()}
            />
        ];
   
        return (
            <div>
                <header id="header">
                    <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor:'#43444c',height:60}}>

                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
                            {/* 뒤로가기 */}
                            <IconMenu
                                iconButtonElement={<IconButton><IconNavigationMenu color='white' /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <MenuItem primaryText="수업 홈" onClick={() => this.props.history.push(contextPath+'/course/'+this.props.match.params.COURSEID)}/>
                                <MenuItem primaryText="이전 목록" onClick={()=>this.props.history.goBack()}/>
                            </IconMenu>
                            {/* 활동 제목 */}
                            <div style={{fontSize: 20, textAlign:'left',color:'white'}}>
                                {this.state.title}
                            </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                            <IconButton tooltip='설정' onClick={() => this.handleChangeSetting()}>
                                <IconSettings color='white'/>
                            </IconButton>
                            <IconButton tooltip='미리보기' onClick={() => this.props.history.push(contextPath+'/layer/preview/'+this.props.match.params.LAYERID)}>
                                <IconPageView color='white'/>
                            </IconButton>
                        </div>
                    </div>
                </header>
       
            <main>
                <div style={{ position: 'absolute', top: 60, bottom:0, left: 0, right: 0 }}>
                    <div style={{width:400, height:'100%', float:'left', backgroundColor:'white'}}>
                        {this.state.type!=null&&this.state.type.indexOf('POINT')!=-1?
                            <PointSymbolizer 
                                column={this.state.stylePanelColumn}
                                styles={this.state.stylePanelOptions}
                                layerId={this.state.layerId}
                                raster={this.state.layers.raster}
                                getRowUniqueInfo={this.getRowUniqueInfo}
                                rowUniqueInfo={this.state.rowUniqueInfo}
                                handleChangeRowColor={this.handleChangeRowColor}
                                datasetId = {this.state.datasetId}
                                process={this.state.process}
                                selCategoryType={this.state.selCategoryType}
                                handleChangeCategory={this.handleChangeCategory}
                                handleChangeSpatialType = {this.handleChangeSpatialType}
                            />
                        :this.state.type!=null&&this.state.type.indexOf('LINE')!=-1?
                            <LineSymbolizer
                                column={this.state.stylePanelColumn}
                                styles={this.state.stylePanelOptions}
                                layerId={this.state.layerId}
                                raster={this.state.layers.raster}
                                getRowUniqueInfo={this.getRowUniqueInfo}
                                rowUniqueInfo={this.state.rowUniqueInfo}
                                handleChangeRowColor={this.handleChangeRowColor}
                                datasetId = {this.state.datasetId}
                            />
                        :this.state.type!=null&&this.state.type.indexOf('POLYGON')!=-1?
                            <PolygonSymbolizer
                                column={this.state.stylePanelColumn}
                                styles={this.state.stylePanelOptions}
                                layerId={this.state.layerId}
                                raster={this.state.layers.raster}
                                getRowUniqueInfo={this.getRowUniqueInfo}
                                rowUniqueInfo={this.state.rowUniqueInfo}
                                handleChangeRowColor={this.handleChangeRowColor}
                                datasetId = {this.state.datasetId}
                            />
                        :this.state.spatialType!=null&&this.state.spatialType=='RASTER'?
                            <ColorMapSymbolizer
                                styles={this.state.stylePanelOptions}
                                layerId={this.state.layerId}
                                raster={this.state.layers.raster}
                            />
                        :null}
                    </div>
                    <div id="mapView" style={{height:'100%', paddingLeft:400}}>
                    </div>
                       
                </div>
            </main>
                {/* 주제지도 편집 모달 */}
                <Dialog
                    title="주제지도 편집"
                    actions={settingButton}
                    modal={false}
                    open={this.state.settingModal}
                    onRequestClose={this.handleChangeSetting}
                >
                    <Subheader>Title</Subheader>
                    <TextField 
                        hintText="제목을 입력하세요" 
                        value={this.state.changeTitle}
                        onChange={this.handleChangeTitle}
                        type='text'
                    />
                </Dialog>
            </div>
        );
    }
};

export default withRouter(MainContainer);
