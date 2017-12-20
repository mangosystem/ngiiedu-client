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
                    zoom: true, rotate: false, attribution: true
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
			  console.log('columns');
			  console.dir(columns);
			  // console.log('ajaxcolumn')
			  // console.dir(data.response.data.data);
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
                let dataTypeArray =['POINT','LINESTRING','POLYGON','MULTIPOINT','MULTILINESTRING','MULTIPOLYGON','CIRCLE']
                let olTypeArray = ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon' ,'Circle']
                let type = data.geometryType;
                let resultType = olTypeArray[dataTypeArray.indexOf(type)]
                this.setState({
                    geometryType : resultType,
                    title : data.title
                },function(){
                    this.init.bind(this)();
                    let wkt = data.bounds;
                    this.state.map.setTarget('mapView');

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
            map.addLayer(this.state.layers.raster);
            map.addLayer(this.state.layers.vector);


            map.addInteraction(interactions.snap);
            interactions.snap.setActive(true);

            map.addInteraction(interactions.select);
            interactions.select.setActive(true);
            //객체선택
            interactions.select.getFeatures().on('add', (e) => {
                console.log('객체선택!')
                // if(this.state.saveType=='firstClick'){this.setState({saveType:'save'});return;}
                console.dir(e.element);
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
                            console.log('row-> value')
                            console.dir(res.response.data.data);
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
                console.log('객체선택해제!')
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
                console.log('객체수정시작')
            });

            //객체수정 완료
            interactions.modify.on('modifyend',this.replaceProperties);

            map.addInteraction(draw);
            interactions.draw.setActive(false);

            //객체추가 그리기 시작
            interactions.draw.on('drawstart', (e) => {
                console.log('객체추가그리기시작!')
                interactions.select.setActive(false);
            });

            //객체추가 그리기 완료
            interactions.draw.on('drawend', (e) => {
                console.log('객체추가그리기완료!')
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
        // let overlay = this.state.overlay;
        let setFeatureInfo = this.setFeatureInfo.bind(this);
        // let popupClose = this.popupClose //팝업 클로즈 함수

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
                console.log('feature')
                console.dir(feature)
                console.log('response')
                console.dir(response)

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
        // alert(checked)

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
        console.log('객체수정완료')
        // var selectedGeometry = e.features.getArray()[0].getGeometry();
        var sourceCRS = 'EPSG:3857';
        var transformCRS = 'EPSG:3857';
        // var the_geom = this.geometryTransform(e.features.getArray()[0].getGeometry(),sourceCRS,transformCRS)
        this.setState({
            selectedGeometry:e.features.getArray()[0].getGeometry()
        }
        // ,function(){
        //     let layerName = this.props.match.params.DATASETID;
        //     let properties = this.state.wfsFeatureInfo;
        //     properties.the_geom = this.state.selectedGeometry;
        //     //수정된 geometry가 저장된 wfsFeatureInfo
        //     this.setState({
        //         wfsFeatureInfo:properties
        //     })
        //     let contentJson = JSON.stringify(properties);
        //     ajaxJson(
        //         ['PUT',apiSvr +'/coursesWork/dataset/row.json'],
        //         {
        //             datasetId: layerName,
        //             rowId: this.state.rowId,
        //             contentJson : contentJson
        //         },
        //         function(res){
        //             console.log('data replace');
        //             console.dir(res)
        //         }.bind(this),
        //         function(e){
        //             alert(e);
        //         }
        //     )
        //     this.geometryTransform(e.features.getArray()[0].getGeometry(),transformCRS,sourceCRS);
        // }
        )
    }

    //수정 || 저장
    saveButton(){
        // alert('save')
        var layerColumns = this.state.layerColumns;
        let layerName = this.props.match.params.DATASETID;
        let type = this.state.saveType;
        var properties = {}
        var value = '';
        
        

        if(type=='modify'){
            let rowId = this.state.rowId;
            var sourceCRS = 'EPSG:3857';
            var transformCRS = 'EPSG:3857';

            for(const column of layerColumns ){
                // row.name == 'the_geom' || row.name =='pino_id'
                
                if(column.name == 'pino_id'){
                    value = this.state.wfsFeatureInfo[column.name];
                }else if(column.name=='the_geom'){
                    var geometry = this.state.selectedGeometry;
                    value = this.geometryTransform(geometry,sourceCRS,transformCRS)
                }else{
                    if(column.valueType=='ALLOWED_VALUES'||column.valueType=='RANGE_VALUE'){
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
            console.log(contentJson)
            ajaxJson(
                ['PUT',apiSvr +'/coursesWork/dataset/row.json'],
                {
                    datasetId: layerName,
                    rowId: this.state.rowId,
                    contentJson : contentJson
                },
                function(res){
                    console.log('data replace');
                    console.dir(res)
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

                if(column.name=='the_geom'){
                    var geometry = this.state.featureGeometry;
                    var the_geom = this.geometryTransform(geometry,sourceCRS,transformCRS)
                    value = the_geom;
                    properties[column.name]=value;
                }else if(column.name=="pino_id"){
                }else{
                    if(column.valueType=='ALLOWED_VALUES'||column.valueType=='RANGE_VALUE'){
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
            console.log(contentJson);
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
        // alert('close');
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
        console.log('onClickAdd');
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
        console.log('onClickDelete');
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
            console.log(e);
          }
        );
    
    }

    //작업 초기화 버튼 클릭 시
    onClickClear(){
        console.log('onClickClear');
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
            <Paper style={{ marginTop: 10, width: '100%',  backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                <div style={{maxHeight:500,overflow:'auto',width:'100%'}}>
                    <h2>Properties</h2>
                    {this.state.layerColumns.map((row,idx)=>{
                        if (row.name == 'the_geom' || row.name =='pino_id') {
                            return null;
                        } else {
                            return(
                                <div key={idx} style={listStyle}>
                                <TextField
                                    floatingLabelStyle={{ fontSize: 15 }}
                                    inputStyle={{ fontSize: 15 }}
                                    value={this.state.wmsFeatureInfo[row.name]}
                                    floatingLabelText={row.alias}
                                />
                            </div>
                            )
                        }
                    })}
                    <div style={{ textAlign: 'right' }}>
                        <FlatButton label="닫기" id="popupClose" onClick={this.closeButton}/>
                    </div>
                </div>
            </Paper>
            : null

        //wfs info
        let wfsPopupInfo = Object.keys(this.state.wfsFeatureInfo).length != 0 ?
            <Paper style={{ marginTop: 20, width: '100%', backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                <div style={{maxHeight:500,overflow:'auto',width:'100%'}}>
                    <h2>Properties</h2>
                    {this.state.layerColumns.map((row, idx) => {
                        if (row.name == 'the_geom' || row.name =='pino_id') {
                            return null;
                        } else {
                        if(row.valueType=='ALLOWED_VALUES'){
                                var
                                items = row.valueBase.split('|')//가|나|다
                                return(
                                    <div key={idx} style={listStyle}>
                                        <SelectField
                                            floatingLabelText={row.alias}
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
                            }else if(row.valueType=='RANGE_VALUE'){
                                var items = row.valueBase.split('|')//가|나|다
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
                                            floatingLabelText={row.alias}
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
                                            floatingLabelText={row.alias}
                                            ref={row.name}
                                        />
                                    </div>
                                )
                            }
                            
                            
                        }
                    })}
                </div>
				<div style={{ textAlign: 'right' }}>
					<FlatButton label="저장" className="popupEdit" onClick={this.saveButton}/>
                    {this.state.saveType == 'save' ? 
                    <FlatButton label="취소" id="popupClose" onClick={this.cancleButton}/>                    
                    :
                    <FlatButton label="닫기" id="popupClose" onClick={this.closeButton}/>
                    }
				</div>
            </Paper>
            : null



        return (
            <div>
                <header id="header">
                    <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor:'#424242'}}>
                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
                            {/* 뒤로가기 */}
                            <IconButton style={{width: 50, height: 50}}>
                                <IconArrowBack 
                                    color='white'
                                    onClick={()=>this.props.history.goBack()}
                                />
                            </IconButton>
                            {/* 활동 제목 */}
                            <div style={{fontSize: 20, textAlign:'left',color:'white'}}>
                                {this.state.title}
                            </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                            <FlatButton
                                label="미리보기"
                                style={{color:'white'}}
                                onClick={() => this.props.history.push('/ngiiedu/dataset/preview/'+this.props.match.params.DATASETID)}
                            />
                        </div>
                    </div>
                </header>
                <main>

                    <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>

                        <div id="mapView" style={{ height: '100%' }}></div>
                        <div style={{ position: 'absolute', right: 100, top: 50, width: 350, zIndex: 1 }}>
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
